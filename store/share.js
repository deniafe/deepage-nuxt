export default {
  namespaced: true,
  state: () => {
    return {
      rewards: [],
      customActions: [],
      uniqueLink: '',
    }
  },
  mutations: {
    SET_REWARDS(state, rewards) {
      state.rewards = rewards
    },
    SET_CUSTOM_ACTIONS(state, actions) {
      state.customActions = actions
    },
    SET_UNIQUE_LINK(state, link) {
      state.uniqueLink = link
    },
  },
  actions: {},
  getters: {
    uniqueLink: (state) => state.uniqueLink,
    rewards: (state) => state.rewards,
    customActions: (state) => state.customActions,
  },
}
