<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
const { items } = toRefs(props)
</script>

<template>
  <div class="px-5">
    <div class="flex bg-[#ccc] rounded-lg flex-wrap gap-y-5 py-5">
      <nuxt-link v-for="item in items" :key="item.name" class="flex w-1/4 flex-col items-center">
        <AtomIcon :name="item.icon" class="text-black" />
        <p>{{ item.name }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped></style>
