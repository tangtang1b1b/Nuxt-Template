<script setup lang="ts">
interface Props {
  data: unknown[]
  reverse?: boolean
}

const { $gsap } = useNuxtApp()

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  reverse: false,
})

const { data, reverse } = toRefs(props)

onMounted(() => {
  $gsap.effects.marquee('.marquee', { direction: 'left' })
  $gsap.effects.marquee('.marquee-reverse', { direction: 'right' })
})
</script>

<template>
  <div :class="{ 'flex-row-reverse': reverse }" class="flex w-full overflow-hidden border-2 border-txt-light">
    <slot :slot-data="data">
      <div class="flex w-full shrink-0 justify-between gap-5 text-2xl">
        <div :style="{ width: `${100 / data.length}%` }" v-for="(i, index) in data" :key="index">
          {{ i }}
        </div>
      </div>
      <div class="flex w-full shrink-0 justify-between gap-5 text-2xl">
        <div :style="{ width: `${100 / data.length}%` }" v-for="(i, index) in data" :key="index">
          {{ i }}
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped></style>
