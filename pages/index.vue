<template>
  <div>
    <LeadPage />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  async fetch(context) {
    const { store, route, req, app, $fire } = context
    const { commit, dispatch, state } = store

    const url = req.headers.host

    console.log('host url', req.headers)

    // TODO: THIS WAS SUPPOSED TO BE HOW TO GET THE UNIQUE PAGES. NOW IT'S DIFFERENT. WE ARE USING PARAMS
    dispatch('app/getSubdomain', url)
    const subDomain = state.subDomain || 'testing'
    console.log('app subDomain', subDomain)
    dispatch('app/getIp')

    // Get the user who is referring
    const ref = route.query.ref || subDomain

    let campaign
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
        // return dispatch('getCampaignInfo', data.campaignId)
      } else {
        commit('app/SET_BODY_HTML', `<h1>Page Not found</h1>`)
      }
    } catch (e) {
      console.log('No such document exists!', e)
    }
    // const campaign = dispatch('app/getPage', subDomain)
    try {
      const query = await $fire.firestore
        .collection('campaigns')
        .where('title', '==', subDomain)
        .get()

      if (!query.empty) {
        const data = query.docs[0].data()
        campaign = data
      } else {
        console.log('This campaign cannot be found from vuex')
      }
    } catch (e) {
      console.log('No such document exists!', e)
    }
    commit('app/SET_USER_REF', ref)

    // let meta

    // if (campaign) {
    const meta = campaign.socialAppearance
    // }

    return (() => {
      // if (meta) {
      app.head.meta.push({
        property: 'og:url',
        content: url,
      })
      app.head.meta.push({
        property: 'og:locale',
        content: 'en_US',
      })
      app.head.meta.push({ property: 'og:type', content: 'article' })
      app.head.meta.push({ property: 'og:title', content: meta[0].title })
      app.head.meta.push({
        property: 'og:description',
        content: meta[0].content,
      })
      app.head.meta.push({
        property: 'og:image',
        content: meta[0].image.url,
      })
      app.head.meta.push({
        property: 'twitter:card',
        content: 'summary_large_image',
      })
      // }
    })()
  },
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
  created() {
    this.addStyling()
    console.log('This is the subDomain: ', this.subDomain)
  },
  methods: {
    addStyling() {
      if (process.browser) {
        const style = document.createElement('style')
        style.innerHTML = this.css
        document.head.appendChild(style)
      }
    },
  },
}
</script>
