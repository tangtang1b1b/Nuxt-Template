<script setup lang="ts">
interface Props {
  options?: { name: string; value: string }[]
  placeholder?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: '請選擇',
  id: '',
})

const { options, placeholder, id } = toRefs(props)

const emit = defineEmits<{ 'update:word': [value: string] }>()
const selected = ref<string>('')
</script>

<template>
  <div class="relative w-full">
    <select
      :id="id"
      v-model="selected"
      @change="emit('update:word', selected)"
      class="flex w-full appearance-none justify-end rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-txt-light focus-visible:outline-txt-light"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
    <AtomIcon name="arrow" :size="14" class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[#94a3b8]" />
  </div>
</template>

<style scoped>
option {
  border-radius: 5px;
}
</style>
