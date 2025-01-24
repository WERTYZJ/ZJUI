<template>  
  <div class="loader-main"> 
      
    <div class="loader-main-box">
      <div class="loader-ico"></div>
      <div class="loader-main-box-center" v-if="isProgress=='true'">
        <a class="loader-main-box-center-left">{{fileName}}</a>
        <a>{{ FileSize(FinishCount) }}/{{ FileSize(AllCount) }}</a>
      </div>
      <div class="loader-main-box-bottom" v-if="isProgress=='true'">
        <div class="main" ref="main">
          <div class="finish" ref="finish"></div>
        </div>
      </div>
    </div>
  </div>
</template>  
  
<script>
import FileSize from '@/tools/fileSizeTool';
export default {  
  props: { 
    fileName: {  
      type: [String, Number],  
      default: null  
    },  
    AllCount: {  
      type: [String, Number],  
      default: null  
    },
    FinishCount:{
      type: [String, Number],  
      default: null  
    },
    isProgress:{
      type: [String, Number],  
      default: null  
    },
  }, 
  data() {
    return {}
  },
  computed: {
    FileSize(){
			return FileSize();
		},
	},
  watch:{
    FinishCount(){
      var finishProgress = Math.floor(this.FinishCount/(this.AllCount/100));
      this.Progress(finishProgress);
   },
  },
  methods: {
    Progress(finishProgress){
      this.$refs.finish.style.width = `${ (350/100) * finishProgress }px`
    },
  }
}  
</script>  
  
<style scoped>  

.loader-main{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:var(--ZJ-main-message-color);
  opacity: 0.96;
  z-index:1000;
}
.loader-ico {  
  width: 48px;  
  height: 48px;  
  margin: auto;  
  position: relative;  
  /* background-color: aqua */
}  
  
.loader-ico:before {  
  content: '';  
  width: 48px;  
  height: 5px;  
  background: var(--ZJ-default-main-hover);
  /* background: #f0808050;   */
  position: absolute;  
  top: 60px;  
  left: 0;  
  border-radius: 50%;  
  animation: shadow324 0.5s linear infinite;  
}  
  
.loader-ico:after {  
  content: '';  
  width: 100%;  
  height: 100%;  
  /* background: #f08080;   */
  background-color: var(--ZJ-default-main);
  position: absolute;  
  top: 0;  
  left: 0;  
  border-radius: 4px;  
  animation: jump7456 0.5s linear infinite;  
}  
/*  */
/* center */
/*  */
.loader-main-box{
  margin: 0 10px;
  /* background-color: rgb(136, 201, 245); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
}
.loader-main-box-center{
  margin-top:40px;
  /* background-color: hsl(115, 100%, 75%); */
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: normal;
  color: var(--ZJ-main-text-color);
}
.loader-main-box-center-left{
  max-width: 200px;
  /* background-color: #d295d8; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.loader-main-box-bottom{
  /* background-color: hwb(330 9% 56%); */
  width: 100%;
  margin-top: 10px;
}
.main{
position: relative;
max-width: 350px;
min-width: 200px;
height: 16px;
border-radius:10px;
background: rgba(112, 80, 232, 0.1804);
}
.finish{
position: absolute;
max-width:350px;
left: 0px;
height: 16px;
border-radius:10px;
background: #7050E8;
transition: all 0.3s ease;
}
@keyframes jump7456 {  
  15% {  
    border-bottom-right-radius: 3px;  
  }  
  
  25% {  
    transform: translateY(9px) rotate(22.5deg);  
  }  
  
  50% {  
    transform: translateY(18px) scale(1, .9) rotate(45deg);  
    border-bottom-right-radius: 40px;  
  }  
  
  75% {  
    transform: translateY(9px) rotate(67.5deg);  
  }  
  
  100% {  
    transform: translateY(0) rotate(90deg);  
  }  
}  
  
@keyframes shadow324 {  
  0%, 100% {  
    transform: scale(1, 1);  
  }  
  
  50% {  
    transform: scale(1.2, 1);  
  }  
}  
</style>