/**
 * sc-st-obc-minority-cell controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::sc-st-obc-minority-cell.sc-st-obc-minority-cell', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::sc-st-obc-minority-cell.sc-st-obc-minority-cell', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          SCSTCommitteeMembers: {
            populate: {
              TableSection: true,
              descriptions : true,
            }
          }
          
        },
      });

      const formatEntry = (entry: any) => ({

        bannerSection: {
          title: entry?.BannerSection?.title,
          image: entry?.BannerSection?.image?.url || null,
        },
 
        SCSTCommitteeMembers: {
          title: entry?.SCSTCommitteeMembers?.title,
          descriptions : (entry?.SCSTCommitteeMembers?.descriptions || []).map((desc: any) => desc?.text || ""),
          tableSection: (entry?.SCSTCommitteeMembers?.TableSection || []).map(member => ({
            name: member.name,
            designation: member.designation,
            role: member.role,
            mobile: member.mobile,
            email: member.Email,
          })),
        },
        
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching sc-st-obc-minority-cell data:', error);
      return ctx.badRequest('Error fetching sc-st-obc-minority-cell data', { moreDetails: error.message });
    }
  },
}));

