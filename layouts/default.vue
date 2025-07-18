<script setup lang="ts">
import { useAllStore } from '@/store/all'
const { allData } = toRefs(useAllStore())
const { data } = await fetchRestful({ apiPath: '/data/index.json' })
allData.value = data as typeof allData.value

await useLoadingHandler().setLoadingComplete()
</script>

<template>
  <div>
    <LayoutHeader :data="allData?.menu" />
    <main class="mx-auto min-h-screen max-w-[1920px] pt-[70px]">
      <slot />
    </main>
    <LayoutFooter />
    <div id="modalsField" class="pointer-events-none fixed inset-0 z-[2000]"></div>
    <!-- <Cursor colorful /> -->
  </div>
</template>

<style scoped></style>
