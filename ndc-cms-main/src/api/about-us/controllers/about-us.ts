import { factories } from '@strapi/strapi';
import { link } from 'fs';

export default factories.createCoreController('api::about-us.about-us', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::about-us.about-us', {
        populate: {
          AboutUs: {
            populate: {
              description: true,
              image: true,
            },
          },

          VisionMission : {
            populate: {
              dropdowns : {
                populate: {
                  content: {
                    populate: {
                      items: true,
 
                    },
                  }
                },
              },
            },
          },

          PrincipalMessage: {
            populate: {
              PrincipalImage: true,
              message: true,
            },
          },
          NewsLetter : {
            populate: {
              Sections : {
                populate: {
                  pdf: true,
                },
              }
            },
          },
          OurCampuses :{
            populate: {
                campuses : {
                    populate: {
                        image: true,
                    },
                }
            },
          },
          GoverningCouncilMembers : {
            populate: {
                members : true
            },
          },
          ImportantConsiderations : {
            populate: {
              Sections : {
                populate: {
                  pdf: true,
                },
              }
            },
          },

        },

      });

      const entry = Array.isArray(entity) ? entity[0] : entity;

      const formattedData = {
        aboutUs: {
          title: entry?.AboutUs?.title || '',
          image: entry?.AboutUs?.image?.url || '',
          description: entry?.AboutUs?.description?.map((item: any) => item.points) || [],
        },
        VisionMission: {
          // title: entry?.VisionMission?.title || '',
          dropdowns: entry?.VisionMission?.dropdowns?.map((dropdown: any) => ({
            title: dropdown.title || '',
            content: dropdown.content?.map((contentItem: any) => ({
              type: contentItem.type || '', // Include the type field
              bold: contentItem.textBold || '',
              text: contentItem.text || '',
              items: contentItem.items?.map((pointItem: any) => pointItem.points) || [],
            })) || [],
          })) || [],
        },
        
        principalMessage: {
          title: entry?.PrincipalMessage?.title || '',
          principalName: entry?.PrincipalMessage?.PrincipalName || '',
          position: entry?.PrincipalMessage?.position  || '',
          image: entry?.PrincipalMessage?.PrincipalImage?.url || '',
          message: entry?.PrincipalMessage?.message?.map((item: any) => item.points) || [],
        },
        NewsLetter: {
          title: entry?.NewsLetter?.title || '',
          sections: entry?.NewsLetter?.Sections?.map((item: any) => ({
            title: item.title || '',
            pdf: item.pdf?.url || '',
          })) || [],
        },
        OurCampuses: {
          title: entry?.OurCampuses?.title || '',
          campuses: entry?.OurCampuses?.campuses?.map((item: any) => ({
            collegeName: item.collegeName || '',
            collegeDescription: item.collegeDescription || '',
            location: item.location || '',
            link: item.link || '',
            image: item.image?.url || '',
          })) || [],
        },
        GoverningCouncilMembers: {
          title: entry?.GoverningCouncilMembers?.title || '',
          members: entry?.GoverningCouncilMembers?.members?.map((item: any) => ({
            name: item.name || '',
            designation: item.designation || '',
            position: item.position || '',
          })) || [],
        },
        ImportantConsiderations: {
          title: entry?.ImportantConsiderations?.title || '',
          sections: entry?.ImportantConsiderations?.Sections?.map((item: any) => ({
            title: item.title || '',
            pdf: item.pdf?.url || '',
          })) || [],
        },
      };

      return { data: formattedData };
    } catch (error) {
      console.error('Error fetching about-us data:', error);
      return ctx.badRequest('Error fetching about-us data', { moreDetails: error.message });
    }
  },
}));
