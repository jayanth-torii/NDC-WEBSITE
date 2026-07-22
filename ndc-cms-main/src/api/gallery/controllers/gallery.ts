/**
 * gallery controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery.gallery', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entry = await strapi.db.query('api::gallery.gallery').findOne({
        populate: {
          BannerSection: {
            populate: {
              image: true,
            },
          },
          imagesSection: {
            populate: {
              tabImages: {
                populate: {
                  images: true,
                },
              },
            },
          },
        },
      });

            // Transform tabImages array to object keyed by tabName
      const tabImagesByKey = {};
      for (const tab of entry?.imagesSection?.tabImages || []) {
        const tabName = tab?.tabName || 'Untitled';
        tabImagesByKey[tabName] = (tab?.images || []).map((img: any) => img?.url || '');
      }

      const data = {
        BannerSection: {
          title: entry?.BannerSection?.title || '',
          description: entry?.BannerSection?.description || '',
          image: entry?.BannerSection?.image?.url || '',
        },
        imagesSection: {
          tabImages: tabImagesByKey,
        },
      };

      return { data };
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      return ctx.badRequest('Error fetching gallery data', { moreDetails: error.message });
    }
  },
}));
