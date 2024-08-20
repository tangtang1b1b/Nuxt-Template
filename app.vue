<script setup>
import 'virtual:svg-icons-register'
import { useAllStore } from '@/store/all'
const { windowWidth } = toRefs(useAllStore())

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
