/**
 * about-department controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::about-department.about-department', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::about-department.about-department', {
        populate: {
          sections: {
            populate: {
              points: true,
            },
          },
          vision: true,
          mission: true,
        },
      });

      const formatEntry = (entry: any) => ({
        title: entry?.title || '',
        sections: (entry?.sections || []).map((section: any) => ({
          title: section?.title || '',
          points: (section?.points || []).map((item: any) => item?.point || ''),
        })),
        vision: (entry?.vision || []).map((item: any) => item?.text || ''),
        mission: (entry?.mission || []).map((item: any) => item?.text || ''),
      });

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, curr: any) => {
            if (curr?.key) {
              acc[curr.key] = formatEntry(curr);
            }
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching about-department data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
