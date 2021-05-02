<template>
  <div class="w-screen bg-secondary" :style="divStyle">
    <EmailConfirm />
    <div class="px-6 lg:hidden">
      <Profile :user="user" />
      <Tabs @tab="change" />
      <component :is="content"></component>
    </div>
    <div class="px-6 hidden lg:grid grid-cols-5 container mx-auto">
      <div class="lg:col-span-2 mx-8">
        <Actions />
      </div>
      <div class="lg:col-span-3 mx-8 pr-6">
        <Profile :user="user" />
        <Tabs @tab="change" />
        <component :is="content"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
const Actions = () => import('../components/Actions')
const Rewards = () => import('../components/Rewards')
const Leaderboards = () => import('../components/Leaderboards')
export default {
  name: 'Share',
  data() {
    return {
      browserHeight: '',
      tab: 'rewards',
      user: {},
      rewards: [],
      customActions: [],
      referralPoint: 0,
    }
  },
  fetch(context) {
    const { store, route } = context
    const { commit } = store

    const uid = route.query.uid

    commit('app/SET_USER_UID', uid)

    // TODO: THIS WAS SUPPOSED TO BE HOW TO GET THE UNIQUE PAGES. NOW IT'S DIFFERENT. WE ARE USING PARAMS

    // try {
    //   const query = await $fire.firestore
    //     .collection('campaigns')
    //     .where('title', '==', subDomain)
    //     .get()

    //   if (!query.empty) {
    //     const data = query.docs[0].data()
    //     campaign = data
    //   } else {
    //     console.log('This campaign cannot be found from vuex')
    //   }
    // } catch (e) {
    //   console.log('No such document exists!', e)
    // }
  },
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { property: 'og:url', content: 'http://instagram.devrl.link' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'Deeviral Page' },
      {
        property: 'og:description',
        content: 'The best Viral marketing platform to use',
      },
      {
        property: 'og:image',
        content:
          'https://firebasestorage.googleapis.com/v0/b/telephy-147d6.appspot.com/o/PzJDgebXYOZNbdWE20sOOHhXyYF2%2F342d947fa1e53-A%20whole%20new%20look.jpg?alt=media&token=7b75766f-4786-40b4-bd9e-1c11526e8e32',
      },
    ],
  },
  computed: {
    divStyle() {
      return {
        minHeight: this.browserHeight + 'px',
        browserWidth: this.browserWidth + 'px',
      }
    },
    lead() {
      return this.$route.params.lead
    },
    campaignId() {
      return this.$route.params.campaignId
    },
    content() {
      let result
      if (this.tab === 'actions') result = Actions
      if (this.tab === 'rewards') result = Rewards
      if (this.tab === 'leaderboards') result = Leaderboards
      return result
    },
  },
  watch: {
    campaignId(newValue) {
      if (newValue) this.getCampaignInfo()
    },
  },
  mounted() {
    this.browserHeight = document.body.clientHeight
    const browserWidth = document.body.clientWidth
    this.checkWidth(browserWidth)
  },
  created() {
    this.getLeadInfo()
    this.getCampaignInfo()
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.subDomain = this.getSubdomain(window.location.hostname)
    }
  },
  methods: {
    change(tab) {
      this.tab = tab
    },
    checkWidth(width) {
      if (width < 1024) {
        this.tab = 'actions'
      }
    },
    getSubdomain(hostname) {
      let subdomain
      // eslint-disable-next-line no-useless-escape
      const regexParse = /[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$/
      const urlParts = regexParse.exec(hostname)
      if (urlParts) {
        subdomain = hostname.replace(urlParts[0], '').slice(0, -1)
      }
      return subdomain
    },
    // console.log(getSubdomain(window.location.hostname))
    getParams(url) {
      const params = {}
      const parser = document.createElement('a')
      parser.href = url
      const query = parser.search.substring(1)
      const vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        params[pair[0]] = decodeURIComponent(pair[1])
      }
      return params
    },
    async getLeadInfo() {
      try {
        const doc = await db.collection('leads').doc(this.lead).get()

        if (doc.exists) {
          const data = doc.data()
          // Send page data
          this.user = {
            name: data.name || data.email,
            email: data.email,
            points: data.totalPoints,
            uniqueLink: data.uniqueLink,
            rewardsNum: data.rewards.length,
          }
          this.$store.commit('share/SET_UNIQUE_LINK', data.uniqueLink)
        } else {
          console.log('This user cannot be found')
        }
      } catch (error) {
        console.log('There was an error getting this lead info', error)
      }
    },
    async getCampaignInfo() {
      const id = this.campaignId
      try {
        const doc = await db.collection('campaigns').doc(id).get()

        if (doc.exists) {
          const data = doc.data()
          const rewards = data.rewards.map((reward) => {
            return {
              title: reward.name,
              points: reward.requiredPoints,
              description: reward.description,
              image: reward.image.url,
            }
          })

          const customActions = data.contest.settings.customActions.map(
            (action) => {
              return {
                title: action.actionTitle,
                icon: action.actionIcon,
                description: action.actionDescription,
                url: action.actionUrl,
                color: action.actionColor,
                point: action.actionPoint,
                question: action.actionConfirmationQuestion,
                cta: action.actionCTA,
              }
            },
          )

          this.$store.commit('share/SET_REWARDS', rewards)
          this.$store.commit('share/SET_CUSTOM_ACTIONS', customActions)

          this.referralPoint =
            data.contest.settings.pointsForReferralsAndSignUps.referrals
          // Send page data
          console.log('Campaign Info: ', data)
        } else {
          console.log('This campaign cannot be found')
        }
      } catch (error) {
        console.log('There was an error getting this campaign info', error)
      }
    },
  },
}
</script>

<style scoped></style>
