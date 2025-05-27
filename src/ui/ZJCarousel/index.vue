<template>
  <div class="g-main">
    <div class="g-main-btn-left" @click="gotoPrev">
      <ZJSvgIcons icon="select" style="transform: rotate(90deg);"></ZJSvgIcons>
    </div>

    <div class="g-main-box">
      <div class="g-main-box-bar" v-for="(item, index) in CarouselVal" :key="index" 
      :class="getSlideClass(index)">
        <img :src="item?.img || '/assets/logo/logo.png'" @error="imgError" alt="">
        <div class="g-main-box-bar-right">
          <div class="g-main-box-bar-top">
            <p class="g-1">{{ item.name }}</p>
            <ZJRate :rate="item.rate"></ZJRate>
          </div>
          <p class="g-2"><a>{{ item.lessons }}</a></p>
          <p class="g-3">{{ item.content }}</p>
        </div>
      </div>
    </div>

    <div class="g-main-btn-right" @click="gotoNext">
      <ZJSvgIcons icon="select" style="transform: rotate(-90deg);"></ZJSvgIcons>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  DefaultVal:{
    type:Number,
    default:0,
  },
  CarouselVal:{
    type:Array,
    default:null,
  },
  SetTimeout:{
    type:Number,
    default:4000,
  }
})
onMounted(()=>{
  current.value = props.DefaultVal;
  BackGotoNext();
})
const current=ref(null)

function gotoPrev(){
  current.value = (current.value > 0) ? current.value - 1 : props.CarouselVal.length - 1;
}
function gotoNext(){
  current.value = (current.value < props.CarouselVal.length - 1) ? current.value + 1 : 0;
}
function BackGotoNext() { 
  setInterval(() => {  
    gotoNext();  
  }, props.SetTimeout);
}
function getSlideClass(index) {
  if (index === current.value) {
    return 'active';
  } else if (index === (current.value - 1 + props.CarouselVal.length) % props.CarouselVal.length) {
    return 'prev';
  } else if (index === (current.value + 1) % props.CarouselVal.length) {
    return 'next';
  }
  return '';
}
function imgError(event) {
  event.target.src = '/assets/logo/logo.png';
}
</script>

<style scoped>
.g-main{
  width: 100%;
  padding: 150px 0;
  height: 160px;
  /* background-color: #9B8CDF; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  color: var( --ZJ-main-text-color);
}
.g-main-box{
  max-width:700px;
  width: 700px;
  height:150px;
  /* background-color: hwb(0 10% 11%); */
  display: flex;
  position: relative;
  justify-content: center;
}
.g-main-box-bar{
  /* background-color: #F8BE00; */
  background-color:var(--ZJ-main-message-color);
  width:100%;
  max-width: 700px;
  border-radius: 20px;
  transition: all 0.8s ease;
  display: flex;
  position: absolute;
}
.g-main-box-bar img{
  height: 165px;
  width: 165px;
  border-radius: 20px 0 0 20px;
}
.g-main-box-bar-right{
  display: flex;
  flex-direction: column;
  padding:15px;
  gap: 10px;
  width:calc(100% - 40px);
}
.g-main-box-bar-top{
  display: flex;
  justify-content: space-between;
}
.prev{
  opacity:0.4;
  z-index: 0;
  transform: translate(-35%,0) scale(0.8);
}
.active{
  opacity: 1;
  z-index: 1;
  transform: translateX(0) scale(1.2);
  transition: all 0.8s ease; 
  box-shadow: 0 0 105px -35px rgba(0, 0, 0, 0.75);
}
.next{
  opacity:0.4;
  z-index: 0;
  transform: translate(35%,0) scale(0.8);
}
.g-main-btn-left,.g-main-btn-right{
  background-color:var( --ZJ-main-message-color);
  /* box-shadow: var(--ZJ-main-box-shadow); */
  border: var(--ZJ-main-border-light);
  height: 40px;
  width: 40px;
  padding: 5px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:2;
  cursor: pointer;
}
.g-main-btn-left:hover,.g-main-btn-right:hover{
  background-color:var(--ZJ-main-hover);
}
.g-main-btn-left{
  top: 45%;
  left: 0;
}
.g-main-btn-right{
  top: 45%;
  right: 0;
}
.g-1{
  font-size:22px;
  font-weight: 900;
  line-height: normal;
  z-index: 1;
}
.g-2{
  font-size:16px;
  display: flex;
  gap: 20px;
}
.g-3 {
  font-size:16px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: 0em;
  white-space: normal; /* 允许换行 */
  overflow: hidden;
  /* text-overflow: ellipsis; */
  display: -webkit-box; /* 使用弹性盒子布局 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  -webkit-line-clamp: 2;
  max-height: calc(2 * 1.6em);
}
</style>
