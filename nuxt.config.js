// eslint-disable-next-line nuxt/no-cjs-in-config
// const fs = require('fs')

export default {
  server: {
    port: 5000, // default: 3000
    host: '0.0.0.0',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'deepage',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
      },

      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css',
      },
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/1bd36333df.js',
      },
      {
        src: 'vue-clipboard2-master/dist/vue-clipboard.min.js',
      },
    ],
  },

  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Firebase module configuration
  firebase: {
    // options
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'deeviral-c24fe.firebaseapp.com',
      databaseURL: 'https://deeviral-c24fe.firebaseio.com',
      projectId: 'deeviral-c24fe',
      storageBucket: 'deeviral-c24fe.appspot.com',
      messagingSenderId: '302883626344',
      appId: '1:302883626344:web:7f0b91b469a8dca6430add',
      fcmPublicVapidKey:
        'BEaAGpCuS8lq07Wl8iDVbl5iOkirfCQxLusypX3ayXqWPpfFAj-UQk03R04Z50QlZQaTqcoKIbIXkfzAe_hQkoI', // see step 7
    },
    services: {
      firestore: true,
      messaging: {
        createServiceWorker: true,
        fcmPublicVapidKey:
          'BEaAGpCuS8lq07Wl8iDVbl5iOkirfCQxLusypX3ayXqWPpfFAj-UQk03R04Z50QlZQaTqcoKIbIXkfzAe_hQkoI',
        inject: `messaging.onBackgroundMessage((payload) => {
          console.log(
            '[firebase-messaging-sw.js] Received background message ',
            payload
          )
          // Customize notification here
          const notificationTitle = 'Background Message Title'
          const notificationOptions = {
            body: 'Background Message body.',
            icon: '/firebase-logo.png',
          }
  
          self.registration.showNotification( 
            notificationTitle,
            notificationOptions
          )
        })`,
      },
    },
  },

  // generate: {
  //   dir: 'dist',
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
  },
}
