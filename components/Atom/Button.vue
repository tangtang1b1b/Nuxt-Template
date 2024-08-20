<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'secondary'].includes(value),
  },
})
const { mode } = toRefs(props)

const currentMode = computed(() => {
  switch (mode.value) {
    case 'default':
      return 'bg-[#ccc]'
    case 'secondary':
      return 'bg-green-700'
  }
})
</script>

<template>
  <div :class="currentMode" class="mx-auto flex max-w-[250px] w-full cursor-pointer items-center justify-center rounded-[40px] py-4">
    <slot />
  </div>
</template>

<style scoped></style>
