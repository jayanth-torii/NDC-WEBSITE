/**
 * question-bank controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::question-bank.question-bank', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Fetch all question banks with deep nested population
      const entities = await strapi.entityService.findMany('api::question-bank.question-bank', {
        populate: {
          Year: {
            populate: {
              Semester: {
                populate: {
                  Subjects: {
                    populate: ['SubjectPdf'],
                  },
                },
              },
            },
          },
        },
      });

      // Structure the data in desired format
      const structuredData: Record<string, any> = {};

      entities.forEach((entry: any) => {
        const department = entry.Department || 'Unknown';

        if (!structuredData[department]) {
          structuredData[department] = {};
        }

        (entry.Year || []).forEach((yearEntry: any) => {
          const yearName = yearEntry.Year || 'Unknown Year';

          if (!structuredData[department][yearName]) {
            structuredData[department][yearName] = {};
          }

          (yearEntry.Semester || []).forEach((semesterEntry: any, index: number) => {
            const semesterKey = `${semesterEntry.Semester}`;
            structuredData[department][yearName][semesterKey] = [];

            (semesterEntry.Subjects || []).forEach((subject: any) => {
              structuredData[department][yearName][semesterKey].push({
                subjectName: subject.SubjectName || '',
                subjectPdf: subject.SubjectPdf?.url || '',
              });
            });
          });
        });
      });

      return { data: structuredData };
    } catch (error) {
      console.error('Error fetching question bank data:', error);
      return ctx.badRequest('Failed to fetch question bank data', {
        moreDetails: error.message,
      });
    }
  },
}));
