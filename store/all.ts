import { defineStore } from 'pinia'

interface AllData {
  [key: string]: any
}

export const useAllStore = defineStore('all', () =>{
  const windowWidth = ref<number>(0)
  const allData = ref<AllData>({})
  const isScroll = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const tagChange = ref<boolean>(false)

  return {
    windowWidth,
    allData,
    isScroll,
    isLoading,
    tagChange
  }
})