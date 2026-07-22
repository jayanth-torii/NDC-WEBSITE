import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::sports.sports', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::sports.sports', 1, {
        populate: {
          BannerSection: { populate: ['image'] },
          aboutSections: {
            populate: {
              sections: {
                populate: ['points'],
              },
            },
          },
          HodMessage: {
            populate: ['image', 'message'],
          },
          gallerySection: {
            populate: ['images'],
          },
        },
      });

      const sportData = entity as any; // <-- tell TS to trust you

      const data = {
        BannerSection: {
          title: sportData?.BannerSection?.title || '',
          image: sportData?.BannerSection?.image?.url || '',
        },
        aboutSections: {
          title: sportData?.aboutSections?.title || '',
          sections: (sportData?.aboutSections?.sections || []).map((section: any) => ({
            title: section?.title || '',
            description: section?.description || '',
            points: (section?.points || []).map((point: any) => point?.point || ''),
          })),
        },
        HodMessage: {
          title: sportData?.HodMessage?.title || '',
          name: sportData?.HodMessage?.name || '',
          position: sportData?.HodMessage?.position || '',
          image: sportData?.HodMessage?.image?.url || '',
          message: (sportData?.HodMessage?.message || []).map((m: any) => m?.point || ''),
        },
        gallerySection: {
          title: sportData?.gallerySection?.title || '',
          images: (sportData?.gallerySection?.images || []).map((img: any) => img?.url || ''),
        },
      };

      return { data };
    } catch (error) {
      console.error('Error fetching sports data:', error);
      return ctx.badRequest('Error fetching sports data', { moreDetails: error.message });
    }
  },
}));
