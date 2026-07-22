/**
 * iqac controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::iqac.iqac', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::iqac.iqac', {
        populate: {
          BannerSection: {
            populate: ['image'],
          },
          AboutVisionMissionSections: {
            populate: {
              AboutDescription: true,
              VisionMission: {
                populate: {
                  sections: {
                    populate: {
                      points: true,
                    },
                  },
                },
              },
              AccordienSection: {
                populate: {
                  ListPoints: true,
                },
              },
            },
          },
          CompositionOfIQACCell: {
            populate: {
              tableSection: true,
            },
          },
        },
      });

      const formatIQAC = (entry: any) => ({
        BannerSection: {
          title: entry?.BannerSection?.title || '',
          description: entry?.BannerSection?.description || '',
          image: entry?.BannerSection?.image?.url || '',
        },
        AboutVisionMissionSections: {
          title: entry?.AboutVisionMissionSections?.title || '',
          AboutDescription: (entry?.AboutVisionMissionSections?.AboutDescription || []).map((item: any) => item?.point || ''),
          VisionMission: {
            title: entry?.AboutVisionMissionSections?.VisionMission?.title || '',
            sections: (entry?.AboutVisionMissionSections?.VisionMission?.sections || []).map((section: any) => ({
              title: section?.title || '',
              description: section?.description || '',
              points: (section?.points || []).map((pt: any) => pt?.point || ''),
            })),
          },
          AccordienSection: (entry?.AboutVisionMissionSections?.AccordienSection || []).map((item: any) => ({
            title: item?.title || '',
            ListPoints: (item?.ListPoints || []).map((pt: any) => pt?.point || ''),
          })),
        },
        CompositionOfIQACCell: {
          title: entry?.CompositionOfIQACCell?.title || '',
          tableSection: (entry?.CompositionOfIQACCell?.tableSection || []).map((row: any) => ({
            name: row?.name || '',
            designation: row?.designation || '',
            contact: row?.contact || '',
            role: row?.role || '',
          })),
        },
      });

      const data = Array.isArray(entity) ? formatIQAC(entity[0]) : formatIQAC(entity);

      return { data };
    } catch (error) {
      console.error('Error fetching IQAC data:', error);
      return ctx.badRequest('Error fetching IQAC data', { moreDetails: error.message });
    }
  },
}));
