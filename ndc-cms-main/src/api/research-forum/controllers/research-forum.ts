/**
 * research-forum controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::research-forum.research-forum', ({ strapi }) => ({
  async find(ctx) {
    try {
      // For single types, use findOne with 'research-forum' as id
      const entity = await strapi.entityService.findOne('api::research-forum.research-forum', 1, {
        populate: {
          BannerSection: {
            populate: {
              image: true,
            },
          },
          ResearchForum: {
            populate: {
              description: true,
              listOfPoints: true,
            },
          },
        },
      })as any;  // <-- here


      if (!entity) {
        return ctx.notFound('No research forum data found');
      }

      const formatted = {
        BannerSection: {
          title: entity.BannerSection?.title || '',
          image: entity.BannerSection?.image?.url || null,
        },
        ResearchForum: {
          title: entity.ResearchForum?.title || '',
          description: (entity.ResearchForum?.description || []).map((desc: any) => desc.point || ''),
          listOfPoints: (entity.ResearchForum?.listOfPoints || []).map((list: any) => list.point || ''),
        },
      };

      return { data: formatted };
    } catch (error) {
      console.error('Error fetching research-forum data:', error);
      return ctx.badRequest('Error fetching research-forum data', { moreDetails: error.message });
    }
  },
}));
