<template>
  <div class="welcome-footer">
    <p>{{t('layout.welcome-footer.t1')}}</p>
    <p>{{ t('layout.welcome-footer.t2') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const {t} =useI18n()
</script>

<style scoped>
.welcome-footer {
  max-width: 1200px;
  min-width: auto;
  padding:32px;
  width: 100%;
  box-sizing: border-box;
  /* background-color: #00ff40; */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:5px;
  color: var(--ZJ-main-text-label-color);
}
</style>

