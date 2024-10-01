// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', 'nuxt-vuefire', "@nuxt/icon"],

  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: "AIzaSyAM6iDbWpqKhVsRKkqzL-JD5PteIf4IfyA",
      authDomain: "vconnect-39a24.firebaseapp.com",
      databaseURL: "https://vconnect-39a24-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "vconnect-39a24",
      storageBucket: "vconnect-39a24.appspot.com",
      messagingSenderId: "18530802096",
      appId: "1:18530802096:web:2b4b4a0809f5ba85bc5e75"
    },
  },
})