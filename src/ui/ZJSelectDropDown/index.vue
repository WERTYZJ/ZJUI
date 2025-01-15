<template>  
  <div :class="{ 'custom-select':this.size==null, 'Tutor-Wallet': this.size=='Tutor-Wallet','size40': this.size=='40',}">  
    <div class="selected" @click="toggleDropdown"><a>{{ selectedText || label }}</a> <img ref="img" src="../assets/ui/select.svg" alt=""></div> 
    <Transition name="Select"> 
    <div class="dropdown" v-if="isDropdownVisible">  
      <ul>  
        <li v-for="item in options" :key="item.value" @click="selectItem(item)">  
          {{ item.value || item }}  
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
      selectedText: this.value ? this.findOptionText(this.value) : '',  
      isDropdownVisible: false  
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
        this.$refs.img.style.transform = 'rotate(0deg)';  
      }  
    }, 
    toggleDropdown() {  
      this.isDropdownVisible = !this.isDropdownVisible;
      if(this.isDropdownVisible===true){
        this.$refs.img.style.transform = 'rotate(180deg)'; 
      }else if(this.isDropdownVisible===false){
        this.$refs.img.style.transform = 'rotate(0deg)'; 
      }
       
    },  
    selectItem(item) {  
      this.$emit('input',item.name || item.value || item);  
      this.selectedText = item.value || item;  
      this.isDropdownVisible = false;  
      this.$refs.img.style.transform = 'rotate(0deg)'; 
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
.size40{
  position: relative;  
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
  align-items: center;

}
.size40 .selected { 
  /* background-color:#F2F2F2; */
  /* background-color: chocolate; */
  height: 40px;
  width:100%;
  border-radius:7px;
  position: relative;
  cursor: pointer; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
  font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0, 0.5);
} 
.size40 .selected a{
  margin: 0 7px 0 16px;
  /* background-color: aquamarine; */
}
.size40 .selected img{
  margin: 0 16px 0 7px;
  /* background-color: rgb(132, 20, 76); */
}


.Tutor-Wallet{
  position: relative;  
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
  align-items: center;

}
.Tutor-Wallet .selected { 
  /* background-color:#F2F2F2; */
  /* background-color: chocolate; */
  height: 40px;
  width: 250px;
  border-radius:7px;
  position: relative;
  cursor: pointer; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
  font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0, 0.5);
} 
.Tutor-Wallet .selected a{
  margin: 0 7px 0 16px;
  /* background-color: aquamarine; */
}
.Tutor-Wallet .selected img{
  margin: 0 16px 0 7px;
  /* background-color: rgb(132, 20, 76); */
}




.custom-select {  
  position: relative;  
  /* display: inline-block;   */
  display: flex;
  justify-content: center;
  align-items: center;
} 
.selected { 
  background-color:#F2F2F2;
  height: 40px;
  border-radius:10px;
  width: 100%;
  position: relative;
  cursor: pointer; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0, 0.5);
} 
.custom-select .selected a{
  margin: 0 10px 0 16px;
}
.custom-select .selected img{
  margin: 0 16px 0 10px;
}
 



img{
  transition: transform 0.3s ease;
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
  top:55px;
  width: 100%;
  border-radius:10px;
  max-height:200px;
  min-height: 100%;
  box-shadow: 0px 8px 16px 0px rgba(78,78,78,0.2);
  border: 1px solid #E4E7ED;  
  background-color: #FFFFFF;  
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
  padding: 10px 20px;  
  cursor: pointer; 
height:14px;
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: 100%;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0,0.6); 
}  
.dropdown li:hover {  
  background: rgba(112, 80, 232, 0.05);
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