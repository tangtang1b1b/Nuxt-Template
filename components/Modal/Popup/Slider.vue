<script setup lang="ts">
interface Props {
  modelValue?: boolean
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  isOpen: false,
})

const { modelValue, isOpen } = toRefs(props)

const items = ref<string[]>([
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
])

const emits = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const closeModal = () => {
  emits('update:modelValue', false)
}
</script>

<template>
  <div class="fixed inset-0" v-if="modelValue">
    <Teleport to="#modalsField">
      <AtomBackdrop class="pointer-events-auto" :is-open="isOpen" @click="closeModal" />
      <Transition name="fade" appear>
        <div
          class="pointer-events-auto absolute left-1/2 top-1/2 flex w-[700px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[22px] bg-white px-[30px] py-[18px] shadow-popup"
        >
          <div>
            <ModalSliderBasic id="default_slider" pagination-id="default_slider_Pagination" :slide-data="items" :autoplay="false">
              <template #default="{ slotSlideData, slotIndex }">
                <div class="swiper-slide" v-for="(slide, index) in slotSlideData" :key="index">
                  <img class="aspect-[16/9] size-full rounded-lg object-cover" :src="fetchImg(slide as string)" alt="slide" />
                </div>
              </template>
            </ModalSliderBasic>
            <div class="mt-5 text-center text-[15px] font-medium leading-[26px] text-[#333333]">為保障求職者權益，特此聲明</div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transform: translate(-50%, -50%);
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, -30%);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translate(-50%, -50%);
  opacity: 1;
}
</style>
