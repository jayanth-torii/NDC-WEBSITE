/**
 * department-research controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::department-research.department-research', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::department-research.department-research', {
        populate: {
          ResearchPoints: true,
        },
      });

      const formatEntry = (entry: any) => ({
        key: entry?.key || '',
        title: entry?.title || '',
        points: (entry?.ResearchPoints || []).map((item: any) => item?.point || ''),
      });

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, entry: any) => {
            const formatted = formatEntry(entry);
            acc[formatted.key] = {
              title: formatted.title,
              points: formatted.points,
            };
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching department-research data:', error);
      return ctx.badRequest('Error fetching department-research data', { moreDetails: error.message });
    }
  },
}));
