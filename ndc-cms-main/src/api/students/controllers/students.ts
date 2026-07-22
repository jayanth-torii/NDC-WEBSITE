/**
 * students controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::students.students', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::students.students', {
        populate: {
          BannerSection: { populate: { image: true } },
          MentoringCell: {
            populate: {
              GuideLines: {
                populate: {
                  points: true,
                },
              },
              table: true,
            },
          },
          RedRessalCellSection: {
            populate: {
              sections: {
                populate: {
                  list: true,
                },
              },
              ProcedureSection : {
                populate : {
                  procedurepoints : true
                }
              },
              TableSection: true,
            },
          },
          CareerAdvancementCenter: {
            populate: {
              sections: {
                populate: {
                  list: true,
                },
              },
              image: true,
              PlacementPartnersImages: true,
            },
          },
          TrainingPlacementAndInternshipCell: {
            populate: {
              sections: {
                populate: {
                  list: true,
                },
              },
              images :  true,
              facilitiesTable: true,
            },
          },
        },
      });

      const entry = Array.isArray(entity) ? entity[0] : entity;

      const formatImage = (img: any) =>
        img?.url ? `${strapi.config.get('server.url')}${img.url}` : '';

      const formatted = {
        BannerSection: {
          title: entry?.BannerSection?.title || '',
          image: formatImage(entry?.BannerSection?.image),
        },
        MentoringCell: {
          title: entry?.MentoringCell?.title || '',
          description: entry?.MentoringCell?.description || '',
          GuideLines: {
            title: entry?.MentoringCell?.GuideLines?.title || '',
            points: (entry?.MentoringCell?.GuideLines?.points || []).map((pt: any) => pt?.point || ''),
          },
          table: (entry?.MentoringCell?.table || []).map((item: any) => ({
            name: item?.name || '',
            role: item?.role || '',
          })),
        },
        RedRessalCellSection: {
          title: entry?.RedRessalCellSection?.title || '',
          description: entry?.RedRessalCellSection?.description || '',
          sections: (entry?.RedRessalCellSection?.sections || []).map((sec: any) => ({
            title: sec?.title || '',
            description: sec?.description || '',
            list: (sec?.list || []).map((li: any) => li?.point || ''),
          })),
          ProcedureSection: {
            title: entry?.RedRessalCellSection?.ProcedureSection?.title || '',
            procedurepoints : (entry?.RedRessalCellSection?.ProcedureSection?.procedurepoints  || []).map((li : any) => li?.text || ''),
          },
          TableSection: (entry?.RedRessalCellSection?.TableSection || []).map((row: any) => ({
            name: row?.name || '',
            designation: row?.designation || '',
            role: row?.role || '',
            contactNumber: row?.contactNumber || '',
            Email: row?.Email || '',
          })),
        },
        CareerAdvancementCenter: {
          title: entry?.CareerAdvancementCenter?.title || '',
          image: formatImage(entry?.CareerAdvancementCenter?.image),
          PlacementPartnersImages: (entry?.CareerAdvancementCenter?.PlacementPartnersImages || []).map(formatImage),
          sections: (entry?.CareerAdvancementCenter?.sections || []).map((sec: any) => ({
            title: sec?.title || '',
            description: sec?.description || '',
            list: (sec?.list || []).map((li: any) => li?.point || ''),
          })),
        },
        TrainingPlacementAndInternshipCell: {
          title: entry?.TrainingPlacementAndInternshipCell?.title || '',
          description: entry?.TrainingPlacementAndInternshipCell?.description || '',
          images: (entry?.TrainingPlacementAndInternshipCell?.images || []).map(formatImage),
          sections: (entry?.TrainingPlacementAndInternshipCell?.sections || []).map((sec: any) => ({
            title: sec?.title || '',
            description: sec?.description || '',
            list: (sec?.list || []).map((li: any) => li?.point || ''),
          })),
          facilitiesTable: (entry?.TrainingPlacementAndInternshipCell?.facilitiesTable || []).map((row: any) => ({
            name: row?.name || '',
            role: row?.role || '',
          })),
        },  
      };

      return { data: formatted };
    } catch (error) {
      console.error('Error fetching students data:', error);
      return ctx.badRequest('Error fetching students data', { moreDetails: error.message });
    }
  },
}));
