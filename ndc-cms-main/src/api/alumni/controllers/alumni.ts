/**
 * alumni controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::alumni.alumni', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::alumni.alumni', 1, {
        populate: {
          BannerSection: {
            populate: {
              image: true,
            },
          },
          VisionMission: {
            populate: {
              Sections: {
                populate: {
                  Description: true,
                },
              },
            },
          },
          AlumniAssciation: true,
        },
      }) as any;

      if (!entity) {
        return ctx.notFound('No alumni data found');
      }

      const formatted = {
        BannerSection: {
          title: entity.BannerSection?.title || '',
          image: entity.BannerSection?.image?.url || '',
        },
        VisionMission: {
          title: entity.VisionMission?.title || '',
          Sections: (entity.VisionMission?.Sections || []).map((section: any) => ({
            title: section.title || '',
            Description: (section.Description || []).map((desc: any) => desc.description || ''),
          })),
        },
        AlumniAssciation: {
          title: entity.AlumniAssciation?.title || '',
          description: entity.AlumniAssciation?.description || '',
        },
      };

      return { data: formatted };
    } catch (error) {
      console.error('Error fetching alumni data:', error);
      return ctx.badRequest('Error fetching alumni data', { moreDetails: error.message });
    }
  },
}));
