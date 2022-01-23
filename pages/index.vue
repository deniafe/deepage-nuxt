<template>
  <div>
    <LeadPage />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  // async fetch(context) {
  //   const { store, route, req, app, $fire } = context
  //   const { commit, dispatch } = store

  //   const url = req.headers.host

  //   console.log('This is the route', route)

  //   // TODO: THIS WAS SUPPOSED TO BE HOW TO GET THE UNIQUE PAGES. NOW IT'S DIFFERENT. WE ARE USING PARAMS
  //   dispatch('app/getSubdomain', url)
  //   // TODO : COMMENT THIS OUT EVERYTIME YOU NEED TO DEPLOY
  //   const subDomain = 'testing'

  //   // TODO : UNCOMMENT THIS EVERYTIME YOU NEED TO DEPLOY
  //   // const getSubdomain = (hostname) => {
  //   //   let subDomain
  //   //   // eslint-disable-next-line no-useless-escape
  //   //   const regexParse = /[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$/
  //   //   const urlParts = regexParse.exec(hostname)
  //   //   if (urlParts) {
  //   //     subDomain = hostname.replace(urlParts[0], '').slice(0, -1)
  //   //   }
  //   //   return subDomain
  //   // }
  //   // const subDomain = getSubdomain(url)

  //   console.log('app subDomain', subDomain)
  //   dispatch('app/getIp')

  //   // Get the user who is referring
  //   const ref = route.query.ref || subDomain

  //   let campaign
  //   try {
  //     const query = await $fire.firestore
  //       .collection('pages')
  //       .where('subDomain', '==', subDomain)
  //       .get()

  //     if (!query.empty) {
  //       const data = query.docs[0].data()
  //       commit('app/SET_BODY_HTML', `<div>${data.html}</div>`)
  //       commit('app/SET_CAMPAIGN_ID', data.campaignId)
  //       commit('app/SET_BODY_CSS', data.css)
  //       // return dispatch('getCampaignInfo', data.campaignId)
  //     } else {
  //       commit('app/SET_BODY_HTML', `<h1>Page Not found</h1>`)
  //     }
  //   } catch (e) {
  //     console.log('No such document exists!', e)
  //   }
  //   // const campaign = dispatch('app/getPage', subDomain)
  //   try {
  //     const query = await $fire.firestore
  //       .collection('campaigns')
  //       .where('title', '==', subDomain)
  //       .get()

  //     if (!query.empty) {
  //       const data = query.docs[0].data()
  //       campaign = data
  //     } else {
  //       console.log('This campaign cannot be found from vuex')
  //     }
  //   } catch (e) {
  //     console.log('No such document exists!', e)
  //   }
  //   commit('app/SET_USER_REF', ref)

  //   let meta

  //   if (campaign) {
  //     meta = campaign.socialAppearance
  //   }

  //   return (() => {
  //     if (meta) {
  //       app.head.meta.push({
  //         property: 'og:url',
  //         content: url,
  //       })
  //       app.head.meta.push({
  //         property: 'og:locale',
  //         content: 'en_US',
  //       })
  //       app.head.meta.push({ property: 'og:type', content: 'article' })
  //       app.head.meta.push({ property: 'og:title', content: meta[0].title })
  //       app.head.meta.push({
  //         property: 'og:description',
  //         content: meta[0].content,
  //       })
  //       app.head.meta.push({
  //         property: 'og:image',
  //         content: meta[0].image.url,
  //       })
  //       app.head.meta.push({
  //         property: 'twitter:card',
  //         content: 'summary_large_image',
  //       })
  //     }
  //   })()
  // },
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
  },
  computed: {
    ...mapGetters({
      body: 'app/body',
      subDomain: 'app/subDomain',
    }),
    css() {
      return this.body.css
    },
  },
  async mounted() {
    const { $store, $route, $fire } = this
    const { commit, dispatch } = $store

    console.log('This is the route', $route)

    // TODO: THIS WAS SUPPOSED TO BE HOW TO GET THE UNIQUE PAGES. NOW IT'S DIFFERENT. WE ARE USING PARAMS
    // dispatch('app/getSubdomain', url)
    // TODO : COMMENT THIS OUT EVERYTIME YOU NEED TO DEPLOY
    // const subDomain = 'testing'

    // TODO : UNCOMMENT THIS EVERYTIME YOU NEED TO DEPLOY
    const getSubdomain = (hostname) => {
      let subDomain
      // eslint-disable-next-line no-useless-escape
      const regexParse = /[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$/
      const urlParts = regexParse.exec(hostname)
      if (urlParts) {
        subDomain = hostname.replace(urlParts[0], '').slice(0, -1)
      }
      return subDomain
    }
    const url = window.location.host
    const subDomain = getSubdomain(url)

    console.log('app subDomain', subDomain)
    dispatch('app/getIp')

    // Get the user who is referring
    const ref = $route.query.ref

    commit('app/SET_USER_REF', ref)

    try {
      const query = await $fire.firestore
        .collection('pages')
        .where('subDomain', '==', subDomain)
        .get()

      if (!query.empty) {
        const data = query.docs[0].data()
        commit('app/SET_BODY_HTML', `<div>${data.html}</div>`)
        commit('app/SET_CAMPAIGN_ID', data.campaignId)
        commit('app/SET_BODY_CSS', data.css)
        this.addStyling()
        // return dispatch('getCampaignInfo', data.campaignId)
      } else {
        commit('app/SET_BODY_HTML', `<h1>Page Not found</h1>`)
      }
    } catch (e) {
      console.log('No such document exists!', e)
    }
  },
  // async mounted() {
  //   const currentToken = await this.$fire.messaging.getToken()
  //   const data = JSON.stringify({
  //     notification: {
  //       title: 'firebase',
  //       body: 'firebase is awesome',
  //       click_action: 'http://localhost:3000/',
  //       icon: 'http://localhost:3000/assets/images/brand-logo.png',
  //     },
  //     to: currentToken,
  //   })
  //   const config = {
  //     method: 'post',
  //     url: 'https://fcm.googleapis.com/fcm/send',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'key=<yourServerKey>',
  //     },
  //     data,
  //   }
  //   const response = await this.$axios.$get(config)
  //   this.$fire.messaging.onMessage((payload) => {
  //     console.info('Message received: ', payload)
  //   })
  //   this.$fire.messaging.onTokenRefresh(async () => {
  //     const refreshToken = await this.$fire.messaging.getToken()
  //     console.log('Token Refreshed', refreshToken)
  //   })
  //   console.log(response)
  // },
  created() {
    // this.addStyling()
  },
  methods: {
    addStyling() {
      if (process.client) {
        console.log('About to add styling to the mix')
        const style = document.createElement('style')
        style.innerHTML = this.css
        document.head.appendChild(style)
      }
    },
  },
}
</script>
