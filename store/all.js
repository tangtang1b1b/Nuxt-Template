import { defineStore } from 'pinia'

export const useAllStore = defineStore('all', () =>{
  const windowWidth = ref(0)

  return {
    windowWidth
  }
})