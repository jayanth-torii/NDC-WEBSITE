/**
 * nss-and-red-cross controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::nss-and-red-cross.nss-and-red-cross', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::nss-and-red-cross.nss-and-red-cross', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          Sections  : {
            populate : {
                descriptions : true,
                Points : true,
            }
          },

          ImagesSection : {
            populate : {
                images : true
            }
          },
 
          
        },
      });

      const formatEntry = (entry: any) => ({

        bannerSection: {
          title: entry?.BannerSection?.title,
          image: entry?.BannerSection?.image?.url || null,
        },

        Sections : (entry?.Sections  || []).map((proc: any) => ({
          title: proc?.title || '',
          descriptions: (proc?.descriptions || []).map((desc: any) => desc?.text || ''),
          points: (proc?.Points || []).map((pt: any) => pt?.point || ''),
        })),

        ImagesSection: {
            title: entry?.ImagesSection?.title || '',
            images: (entry?.ImagesSection?.images || []).map( img => img.url)
        },
        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching nss-and-red-cross data:', error);
      return ctx.badRequest('Error fetching nss-and-red-cross data', { moreDetails: error.message });
    }
  },
}));

