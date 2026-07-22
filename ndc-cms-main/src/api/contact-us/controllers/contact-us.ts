/**
 * contact-us controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-us.contact-us', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entry = await strapi.db.query('api::contact-us.contact-us').findOne({
        populate: {
          BannerSection: { populate: { image: true } },
          contactDeatils: {
            populate: {
              image: true,
              details: { populate: { points: true } },
            },
          },
          LoginPortals: { populate: { image: true } },
          MAP: { populate: { BannerMap: true, AdderssMAP: true } },
        },
      });

      const data = {
        BannerSection: {
          title: entry?.BannerSection?.title || '',
          image: entry?.BannerSection?.image?.url || '',
        },
        contactDetails: {
          image: entry?.contactDeatils?.image?.url || '',
          details: (entry?.contactDeatils?.details || []).map((item: any) => ({
            title: item?.title || '',
            points: (item?.points || []).map((p: any) => p?.point || ''),
          })),
        },
        LoginPortals: (entry?.LoginPortals || []).map((portal: any) => ({
          title: portal?.title || '',
          url: portal?.link || '',
          image: portal?.image?.url || '',
        })),
        MAP: {
          BannerMap: entry?.MAP?.BannerMap?.url || '',
          AdderssMAP: entry?.MAP?.AdderssMAP?.url || '',
          MapLink: entry?.MAP?.MapLink || '',
        },
      };

      return { data };
    } catch (error) {
      console.error('Error fetching contact-us data:', error);
      return ctx.badRequest('Error fetching contact-us data', { moreDetails: error.message });
    }
  },
}));
