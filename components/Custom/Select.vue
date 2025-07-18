<script setup lang="ts">
interface Props {
  options: { name: string; value: string }[]
  placeholder?: string
  id?: string
}

interface Option {
  name: string
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: '請選擇',
  id: '',
})

const { options, placeholder, id } = toRefs(props)

const isClick = ref<boolean>(false)
const emit = defineEmits<{ 'update:word': [value: string] }>()
const selected = ref<Option | null>(null)

const closeDropdown = (e: MouseEvent) => {
  const element = document.querySelector(`#${id.value}`) as HTMLElement | null
  if (!element?.contains(e.target as Node)) {
    isClick.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

watch(selected, () => {
  if(selected.value) {
    emit('update:word', selected.value.value)
  }
})
</script>

<template>
  <div class="relative z-1 w-full">
    <div
      :id="id"
      @click.stop="isClick = !isClick"
      class="relative flex w-full cursor-pointer appearance-none justify-between rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-txt-light focus-visible:outline-txt-light"
    >
      <div :class="{ 'text-gray-900': selected }" class="pointer-events-none text-gray-400">
        {{ selected ? selected.name : placeholder }}
      </div>
      <div
        :class="{ 'pointer-events-auto opacity-100': isClick }"
        class="pointer-events-none absolute left-0 top-full mt-2 flex w-full flex-col rounded-md border-[1px] border-gray-300 bg-white opacity-0 duration-300"
      >
        <div @click="selected = option" class="px-4 py-2 text-gray-400 hover:bg-[#EFEFEF]" v-for="option in options">{{ option.name }}</div>
      </div>
    </div>
    <AtomIcon name="arrow" :size="14" class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[#94a3b8]" />
  </div>
</template>

<style scoped>
option {
  border-radius: 5px;
}
</style>
