// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      link:[{
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap',
        rel: 'stylesheet'
      }]
    }
  },
  css: [
    '@/assets/styles/main.scss'
  ],
  plugins: [
    // Other plugins...
    { src: "./plugins/strophe-config.ts", mode: "client" },
  ],
});
