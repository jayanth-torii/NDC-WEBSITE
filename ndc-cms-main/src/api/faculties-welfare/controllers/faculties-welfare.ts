/**
 * faculties-welfare controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::faculties-welfare.faculties-welfare', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::faculties-welfare.faculties-welfare', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          FacultiesWelfare : {
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

        FacultiesWelfare: (entry?.FacultiesWelfare || []).map((proc: any) => ({
          title: proc?.title || '',
          descriptions: (proc?.descriptions || []).map((desc: any) => desc?.text || ''),
          points: (proc?.Points || []).map((pt: any) => pt?.point || ''),
        })),


        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching faculties-welfare data:', error);
      return ctx.badRequest('Error fetching faculties-welfare data', { moreDetails: error.message });
    }
  },
}));

