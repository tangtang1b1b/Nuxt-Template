<script setup>
const props = defineProps({
  fit: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
})
const { fit, center } = toRefs(props)
</script>

<template>
  <div
    :class="[fit ? '' : 'py-5', center ? 'items-center justify-center' : '']"
    class="shadow-button mx-auto flex max-w-[320px] cursor-pointer rounded-xl"
  >
    <slot />
  </div>
</template>

<style scoped></style>
