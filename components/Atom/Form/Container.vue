<script setup lang="ts">
interface Props {
  label?: string
  name?: string
  isCursor?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  name: '',
  isCursor: false,
})

const { label, name, isCursor } = toRefs(props)
</script>

<template>
  <div>
    <label class="w-[100px] flex-shrink-0" :class="{ 'cursor-pointer': isCursor }" :for="label">*{{ name }}</label>
    <slot />
  </div>
</template>

<style scoped></style>
