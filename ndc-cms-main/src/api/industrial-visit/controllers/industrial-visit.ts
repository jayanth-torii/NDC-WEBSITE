/**
 * industrial-visit controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::industrial-visit.industrial-visit', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::industrial-visit.industrial-visit', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          IndustrialVisit : {
            populate : {
                descriptions : true,
                Points : true,
            }
          },
          
        },
      });

      const formatEntry = (entry: any) => ({

        bannerSection: {
          title: entry?.BannerSection?.title,
          image: entry?.BannerSection?.image?.url || null,
        },

        IndustrialVisit: (entry?.IndustrialVisit || []).map((proc: any) => ({
          title: proc?.title || '',
          descriptions: (proc?.descriptions || []).map((desc: any) => desc?.text || ''),
          points: (proc?.Points || []).map((pt: any) => pt?.point || ''),
        })),
        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching industrial-visit data:', error);
      return ctx.badRequest('Error fetching industrial-visit data', { moreDetails: error.message });
    }
  },
}));

