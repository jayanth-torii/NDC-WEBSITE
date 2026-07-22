/**
 * objective controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::objective.objective', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::objective.objective', {
        populate: {
          Objectives: true, // populate component
        },
      });

      const formatEntry = (entry: any) => ({
        key: entry?.key || '',
        title: entry?.title || '',
        points: (entry?.Objectives || []).map((item: any) => item?.point || ''),
      });

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, entry: any) => {
            const formatted = formatEntry(entry);
            if (formatted.key) {
              acc[formatted.key] = {
                title: formatted.title,
                points: formatted.points,
              };
            }
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching objectives:', error);
      return ctx.badRequest('Error fetching objectives', { moreDetails: error.message });
    }
  },
}));
