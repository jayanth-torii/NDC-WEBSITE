/**
 * homepage controller
 */
import { factories } from '@strapi/strapi';
import { Populate } from '@strapi/types/dist/modules/entity-service/params';
import { title } from 'process';

export default factories.createCoreController('api::home.home', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::home.home', {
        populate: {
          Home : {
            populate : {
              bannerSection: {
                populate: {
                    slides: {
                      populate: ['bgImage'],
                    },
                  },     
              },

              Records : {
                populate: ['backgroundImage', 'icon'],
              },

              AboutNdcSection: {
                  populate: ['image'],
              },
              Yrs25Section: {
                populate: ['image'],
              },

              ExploreCertificateCourses: {
                populate: ['image'],
              },

              CampusLife:{
                populate : {
                  Videos :  true
                }
              },

              EducationExcellence: {
                populate: ['ProgrammesButtons', "image"],
              },

              NotificationsData: {
                populate: {
                  NotificationTabs: {
                    populate: {
                      Data: {
                        populate: ['pdf']
                      }
                    }
                  }
                }
              }

              // Blogs: true,
              //   Notifications: true,
            }
          }

        }as any, // ✅ Add this line to fix TS error
      });

      const formatEntry = (entry: any) => {
        const home = entry?.Home || {};

        return {
          bannerSection: {
            location: home?.bannerSection?.location || '',
            slides: (home?.bannerSection?.slides || []).map((slide: any) => ({
              image: slide?.bgImage?.url || '',
              title: slide?.heading || '',
              description: slide?.description || '',
            })),
          },

          Records: (home?.Records || []).map((item: any) => ({
            title: item?.title || '',
            count: item?.count || '',
            backgroundImage: item?.backgroundImage?.url || "",
            icon: item?.icon?.url || "",
          })),

          
          AboutNdcSection: {
            title: home?.AboutNdcSection?.title || '',
            subTitle: home?.AboutNdcSection?.subTitle || '',
            description: Array.isArray(home?.AboutNdcSection?.description)
              ? home.AboutNdcSection.description
              : typeof home.AboutNdcSection.description === 'string'
                ? [home.AboutNdcSection.description]
                : [],
            buttonText: home?.AboutNdcSection?.buttonText || '',
            image: home?.AboutNdcSection?.image?.url || '',
            link: home?.AboutNdcSection?.url || "",
          },

          Yrs25Section: {
              title: home?.Yrs25Section?.title || '',
              description: home?.Yrs25Section?.description || '',
              image:  home?.Yrs25Section?.image?.url || '',
          },
  
          ExploreCertificateCourses: {
              image: home?.ExploreCertificateCourses?.image?.url || '',
              title: home?.ExploreCertificateCourses?.title || '',
              link: home?.ExploreCertificateCourses?.link || '',
          },

          CampusLife: {
            title: home?.CampusLife?.title || '',
            videos: (home?.CampusLife.Videos || []).map(item => item.video_id || "")
          },

          EducationExcellence: {
              title: home?.EducationExcellence?.title || '',
              subTitle: home?.EducationExcellence?.subTitle || '',
              description: home?.EducationExcellence?.description || '',
              buttons: (home?.EducationExcellence?.ProgrammesButtons || []).map((button: any) => ({
                title: button?.title || '',
                url: button?.url || '',
              })),
              image: home?.EducationExcellence?.image?.url || "",
          },

          NotificationsData: {
            title: home?.NotificationsData?.title || '',
            NotificationTabs: (home?.NotificationsData?.NotificationTabs || []).map((eachObj: any) => ({
              tabName: eachObj.TabName || '',
              Data: (eachObj.Data || []).map((each: any) => ({
                title: each.title || '',
                pdf: each.pdf?.url || '',
                link: each.link || ''
              }))
            }))
          }

      }};

      const data = Array.isArray(entities)
        ? entities.map(formatEntry)
        : [formatEntry(entities)];

      return { data };
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));

