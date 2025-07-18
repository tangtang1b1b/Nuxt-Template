import { useAllStore } from '@/store/all'

export function useLoadingHandler() {
  const { isLoading } = toRefs(useAllStore())

  const setLoadingComplete = async () => {
    await nextTick()
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  return { setLoadingComplete }
}
