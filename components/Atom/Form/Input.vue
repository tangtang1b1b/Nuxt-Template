<script setup lang="ts">
interface Props {
  placeholder?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請輸入',
  id: '',
})

const emits = defineEmits<{ 'update:word': [value: string] }>()
const { placeholder, id } = toRefs(props)
const word = ref<string>('')

const updateWord = () => {
  emits('update:word', word.value)
}
</script>

<template>
  <input
    :id="id"
    type="text"
    v-model="word"
    class="flex w-full justify-end rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-txt-light focus-visible:outline-txt-light"
    :placeholder="placeholder"
    @input="updateWord"
  />
</template>

<style scoped></style>
