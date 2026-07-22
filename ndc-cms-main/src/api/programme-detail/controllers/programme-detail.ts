/**
 * programme-detail controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::programme-detail.programme-detail', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::programme-detail.programme-detail', {
        populate: {
          programmeDetails: {
            populate: {
              sections: {
                populate: {
                  points: true,
                },
              },
            },
          },
        },
      });

      const formatEntry = (entry: any) => {
        return {
          key: entry?.key || '',
          programmeDetails: (entry?.programmeDetails || []).map((detail: any) => ({
            label: detail?.label || '',
            value: detail?.value || '',
            sections: (detail?.sections || []).map((section: any) => ({
              title: section?.title || '',
              points: (section?.points || []).map((point: any) => point?.point || ''),
            })),
          })),
        };
      };

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, curr: any) => {
            const formatted = formatEntry(curr);
            acc[formatted.key] = formatted.programmeDetails;
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching programme-detail data:', error);
      return ctx.badRequest('Error fetching programme-detail data', {
        moreDetails: error.message,
      });
    }
  },
}));
