/**
 * eco-cell controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::eco-cell.eco-cell', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::eco-cell.eco-cell', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          Sections : {
            populate :  {
                descriptions : true
            }
          }

        },
      });

      const formatEntry = (entry: any) => ({

        bannerSection: {
          title: entry?.BannerSection?.title,
          image: entry?.BannerSection?.image?.url || null,
        },

        Sections: (entry.Sections || []).map((section: any) => ({
        title: section?.title || '',
        descriptions: (section?.descriptions || []).map((desc: any) => desc?.text || ''),
        }))
        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching eco-cell data:', error);
      return ctx.badRequest('Error fetching eco-cell data', { moreDetails: error.message });
    }
  },
}));

