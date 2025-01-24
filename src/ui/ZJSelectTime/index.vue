<template>  
  <div class="custom-select" >  
    <div class="selected" @click="toggleDropdown">
      <a>{{ selectedText || label }}</a> 
      <ZJSvgIcons icon="select"
        :class="{'ZJRotate-icon-open': isIconOpen, 'ZJRotate-icon-close': !isIconOpen}"
      ></ZJSvgIcons>
    </div>
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
      isIconOpen:false, 
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
      this.isIconOpen = false;
      this.isDropdownVisible = false
    },
    // 点击外隐藏
    handleOutsideClick(e) {  
      // 检查点击是否发生在下拉框或其子元素之外  
      if (!this.$el.contains(e.target) && this.isDropdownVisible) {  
        this.isDropdownVisible = false; 
        this.isIconOpen = false;  
      }  
    }, 
    // 下拉
    toggleDropdown() {  
      this.isDropdownVisible = !this.isDropdownVisible;
      this.isIconOpen = !this.isIconOpen; 
    },  
    // 选择
    selectItem() { 
        const Date = this.HourVal + ':' + this.MinutesVal + ':' + this.SecondVal;
        this.$emit('ZJSelectTimeVal', Date);  
        this.selectedText = Date;  
        this.isDropdownVisible = false; 
        this.isIconOpen = false;  
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
  border-radius:var(--ZJ-main-border-radius);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px 8px;
  background: var(--ZJ-main-message-color);
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  font-weight: normal;
  line-height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  color: var(--ZJ-main-text-color);
  cursor: default;
}
.main-box-select:hover{
 background-color: var(--ZJ-main-hover);
 color: var(--ZJ-main-text-color);
}
.main-box-selected,.main-box-selected:hover{
  background-color:#F2F3FF;
  color: #7050E8;
}
.bottom{
  /* background-color: antiquewhite; */
  border:var(--ZJ-main-border-light);
  display: flex;
  justify-content: end;
  gap: 20px;
  padding: 10px;
}
.bottom-left-btn{
  background: var(--ZJ-main-message-color);
  border: none;
  padding: 2px 5px;
  border-radius: 3px;
  border:var(--ZJ-main-border-light);
  color: var( --ZJ-main-text-color);
}
.bottom-right-btn{
  background-color:var(--ZJ-default-main);
  border: none;
  padding: 2px 5px;
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
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  text-align: right;
  color: var(--ZJ-main-text-color);
}

.custom-select {  
  position: relative;  
  /* display: inline-block;   */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
}  
.selected { 
  background: var(--ZJ-main);
  height:32px;
  border-radius:var(--ZJ-main-border-radius);
  padding:0 12px 0 15px;
  border:var(--ZJ-main-border-light);
  gap: 5px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  font-size: 14px;
  font-weight: normal;
  color: var(--ZJ-main-text-label-color);
}   
.dropdown {  
  position: absolute;  
  top:47px;
  width: 100%;
  min-width: 300px;
  max-height:300px;
  min-height: 100%;
  transition: height 0.2s;
  border-radius:var(--ZJ-main-border-radius-dropdown);
  box-shadow:var(--ZJ-main-box-shadow);
  border: var(--ZJ-main-border-light);  
  background-color:var( --ZJ-main-message-color);
  z-index:2;  
} 
.dropdown::after {  
  content: '';
  top: -9px;
  position: absolute;
  left: calc(50% - 5px);
  width: 0;
  height: 0; 
  transform: rotate(-45deg);
  border-top:solid 15px var(--ZJ-main-message-color);
  border-left:solid 15px  transparent;
  border-bottom:solid 15px transparent;
  z-index:2;  
} 
.dropdown::before {  
  content: '';
  top: -10px;
  position: absolute;
  left: calc(50% - 5px);
  width: 0;
  height: 0; 
  transform: rotate(-45deg);
  border-top:solid 15px #DCDCDC;
  border-left:solid 15px  transparent;
  border-bottom:solid 15px transparent;
  z-index:2;  
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