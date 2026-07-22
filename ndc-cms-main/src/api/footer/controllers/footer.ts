/**
 * footer controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::footer.footer", ({ strapi }) => ({
  
  async find(ctx) {
    try {
      // Fetch the Footer Data with deep population
      const footer = await strapi.entityService.findMany("api::footer.footer", {
        populate: {
          contactInfo: {
            populate: {
              logo: true, 
            },
          },
          importantLinks: {
            populate: {
                  pdf: {
                    fields: ["url"], // Fetch only the URL field from media
                  },
            },
          },
          acadamics: {
            populate: {
                  pdf: {
                    fields: ["url"], // Fetch only the URL field from media
                  },
            },
          },
          reports_and_publications: {
            populate: {
                pdf: {
                    fields: ["url"],
                },
            },
           
          },
 
          policies: {
            populate: {
                pdf: {
                fields: ["url"], // Fetch only the URL field from media
                },
            },
          },
          follow: true
        },
      })as any;

      // Ensure TypeScript recognizes the structure of `footer`
      if (!footer || typeof footer !== "object") {
        return ctx.throw(404, "Footer not found");
      }

      // Function to transform `pdf_link` to only its URL
      const transformLinks = (links: any[]) =>
        links.map((item) => ({
          ...item,
          pdf_link: item.pdf ? item.pdf.url : null, // Extract URL from pdf_link
        }));

      // Transform response to flatten `importantLinks`, `acadamics`, etc.
      const transformedFooter = {
        ...footer,
        contactInfo: {
          ...footer.contactInfo,
          logo: footer?.contactInfo?.logo?.url || null,
        },
        importantLinks: transformLinks(footer?.importantLinks || []), // Flatten and transform
        acadamics: transformLinks(footer?.acadamics || []), // Flatten and transform
        reports_and_publications: transformLinks(footer?.reports_and_publications || []), // Flatten and transform
        
        policies: transformLinks(footer?.policies || []), // Flatten and transform
        follow: footer?.follow || [], // Flatten only
      };

      return { data: transformedFooter };
    } catch (error) {
      ctx.throw(500, "Error fetching footer data");
    }
  }
}));