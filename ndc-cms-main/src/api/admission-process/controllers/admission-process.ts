/**
 * admission-process controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::admission-process.admission-process', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::admission-process.admission-process', {
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
        const section = entry?.sections;

        const formattedSection = section
          ? {
              title: section?.title || '',
              description: section?.description || '',
              points: (section?.points || []).map((point: any) => point?.point || ''),
            }
          : null;

        return {
          key,
          title,
          sections: formattedSection ? [formattedSection] : [],
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
      console.error('Error fetching admission-process data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
