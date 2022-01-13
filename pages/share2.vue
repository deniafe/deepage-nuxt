<template>
  <div>
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
const Actions = () => import('../components/Actions')
const Rewards = () => import('../components/Rewards')
const Leaderboards = () => import('../components/Leaderboards')

// const vm = this
// const db = vm.$fire.firestore

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
    content() {
      let result
      if (this.tab === 'actions') result = Actions
      if (this.tab === 'rewards') result = Rewards
      if (this.tab === 'leaderboards') result = Leaderboards
      return result
    },
  },
  methods: {
    change(tab) {
      this.tab = tab
    },
    async getLeadInfo() {
      const db = this.$fire.firestore
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
  },
}
</script>

<style></style>
