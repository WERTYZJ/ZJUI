<template>

  <div :class="{'star-left-24':props.size==='default','star-left-32':props.size==='large','star-left-20':props.size==='small'}">
    <img src="@/assets/ZJUI/ZJRate/star-p1.svg" alt="全星" v-for="n in fullStars" :key="n">  
    <img src="@/assets/ZJUI/ZJRate/star-p2.svg" alt="空星" v-for="n in (5-fullStars)" :key="n"> 
    <a>{{ props.rate }}</a>
  </div>

</template>

<script setup>

import { defineProps,computed } from 'vue';

const props = defineProps({
  rate:{
    type: [String, Number],  
    default: null,
    // validator: function(value) {  
    //   return typeof value === 'number' && !isNaN(value) && isFinite(value) && value >= 0 && value <= 5;  
    // }
  },
  size:{
     type: [String],  
     default: 'default',
  }
})
 // 使用计算属性来处理星星的显示逻辑  
const fullStars = computed(() => {
  return Math.floor(Number(props.rate));
})
</script>

<style scoped>
/*  */
/* normal */
/*  */
.star-left-32{
/* background-color: aqua; */
display: flex;
justify-content: center;
align-items: center;
}
.star-left-32 a{
margin-left: 5px;
font-size: 26px;
font-weight: 950;
color: var( --ZJ-main-text-color);
}
.star-left-32 img{
  margin: 0 5px 0 0 ;
  width: 32px;
  height: 32px;
}

/*  */
/* size=24px */
/*  */
.star-left-24{
/* background-color: #9df791; */
display: flex;
justify-content: center;
align-items: center;
}
.star-left-24 a{
margin-left: 5px;
font-size:20px;
font-weight:600;
color: var( --ZJ-main-text-color);
}
.star-left-24 img{
margin: 0 5px 0 0 ;
width: 24px;
height: 24px;
}

/*  */
/* size=20px */
/*  */
.star-left-20{
/* background-color: #9df791; */
display: flex;
justify-content: center;
align-items: center;
}
.star-left-20 a{
margin-left: 5px;
font-size:18px;
font-weight:600;
color: var( --ZJ-main-text-color);
}
.star-left-20 img{
margin: 0 5px 0 0 ;
width: 20px;
height: 20px;
}
</style>