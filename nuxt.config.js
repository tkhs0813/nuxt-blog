export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'empitsu.log()',
    htmlAttrs: { lang: 'ja' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'empitsuの個人サイト',
      },
      { property: 'og:locale', hid: 'og:locale', content: 'ja_JP' },
      { property: 'og:type', hid: 'og:type', content: 'blog' },
      { property: 'og:title', hid: 'og:title', content: 'empitsu.log()' },
      {
        property: 'og:description',
        hid: 'og:description',
        content: 'empitsuの個人サイト',
      },
      {
        property: 'og:site_name',
        hid: 'og:site_name',
        content: 'empitsu.log()',
      },
      {
        name: 'twitter:card',
        hid: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'og:url',
        hid: 'og:url',
        content: 'https://empitsu.dev/',
      },
      // TODO: 画像作る
      // {
      //   property: 'og:image',
      //   hid: 'og:image',
      //   content: '',
      // },
      {
        name: 'twitter:description',
        hid: 'twitter:description',
        content: 'empitsuの個人サイト',
      },
      {
        name: 'twitter:title',
        hid: 'twitter:title',
        content: 'empitsu.log()',
      },
      // TODO: 画像作る
      // {
      //   name: 'twitter:image',
      //   hid: 'twitter:image',
      //   content: '',
      // },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    ['@nuxtjs/google-analytics', { id: 'G-Y9SG6B3S7L' }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/content', 'nuxt-fontawesome'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  fontawesome: {
    component: 'fa',
  },
}
