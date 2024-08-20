<script setup>
const data = ref([
  {
    content: '首頁',
    url:'/',
  },
  {
    content: 'demo',
    url:'/demo',
  },
])
</script>

<template>
  <div>
    <LayoutHeader :data="data" />
    <div class="min-h-screen pt-[75px]">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<style scoped></style>
