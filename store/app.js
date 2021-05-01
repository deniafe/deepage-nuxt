import { db } from '@/plugins/firebase'

export default {
  namespaced: true,
  state: () => {
    return {
      body: {
        html: '',
        css: '',
      },
      campId: '',
      subDomain: '',
      user: {
        ip: '',
        referredBy: '',
      },
    }
  },
  mutations: {
    SET_BODY_HTML(state, html) {
      state.body.html = html
    },
    SET_BODY_CSS(state, css) {
      state.body.css = css
    },
    SET_CAMPAIGN_ID(state, id) {
      state.campId = id
    },
    SET_SUB_DOMAIN(state, domain) {
      state.subDomain = domain
    },
    SET_USER_IP(state, ip) {
      state.user.ip = ip
    },
    SET_USER_REF(state, ref) {
      state.user.referredBy = ref
    },
  },
  actions: {
    async getIp({ commit }) {
      const ip = await this.$axios.$get('http://icanhazip.com')
      commit('SET_USER_IP', ip)
    },
    getSubdomain({ commit }, hostname) {
      let subDomain
      // eslint-disable-next-line no-useless-escape
      const regexParse = /[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$/
      const urlParts = regexParse.exec(hostname)
      if (urlParts) {
        subDomain = hostname.replace(urlParts[0], '').slice(0, -1)
      }
      commit('SET_SUB_DOMAIN', subDomain)
    },
    async getPage({ commit, dispatch }, subDomain) {
      try {
        const query = await db
          .collection('pages')
          .where('subDomain', '==', subDomain)
          .where('type', '==', 'leadPage')
          .get()

        if (!query.empty) {
          const data = query.docs[0].data()
          commit('SET_BODY_HTML', `<div>${data.html}</div>`)
          commit('SET_CAMPAIGN_ID', data.campaignId)
          commit('SET_BODY_CSS', data.css)
          return dispatch('getCampaignInfo', data.campaignId)
        } else {
          commit('SET_BODY_HTML', `<h1>Page Not found</h1>`)
        }
      } catch (error) {
        console.log(
          'There was an error loading the web page: where is the document',
          error,
        )
        return new Error(`An error occurred ${error}`)
      }
    },
    async getCampaignInfo({ commit }, id) {
      try {
        const doc = await db.collection('campaigns').doc(id).get()

        if (doc.exists) {
          const data = doc.data()
          // const rewards = data.rewards.map((reward) => {
          //   return {
          //     title: reward.name,
          //     points: reward.requiredPoints,
          //     description: reward.description,
          //     image: reward.image.url,
          //   }
          // })

          // const fbMeta = data.socialAppearance

          // const customActions = data.contest.settings.customActions.map(
          //   (action) => {
          //     return {
          //       title: action.actionTitle,
          //       icon: action.actionIcon,
          //       description: action.actionDescription,
          //       url: action.actionUrl,
          //       color: action.actionColor,
          //       point: action.actionPoint,
          //       question: action.actionConfirmationQuestion,
          //       cta: action.actionCTA,
          //     }
          //   },
          // )

          // commit('share/SET_REWARDS', rewards)
          // commit('share/SET_CUSTOM_ACTIONS', customActions)
          return data
        } else {
          console.log('This campaign cannot be found from vuex')
        }
      } catch (error) {
        console.log(
          'There was an error getting this campaign info from vuex',
          error,
        )
      }
    },
  },
  getters: {
    body: (state) => state.body,
    campId: (state) => state.campId,
    user: (state) => state.user,
    subDomain: (state) => state.subDomain,
  },
}
