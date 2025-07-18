<script setup lang="ts">
interface Props {
  data: {
    title: string
    desc: string
  }
}

import { useAllStore } from '@/store/all'

const { windowWidth } = toRefs(useAllStore())

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    title: '問題標題',
    desc: '問題描述',
  }),
})

const { data } = toRefs(props)

const content = ref<HTMLDivElement | null>(null)
const contentHeight = ref<number>(0)
const isOpen = ref<boolean>(false)

const init = () => {
  if (content.value) {
    contentHeight.value = content.value.scrollHeight
  }
}

onMounted(() => {
  init()
  watch(windowWidth, () => {
    isOpen.value = false
    nextTick(() => {
      init()
    })
  })
})
</script>

<template>
  <div class="">
    <div class="relative flex flex-col content-center overflow-hidden rounded-md border text-lg font-bold">
      <div
        @click="isOpen = !isOpen"
        class="flex h-auto cursor-pointer select-none items-center justify-between bg-[#eee] px-5 py-2 duration-300 hover:bg-[#e0e0e0]"
      >
        <div class="">
          <slot name="question">
            {{ data.title }}
          </slot>
        </div>
        <AtomIcon :class="[isOpen ? 'rotate-[135deg]' : '']" name="plus" :size="20" class="cursor-pointer duration-300" />
      </div>
      <div class="pointer-events-none">
        <div
          ref="content"
          :style="{ height: isOpen ? `${contentHeight}px` : '0' }"
          class="whitespace-pre-line bg-white text-md duration-300"
        >
          <p class="px-6 py-4">{{ data.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
