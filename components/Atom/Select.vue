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
  options: {
    type: Array,
    default: () => [],
  },
})
const { title, placeholder, options } = toRefs(props)
const selectValue = ref('default')
</script>

<template>
  <div class="flex items-center justify-between px-5">
    <p class="w-1/5 text-black">{{ title }}</p>
    <select
      v-model="selectValue"
      :placeholder="placeholder"
      :class="[selectValue === 'default' ? 'text-[#999]' : 'text-black']"
      class="w-4/5 cursor-pointer appearance-none rounded-md border-[1px] border-[#a9a9a9] p-2 focus-visible:outline-none"
    >
      <option value="default" disabled>請選擇門市</option>
      <option class="text-black" :value="option.value" v-for="option in options" :key="option.name">{{ option.name }}</option>
    </select>
  </div>
</template>

<style scoped></style>
