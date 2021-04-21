<template>
  <div class="pt-6 pb-8 border-t-2 mt-4 border-gray-300">
    <div
      v-if="properties.subtitle"
      class="text-center grid items-center py-2 mt-1 text-red-300 font-semibold text-sm"
    >
      {{ properties.subtitle }}
    </div>

    <div
      v-if="properties.buttonText"
      class="rounded-md bg-primary text-center grid items-center py-3 mt-4 text-white cursor-pointer hover:scale-105 transition transform duration-200 ease-in-out"
    >
      {{ properties.buttonText }}
    </div>
    <div
      v-if="properties.question"
      class="text-center grid items-center py-2 mt-4 text-red-300 font-bold text-sm"
    >
      {{ properties.question }}
    </div>
    <div
      v-if="properties.question"
      class="grid grid-cols-5 md:grid-cols-6 pt-2"
    >
      <div
        class="rounded-md bg-gray-300 col-span-4 md:col-span-5 py-4 mr-1"
      ></div>
      <div
        class="rounded-md bg-primary py-4 grid items-center text-center md:ml-4"
      >
        <i class="fas fa-long-arrow-alt-right text-white"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Custom',
  props: {
    properties: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped></style>
