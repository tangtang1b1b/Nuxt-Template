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
    <div class="size-10 overflow-hidden rounded-full">
      <img :src="fetchImg('/dog512.png')" alt="user" />
    </div>
    <div class="">
      <p>{{ userCode }} {{ userName }}</p>
    </div>
  </div>
</template>

<style scoped></style>
