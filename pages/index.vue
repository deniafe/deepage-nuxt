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
    const ref = route.query.ref

    console.log('host url', url)

    // TODO: THIS WAS SUPPOSED TO BE HOW TO GET THE UNIQUE PAGES. NOW IT'S DIFFERENT. WE ARE USING PARAMS
    dispatch('app/getSubdomain', url)
    const subDomain = state.subDomain || 'instagram'
    console.log('app subDomain', subDomain)
    dispatch('app/getIp')
    let campaign
    try {
      const query = await $fire.firestore
        .collection('pages')
        .where('subDomain', '==', subDomain)
        .where('type', '==', 'leadPage')
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
      const doc = await $fire.firestore
        .collection('campaigns')
        .doc(state.campId)
        .get()

      if (doc.exists) {
        const data = doc.data()
        campaign = data
      } else {
        console.log('This campaign cannot be found from vuex')
      }
    } catch (e) {
      console.log('No such document exists!', e)
    }
    commit('app/SET_USER_REF', ref)

    let meta

    if (campaign) {
      meta = campaign.socialAppearance
    }

    return (() => {
      if (meta) {
        app.head.meta.push({
          property: 'og:url',
          content: 'http://devrl.link/' + subDomain,
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
      }
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

      // Twitter
      { name: 'twitter:title', content: 'Content Title' },
      // with shorthand
      {
        n: 'twitter:description',
        c: 'Content description less than 200 characters',
      },
      // ...
      // Google+ / Schema.org
      { itemprop: 'name', content: 'Content Title' },
      { itemprop: 'description', content: 'Content Title' },
      // ...
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
