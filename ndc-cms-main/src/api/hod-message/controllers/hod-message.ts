/**
 * hod-message controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::hod-message.hod-message', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::hod-message.hod-message', {
        populate: {
          image: true,
        },
      });

      const formatEntry = (entry: any) => ({
        key: entry?.key || '',
        name: entry?.name || '',
        designation: entry?.designation || '',
        hodMessage: entry?.hodMesssage || '',
        image: entry?.image?.url || '',
      });

      const data = Array.isArray(entities)
        ? entities.reduce((acc: Record<string, any>, curr: any) => {
            const formatted = formatEntry(curr);
            acc[formatted.key] = {
              hodImage: formatted.image,
              hodName: formatted.name,
              hodDesignation: formatted.designation,
              hodMessage: formatted.hodMessage,
            };
            return acc;
          }, {})
        : {};

      return { data };
    } catch (error) {
      console.error('Error fetching HOD MESSAGE content:', error);
      return ctx.badRequest('Failed to fetch HOD MESSAGE data', {
        moreDetails: error.message,
      });
    }
  },
}));
