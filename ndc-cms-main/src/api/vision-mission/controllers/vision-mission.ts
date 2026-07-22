/**
 * vision-mission controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::vision-mission.vision-mission', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::vision-mission.vision-mission', {
        populate: {
          sections: {
            populate: {
              points: true, // must match schema
            },
          },
        },
      });

      const formatEntry = (entry: any) => ({
        key: entry?.key || '',
        title: entry?.title || '',
        sections: (entry?.sections || []).map((section: any) => ({
          title: section?.title || '',
          description: section?.description || '',
          points: (section?.points || []).map((point: any) => point?.point || ''),
        })),
      });

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, entry: any) => {
            const formatted = formatEntry(entry);
            if (formatted.key) {
              acc[formatted.key] = {
                title: formatted.title,
                sections: formatted.sections,
              };
            }
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching vision-mission data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
