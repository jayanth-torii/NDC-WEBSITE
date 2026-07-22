// export default [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // ✅ Allow images and media from Strapi + your CloudFront CDN
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://cdn.nagarjunadegreecollege.co.in',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://cdn.nagarjunadegreecollege.co.in',
          ],
          upgradeInsecureRequests: null, // optional: disables auto HTTPS upgrade
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

