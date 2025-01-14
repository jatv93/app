module.exports = {
  pages: {
    // Enable translations for the following pages
    '*': ['common', 'navbar', 'footer'],
    '/': ['home'],
    '/example': ['counter'],
    '/cohort/[cohortSlug]/[slug]/[version]': ['dashboard'],
    '/interactive-exercises': ['exercises'],
    '/projects': ['projects'],
    '/read/[slug]': ['read'],
    '/interactive-coding-tutorial/[difficulty]/[slug]': ['projects'],
    '/interactive-exercises/[slug]': ['exercises'],
    '/choose-program': ['choose-program'],
  },
  locales: ['default', 'en', 'es'],
  // defaultLocale: 'en', // removed for redirects handling purposes
  defaultLocale: 'default',
  localeDetection: true, // run and detects in home page = '/'
  // return a Promise with the JSON file.
  loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
};
