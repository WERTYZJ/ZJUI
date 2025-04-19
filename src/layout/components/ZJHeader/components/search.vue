<template>
  <div class="ZJHeaderToolsBox" @click="open">
    <ZJSvgIcons icon="search"></ZJSvgIcons>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store';
const userStore = useUserStore();


const open = (() => {
  userStore.layout.showSearch = true
})

</script>

<style scoped></style>