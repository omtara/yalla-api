import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('microsite')
      .service('myService')
      .getWelcomeMessage();
  },
  check(ctx) {
    // POST
    // auth: false, rate limit filter by IP only
    // name should match:
    // "^(?=.{8,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![_.-])$"
  },
  create(ctx) {
    // POST
    //"200: success empty body 
    // 409: already exists, body { nextStep:""social|interests|theme|subscription"" }"
    
    //only one microsite is allowed per user
    // for next step: if subscription is null then subscription, then theme==null -> theme, etc...
  },
  getByHandle(ctx) {
    // GET ctx.state.params.handle, lang

    //is-owner, return all details, else return preview only. If lang is not provided, return the default language
  },
  patchByHandle(ctx) {
    // GET ctx.state.params.handle, lang
    
    //policy: is-owner, omit: customDomain, subscriptionPlanCode,subscriptionRenewal, autorenew, canceled, cancelReason, cancelFeedback, socialEmbedThumbnail
  },
  getTranslationsForHandle(ctx) {
    // GET ctx.state.params.handle, lang
  },
  createTranslationForHandle(ctx) {
    // PUT ctx.state.params.handle, lang
  },
  deleteTranslationForHandle(ctx) {
    // DELETE ctx.state.params.handle, lang
  },


});
