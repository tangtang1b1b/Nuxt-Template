<script setup lang="ts">
interface Props {
  name: string
  color?: string
  size?: number
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  color: '#333',
  size: 24,
})

const { name, color, size } = toRefs(props)

const svgName = computed(() => {
  return name.value.includes('/') ? `#${name.value}` : `#/${name.value}`
})

</script>

<template>
  <svg aria-hidden="true" :style="{width: `${size}px`, height: `${size}px`}">
    <use :xlink:href="svgName" :fill="color" />
  </svg>
</template>

<style scoped></style>
