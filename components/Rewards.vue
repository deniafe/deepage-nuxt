<template>
  <div class="pt-8 pb-4 lg:pt-2">
    <Reward
      v-for="(reward, i) in rewards"
      :key="i"
      :index="i"
      :reward="reward.component"
      :body="reward.body"
      :properties="reward.properties"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const RewardDetail = () => import('./RewardDetail')
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      storeRewards: 'share/rewards',
    }),
    rewards() {
      const rewards = this.storeRewards.map((reward) => {
        return {
          component: RewardDetail,
          body: reward,
          properties: {
            buttonText: 'Claim Reward +3000 points',
            description:
              'Collect enough points and start your journey to the red planet',
          },
        }
      })
      return rewards
    },
  },
}
</script>

<style></style>
