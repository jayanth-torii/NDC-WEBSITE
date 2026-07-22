/**
 * certificate-course controller
 */
import { factories } from '@strapi/strapi';

type AnyRec = Record<string, any>;

export default factories.createCoreController('api::certificate-course.certificate-course', ({ strapi }) => ({
  async find(ctx) {
    try {
      // For singleType, Strapi can return an array with a single entry.
      const entity = await strapi.entityService.findMany('api::certificate-course.certificate-course', {
        populate: {
          BannerSection: { populate: ['image'] },
          AboutVisionMissionSections: {
            populate: {
              AboutDescription: true,
              VisionMission: {
                populate: {
                  sections: {
                    populate: { points: true },
                  },
                },
              },
              AccordienSection: {
                populate: { ListPoints: true },
              },
            },
          },
          Images: {
            populate: { images: true },
          },
          CourseOutcome: {
            populate: {
              description: true,
              Table: { populate: { Row: true } },
            },
          },
        },
      });

      const entry: AnyRec | undefined = Array.isArray(entity) ? entity[0] : entity;
      if (!entry) {
        return { data: null };
      }

      const formatCertificateCourses = (e: AnyRec) => {
        // Banner
        const banner = e?.BannerSection ?? {};
        // About/Vision/Mission
        const avm = e?.AboutVisionMissionSections ?? {};
        const aboutDescriptionArr = Array.isArray(avm?.AboutDescription) ? avm.AboutDescription : [];
        const visionMission = avm?.VisionMission ?? {};
        const sectionsArr = Array.isArray(visionMission?.sections) ? visionMission.sections : [];
        const accordionsArr = Array.isArray(avm?.AccordienSection) ? avm.AccordienSection : [];

        // Images
        const imagesComp = e?.Images ?? {};
        // `images` may be an array of media or nested objects—be defensive.
        const imagesArr = Array.isArray(imagesComp?.images) ? imagesComp.images : [];
        const images = imagesArr
          .map((img: AnyRec) => img?.url ?? img?.image?.url ?? '')
          .filter((u: string) => !!u);

        // Course Outcome
        const co = e?.CourseOutcome ?? {};
        const coDescArr = Array.isArray(co?.description) ? co.description : [];
        const tableRowsArr = Array.isArray(co?.Table?.Row) ? co.Table.Row : [];

        return {
          BannerSection: {
            title: banner?.title ?? '',
            image: banner?.image?.url ?? '',
          },
          AboutVisionMissionSections: {
            title: avm?.title ?? '',
            AboutDescription: aboutDescriptionArr.map((item: AnyRec) => item?.point ?? ''),
            VisionMission: {
              title: visionMission?.title ?? '',
              sections: sectionsArr.map((section: AnyRec) => ({
                title: section?.title ?? '',
                description: section?.description ?? '',
                points: Array.isArray(section?.points)
                  ? section.points.map((pt: AnyRec) => pt?.point ?? '')
                  : [],
              })),
            },
            AccordienSection: accordionsArr.map((item: AnyRec) => ({
              title: item?.title ?? '',
              ListPoints: Array.isArray(item?.ListPoints)
                ? item.ListPoints.map((pt: AnyRec) => pt?.point ?? '')
                : [],
            })),
          },
          Images: {
            title: imagesComp?.title ?? '',
            images,
          },
          CourseOutcome: {
            title: co?.title ?? '',
            description: coDescArr.map((d: AnyRec) => d?.text ?? d?.point ?? (typeof d === 'string' ? d : '')),
            Table: {
              Rows: tableRowsArr.map((row: AnyRec) => ({
                slNo: row?.Slno ?? null,
                name: row?.Name ?? '',
                designation: row?.Designation ?? '',
                role: row?.Role ?? '',
              })),
            },
          },
        };
      };

      const data = formatCertificateCourses(entry);
      return { data };
    } catch (error: any) {
      strapi.log.error('Error fetching Certificate Courses data:', error);
      return ctx.badRequest('Error fetching Certificate Courses data', { moreDetails: error?.message });
    }
  },
}));
