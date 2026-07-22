import { factories } from '@strapi/strapi';
import { title } from 'process';

export default factories.createCoreController('api::department-page.department-page', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::department-page.department-page', {
        populate: {
          BannerSection: { populate: ['image'] },
          Programmes: { populate: ['image'] },
          International_Collaboration: {
            populate: {
              image: true,
              Details: { populate: ['descriptions'] }
            }
          },
          Professional_Courses: {
            populate: {
              TabsSection: { populate: ['points'] }
            }
          },
          Language_Department: {
            populate: {
              AboutDescription: true,
              VisionMission: {
                populate: {
                  sections: {
                    populate: ['points']
                  }
                }
              },
              AccordienSection: { populate: ['ListPoints'] }
            }
          },
          Message_From_Hods: {
            populate: {
              Hods: { populate: ['image'] }
            }
          },
          Faculty_And_Publications: {
            populate: {
              Department_Faculties: { populate: { Rows: true } },
              Books_Published: { populate: { TableRow: true } }
            }
          },
          Research_And_Awards: {
            populate: {
              Sections: { populate: ['ListPoints'] }
            }
          }
        }
      } as any);

      const data = Array.isArray(entity) ? entity[0] : entity;
      if (!data) return ctx.notFound('No Department Page content found');

      // === Helper functions ===
      const formatMedia = (media) => media?.url || '';

      const formatTextArray = (arr = []) =>
        arr
          .map((item) => item?.text?.trim?.() || '')
          .filter((str) => str.length > 0);

      const formatDetails = (items = []) =>
        items.map((detail) => ({
          title: detail?.title || '',
          descriptions: formatTextArray(detail?.descriptions)
        }));

      const formatTabsSection = (tabs = []) =>
        tabs.map((tab) => ({
          TabName: tab?.TabName || '',
          points: formatTextArray(tab?.points)
        }));

      const formatHods = (hods = []) =>
        hods.map((hod) => ({
          TabName: hod?.TabName || '',
          name: hod?.name || '',
          designation: hod?.designation || '',
          message: hod?.message || '',
          image: formatMedia(hod?.image)
        }));

      const Faculty_And_Publications = (data) => ({
        title: data?.title || '',
        Department_Faculties: {
          TabName: data?.Department_Faculties?.TabName || '',
          Rows: (data?.Department_Faculties?.Rows || []).map((row) => ({
            Slno: row?.Slno || '',
            name: row?.Name || '',
            designation: row?.Designation || '',
            department: row?.Department || '',
            experience: row?.Experience || '',
            qualification: row?.Qualification || '',
          })),
        },
        Books_Published: {
          TabName: data?.Books_Published?.TabName || '',
          TableRow: (data?.Books_Published?.TableRow || []).map((row) => ({
            Slno: row?.Slno || '',
            Name: row?.Name || '',
            Publication_House: row?.Publication_House || '',
            Book_Title: row?.Book_Title || '',
            Edition: row?.Edition || '',
            year_of_publishing: row?.year_of_publishing || '',
          })),
        },
      });

      const formatResearchSections = (sections = []) =>
        sections.map((sec) => ({
          TabName: sec?.TabName || '',
          ListPoints: formatTextArray(sec?.ListPoints)
        }));

      // === Final Response ===
      const response = {
        BannerSection: {
          title: data?.BannerSection?.title || '',
          image: formatMedia(data?.BannerSection?.image)
        },
        Programmes: {
          title: data?.Programmes?.title || '',
          description: data?.Programmes?.description || '',
          image: formatMedia(data?.Programmes?.image)
        },
        International_Collaboration: {
          title: data?.International_Collaboration?.title || '',
          image: formatMedia(data?.International_Collaboration?.image),
          Details: formatDetails(data?.International_Collaboration?.Details)
        },
        Professional_Courses: {
          title: data?.Professional_Courses?.title || '',
          TabsSection: formatTabsSection(data?.Professional_Courses?.TabsSection)
        },

        Language_Department: {
          title: data?.Language_Department?.title || '',
          
          AboutDescription: (data?.Language_Department?.AboutDescription || []).map(
            (item) => item?.point || ''
          ),
          
          VisionMission: {
            title: data?.Language_Department?.VisionMission?.title || '',
            sections: (data?.Language_Department?.VisionMission?.sections || []).map(
              (section) => ({
                title: section?.title || '',
                description: section?.description || '',
                points: (section?.points || []).map((point) => point?.point || '')
              })
            )
          },

          AccordienSection: (data?.Language_Department?.AccordienSection || []).map(
            (section) => ({
              title: section?.title || '',
              ListPoints: (section?.ListPoints || []).map((pt) => pt?.point || '')
            })
          )
        },


        Message_From_Hods: {
          title: data?.Message_From_Hods?.title || '',
          Hods: formatHods(data?.Message_From_Hods?.Hods)
        },

        Faculty_And_Publications: {
          title: data?.Faculty_And_Publications?.title || '',

          Department_Faculties: {
            TabName: data?.Faculty_And_Publications?.Department_Faculties?.TabName || '',
            columns: data?.Faculty_And_Publications?.Department_Faculties?.Columns || [],
            Rows: (data?.Faculty_And_Publications?.Department_Faculties?.Rows || []).map((row) => ({
              Slno: row?.Slno || '',
              name: row?.Name || '',
              designation: row?.Designation || '',
              department: row?.Department || '',
              experience: row?.Experience || '',
              qualification: row?.Qualification || '',
            })),
          },

          Books_Published: {
            TabName: data?.Faculty_And_Publications?.Books_Published?.TabName || '',
            columns: data?.Faculty_And_Publications?.Books_Published?.Columns || [],
            TableRow: (data?.Faculty_And_Publications?.Books_Published?.TableRow || []).map((row) => ({
              Slno: row?.Slno || '',
              Name: row?.Name || '',
              Publication_House: row?.Publication_House || '',
              Book_Title: row?.Book_Title || '',
              Edition: row?.Edition || '',
              year_of_publishing: row?.Year_Of_Publishing || '',
            })),
          },
        },

        Research_And_Awards: {
          title: data?.Research_And_Awards?.title || '',
          Sections: formatResearchSections(data?.Research_And_Awards?.Sections)
        }
      };

      return { data: response };
    } catch (error) {
      console.error('Error fetching Department Page:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  }
}));
