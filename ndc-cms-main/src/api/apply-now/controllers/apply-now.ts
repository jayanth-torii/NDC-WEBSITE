import { IicBannerSection } from './../../../../types/generated/components.d';
/**
 * apply-now controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::apply-now.apply-now', ({ strapi }) => ({
    async find(ctx) {
      try {
        const entity: any = await strapi.entityService.findOne('api::apply-now.apply-now', 1, {
          populate: {
            BannerSection: {
              populate: {
                BannerImage: true,
                image: true,
              }
            },

          },
        });
  
        const formattedData = {
          BannerSection: {
            title: entity?.BannerSection?.title || '',
            BannerImage :  entity.BannerSection.BannerImage.url,
            subTitle: entity?.BannerSection?.subTitle || '',
            image : entity?.BannerSection?.image?.url || '',
          },

        };
  
        return { data: formattedData };
      } catch (error) {
        console.error('Error fetching apply-now content:', error);
        return ctx.badRequest('Failed to fetch apply-now data', {
          moreDetails: error.message,
        });
      }
    },
  }));
  