<script setup lang="ts">
interface Props {
  id?: string
  paginationId?: string
  slideData: unknown[]
  spaceBetween?: number
  loop?: boolean
}

interface SwiperOptions {
  slidesPerView: 'auto' | number
  spaceBetween: number
  speed: number
  grabCursor: boolean
  centeredSlides: boolean
  loop: boolean
  on: {
    slideChangeTransitionEnd: (swiper: Swiper) => void
  }
  pagination?: {
    el: string
    clickable: boolean
  } | false
}

import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'

const props = withDefaults(defineProps<Props>(), {
  id: '',
  paginationId: '',
  slideData: () => [],
  spaceBetween: 24,
  loop: true,
})

const { id, paginationId, slideData, spaceBetween, loop } = toRefs(props)

const swiper = ref<Swiper | null>(null)
const nowIndex = ref<number>(0)

const swiperOptions: SwiperOptions = {
  slidesPerView: 'auto',
  spaceBetween: spaceBetween.value,
  speed: 300,
  grabCursor: true,
  // breakpoints: {
  //   480: {
  //     slidesPerView: 2,
  //     spaceBetween: 20
  //   },
  //   996: {
  //     slidesPerView: 4,
  //     spaceBetween: 40
  //   }
  // }
  centeredSlides: false,
  loop: loop.value,
  on: {
    slideChangeTransitionEnd: (now: Swiper) => {
      nowIndex.value = now.realIndex
    },
  },
  pagination: paginationId.value
    ? {
        el: `#${paginationId.value}`,
        clickable: true,
      }
    : false,
}

const slidePrev = () => {
  if (swiper.value) {
    swiper.value.slidePrev()
  }
}

const slideNext = () => {
  if (swiper.value) {
    swiper.value.slideNext()
  }
}

onMounted(() => {
  Swiper.use([Pagination])
  swiper.value = new Swiper(`#${id.value}`, swiperOptions)
})
</script>

<template>
  <div class="swiperContainer">
    <div :id="id" class="swiper">
      <div class="swiper-wrapper">
        <slot :slot-slide-data="slideData" :slot-index="nowIndex">
          <div class="swiper-slide" v-for="(slide, index) in slideData" :key="index">
            <img class="size-full rounded-xl object-cover" :src="fetchImg(slide as string)" alt="slide" />
          </div>
        </slot>
      </div>
      <div class="pointer-events-none absolute top-0 z-2 flex h-full w-full items-center justify-between px-5">
        <div
          @click="slidePrev"
          :id="`${id}swiperPrev`"
          :class="{ 'hover:bg-white': !swiper?.isBeginning }"
          class="swiper-button-prev | group pointer-events-auto cursor-pointer rounded-full bg-white/50 p-4 duration-300"
        >
          <AtomIcon
            name="arrow"
            :size="18"
            :class="{ 'group-hover:text-black': !swiper?.isBeginning }"
            class="rotate-180 text-white duration-300"
          />
        </div>
        <div :id="paginationId" class="swiper-pagination | pointer-events-auto absolute bottom-[15px] left-1/2 -translate-x-1/2"></div>
        <div
          @click="slideNext"
          :id="`${id}swiperNext`"
          :class="{ 'hover:bg-white': !swiper?.isEnd }"
          class="swiper-button-next | group pointer-events-auto cursor-pointer rounded-full bg-white/50 p-4 duration-300"
        >
          <AtomIcon name="arrow" :size="18" :class="{ 'group-hover:text-black': !swiper?.isEnd }" class="text-white duration-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiperContainer :deep(.swiper-slide) {
  width: auto;
}
.swiperContainer :deep(.swiper-pagination) {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}
.swiperContainer :deep(.swiper-pagination .swiper-pagination-bullet) {
  width: 8px !important;
  height: 8px !important;
  background-color: #fff !important;
  border-radius: 100% !important;
  transition: 0.3s ease !important;
  cursor: pointer !important;
}
.swiperContainer :deep(.swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active) {
  background-color: #1da539 !important;
}
</style>
