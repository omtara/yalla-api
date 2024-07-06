/**
 * user-profile controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::user-profile.user-profile', ({ strapi }) =>  ({
    async me(ctx) {
        try {
            const entry = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.state.user.id, {
                populate: { userProfile: true },
              });
          ctx.body = entry.userProfile;
        } catch (err) {
          ctx.body = err;
        }
      },
}));
