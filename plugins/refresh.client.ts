import { useAllStore } from '@/store/all'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { isLoading } = toRefs(useAllStore())

  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })

  router.afterEach((to, from) => {
    if (to.fullPath === from.fullPath) {
      return
    }
  })
})
