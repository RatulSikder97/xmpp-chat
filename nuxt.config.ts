// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    // Other plugins...
    { src: "./plugins/strophe-config.ts", mode: "client" },
  ],
});
