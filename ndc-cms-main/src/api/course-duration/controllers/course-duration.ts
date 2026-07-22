/**
 * course-duration controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course-duration.course-duration', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::course-duration.course-duration', {
        populate: {
          sections: {
            populate: {
              points: true,
            },
          },
        },
      });

      const formatEntry = (entry: any) => {
        const key = entry?.key || '';
        const title = entry?.title || '';
        const sections = (entry?.sections || []).map((section: any) => ({
          title: section?.title || '',
          description: section?.description || '',
          points: (section?.points || []).map((point: any) => point?.point || ''),
        }));

        return {
          key,
          title,
          sections,
        };
      };

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
      console.error('Error fetching Course Duration data:', error);
      return ctx.badRequest('Error fetching Course Duration data', { moreDetails: error.message });
    }
  },
}));
