<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
})
const { name, color } = toRefs(props)

const svgName = computed(() => {
  return name.value.includes('/') ? `#${name.value}` : `#/${name.value}`
})

</script>

<template>
  <svg aria-hidden="true" class="">
    <use :xlink:href="svgName" :fill="color" />
  </svg>
</template>

<style scoped></style>
