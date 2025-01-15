<template>  
  <div class="custom-select" >  
    <div class="selected" @click="toggleDropdown"><a>{{ selectedText || label }}</a> <img ref="img" src="../assets/Time2Select.png" alt=""></div>
    <Transition name="Select">  
    <div class="dropdown" v-if="isDropdownVisible">  
      <div class="header">      
        <span>{{ HourVal }} : {{MinutesVal}} : {{SecondVal}}</span>   
      </div>  
      <div class="main">  
        <div class="main-box"><div @click="HandelHour(item)" :class="{'main-box-select':true,'main-box-selected':this.HourVal===item}" v-for="item in Hour" :key="item"><a>{{ item }}</a></div></div>  
        <div class="main-box"><div  @click="HandelMinutes(item)" :class="{'main-box-select':true,'main-box-selected':this.MinutesVal===item}" v-for="item in Minutes" :key="item"><a>{{ item }}</a></div></div>  
        <div class="main-box"><div  @click="HandelSecond(item)" :class="{'main-box-select':true,'main-box-selected':this.SecondVal===item}" v-for="item in Second" :key="item"><a>{{ item }}</a></div></div>  
      </div> 
      <div class="bottom">
        <button class="bottom-left-btn" @click="Cancel()">Cancel</button>
        <button class="bottom-right-btn" @click="selectItem()">Ok</button>
      </div>
      
    </div> 
    </Transition> 
  </div>  
</template>  
  
<script>

export default {  
  name: 'Time2Select',  
  props: {  
    options: {  
      type: Array,  
      required: true,  
      default: () => []  
    },  
    value: {  
      type: [String, Number],  
      default: null  
    }  ,
    label:{
      type: [String, Number],  
      default: null  
    }
  },  
  data() {  
    return {
      SecondVal:'00' ,
      MinutesVal:'20' ,
      HourVal:'05' ,
      Second:Array.from({ length: 60 }, (v, i) => (i + 0).toString().padStart(2, '0')),
      Minutes: Array.from({ length: 60 }, (v, i) => (i + 0).toString().padStart(2, '0')),
      Hour:Array.from({ length:24 }, (v, i) => (i + 1).toString().padStart(2, '0')), 
      selectedText: this.value ? this.findOptionText(this.value) : '',  
      isDropdownVisible: false,  
    };  
  },  
  mounted() {  
    document.addEventListener('click', this.handleOutsideClick);  
  },  
  beforeUnmount() {  
    document.removeEventListener('click', this.handleOutsideClick);  
  },
  methods: { 
    // 点击小时
    HandelHour(item){
      this.HourVal = item
    },
    // 点击分钟
    HandelMinutes(item){
      this.MinutesVal = item
    },
    // 点击秒数
    HandelSecond(item){
      this.SecondVal = item
    },
    // 取消选择
    Cancel(){
      this.isDropdownVisible = false
    },
    // 点击外隐藏
    handleOutsideClick(e) {  
      // 检查点击是否发生在下拉框或其子元素之外  
      if (!this.$el.contains(e.target) && this.isDropdownVisible) {  
        this.isDropdownVisible = false;   
      }  
    }, 
    // 下拉
    toggleDropdown() {  
      this.isDropdownVisible = !this.isDropdownVisible; 
    },  
    // 选择
    selectItem() { 
        const Date = this.HourVal + ':' + this.MinutesVal + ':' + this.SecondVal;
        this.$emit('input', Date);  
        this.selectedText = Date;  
        this.isDropdownVisible = false; 
    },  
    findOptionText(value) {  
      return this.options.find(option => option.value === value)?.text || '';  
    }  
  },  
  watch: {  
    value(newVal, oldVal) {  
      if (newVal !== oldVal) {  
        this.selectedText = this.findOptionText(newVal);  
      }  
    }  
  }  
};  
</script>  
  
<style scoped> 
.main{
  /* background-color: aqua; */
  max-height:175px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
.main-box{
  width:100px;
  /* background-color: brown; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.main-box-select{
  margin: 0 0 10px 0;
width:50px;
height: 24px;
border-radius:3px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 1px 8px;
background: #FFFFFF;

font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: 24px;
text-align: center;
display: flex;
align-items: center;
letter-spacing: 0em;
color: rgba(0, 0, 0, 0.6);
cursor: default;
}
.main-box-select:hover{
 background-color: rgb(242, 242, 242);
 color: #000000;
}
.main-box-selected,.main-box-selected:hover{
  background-color:#F2F3FF;
  color: #7050E8;
}
.bottom{
  /* background-color: antiquewhite; */
  border-top: 1px solid #E7E7E7;
  display: flex;
  justify-content: end;
  gap: 20px;
  padding: 10px;
}
.bottom-left-btn{
  background-color: #FFFFFF;
  border: none;
  width: 55px;
  height: 24px;
  border-radius: 3px;
  border: 1px solid #E7E7E7;
  color: #7050E8;
}
.bottom-right-btn{
  background-color:#7050E8;
  border: none;
  width: 32px;
height: 24px;
border-radius: 3px;
margin-right:20px;
color: rgba(255, 255, 255, 0.9);
}



.header {  
  /* background-color: #7050E8; */
  display: flex;  
  align-items: center;  
  justify-content: center;
  padding: 10px;  
}
.header span{
font-family: AlibabaPuHuiTi;
font-size: 16px;
font-weight: normal;
line-height: normal;
text-align: right;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #000000;
}
button img{
  height: 20px;
  width: 20px;
}  







img{
  transition: transform 0.3s ease;
}
.custom-select {  
  position: relative;  
  /* display: inline-block;   */
  display: flex;
  justify-content: center;
  align-items: center;
}  
.selected a{
  margin-left: 16px;
}
.selected img{
  margin-right: 20px;
  height: 22px;
  width: 22px;
}
.selected { 
  background-color:#F2F2F2;
  padding: 10px 0;
  border-radius:10px;
  width: 100%;
  position: relative;
  cursor: pointer; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
height: 20px;
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0, 0.5);
}  
.dropdown::after {  
  content: '';
  top: -9px;
  position: absolute;
  left: calc(50% - 10.6px);
  width: 0;
  height: 0; 
  transform: rotate(-45deg);
  border-top:solid 15px #FFFFFF;
  border-left:solid 15px  transparent;
  border-bottom:solid 15px transparent;
  z-index:2;  
} 
.dropdown::before {  
  content: '';
  top: -10px;
  position: absolute;
  left: calc(50% - 10.6px);
  width: 0;
  height: 0; 
  transform: rotate(-45deg);
  border-top:solid 15px #E4E7ED;
  border-left:solid 15px  transparent;
  border-bottom:solid 15px transparent;
  z-index:2;  
} 
.dropdown {  
  position: absolute;  
  top:65px;
  width: 100%;
  border-radius:10px;
  max-height:300px;
  min-height: 100%;
  box-shadow: 0px 8px 16px 0px rgba(78,78,78,0.2);
  border: 1px solid #E4E7ED;  
  background-color: #FFFFFF;  
  z-index:2; 
  transition: height 0.2s; 
}   

/* 动画 */
.Select-enter-active,  
.Select-leave-active {  
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;  
  opacity: 0;  
  transform: translateY(-5%); 
}  
  
.Select-enter-to,  
.Select-leave-from { 
  opacity: 1;  
  transform: translateY(0); 
}   
.Select-leave-to {  
  opacity: 0;  
  transform: translateY(-5%); 
}

</style>