/**
 * ms-user-site controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::ms-user-site.ms-user-site', ({ strapi }) =>  ({
    async hello(ctx) {
        try {
            ctx.body = 'Merhaba';
          } catch (err) {
            ctx.body = err;
          }
    }
}));