/**
 * user custom controller
 */
const crypto = require('crypto');
const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('@strapi/plugin-users-permissions/server/utils');
const {
  validateCallbackBody,
  validateRegisterBody,
  validateSendEmailConfirmationBody,
  validateForgotPasswordBody,
  validateResetPasswordBody,
  validateEmailConfirmationBody,
  validateChangePasswordBody,
} = require('@strapi/plugin-users-permissions/server/controllers/validation/auth');

const { getAbsoluteAdminUrl, getAbsoluteServerUrl, sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
  
    return sanitize.contentAPI.output(user, userSchema, { auth });
  };
  
export default {
    async register(ctx) {
        const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
    
        const settings = await pluginStore.get({ key: 'advanced' });
    
        if (!settings.allow_register) {
          throw new ApplicationError('Register action is currently disabled');
        }
    
        const params = {
          ..._.omit(ctx.request.body, [
            'confirmed',
            'blocked',
            'confirmationToken',
            'resetPasswordToken',
            'provider',
            'id',
            'createdAt',
            'updatedAt',
            'createdBy',
            'updatedBy',
            'role',
          ]),
          provider: 'local',
        };
    
        await validateRegisterBody(params);
    
        const role = await strapi
          .query('plugin::users-permissions.role')
          .findOne({ where: { type: settings.default_role } });
    
        if (!role) {
          throw new ApplicationError('Impossible to find the default role');
        }
    
        const { email, username, provider } = params;
    
        const identifierFilter = {
          $or: [
            { email: email.toLowerCase() },
            { username: email.toLowerCase() },
            { username },
            { email: username },
          ],
        };
    
        const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
          where: { ...identifierFilter, provider },
        });
    
        if (conflictingUserCount > 0) {
          throw new ApplicationError('Email or Username are already taken');
        }
    
        if (settings.unique_email) {
          const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
            where: { ...identifierFilter },
          });
    
          if (conflictingUserCount > 0) {
            throw new ApplicationError('Email or Username are already taken');
          }
        }
    
        if (!params.firstName || !params.lastName) {
          throw new ApplicationError('First name and Last name are required');
        }

        const newUser = {
          ...params,
          role: role.id,
          email: email.toLowerCase(),
          username,
          confirmed: !settings.email_confirmation,
        };
    
        const user = await getService('user').add(newUser);
        
        const sanitizedUser = await sanitizeUser(user, ctx);
    
        // Create user profile
        const newProfile = {
            user: user.id,
            firstName: params.firstName,
            lastName: params.lastName,
          };
        await strapi.entityService.create('api::user-profile.user-profile', {
            data: {...newProfile}
        });

        if (settings.email_confirmation) {
          try {
            await getService('user').sendConfirmationEmail(sanitizedUser);
          } catch (err) {
            throw new ApplicationError(err.message);
          }
    
          return ctx.send({ user: sanitizedUser });
        }
    
        const jwt = getService('jwt').issue(_.pick(user, ['id']));
    
        return ctx.send({
          jwt,
          user: sanitizedUser,
        });
      },
};