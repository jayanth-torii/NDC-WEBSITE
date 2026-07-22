/**
 * admission controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::admission.admission', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity: any = await strapi.entityService.findOne('api::admission.admission', 1, {
        populate: {
          BannerSection: {
            populate: {
              image: true,
            }
          },
          coursesEligibility: {
            populate: {
              tabsCourses: {
                populate: ['rowContent'],
              },
            },
          },          
          applicationProcedure: {
            populate: {
              image: true,
              procedures: true,
            },
          },
          ImportentDocuments: {
            populate: {
              tabsContent: {
                populate: ['content'],
              },
            },
          },
        },
      });

      const formattedData = {
        BannerSection: {
          title: entity?.BannerSection?.title || '',
          image : entity?.BannerSection?.image?.url || '',
        },
        coursesEligibility: {
          title: entity?.coursesEligibility?.title || '',
          tabsCourses: (entity?.coursesEligibility?.tabsCourses || []).map((tab: any) => ({
            tabTitle: tab?.tabTitle || '',
            rowContent: (tab?.rowContent || []).map((row: any) => ({
              course: row?.course || '',
              eligibility: row?.eligibility || '',
              duration: row?.duration || '',
            })),
          })),
        },
        applicationProcedure: {
          title: entity?.applicationProcedure?.title || '',
          image: entity?.applicationProcedure?.image?.url || '',
          procedures: (entity?.applicationProcedure?.procedures || []).map((item: any) => ({
            title: item.title || '',
            description: item.description || '',
          })),
        },
        ImportentDocuments: {
          title: entity?.ImportentDocuments?.title || '',
          tabs: (entity?.ImportentDocuments?.tabsContent || []).map((tab: any) => ({
            title: tab?.title || '',
            note: tab?.note || '',
            content: (tab?.content || []).map((c: any) => c?.point || ''),
          })),
        },
      };

      return { data: formattedData };
    } catch (error) {
      console.error('Error fetching admission content:', error);
      return ctx.badRequest('Failed to fetch admission data', {
        moreDetails: error.message,
      });
    }
  },
}));
