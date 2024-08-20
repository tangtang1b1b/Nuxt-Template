<script setup>
const props = defineProps({
  userCode: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    default: ''
  },
})
const { userCode, userName } = toRefs(props)
</script>

<template>
  <div class="flex items-center gap-3 px-5">
    <div class="size-[70px] overflow-hidden rounded-full">
      <img :src="fetchImg('/dog512.png')" alt="user" />
    </div>
    <div class="">
      <p>{{ userCode }}</p>
      <p>大樹藥局-{{ userName }}</p>
    </div>
  </div>
</template>

<style scoped></style>
