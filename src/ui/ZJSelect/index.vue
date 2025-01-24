<template>  
  <div :class="{ 'custom-select':this.size==null,'size40': this.size=='40',}">  
    <div class="selected" @click="toggleDropdown">
      <a>{{ selectedText || label }}</a>
      <ZJSvgIcons icon="select"
        :class="{'ZJRotate-icon-open': isIconOpen, 'ZJRotate-icon-close': !isIconOpen}"
      ></ZJSvgIcons>
      <!-- <img ref="img" src="../assets/ui/select.svg" alt=""> -->
    </div> 
    <Transition name="Select"> 
    <div class="dropdown" v-if="isDropdownVisible">  
      <ul>  
        <li v-for="item in options" :key="item.value" @click="selectItem(item)">  
          {{ item.label || item }}  
        </li>  
      </ul>  
    </div> 
    </Transition> 
  </div>  
</template>  
  
<script>

export default {  
  name: 'ZJDropDownSelect',  
  props: {  
    options: {  
      type: Array,  
      required: true,  
      default: () => []  
    },  
    value: {  
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
      selectedText: this.label ? this.findOptionText(this.label) : '',  
      isDropdownVisible: false,
      isIconOpen:false,
    };  
  },  
  mounted() {  
    // console.log(this.size)
    document.addEventListener('click', this.handleOutsideClick);  
  },  
  beforeUnmount() {  
    document.removeEventListener('click', this.handleOutsideClick);  
  },
  methods: { 
    handleOutsideClick(e) {  
      // 检查点击是否发生在下拉框或其子元素之外  
      if (!this.$el.contains(e.target) && this.isDropdownVisible) {  
        this.isDropdownVisible = false;  
        this.isIconOpen = false;
      }  
    }, 
    toggleDropdown() {  
      this.isDropdownVisible = !this.isDropdownVisible;
      if(this.isDropdownVisible===true){
        this.isIconOpen = true;
      }else if(this.isDropdownVisible===false){
        this.isIconOpen = false;
      }
       
    },  
    selectItem(item) {  
      this.$emit('ZJSelectVal',item.value || item);  
      this.selectedText = item.label || item;  
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
.custom-select {  
  position: relative;  
  /* display: inline-block;   */
  display: flex;
  justify-content: center;
  align-items: center;
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
.dropdown {  
  position: absolute;  
  top:47px;
  width: 100%;
  border-radius:var(--ZJ-main-border-radius-dropdown);
  max-height:200px;
  min-height: 100%;
  box-shadow:var(--ZJ-main-box-shadow);
  border: var(--ZJ-main-border-light);  
  background-color:var( --ZJ-main-message-color);
  z-index:2;  
}  
.dropdown ul {  
  list-style: none;  
  padding: 0;  
  margin: 5px 0;  
  overflow: auto;
  max-height:180px;
  height: 100%;
}  
.dropdown li {  
  padding:8px 20px;  
  cursor: pointer; 
  font-size: 14px;
  color:var(--ZJ-main-text-color); 
}  
.dropdown li:hover {  
  background: var(--ZJ-default-main-hover);
}
</style>