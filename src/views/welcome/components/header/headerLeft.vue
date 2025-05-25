<template>
  <div class="m-flex m-gap-10 m-col-center" @click="userStore.layout.showWelcome = false;">
    <ZJSvgIcons icon="ZJUILogo" style="height:32px;width:32px;border-radius:10px;"></ZJSvgIcons>
    <span>{{t("welcome.header.t1")}}</span>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const userStore = useUserStore()
</script>

<style scoped>
span {
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  color: var(--ZJ-main-text-color);
}
@media (max-width:400px) {
  span{
    display: none;
  }
}
</style>

