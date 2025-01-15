<template>
  <div class="headerRight">
    <search></search>
    <FullScreen></FullScreen>
    <BrightMode></BrightMode>
    <Languages></Languages>
    <Notice></Notice>
    <Set></Set>
  </div>
</template>

<script setup>
import BrightMode from './brightMode.vue';
import Set from './set.vue';
import Languages from './language.vue';
import FullScreen from './fullScreen.vue';
import Notice from './notice.vue'
import search from './search.vue';
</script>

<style scoped>
.headerRight{
  display: flex;
  align-items: center;
  justify-content: center;
  gap:5px;
  /* background-color: #97d4d4; */
  margin-left: 20px;
}
</style>