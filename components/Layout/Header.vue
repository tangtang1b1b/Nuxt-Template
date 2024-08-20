<script setup>
const { $gsap } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const { data } = toRefs(props)

const imageRef = ref(null)
const imageRefAni = ref(null)
const imageMove = () => {
  imageRefAni.value = $gsap.to(imageRef.value, {
    x: 100,
    repeat: -1,
    duration: 2,
    ease: 'bounce.out',
  })
}
onMounted(() => {
  imageMove()
})
onUnmounted(() => {
  if (imageRefAni.value) {
    imageRefAni.value.kill()
  }
})
</script>

<template>
  <div class="shadow-nav fixed top-0 flex h-[75px] w-full items-center justify-between px-5 bg-white z-50">
    <div class="h-full">
      <img ref="imageRef" class="h-full object-cover" :src="fetchImg('/dog512.png')" alt="" />
    </div>
    <ul class="flex h-full w-1/3 justify-between">
      <nuxt-link
        :to="item.url"
        class="size-full cursor-pointer content-center text-center duration-300 hover:bg-black hover:text-white"
        v-for="(item, index) in data"
        :key="`${item.content}_${index}`"
      >
        {{ item.content }}
      </nuxt-link>
    </ul>
  </div>
</template>

<style scoped></style>
