<template>
  <div class="star-main">
    <ZJSvgIcons icon="start" 
      v-for="n in fullStars" :key="n" 
      class="star-img"
      :style="iconStyle"></ZJSvgIcons>
    <ZJSvgIcons icon="start" 
      v-for="n in (5-fullStars)" :key="n" 
      class="star-img"
      :style="iconEmptyStyle"></ZJSvgIcons>
    <a :style="fontStyle">{{ rate }}</a>
  </div>
</template>

<script setup>

const props = defineProps({
  rate:{
    type: [String, Number],  
    default: null,
  },
  fontStyle:{
    type: Object,
    default: () => ({
      fontSize: '18px',
      'margin-left': '5px',
      'font-weight':'600',
       color:'var(--ZJ-main-text-color)',
    })
  },
  iconStyle:{
    type: Object,
    default: () => ({
      color:'#7050E8',
    })
  },
  iconEmptyStyle:{
    type: Object,
    default: () => ({
      color:'var(--ZJ-default-main-hover3)',
    })
  }
})
 // 使用计算属性来处理星星的显示逻辑  
const fullStars = computed(() => {
  return Math.floor(Number(props.rate));
})
</script>

<style scoped>

.star-main{
  display: flex;
  justify-content: center;
  align-items: center;
}

.star-img{
  margin: 0 5px 0 0 ;
  width: 20px;
  height: 20px;
}
</style>