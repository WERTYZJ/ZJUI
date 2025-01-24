<template>  
  <div class="custom-select" >  
    <div class="selected" @click="toggleDropdown">
      <a>{{ StartSelectedText+EndSelectedText || label }}</a> 
      <ZJSvgIcons icon="select"
        :class="{'ZJRotate-icon-open': isIconOpen, 'ZJRotate-icon-close': !isIconOpen}"
      ></ZJSvgIcons>
    </div>
    <Transition name="Select">  
    <div class="dropdown" v-if="isDropdownVisible">
      <Transition name="Date">
      <div v-show="StartTime">
        <div class="header">  
        <button @click="prevMonth">
          <ZJSvgIcons icon="select" style="transform:rotate(90deg);"></ZJSvgIcons>
        </button>  
        <span>Start&nbsp;&nbsp;&nbsp;{{ currentYear }}&nbsp;&nbsp;{{ currentMonth+1 }}</span>  
        <button @click="nextMonth">
          <ZJSvgIcons icon="select" style="transform:rotate(270deg);"></ZJSvgIcons>
        </button>  
      </div>  
      <div class="weekdays">  
        <div v-for="day in weekdays" :key="day">{{ day }}</div>  
      </div> 
      <div class="days">  
        <div v-for="day in daysOfMonth" :key="day.date" :class="{ 'is-normal': true, 'is-empty': day.isEmpty,'is-today': day.isToday }" @click="StartSelectItem(day.date)">  
        {{ day.date ? day.date.getDate() : '' }}  
        </div>  
      </div>
      </div> 
      </Transition> 
      <Transition name="Date">
      <div v-show="EndTime">
        <div class="header">  
        <button @click="prevMonth">
          <ZJSvgIcons icon="select" style="transform:rotate(90deg);"></ZJSvgIcons>
        </button>  
        <span>End&nbsp;&nbsp;&nbsp;{{ currentYear }}&nbsp;&nbsp;{{ this.currentMonth+1 }}</span>  
        <button @click="nextMonth">
          <ZJSvgIcons icon="select" style="transform:rotate(270deg);"></ZJSvgIcons>
        </button>  
      </div>  
      <div class="weekdays">  
        <div v-for="day in weekdays" :key="day">{{ day }}</div>  
      </div> 
      <div class="days">  
        <div v-for="day in daysOfMonth" :key="day.date" :class="{ 'is-normal': true, 'is-empty': day.isEmpty,'is-today': day.isToday }" @click="EndSelectItem(day.date)">  
        {{ day.date ? day.date.getDate() : '' }}  
        </div>  
      </div>
      </div> 
      </Transition> 
    </div> 
    </Transition> 
  </div>  
</template>  
  
<script>
export default {  
  name: 'DateSelect',  
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
      StartTime:true,
      EndTime:false,
      // 时间
      currentDate: new Date(),  
      currentYear: new Date().getFullYear(),  
      currentMonth: new Date().getMonth(),  
      weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],  
      daysOfMonth: [],   
      StartSelectedText: this.value ? this.findOptionText(this.value) : '',  
      StartTime2:'',
      EndSelectedText:this.value ? this.findOptionText(this.value) : '',
      EndTime2:'',
      isDropdownVisible: false,
      isIconOpen:false,
    };  
  },  
  mounted() {  
    this.generateDaysOfMonth();
    document.addEventListener('click', this.handleOutsideClick);  
  },  
  beforeUnmount() {  
    document.removeEventListener('click', this.handleOutsideClick);  
  },
  methods: { 
    // 上一个月
    prevMonth() {  
      this.currentMonth--;  
      if (this.currentMonth < 0) {  
        this.currentMonth = 11;  
        this.currentYear--;  
      }  
      this.generateDaysOfMonth();  
    },  
    // 下一个月
    nextMonth() {  
      this.currentMonth++;  
      if (this.currentMonth > 11) {  
        this.currentMonth = 0;  
        this.currentYear++;  
      }  
      this.generateDaysOfMonth();  
    },  
    // 获取当月天数,并比较
    generateDaysOfMonth() {  
    const currentYear = this.currentYear;  
    const currentMonth = this.currentMonth; // 注意：getMonth() 返回的是 0-11  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 获取当前月份的天数  

    const today = new Date(); // 获取今天的日期  
    const todayYear = today.getFullYear();  
    const todayMonth = today.getMonth();  
    const todayDay = today.getDate();  
  
    // 假设每周从周日开始（0 表示周日，6 表示周六）  
    // 你可以根据需要调整 firstDayOfWeek 的值  
    const firstDayOfWeek = 1;  
  
    // 获取当前月份第一天的星期几（0-6）  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();  
  
    // 计算需要填充的空槽位数量  
    const emptySlots = (firstDayOfWeek - firstDayOfMonth + 7) % 7;  
  
    // 初始化 daysOfMonth 数组  
    this.daysOfMonth = [];  
  
    for (let i = 0; i < emptySlots; i++) {  
      this.daysOfMonth.push({ date: null, isEmpty: true, isToday: false });  
    } 
  
    // 填充当前月份的天数  
    for (let day = 1; day <= daysInMonth; day++) {  
      const currentDate = new Date(currentYear, currentMonth, day);  
      const isToday = currentDate.getFullYear() === todayYear && currentDate.getMonth() === todayMonth && currentDate.getDate() === todayDay;
      this.daysOfMonth.push({  
        date: currentDate,  
        isEmpty: false,  
        isToday: isToday  
      });  
    }  
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
    // 起始日期选择
    StartSelectItem(date) { 
       if(date != null){
        let a = date.getDate()
        const Date = this.currentYear + '-' + (this.currentMonth +1).toString().padStart(2, '0') + '-' + a.toString().padStart(2, '0') +' - ';
        this.StartTime2 = this.currentYear + '-' + (this.currentMonth +1).toString().padStart(2, '0') + '-' + a.toString().padStart(2, '0');
        this.$emit('input', Date);  
        this.StartSelectedText = Date;  
        // this.isDropdownVisible = false; 
        this.StartTime = false;
        this.EndTime =true;
      }
    },  
     // 结束日期选择
    EndSelectItem(date) { 
       if(date != null){
        let a = date.getDate()
        const val = this.currentYear + '-' + (this.currentMonth +1).toString().padStart(2, '0') + '-' + a.toString().padStart(2, '0');
        this.EndTime2 = val
        let start = new Date(this.StartTime2);
        let end = new Date(this.EndTime2);
        if(end>start){

          this.EndSelectedText = val;

          // var selectDate = this.StartTime2 + '-' + this.EndTime2
          this.$emit('StartTime',this.StartTime2);
          this.$emit('EndTime',this.EndTime2);  

          this.StartTime = true;
          this.EndTime =false;
          this.currentYear=new Date().getFullYear(),  
          this.currentMonth=new Date().getMonth(),
          this.isDropdownVisible = false; 
          this.isIconOpen = false;
        }else{
          this.$ZJMessage({
           type: 'warning',
           message: '结束时间必须在起始时间之后',
          })
        }
        
      }
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
.header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  padding: 10px 20px;  
  /* background-color: #a4fce0; */
}
.header span{
  font-size:16px;
  font-weight: normal;
  color: var(--ZJ-main-text-color);
} 
.header button{
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:var(--ZJ-main-message-color);
  border:var(--ZJ-main-border-light);
}
.header button:hover{
  background-color:var(--ZJ-main-hover);
}
.weekdays{  
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(7, 1fr); 
  /* background-color: aquamarine;  */
  padding: 10px 0; 
  font-size: 14px;
  margin: 0 10px; 
  border-bottom: var(--ZJ-main-border-light);
}  
.days {  
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(7, 1fr); 
  /* background-color: #eaff7f;  */
  padding: 10px;  
}  
.days div {  
  text-align: center;  
  height: 30px;  
  line-height: 30px;  
  font-size: 14px;
  cursor: default;
  /* background-color: antiquewhite; */
}  
/* 正常情况 */
.is-normal:hover {  
  /* height: 30px;  
  line-height: 30px;   */
  background-color:var(--ZJ-main-hover);
  border-radius: 5px;
} 
/* 为空情况 */
.is-empty,.is-empty:hover{
  background-color:var(--ZJ-main-message-color);
  border-radius: 5px;
}
/* 今天的日期样式 */  
.is-today,.is-today:hover{  
  background: var(--ZJ-default-main-hover);
  color: var(--ZJ-default-main);
  border-radius: 5px;
} 



.custom-select {  
  position: relative;  
  /* display: inline-block;   */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 350px;
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
  min-width: 350px;
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


/*  */
/* Date */
/*  */
.Date-enter-active{
  opacity: 0;
  transition: all 0.5s ease;
}
.Date-enter-to{
  opacity: 1;
  transition: all 0.5s ease;
} 
.Date-leave-active{
  opacity: 1;
}
.Date-leave-to{
  opacity: 0;
}

</style>