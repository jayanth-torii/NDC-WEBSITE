/**
 * ncc controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::ncc.ncc', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::ncc.ncc', 1, {
        populate: {

          BannerSection: {
            populate: ['image']
          },

          Sections : {
            populate : {
                descriptions : true,
                Points : true,
            }
          },

          NccImage : true,

          ImagesSection : {
            populate : {
                images : true
            }
          },


          CommitteMembers: {
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

        Sections: (entry?.Sections || []).map((proc: any) => ({
          title: proc?.title || '',
          descriptions: (proc?.descriptions || []).map((desc: any) => desc?.text || ''),
          points: (proc?.Points || []).map((pt: any) => pt?.point || ''),
        })),

        NccImage : entry?.NccImage?.url || null,

        ImagesSection: {
            title: entry?.ImagesSection?.title || '',
            images: (entry?.ImagesSection?.images || []).map( img => img.url)
        },

        CommitteMembers: {
          title: entry?.CommitteMembers?.title,
          descriptions : (entry?.CommitteMembers?.descriptions || []).map((desc: any) => desc?.text || ""),
          tableSection: (entry?.CommitteMembers?.TableSection || []).map(member => ({
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
      console.error('Error fetching ncc data:', error);
      return ctx.badRequest('Error fetching ncc data', { moreDetails: error.message });
    }
  },
}));

