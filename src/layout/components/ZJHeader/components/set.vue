<template>
  <div class="ZJHeaderToolsBox" @click="open('openRight')">
    <ZJSvgIcons icon="set"></ZJSvgIcons>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store';
const userStore = useUserStore();


function open(action) {
  if (action === 'openRight') {
    userStore.layout.showSet = true
  }
}

</script>

<style scoped></style>