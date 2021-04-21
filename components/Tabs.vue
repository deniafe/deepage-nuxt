<template>
  <section class="mt-1">
    <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
      <div
        class="uppercase text-xs md:text-sm text-white justify-self-start py-3 lg:hidden cursor-pointer"
        :class="border('actions')"
        @click="change('actions')"
      >
        Get Points
      </div>
      <div
        class="uppercase text-xs md:text-sm text-white justify-self-start py-3 lg:col-span-1 cursor-pointer"
        :class="border('rewards')"
        @click="change('rewards')"
      >
        Rewards
      </div>
      <div
        class="uppercase text-xs md:text-sm text-white justify-self-start py-3 lg:col-span-1 cursor-pointer"
        :class="border('leaderboards')"
        @click="change('leaderboards')"
      >
        Leaderboard
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tab: 'actions',
    }
  },
  methods: {
    change(tab) {
      this.tab = tab
      this.$emit('tab', tab)
    },
    border(tab) {
      if (tab === this.tab) return 'border-primary border-b-4'
    },
  },
}
</script>
