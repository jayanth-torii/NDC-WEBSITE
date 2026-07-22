/**
 * research controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::research.research', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::research.research', {
        populate: {
          BannerSection: {
            populate: { image: true },
          },
          ResearchPublications: {
            populate: {
              sections: {
                populate: { points: true },
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
        ResearchPublications: {
          title: entry?.ResearchPublications?.title || '',
          sections: (entry?.ResearchPublications?.sections || []).map((section: any) => ({
            title: section?.title || '',
            points: (section?.points || []).map((point: any) => point.text),
          })),
        },
      });
      const data = Array.isArray(entities)
        ? entities.map(formatEntry)
        : [formatEntry(entities)];

      return { data };
    } catch (error) {
      console.error('Error fetching research data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
