/**
 * activitie controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::activitie.activitie', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::activitie.activitie', {
        populate: {
          activitiesContent: {
            populate: {
              sections: {
                populate: {
                  images: true, // Correct for media field (multi-upload)
                },
              },
            },
          },
        },
      }); 

      const formatEntry = (entry: any) => {
        const key = entry?.key || '';
        const title = entry?.activitiesContent?.title || '';
        const sections = (entry?.activitiesContent?.sections || []).map((section: any) => ({
          title: section?.title || '',
          description: section?.description || '',
          images: (section?.images || []).map((img: any) => img?.url || ''), // media URLs
        }));

        return { key, title, sections };
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
      console.error('Error fetching activities:', error);
      return ctx.badRequest('Error fetching activities', { moreDetails: error.message });
    }
  },
}));
