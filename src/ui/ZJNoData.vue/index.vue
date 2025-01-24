<template>  
  <div :class="{'noMoreData':true,'noMoreData150':size==150,'noMoreData100':size==100,'noMoreData50':size==50,'noMoreDataAuto':size=='auto'}">
  <img v-if="icon==1" src="@/assets/ZJUI/ZJNoData/NoMoreData.png" alt="">
  <img v-if="icon==2" src="@/assets/ZJUI/ZJNoData/MessageListAvatar.svg" alt="">
  <p>{{ label }}</p>
  </div>
</template>  
  
<script>

export default {
  props: { 
    icon:{
      type: [String, Number],  
      default: null  
    }, 
    label:{
      type: [String, Number],  
      default: null  
    },
    size:{
      type: [String, Number],  
      default: null  
    },
  },  
  data() {  
    return {  
     
    };  
  },
  methods: {},  
};  
</script>  
  
<style scoped>  
.noMoreData{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 400px;
  width: 100%;
  /* background-color: antiquewhite; */
}
.noMoreData img{
  max-width:200px;  
  min-width:100px;  
  height:200px;
  width: 100%; /* 使图片宽度自适应容器宽度 */  
  height: auto; /* 保持图片原始宽高比 */  
  object-fit: contain; /* 保持宽高比，缩放以适应容器 */  
  /* background-color: #85b5bb; */
}
.noMoreData p{
  font-family: "Courgette";
  font-size: 30px;
}

/* 150 */
.noMoreData150{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 300px;
  width: 100%;
  /* background-color: antiquewhite; */
}
.noMoreData150 img{
  max-width:150px;  
  min-width:100px;  
  height:150px;
  width: 100%; /* 使图片宽度自适应容器宽度 */  
  height: auto; /* 保持图片原始宽高比 */  
  object-fit: contain; /* 保持宽高比，缩放以适应容器 */  
  /* background-color: #85b5bb; */
}
.noMoreData150 p{
  font-family: "Courgette";
  font-size: 25px;
}

/* 100 */
.noMoreData100{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 170px;
  width: 100%;
  /* background-color: antiquewhite; */
}
.noMoreData100 img{
  max-width:100px;  
  min-width:80px;  
  height:150px;
  width: 100%; /* 使图片宽度自适应容器宽度 */  
  height: auto; /* 保持图片原始宽高比 */  
  object-fit: contain; /* 保持宽高比，缩放以适应容器 */  
  /* background-color: #85b5bb; */
}
.noMoreData100 p{
  font-size: 20px;
}

/* auto */
.noMoreDataAuto{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  /* background-color: antiquewhite; */
}
.noMoreDataAuto img{
  max-width:150px;  
  min-width:100px;  
  height:150px;
  width: 100%; /* 使图片宽度自适应容器宽度 */  
  height: auto; /* 保持图片原始宽高比 */  
  object-fit: contain; /* 保持宽高比，缩放以适应容器 */  
  /* background-color: #85b5bb; */
}
.noMoreDataAuto p{
  font-size: 20px;
}
</style>