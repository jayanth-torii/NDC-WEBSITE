import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::anti-ragging-cell.anti-ragging-cell', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::anti-ragging-cell.anti-ragging-cell', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          aboutSections: {
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

          PolicyAndConsiderations: {
            populate: {
              description: true,
              TabsSection: {
                populate: {
                  points: true
                }
              }
            }
          },

          AntiRaggingCommitteMembers: {
            populate: {
              TableSection: true,
              descriptions : true
            }
          }
          
        },
      });

      const formatEntry = (entry: any) => ({

        bannerSection: {
          title: entry?.BannerSection?.title,
          image: entry?.BannerSection?.image?.url || null,
        },

        aboutSections: {
            title: entry?.aboutSections?.title || '',
            AboutDescription: (entry?.aboutSections?.AboutDescription || []).map((item: any) => item?.point || ''),
            VisionMission: {
                title: entry?.aboutSections?.VisionMission?.title || '',
                sections: (entry?.aboutSections?.VisionMission?.sections || []).map((section: any) => ({
                title: section?.title || '',
                description: section?.description || '',
                points: (section?.points || []).map((pt: any) => pt?.point || ''),
                })),
            },
            AccordienSection: (entry?.aboutSections?.AccordienSection || []).map((item: any) => ({
                title: item?.title || '',
                ListPoints: (item?.ListPoints || []).map((pt: any) => pt?.point || ''),
            })),
        },


        policyAndConsiderations: {
          title: entry?.PolicyAndConsiderations?.title,
          description: (entry?.PolicyAndConsiderations?.description || []).map((each) => each.text),
          tabsSection: (entry?.PolicyAndConsiderations?.TabsSection || []).map(tab => ({
            title: tab.title,
            description: tab.description,
            points: (tab.points || []).map(p => p.point),
          })),
        },

        antiRaggingCommitteMembers: {
          title: entry?.AntiRaggingCommitteMembers?.title,
          descriptions : (entry?.AntiRaggingCommitteMembers?.descriptions || []).map((desc: any) => desc?.text || ""),
          tableSection: (entry?.AntiRaggingCommitteMembers?.TableSection || []).map(member => ({
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
      console.error('Error fetching Anti Ragging Cell data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
