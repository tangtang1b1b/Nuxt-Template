<script setup></script>

<template>
  <div class="flex h-[calc(100vh-75px)] flex-col items-center justify-center gap-3 bg-white">
    <p class="text-center text-xl font-bold">模板</p>
    <div class="flex w-full justify-center">
      <nuxt-link class="w-[250px]" to="/demo">
        <AtomButton class="bg-black text-xl text-white duration-300 hover:bg-white hover:text-black border border-black">Demo</AtomButton>
      </nuxt-link>
    </div>
    <Cursor :colorful="true" />
  </div>
</template>

<style scoped></style>
