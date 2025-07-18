<script setup lang="ts">
interface Props {
  id?: string
  paginationId?: string
  slideData: unknown[]
  spaceBetween?: number
  autoplay?: boolean
  loop?: boolean
}

const { width } = useWindowSize()
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const props = withDefaults(defineProps<Props>(), {
  id: '',
  paginationId: '',
  slideData: () => [],
  spaceBetween: 24,
  autoplay: false,
  loop: true,
})

const { id, paginationId, spaceBetween, autoplay, slideData, loop } = toRefs(props)

const swiper = ref<Swiper | null>(null)
const nowIndex = ref<number>(0)

const getCoverflowEffect = (windowWidth: number) => {
  if (windowWidth < 1024) {
    return {
      rotate: 0,
      stretch: 40,
      scale: 0.75,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    }
  } else {
    return {
      rotate: 0,
      stretch: 75,
      scale: 0.7,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    }
  }
}

const swiperOptions = {
  effect: 'coverflow',
  speed: 500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  breakpoints: {
    350: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1.4,
      spaceBetween: 48,
    },
  },
  centeredSlides: true,
  loop: loop.value,
  on: {
    slideChangeTransitionEnd: (now: Swiper) => {
      nowIndex.value = now.realIndex
    },
    autoplayTimeLeft(s: Swiper, time: number, progress: number) {
      const bullets = document.querySelectorAll(`#${paginationId.value} .swiper-pagination-bullet`)
      bullets.forEach((bullet, i) => {
        const bar = bullet.querySelector('.progress-bar') as HTMLElement | null
        if (!bar) return

        if (i === s.realIndex) {
          bar.style.width = `${(1 - progress) * 100}%`
        } else {
          bar.style.width = '0%'
        }
      })
    },
  },
  navigation: {
    nextEl: `#${id.value}swiperNext`,
    prevEl: `#${id.value}swiperPrev`,
  },
  pagination: paginationId.value
    ? {
        el: `#${paginationId.value}`,
        clickable: true,
      }
    : false,
}

const initSwiper = () => {
  if (swiper.value && typeof swiper.value.destroy === 'function') {
    swiper.value.destroy(true, true)
  }

  const options = {
    ...swiperOptions,
    coverflowEffect: getCoverflowEffect(width.value),
  }

  Swiper.use([Navigation, Pagination, Autoplay, EffectCoverflow])
  swiper.value = new Swiper(`#${id.value}`, options)
}

watch(
  width,
  (newWidth) => {
    initSwiper()
  },
  { immediate: false },
)

onMounted(() => {
  initSwiper()
  nextTick(() => {
    const bullets = document.querySelectorAll(`#${paginationId.value} .swiper-pagination-bullet`)
    bullets.forEach((bullet) => {
      const bar = document.createElement('div')
      bar.classList.add('progress-bar')
      bullet.appendChild(bar)
    })
  })
})
</script>

<template>
  <div class="swiperContainer">
    <div :id="id" class="swiper">
      <div class="swiper-wrapper">
        <slot :slot-slide-data="slideData" :slot-index="nowIndex">
          <div class="swiper-slide" v-for="(slide, index) in slideData" :key="index">
            <img class="w-full" :src="slide as string" alt="slide" />
          </div>
        </slot>
      </div>
      <div class="pointer-events-none absolute top-0 z-2 flex h-full w-full items-center justify-between px-5">
        <div
          :id="`${id}swiperPrev`"
          class="swiper-button-prev | group pointer-events-auto cursor-pointer rounded-full bg-white/50 p-4 duration-300 hover:bg-white"
        >
          <AtomIcon name="arrow" :size="24" class="rotate-180 text-white duration-300 group-hover:text-black" />
        </div>
        <div
          :id="`${id}swiperNext`"
          class="swiper-button-next | group pointer-events-auto cursor-pointer rounded-full bg-white/50 p-4 duration-300 hover:bg-white"
        >
          <AtomIcon name="arrow" :size="24" class="text-white duration-300 group-hover:text-black" />
        </div>
      </div>
      <div :id="paginationId" class="swiper-pagination | pointer-events-auto mt-[18px]"></div>
    </div>
  </div>
</template>

<style scoped>
.swiperContainer :deep(.swiper-pagination) {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}
.swiperContainer :deep(.swiper-pagination .swiper-pagination-bullet) {
  position: relative;
  width: 74px !important;
  height: 10px !important;
  background-color: #d9d9d999 !important;
  border-radius: 100px !important;
  transition: 0.3s ease !important;
  cursor: pointer !important;
}
.swiperContainer :deep(.swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active) {
  background-color: #d9d9d999 !important;
}
.swiperContainer :deep(.swiper-pagination .progress-bar) {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #1da539;
  border-radius: 100px;
}
</style>
