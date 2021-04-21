<template>
  <div class="pt-6 pb-6 border-t-2 mt-4 border-gray-300">
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
      v-if="properties.description"
      class="text-center grid items-center py-2 mt-4 text-red-300 text-sm"
    >
      {{ properties.description }}
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
