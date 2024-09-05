<script setup>
const emit = defineEmits(['update:modelValue'])
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
  <div class="flex items-center justify-center gap-2 px-5">
    <p v-if="title.length > 0" class="text-black">{{ title }}</p>
    <input
      @input="emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      class="rounded-md border-[1px] border-[#a9a9a9] p-2 text-black focus-visible:outline-none"
      :class="[title.length > 0 ? 'w-4/5' : 'w-full']"
    />
  </div>
</template>

<style scoped>
input::placeholder {
  color: #999; /* 改變為紅色 */
}
</style>
