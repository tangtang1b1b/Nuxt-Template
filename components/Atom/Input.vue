<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})
const { title, placeholder, type } = toRefs(props)
</script>

<template>
  <div class="flex items-center justify-between px-5">
    <p class="w-1/5 text-black">{{ title }}</p>
    <input
      :placeholder="placeholder"
      :type="type"
      class="w-4/5 rounded-md border-[1px] border-[#a9a9a9] p-2 text-black focus-visible:outline-none"
    />
  </div>
</template>

<style scoped>
input::placeholder {
  color: #999; /* 改變為紅色 */
}
</style>
