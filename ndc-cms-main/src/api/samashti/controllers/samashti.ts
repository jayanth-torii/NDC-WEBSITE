/**
 * samashti controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::samashti.samashti', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::samashti.samashti', {
        populate: {
          BannerSection: {
            populate: { image: true },
          },
          About: {
            populate : {
              descriptions : true,
            }
          },
          Editions: {
            populate: {
              Editions: {
                populate: { pdf: true, image: true },
              },
            },
          },
        },
      });

      // Support both array or single object return
      const formatEntry = (entry: any) => ({
        BannerSection: {
          title: entry?.BannerSection?.title || '',
          image: entry?.BannerSection?.image?.url || '',
        },
        About: {
          title: entry?.About?.title || '',
          description: (entry?.About?.descriptions || []).map((item : any) => item.point),
        },
        Editions: {
          title: entry?.Editions?.title || '',
          description: entry?.Editions?.discription || '',
          buttons: entry?.Editions?.Buttons || [],
          Editions: (entry?.Editions?.Editions || []).map((edition: any) => ({
            title: edition?.title || '',
            date: edition?.date || '',
            pdfUrl: edition?.pdf?.url || '',
            imageUrl: edition?.image?.url || '',
          })),
        },
      });

      const data = Array.isArray(entities)
        ? entities.map(formatEntry)
        : [formatEntry(entities)];

      return { data };
    } catch (error) {
      console.error('Error fetching data from samashti:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
