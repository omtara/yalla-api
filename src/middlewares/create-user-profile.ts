/**
 * `create-user-profile` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    await next();
    strapi.log.info(`In create-user-profile middleware. ${JSON.stringify(ctx.params)}`);
  };
};
