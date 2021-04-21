<template>
  <div
    class="border-4 border-primary py-8 border-opacity-20 rounded-lg mt-4 px-3 md:px-6 cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition transform duration-200 ease-in-out"
  >
    <div
      class="grid grid-cols-6 md:grid-cols-12 items-center pl-2 pr-2"
      @click="dropdown = !dropdown"
    >
      <img
        class="col-span-2 md:col-span-3 w-14 h-14 rounded-md md:w-32 md:h-32 lg:col-span-4"
        :src="body.image"
      />
      <div class="col-span-3 md:col-span-7 lg:col-span-6">
        <div
          class="text-lg md:text-2xl tracking-tight md:tracking-normal font-bold uppercase text-red-300 lg:text-xl"
        >
          {{ body.name }}
        </div>
        <div class="text-sm md:text-base text-red-300">
          {{ body.description }}
        </div>
      </div>
      <div
        class="md:col-span-2 text-primary text-sm justify-self-end font-bold"
      >
        {{ body.points }}
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-100"
    >
      <div v-if="dropdown">
        <!-- <slot></slot> -->
        <component :is="reward" v-bind="{ properties }"></component>
      </div>
    </transition>
  </div>
</template>

<script>
const Reward = () => import('./RewardDetail')
export default {
  name: 'Action',
  props: {
    reward: {
      type: Function,
      required: true,
    },
    body: {
      type: Object,
      required: true,
    },
    properties: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      dropdown: false,
    }
  },
  computed: {
    action() {
      return Reward
    },
  },
}
</script>

<style scoped></style>
