<template>  
  <div class="custom-select" >  
    <div class="selected" @click="toggleDropdown"><a>{{ selectedText || label }}</a> <img ref="img" src="../assets/DateSelect.png" alt=""></div>
    <Transition name="Select">  
    <div class="dropdown" v-if="isDropdownVisible">  
      <div class="header">  
        <button @click="prevMonth"><img src="../assets/left.png" alt=""></button>  
        <span>{{ currentYear }}&nbsp;&nbsp;&nbsp;&nbsp;{{ MonthInEnglish[currentMonth] }}</span>  
        <button @click="nextMonth"><img src="../assets/right.png" alt=""></button>  
      </div>  
      <div class="weekdays">  
        <div v-for="day in weekdays" :key="day">{{ day }}</div>  
      </div> 
      <div class="days">  
        <div v-for="day in daysOfMonth" :key="day.date" :class="{ 'is-normal': true, 'is-empty': day.isEmpty,'is-today': day.isToday }" @click="selectItem(day.date)">  
        {{ day.date ? day.date.getDate() : '' }}  
        </div>  
      </div>   
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
      // 时间
      MonthInEnglish:[
        'January', 'February', 'March',  
      'April', 'May', 'June',  
      'July', 'August', 'September',  
      'October', 'November', 'December'
      ],
      currentDate: new Date(),  
      currentYear: new Date().getFullYear(),  
      currentMonth: new Date().getMonth(),  
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],  
      daysOfMonth: [],   
      selectedText: this.value ? this.findOptionText(this.value) : '',  
      isDropdownVisible: false  
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
      }  
    }, 
    // 下拉
    toggleDropdown() {  
      this.isDropdownVisible = !this.isDropdownVisible; 
    },  
    // 选择
    selectItem(date) { 
      
       if(date != null){
        let a = date.getDate()
        const Date = this.currentYear + '-' + (this.currentMonth +1).toString().padStart(2, '0') + '-' + a.toString().padStart(2, '0');
        this.$emit('input', Date);  
        this.selectedText = Date;  
        this.isDropdownVisible = false; 
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
font-family: AlibabaPuHuiTi;
font-size:16px;
font-weight: normal;
line-height: normal;
text-align: right;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #000000;
}
button img{
  height: 16px;
  width: 16px;
}  
.header button{
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border: 1px solid #DCDCDC;
}
.header button:hover{
  background-color: rgb(232, 232, 232);
}
.header button:active{
  background-color:rgb(212, 212, 212);
}
.weekdays{  
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(7, 1fr); 
  /* background-color: aquamarine;  */
  padding: 10px 0; 
  font-size: 14px;
  margin: 0 10px; 
  border-bottom: 1px solid #E4E7ED;
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
  background-color:#f1f3f7;
  border-radius: 5px;
} 
/* 为空情况 */
.is-empty,.is-empty:hover{
  background-color:#FFFFFF;
  border-radius: 5px;
}
/* 今天的日期样式 */  
.is-today,.is-today:hover{  
  background: #F2F3FF;
  color: #7050E8;
  border-radius: 5px;
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
  height: 20px;
  width: 20px;
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
  top:55px;
  width: 100%;
  min-width: 350px;
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