/**
 * icc-cell controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::icc-cell.icc-cell', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::icc-cell.icc-cell', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
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

          Members: {
            populate: {
              TableSection: true,
              descriptions : true,
            }
          }
          
        },
      });

      const formatEntry = (entry: any) => ({

        bannerSection: {
          title: entry?.BannerSection?.title,
          image: entry?.BannerSection?.image?.url || null,
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

        Members: {
          title: entry?.Members?.title,
          descriptions : (entry?.Members?.descriptions || []).map((desc: any) => desc?.text || ""),
          tableSection: (entry?.Members?.TableSection || []).map(member => ({
            name: member.name,
            designation: member.designation,
            role: member.role,
            mobile: member.mobile,
            email: member.Email,
          })),
        },
        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching icc-cell data:', error);
      return ctx.badRequest('Error fetching icc-cell data', { moreDetails: error.message });
    }
  },
}));

