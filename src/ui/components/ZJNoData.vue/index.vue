<template>
  <div class="noMoreData" :style="iconStyle">
    <img v-if="icon==1" style="iconStyle"  src="@/assets/images/ZJUI/ZJNoData/empty-1.svg" alt="">
    <img v-if="icon==2" style="iconStyle"  src="@/assets/images/ZJUI/ZJNoData/empty-2.svg" alt="">
    <p :style="fontStyle">{{ props.label }}</p>
  </div>
</template>  
  
<script setup>

const props =defineProps({
  icon: {
    type: [String, Number],
    default: null
  },
  label: {
    type: [String, Number],
    default: null
  },
  fontStyle:{
    type: Object,
    default: () => ({
      fontSize: '20px',
      color:'var(--ZJ-main-text-label-color)',
    })
  },
  iconStyle:{
    type: Object,
    default: () => ({
      color:'#7050E8',
    })
  },
})
</script>  
  
<style scoped> 
 .noMoreData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 400px;
    width: 100%;
    /* background-color: antiquewhite; */
  }

  p {
    color: var(--ZJ-main-text-label-color);
  }

  .noMoreData img {
    max-width: 200px;
    min-width: 100px;
    height: 200px;
    width: 100%;
    /* 使图片宽度自适应容器宽度 */
    height: auto;
    /* 保持图片原始宽高比 */
    object-fit: contain;
    /* 保持宽高比，缩放以适应容器 */
    /* background-color: #85b5bb; */
  }

  /* auto */
  .noMoreDataAuto {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100%;
    width: 100%;
    /* background-color: antiquewhite; */
  }

  .noMoreDataAuto img {
    max-width: 150px;
    min-width: 100px;
    height: 150px;
    width: 100%;
    /* 使图片宽度自适应容器宽度 */
    height: auto;
    /* 保持图片原始宽高比 */
    object-fit: contain;
    /* 保持宽高比，缩放以适应容器 */
    /* background-color: #85b5bb; */
  }

  .noMoreDataAuto p {
    font-size: 20px;
  }
</style>