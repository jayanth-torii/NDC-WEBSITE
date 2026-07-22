/**
 * headline-banner controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::headline-banner.headline-banner', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::headline-banner.headline-banner', {
        populate: {},
      });

      if (!entity) {
        return { data: null };
      }

      const data = {
        title: entity.title || '',
        message: entity.message || '',
      };

      return { data };
    } catch (error) {
      console.error('Error fetching headline-banner data:', error);
      return ctx.badRequest('Error fetching headline-banner data', {
        moreDetails: error.message,
      });
    }
  },
}));
