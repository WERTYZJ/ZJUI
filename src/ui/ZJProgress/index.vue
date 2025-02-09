<template>
  <div class="main" ref="main">
    <div class="finish" ref="finish"></div>
  </div>
</template>

<script>
export default{
  props: {   
    allCount: {  
      type: [String, Number],  
      default: null  
    }  ,
    finishCount:{
      type: [String, Number],  
      default: null  
    }
  }, 
  data() {
    return {
      MainWidth:'',
    }
  },
  mounted(){
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth);
    this.Progress();
  },
  unmounted() {
    window.removeEventListener('resize', this.updateWidth);
  },
  watch:{
    allCount(){
      this.Progress();
    },
    finishCount(){
      this.Progress();
    },
  },
  methods: {
   updateWidth(){
    this.MainWidth = this.$refs.main.offsetWidth;
    this.Progress()
   },
   Progress(){
    this.$refs.finish.style.width = `${(this.MainWidth/this.allCount)* this.finishCount}px`
   },
   
  }
}
</script>

<style scoped>
.main{
position: relative;
max-width: 400px;
min-width: 200px;
height: 12px;
border-radius: 104px;
/* background: rgba(112, 80, 232, 0.1804); */
background-color: var(--ZJ-default-main-hover);
}
.finish{
position: absolute;
max-width: 100%;
left: 0px;
height: 12px;
border-radius:10px;
/* background: rgba(112, 80, 232, 0.5); */
background-color: var(--ZJ-default-main);
transition: all 0.3s ease;
}
</style>