/**
 * department-faculty-members controller
 */

import { factories } from '@strapi/strapi';
import { Context } from 'koa';

export default factories.createCoreController(
  'api::department-faculty-members.department-faculty-members',
  ({ strapi }) => ({
    async find(ctx: Context) {
      try {
        const results = await strapi.entityService.findMany(
          'api::department-faculty-members.department-faculty-members',
          {
            populate: {
              DepartmentFacultyMembers: {
                populate: {
                  image: true,
                  About: true,
                  listOfPublications: {
                    populate: ['content'],
                  },
                  details: true,
                },
              },
            },
          }
        );

        // Transform into structure: { key: { title, description, members: [] } }
        const transformedData: Record<
          string,
          { title: string; description: string; members: any[] }
        > = {};

        results.forEach((entry: any) => {
          const key = entry.key;
          if (!key || !Array.isArray(entry.DepartmentFacultyMembers)) return;

          // Initialize structure per key
          if (!transformedData[key]) {
            transformedData[key] = {
              title: entry.title || '',
              description: entry.description || '',
              members: [],
            };
          }

          // Map each faculty member
          const members = entry.DepartmentFacultyMembers.map((member: any) => ({
            id: member.id,
            name: member.name || '',
            designation: member.designation || '',
            qualification: member.qualification || '',
            image: member.image?.url || '',
            about: (member.About || []).map((a: any) => a?.point || ''),
            listOfPublications: member.listOfPublications
              ? {
                  title: member.listOfPublications.title || '',
                  content: Array.isArray(member.listOfPublications.content)
                    ? member.listOfPublications.content.map(
                        (row: any) => row?.point || ''
                      )
                    : [],
                }
              : { title: '', content: [] },
            details: (member.details || []).map((detail: any) => ({
              title: detail.title || '',
              content: detail.content || '',
            })),
          }));

          transformedData[key].members.push(...members);
        });

        return { data: transformedData };
      } catch (error) {
        console.error('Error fetching department-faculty-members:', error);
        ctx.throw(500, 'Internal Server Error');
      }
    },

    async update(ctx: Context) {
      try {
        const { id } = ctx.params;

        // Prevent key from being updated
        if (ctx.request.body?.key) {
          delete ctx.request.body.key;
        }

        return await (super.update as any).call(this, ctx);
      } catch (error) {
        console.error('Error updating department-faculty-members:', error);
        ctx.throw(500, 'Internal Server Error');
      }
    },
  })
);
