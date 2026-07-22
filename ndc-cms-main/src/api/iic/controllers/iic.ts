import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::iic.iic', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Cast the entity to any to avoid TS errors on dynamic populated fields
      const entity = await strapi.entityService.findOne('api::iic.iic', 1, {
        populate: {
          BannerSection: {
            populate: ['image'],
          },
          IICMembers: {
            populate: {
              MembersTable: true,
            },
          },
        },
      }) as any;  // <-- here

      if (!entity) {
        return { data: null };
      }

      const data = {
        BannerSection: {
          title: entity.BannerSection?.title || '',
          image: entity.BannerSection?.image?.url || '',
        },
        IICMembers: {
          title: entity.IICMembers?.title || '',
          MembersTable: (entity.IICMembers?.MembersTable || []).map((member: any) => ({
            name: member.name || '',
            designation: member.designation || '',
            role: member.role || '',
            contact: member.contact || '',
          })),
        },
      };

      return { data };
    } catch (error) {
      console.error('Error fetching IIC data:', error);
      return ctx.badRequest('Error fetching IIC data', { moreDetails: error.message });
    }
  },
}));
