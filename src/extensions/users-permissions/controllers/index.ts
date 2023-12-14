import AuthCustom from './auth';
const auth = require('@strapi/plugin-users-permissions/server/controllers/auth.js');
const user = require('@strapi/plugin-users-permissions/server/controllers/user.js');
const role = require('@strapi/plugin-users-permissions/server/controllers/role.js');
const permissions = require('@strapi/plugin-users-permissions/server/controllers/permissions.js');
const settings = require('@strapi/plugin-users-permissions/server/controllers/settings.js');
const contentmanageruser = require('@strapi/plugin-users-permissions/server/controllers/content-manager-user.js');

export default {
  auth: {
    ...auth,
    register: AuthCustom.register,
  },
  user,
  role,
  permissions,
  settings,
  contentmanageruser,
};
