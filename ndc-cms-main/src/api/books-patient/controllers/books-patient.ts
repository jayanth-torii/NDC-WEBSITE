import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::books-patient.books-patient', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        Books: {
          populate: {
            BooksTable: true,
          },
        },
        Patient_Right: {
          populate: {
            Patient_Rights_Table: true,
          },
        },
      },
    };

    const results = await strapi.entityService.findMany('api::books-patient.books-patient', ctx.query);

    const systemFields = ['id', 'createdAt', 'updatedAt', 'publishedAt'];

    const cleanObject = (obj) => {
      if (!obj) return null;

      if (Array.isArray(obj)) {
        return obj.map(cleanObject);
      }

      if (typeof obj === 'object' && obj.url) {
        return obj.url;
      }

      if (typeof obj === 'object') {
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
          if (systemFields.includes(key)) continue;

          if (Array.isArray(value) && value.length && value[0]?.text) {
            cleaned[key] = value.map(item => item?.text || '');
          } else {
            cleaned[key] = cleanObject(value);
          }
        }
        return cleaned;
      }

      return obj;
    };

    const transformedData = {};

    results.forEach((entry) => {
      const key = entry.key; // Change this if your key field is named differently
      if (!key) return;

      const cleanedEntry = cleanObject(entry);

      transformedData[key] = {
        title: entry.title || '',
        Books: cleanedEntry.Books || {},
        Patient_Right: cleanedEntry.Patient_Right || {},
      };
    });

    return { data: transformedData };
  },
}));
