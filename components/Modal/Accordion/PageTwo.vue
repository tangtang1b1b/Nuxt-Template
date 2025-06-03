<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      perPage: 10,
      currentPage: 1,
      lastPage: 20,
      total: 200,
    }),
  },
})
const { data } = toRefs(props)

const emits = defineEmits(['upload:page'])

const currentPage = ref(1)
const changePage = (page) => {
  if (page === 0 || page === data.value.lastPage + 1) return
  currentPage.value = page
  emits('upload:page', currentPage.value)
}
</script>

<template>
  <div class="flex items-center">
    <div
      @click="changePage(currentPage - 1)"
      :class="{ 'pointer-events-none border-sec-lighter': currentPage === 1 }"
      class="cursor-pointer w-8 aspect-square flex justify-center items-center"
    >
      <AtomIcon name="arrow" :size="10" :class="{ 'text-pr-light': currentPage === 1 }" class="rotate-180 text-pr hover:text-pr-dark duration-300" />
    </div>
    <div v-if="data.lastPage <= 7" class="flex items-center gap-[18px] pb-1 md:gap-6">
      <div
        v-for="index in data.lastPage"
        @click="changePage(index)"
        :class="{ 'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === index }"
        class="cursor-pointer items-center w-8 flex justify-center aspect-square text-pr text-sm hover:text-pr-dark duration-300"
      >
        {{ index }}
      </div>
    </div>
    <div v-else class="flex items-center">
      <!-- previous -->
      <div
        @click="changePage(1)"
        :class="{ 'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === 1 && currentPage < 5 }"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        1
      </div>
      <span v-show="currentPage > 4" class="items-center tracking-[3.64px] text-gray-600 text-sm">...</span>
      <div
        @click="changePage(2)"
        :class="{ 'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === 2 && currentPage < 5 }"
        v-show="currentPage < 5"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        2
      </div>
      <div
        v-show="currentPage < 5"
        @click="changePage(3)"
        :class="{ 'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === 3 && currentPage < 5 }"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        3
      </div>
      <div
        v-show="currentPage < 5"
        @click="changePage(4)"
        :class="{ 'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === 4 && currentPage < 5 }"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        4
      </div>
      <div v-show="currentPage < 5" @click="changePage(5)" class="cursor-pointer items-center text-gray-600 text-sm w-8 aspect-square flex justify-center hover:text-pr-dark duration-300">5</div>
      <!-- mid -->
      <div
        v-show="currentPage > 4 && currentPage < data.lastPage - 3"
        @click="changePage(currentPage > 4 ? currentPage - 1 : 3)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ currentPage > 4 ? `${currentPage - 1}` : '3' }}
      </div>
      <div
        :class="{ 'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage > 4 && currentPage < data.lastPage - 3 }"
        v-show="currentPage > 4 && currentPage < data.lastPage - 3"
        @click="changePage(currentPage > 4 ? currentPage : 4)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ currentPage > 4 ? `${currentPage}` : '4' }}
      </div>
      <div
        v-show="currentPage > 4 && currentPage < data.lastPage - 3"
        @click="changePage(currentPage > 4 ? currentPage + 1 : 5)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ currentPage > 4 ? `${currentPage + 1}` : '5' }}
      </div>
      <!-- next -->
      <div
        :class="{
          'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === data.lastPage - 4 && currentPage > data.lastPage - 4,
        }"
        v-show="currentPage > data.lastPage - 4"
        @click="changePage(data.lastPage - 4)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ data.lastPage - 4 }}
      </div>
      <div
        :class="{
          'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === data.lastPage - 3 && currentPage > data.lastPage - 4,
        }"
        v-show="currentPage > data.lastPage - 4"
        @click="changePage(data.lastPage - 3)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ data.lastPage - 3 }}
      </div>
      <div
        :class="{
          'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === data.lastPage - 2 && currentPage > data.lastPage - 4,
        }"
        v-show="currentPage > data.lastPage - 4"
        @click="changePage(data.lastPage - 2)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ data.lastPage - 2 }}
      </div>
      <div
        :class="{
          'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === data.lastPage - 1 && currentPage > data.lastPage - 4,
        }"
        v-show="currentPage > data.lastPage - 4"
        @click="changePage(data.lastPage - 1)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ data.lastPage - 1 }}
      </div>
      <span
        v-show="currentPage < data.lastPage - 3"
        class="items-center w-8 aspect-square flex justify-center tracking-[3.64px] text-gray-600 text-sm"
        >...</span
      >
      <div
        :class="{
          'font-bold !text-pr-dark bg-gray-200 rounded-full': currentPage === data.lastPage && currentPage > data.lastPage - 4,
        }"
        @click="changePage(data.lastPage)"
        class="cursor-pointer items-center w-8 aspect-square flex justify-center text-gray-600 text-sm hover:text-pr-dark duration-300"
      >
        {{ data.lastPage }}
      </div>
    </div>
    <div
      @click="changePage(currentPage + 1)"
      :class="{ 'pointer-events-none': currentPage === data.lastPage }"
      class="cursor-pointer w-8 aspect-square flex justify-center items-center"
    >
      <AtomIcon name="arrow" :size="10" :class="{ 'text-pr-light': currentPage === data.lastPage }" class="text-pr hover:text-pr-dark duration-300" />
    </div>
  </div>
</template>

<style scoped></style>
