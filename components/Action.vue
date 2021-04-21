<template>
  <div
    class="border-4 border-primary border-opacity-20 rounded-lg mt-4 px-3 md:px-6 cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition transform duration-200 ease-in-out"
  >
    <div
      class="grid grid-cols-4 items-center h-16 pl-2 pr-2 pb-4 md:pb-1 md:grid-cols-12"
      @click="dropdown = !dropdown"
    >
      <div class="col-span-3 text-red-300 text-sm md:col-span-1">
        <i
          class="pr-2 hidden md:grid"
          :style="{ color: body.color }"
          :class="body.icon"
        ></i>
      </div>
      <div
        class="col-span-3 text-red-300 text-sm md:text-base md:col-span-10 lg:text-sm"
      >
        <i class="pr-2 md:hidden" :class="body.icon"></i>{{ body.title }}
      </div>
      <div
        class="col-span-1 text-primary text-sm justify-self-end font-bold md:col-span-1"
      >
        +{{ body.point }}
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
        <component :is="action" v-bind="{ properties }"></component>
      </div>
    </transition>
  </div>
</template>

<script>
const Refer = () => import('./Refer')
export default {
  name: 'Action',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    action: {
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
    refer() {
      return Refer
    },
  },
  mounted() {
    if (this.index === 0) this.dropdown = true
  },
}
</script>

<style scoped></style>
