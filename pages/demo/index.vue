<script setup>
import { useAllStore } from '@/store/all'
const { windowWidth } = toRefs(useAllStore())

// select
const options = [
  { name: '科目1', value: 1 },
  { name: '科目2', value: 2 },
  { name: '科目3', value: 3 },
  { name: '科目4', value: 4 },
]

// 個人資料
const userData = {
  name: '員工01',
  code: '12345',
}

// 功能卡片
const items = [
  { name: '退貨掃描', icon: 'scan' },
  { name: '即時庫損', icon: 'scan' },
  { name: '請購紀錄', icon: 'scan' },
  { name: '安架紀錄', icon: 'scan' },
  { name: '自拍上傳', icon: 'scan' },
]
</script>

<template>
  <div class="space-y-5">
    <p>{{ windowWidth }}</p>
    <ModalProfile :user-code="userData.code" :user-name="userData.name" />
    <ModalInfo :user-code="userData.code" :user-name="userData.name" />
    <AtomBtnShadow center>關於</AtomBtnShadow>
    <AtomBtnShadow center>登出</AtomBtnShadow>
    <AtomBtnShadow center>版本編號 1.0</AtomBtnShadow>
    <ModalItemCard :items="items" />
    <AtomButton class="text-white" mode="secondary">開啟相機</AtomButton>
    <AtomButton class="text-white">查詢</AtomButton>
    <AtomSelect class="text-white" title="營業點" placeholder="請選擇門市" :options="options" />
    <AtomInput class="text-white" title="商品代號" placeholder="輸入商品代號、國際條碼" type="number" />
  </div>
</template>

<style scoped></style>
