<script setup lang="ts">
interface Props {
  slideData: unknown[]
  paginationId?: string
  id?: string
  id2?: string
}

import Swiper from 'swiper'
import { FreeMode, Navigation, Thumbs, Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const props = withDefaults(defineProps<Props>(), {
  slideData: () => [],
  paginationId: '',
  id: '',
  id2: '',
})

const { slideData, paginationId, id, id2 } = toRefs(props)

const emit = defineEmits<{ 'update:realIndex': [index: number] }>()
const currentRealIndex = ref<number>(0)
const swiperThumbs = ref<Swiper | null>(null)

// 監聽縮圖 Swiper 的初始化
const swiperOptions = {
  breakpoints: {
    // 當視窗寬度 >= 320px
    320: {
      slidesPerView: 1.9,
      spaceBetween: 8,
    },
    // 當視窗寬度 >= 640px
    640: {
      slidesPerView: 1.75,
      spaceBetween: 14,
    },
    // 當視窗寬度 >= 1024px
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
  },
  grabCursor: true,
  freeMode: true,
  watchSlidesProgress: true,
}

const swiperOptions2 = {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  grabCursor: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },
  on: {
    slideChangeTransitionStart: (now: Swiper) => {
      currentRealIndex.value = now.realIndex
      emit('update:realIndex', now.realIndex)
    },
  },
  pagination: paginationId.value
    ? {
        el: `#${paginationId.value}`,
        clickable: true,
      }
    : false,
}

onMounted(() => {
  nextTick(() => {
    Swiper.use([Navigation, Pagination, Autoplay, EffectFade, FreeMode, Thumbs])
    swiperThumbs.value = new Swiper(`#${id.value}`, swiperOptions)

    // 初始化主 Swiper
    new Swiper(`#${id2.value}`, {
      ...swiperOptions2,
      thumbs: {
        swiper: swiperThumbs.value,
      },
    })
  })
})
</script>

<template>
  <div class="swiperThumbs">
    <div :id="id2" style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper2">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in slideData" :key="`${id2}_${index}`">
          <img class="aspect-[320/180] rounded-[10px] object-cover md:aspect-[300/168] lg:aspect-[16/9]" :src="item as string" />
        </div>
      </div>
    </div>
    <div :id="id" class="swiper mySwiper mt-[10px] md:mt-5">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in slideData" :key="`${id}_${index}`">
          <img class="aspect-[165/92] rounded-[4px] object-cover lg:aspect-[16/9] lg:rounded-[2px]" :src="item as string" />
        </div>
      </div>
    </div>
    <div class="mt-[6px] flex justify-between md:mt-[10px] lg:mt-5">
      <div class="flex items-center">
        <div :id="paginationId" class="swiper-pagination"></div>
      </div>

      <div class="custom-navigation | flex gap-3 lg:gap-[30px]">
        <button :class="{ '!text-sec-light !pointer-events-none': currentRealIndex === 0 }" class="custom-prev">
          <svg class="hidden lg:block" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <svg class="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          :class="{ '!text-sec-light !pointer-events-none': currentRealIndex === slideData.length - 1 }"
          class="custom-next"
        >
          <svg class="hidden lg:block" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
          <svg class="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiperThumbs .custom-prev,
.swiperThumbs .custom-next {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #cea859;
  transition: 0.3s;
  @media screen and (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }
}

.swiperThumbs .custom-prev:hover,
.swiperThumbs .custom-next:hover {
  color: #90742d;
}

.swiperThumbs :deep(.swiper-pagination) {
  /* position: static; */
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1024px) {
    gap: 15px;
  }
}

/* 使用 deep 選擇器來覆蓋 Swiper 原本的樣式 */
.swiperThumbs :deep(.swiper-pagination-bullet) {
  margin: 0 !important;
  width: 8px !important;
  height: 8px !important;
  background-color: #cea859 !important;
  border-radius: 15px !important;
  transition: 0.3s ease !important;
  cursor: pointer !important;
  opacity: 1;
  @media screen and (min-width: 1024px) {
    width: 15px !important;
    height: 15px !important;
  }
}

.swiperThumbs :deep(.swiper-pagination-bullet-active) {
  background-color: #327248 !important;
  width: 28px !important;
  height: 8px !important;
  @media screen and (min-width: 1024px) {
    width: 45px !important;
    height: 15px !important;
  }
}

/* 你的樣式保持不變 */
.swiperThumbs .swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiperThumbs .swiper-slide {
  background-size: cover;
  background-position: center;
}

.swiperThumbs .mySwiper2 {
  height: 80%;
  width: 100%;
}

.swiperThumbs .mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 2px;
}

.swiperThumbs .mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 1;
}

.swiperThumbs .mySwiper .swiper-slide-thumb-active {
  outline: solid 2px #327248;
  border-radius: 4px;
  @media screen and (min-width: 1024px) {
    border-radius: 2px;
  }
}

.swiperThumbs .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiperThumbs .swiper-fade .swiper-slide {
  transition-duration: 0.3s !important; /* 強制覆蓋 Swiper 預設值 */
}
</style>
