<template>  
  <div class="custom-select" >  
    <div class="selected" @click="toggleDropdown"><a>{{ StartSelectedText+EndSelectedText || label }}</a> <img ref="img" src="../assets/DateSelect.png" alt=""></div>
    <Transition name="Select">  
    <div class="dropdown" v-if="isDropdownVisible">
      <Transition name="Date">
      <div v-show="StartTime">
        <div class="header">  
        <button @click="prevMonth"><img src="../assets/left.png" alt=""></button>  
        <span>Start&nbsp;&nbsp;&nbsp;{{ currentYear }}&nbsp;&nbsp;{{ currentMonth+1 }}</span>  
        <button @click="nextMonth"><img src="../assets/right.png" alt=""></button>  
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
        <button @click="prevMonth"><img src="../assets/left.png" alt=""></button>  
        <span>End&nbsp;&nbsp;&nbsp;{{ currentYear }}&nbsp;&nbsp;{{ this.currentMonth+1 }}</span>  
        <button @click="nextMonth"><img src="../assets/right.png" alt=""></button>  
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
    // 起始日期选择
    StartSelectItem(date) { 
       if(date != null){
        let a = date.getDate()
        const Date = this.currentYear + '-' + (this.currentMonth +1).toString().padStart(2, '0') + '-' + a.toString().padStart(2, '0') +'-';
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

          this.$emit('input', val); 
          this.EndSelectedText = val;

          var selectDate = this.StartTime2 + '-' + this.EndTime2
          this.$emit('getSelectDate',selectDate);  

          this.StartTime = true;
          this.EndTime =false;
          this.currentYear=new Date().getFullYear(),  
          this.currentMonth=new Date().getMonth(),
          this.isDropdownVisible = false; 
        }else{
          this.$message({
           showClose: true,
           type: 'warning',
           message: 'The end time must be before the start time.',
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
  padding:10px 20px;  
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
  background-color: rgb(242, 242, 242);
}
.header button:active{
  background-color:rgb(222, 222, 222);
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
  margin: 0 7px 0 16px;
}
.selected img{
  margin: 0 16px 0 7px;
  height: 20px;
  width: 20px;
}
.selected { 
  background-color:#F2F2F2;
  height: 40px;
  width: 260px;
  border-radius:7px;
  position: relative;
  cursor: pointer; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
font-family: AlibabaPuHuiTi;
font-size:14px;
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
  overflow: hidden;
  top:55px;
  width:350px;
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