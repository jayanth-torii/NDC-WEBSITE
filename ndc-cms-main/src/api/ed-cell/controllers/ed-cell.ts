/**
 * ed-cell controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::ed-cell.ed-cell', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::ed-cell.ed-cell', 1, {
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

          ImagesSection : {
            populate : {
                images : true
            }
          },

          Coordinators: {
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

        ImagesSection: {
            title: entry?.ImagesSection?.title || '',
            images: (entry?.ImagesSection?.images || []).map( img => img.url)
        },

        Coordinators: {
          title: entry?.Coordinators?.title,
          descriptions : (entry?.Coordinators?.descriptions || []).map((desc: any) => desc?.text || ""),
          tableSection: (entry?.Coordinators?.TableSection || []).map(member => ({
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
      console.error('Error fetching ed-cell data:', error);
      return ctx.badRequest('Error fetching ed-cell data', { moreDetails: error.message });
    }
  },
}));

