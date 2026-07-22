/**
 * activities-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::activities-page.activities-page', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::activities-page.activities-page', {
        populate: {
          BannerSection: { populate: ['image'] },
          Know_Every_Thing: { populate: ['image'] },
          Activities: { populate: ['image'] },
          Cultural_And_Leadership_Activities: {
            populate: {
              Sections: {
                populate: {
                  About: {
                    populate: ['descriptions', 'image'],
                  },
                  VisionMission: {
                    populate: ['points'],
                  },
                  OtherSections: {
                    populate: ['ListPoints'],
                  },
                  images: true,
                  Table_Section: {
                    populate: ['Rows'],
                  },
                }
              }
            }
          }
        },
      });

      const data = Array.isArray(entity) ? entity[0] : entity;

      const formatMedia = (media) =>
        media?.url || media?.formats?.thumbnail?.url || '';

      const formatDescription = (desc) => ({
        text: desc?.text || '',
      });

      const formatListPoints = (item) => ({
        text: item?.text || '',
      });

      const formatPoints = (point) => ({
        text: point?.text || '',
      });

      const formatRow = (row) => ({
        Slno: row?.Slno || '',
        name: row?.name || '',
        role: row?.role || '',
      });

      const formatVisionMission = (vm) => ({
        title: vm?.title || '',
        description: vm?.description || '',
        points: (vm?.points || []).map(formatPoints),
      });

      const formatOtherSection = (sec) => ({
        title: sec?.title || '',
        ListPoints: (sec?.ListPoints || []).map(formatListPoints),
      });

      const formatSection = (section) => ({
        TabName: section?.TabName || '',
        About: section?.About ? {
          title: section.About?.title || '',
          descriptions: (section.About?.descriptions || []).map(formatDescription),
          image: formatMedia(section.About?.image),
        } : null,
        VisionMission: (section?.VisionMission || []).map(formatVisionMission),
        OtherSections: (section?.OtherSections || []).map(formatOtherSection),
        images: (section?.images || []).map(formatMedia),
        Table_Section: section?.Table_Section ? {
          title: section.Table_Section?.title || '',
          Rows: (section.Table_Section?.Rows || []).map(formatRow),
        } : null,
      });

      const response = {
        BannerSection: {
          title: data?.BannerSection?.title || '',
          image: formatMedia(data?.BannerSection?.image),
        },
        Know_Every_Thing: {
          title: data?.Know_Every_Thing?.title || '',
          description: data?.Know_Every_Thing?.description || '',
          image: formatMedia(data?.Know_Every_Thing?.image),
        },
        Cultural_And_Leadership_Activities: {
          title: data?.Cultural_And_Leadership_Activities?.title || '',
          Sections: (data?.Cultural_And_Leadership_Activities?.Sections || []).map(formatSection),
        },
        Activities: {
          title: data?.Activities?.title || '',
          description: data?.Activities?.description || '',
          image: formatMedia(data?.Activities?.image),
        },

      };

      return { data: response };
    } catch (error) {
      console.error('Error fetching Activities Page:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },
}));
