<script setup lang="ts">
interface BreadcrumbItem {
  data: { name: string; href: string }[]
}

const props = withDefaults(defineProps<BreadcrumbItem>(), {
  data: () => [
    {
      name: '首頁',
      href: '/',
    },
    {
      name: '內頁',
      href: '/',
    },
    {
      name: '小內頁',
      href: '/',
    },
  ],
})

const { data } = toRefs(props)
</script>

<template>
  <div class="flex gap-2">
    <nuxt-link :to="index !== data.length - 1 ? item.href : ''" class="flex gap-2" v-for="(item, index) in data" :key="item.name">
      <p :class="{ 'text-txt-light': index !== data.length - 1 }">{{ item.name }}</p>
      <p v-show="index !== data.length - 1">/</p>
    </nuxt-link>
  </div>
</template>

<style scoped></style>
