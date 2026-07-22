/**
 * syllabus-detail controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::syllabus-detail.syllabus-detail', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::syllabus-detail.syllabus-detail', {
        populate: {
          SyllabusSection: {
            populate: {
              rows: true,  
            },
          },
        },
      });

      const formatEntry = (entry: any) => {
        const key = entry?.key || '';
        const title = entry?.title || '';
        const SyllabusSection = (entry?.SyllabusSection || []).map((section: any) => ({
          tabName: section?.tabName || '',
          rows: (section?.rows || []).map((row: any) => ({
            name: row?.name || '',
            courses: row?.courses || '',
          })),
        }));

        return { key, title, SyllabusSection };
      };

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, entry: any) => {
            const formatted = formatEntry(entry);
            if (formatted.key) {
              acc[formatted.key] = {
                title: formatted.title,
                SyllabusSection: formatted.SyllabusSection,
              };
            }
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching Syllabus Details:', error);
      return ctx.badRequest('Error fetching Syllabus Details', { moreDetails: error.message });
    }
  },
}));
