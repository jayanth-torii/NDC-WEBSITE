import { Populate } from '@strapi/types/dist/modules/entity-service/params';
/**
 * library controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::library.library', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::library.library', 1, {
        populate: {
          BannerSection: {
            populate: { image: true },
          },
          aboutLibrary: {
            populate: {
              aboutText: true,
              dropdowns: {
                populate: {
                  points: true,
                },
              },
            },
          },
          digitalresources: {
            populate: {
            tabsText: true,
            resoursesTable: {
                populate: {
                  entries: true,
                },
              },
            },
          },
          EventsAndRules: {
            populate: {
              events: true,
              rulesRegulations: {
                populate: {
                  sections: true,
                },
              },
            },
          },
          ContactUs: {
            populate: { image: true },
          }
        },
      });

      const formatEntry = (entry: any) => ({
        
        BannerSection: {
          title: entry?.BannerSection?.title || '',
          image: entry?.BannerSection?.image?.url || '',
        },

        aboutLibrary: {
          title: entry?.aboutLibrary?.title || '',
          aboutText: (entry?.aboutLibrary?.aboutText).map((item: any)  => item.point),
      
          dropdowns: (entry?.aboutLibrary?.dropdowns || []).map((dropdown: any) => ({
            title: dropdown?.title || '',
            points: (dropdown?.points || []).map((point: any) => point.point),
          })),
        },

        digitalResources: {
            title: entry?.digitalresources?.title || '',
            tabs: entry?.digitalresources?.tabsText.map((item: any) => item.tab),
            resoursesTable: (entry?.digitalresources?.resoursesTable?.entries || []).reduce((acc: any, item: any) => {
              const category = item.category || 'UNCATEGORIZED';
              if (!acc[category]) acc[category] = [];
              acc[category].push({
                sn: item.sn,
                name: item.name,
                link: item.link,
              });
              return acc;
            }, {}),
        },

        EventsAndRules: {
          title: entry?.EventsAndRules?.title || '',
          events: (entry?.EventsAndRules?.events).map((event: any) => event.text),
          rulesRegulations: {
            title: entry?.EventsAndRules?.rulesRegulations?.title || '',
            sections: (entry?.EventsAndRules?.rulesRegulations?.sections || []).map((section: any) => section.point),
            },
          },

        ContactUs: {
          title: entry?.ContactUs?.title || '',
          description: entry?.ContactUs?.description ||[] ,
          image: entry?.ContactUs?.image?.url || '',
        },
      });

      const data = formatEntry(entity);
      return { data };
    } catch (error) {
      console.error('Error fetching library data:', error);
      return ctx.badRequest('Error fetching data', { moreDetails: error.message });
    }
  },
}));
