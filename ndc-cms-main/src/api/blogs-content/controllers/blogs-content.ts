/**
 * blogs-content controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blogs-content.blogs-content', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Fetch the singleType content with nested population
      const entity = await strapi.entityService.findMany('api::blogs-content.blogs-content', {
        populate: {
          Blogs: {
            populate: {
              blogImage: true,
              content: true,
            },
          },
        },
      });

      const item = Array.isArray(entity) ? entity[0] : entity;

      if (!item || !item.Blogs) {
        return { data: { blogs: [] } };
      }

      const blogs = item.Blogs.map((blog: any) => ({
        id: blog.BlogID ?? null,
        title: blog.title ?? '',
        description: blog.description ?? '',
        blogImage: blog.blogImage?.url
          ? `${strapi.config.get('server.url')}${blog.blogImage.url}`
          : '',
        content: Array.isArray(blog.content)
          ? blog.content.map((c: any) =>  c.point ?? '') 
          : [],
      }));

      return { data: { blogs } };
    } catch (error) {
      console.error('Error fetching blogs content:', error);
      return ctx.badRequest('Error fetching blogs content', { moreDetails: error.message });
    }
  },
}));
