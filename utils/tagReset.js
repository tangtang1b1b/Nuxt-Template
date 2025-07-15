import { useAllStore } from '@/store/all'

export const useLoadingWatcher = (watchedValue) => {
  const { tagChange } = toRefs(useAllStore())
  watch(watchedValue, () => {
    tagChange.value = true
    setTimeout(() => {
      tagChange.value = false
    }, 500)
  })
}
