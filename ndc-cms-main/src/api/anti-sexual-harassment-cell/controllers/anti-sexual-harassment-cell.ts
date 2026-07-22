/**
 * anti-sexual-harassment-cell controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::anti-sexual-harassment-cell.anti-sexual-harassment-cell', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::anti-sexual-harassment-cell.anti-sexual-harassment-cell', 1, {
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


          Definitions : {
            populate : {
                descriptions : true,
                Points : true,
            }
          },
 
          
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

        Definitions: (entry?.Definitions || []).map((proc: any) => ({
          title: proc?.title || '',
          descriptions: (proc?.descriptions || []).map((desc: any) => desc?.text || ''),
          points: (proc?.Points || []).map((pt: any) => pt?.point || ''),
        })),


 
        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching anti-sexual-harassment-cell data:', error);
      return ctx.badRequest('Error fetching anti-sexual-harassment-cell data', { moreDetails: error.message });
    }
  },
}));

