import { useAllStore } from '@/store/all'

export const useLoadingWatcher = (index: number | string) => {
  const { tagChange } = toRefs(useAllStore())
  watch(() => index, () => {
    tagChange.value = true
    setTimeout(() => {
      tagChange.value = false
    }, 500)
  })
}
