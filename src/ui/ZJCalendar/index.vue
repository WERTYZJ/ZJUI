<template>
  <div class="calendar">
    <div class="center-top">
      <div class="center-top-left">
        <a>{{ MonthInEnglish[currentMonth] }}&nbsp;{{ currentYear }}</a>
        <div class="center-top-left-box" @click="BackToday()">{{ Today }}</div>
      </div>
      <div class="center-top-right">
        <div class="center-top-right-box" @click="prevMonth()">
          <ZJSvgIcons icon="select" style="transform:rotate(90deg);"></ZJSvgIcons>
        </div>
        <div class="center-top-right-box" @click="nextMonth()">
          <ZJSvgIcons icon="select" style="transform:rotate(-90deg);"></ZJSvgIcons>
        </div>
      </div>
    </div>
    <div class="center-main">
      <div class="weekdays">  
        <div v-for="day in weekdays" :key="day">{{ day }}</div>  
      </div> 
      <div class="days">  
        <div class="days-main" v-for="item in daysOfMonth" :key="item.date" :class="{ 'is-normal': true, 'is-empty': item.isEmpty,'is-today': item.isToday }" @click="openBoard(item.date,item.isEmpty)">  
          <div class="days-top">{{ item.date ? item.date.getDate() : '' }}</div>
          <div class="days-bottom" :class="BackgroundColor(item.type)">
            <div class="days-bottom-title">
              <!-- <img :src="ImgColor(item.type)" alt=""> -->
              <ZJSvgIcons v-if="item.type" icon="clock" style="margin-right: 4px;width: 14px;height: 14px;padding:0" :class="TextColor(item.type)"></ZJSvgIcons>
              <a :class="TextColor(item.type)" v-if="item.type==1">pending</a>
              <a :class="TextColor(item.type)" v-if="item.type==2">upcoming</a>
              <a :class="TextColor(item.type)" v-if="item.type==3">Scheduled</a>
              <a :class="TextColor(item.type)" v-if="item.type==4">Rescheduled</a>
              <a :class="TextColor(item.type)" v-if="item.type==5">In Process</a>
              <a :class="TextColor(item.type)" v-if="item.type==6">Completed</a>
              <a :class="TextColor(item.type)" v-if="item.type==7">Canceled</a>
              <a :class="TextColor(item.type)" v-if="item.type==8">Appealing</a>
              
            </div>
            <div class="days-bottom-time"><a :class="TextColor(item.type)">{{ item.time }}</a></div>
            <div class="days-bottom-class"><a :class="TextColor(item.type)">{{ item.class }}</a></div>
          </div>  
        </div>
          
      </div>
    </div>
  </div>
</template>

<script setup name='ZJCalendar'>

const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const props = defineProps({
  CalendarVal:{
    type:Array,
    default:null,
  },
});

const MonthInEnglish = ref([
  'January', 'February', 'March',  
  'April', 'May', 'June',  
  'July', 'August', 'September',  
  'October', 'November', 'December'
]);

const  currentYear = ref(new Date().getFullYear()); 
const  currentMonth = ref(new Date().getMonth());
const  weekdays = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
const  daysOfMonth = ref([]);

onMounted(()=>{
  generateDaysOfMonth();
})

// 卡片背景颜色
function BackgroundColor(type) {  
  switch (type) {  
    case 5: return 'bg-color-1';  
    case 2: return 'bg-color-2';
    case 1: return 'bg-color-3';
    case 3: return 'bg-color-4';  
    case 4: return 'bg-color-4';
    case 7: return 'bg-color-5';  
    case 6: return 'bg-color-6'; 
    case 8: return 'bg-color-6'; 
    default:  
      return '';
  }  
}
// 卡片文字颜色  
function TextColor(type) {  
  switch (type) {  
    case 5: return 'text-color-1';  
    case 2: return 'text-color-2';
    case 1: return 'text-color-3';  
    case 3: return 'text-color-4';
    case 4: return 'text-color-4';
    case 7: return 'text-color-5';  
    case 6: return 'text-color-6';
    case 8: return 'text-color-6';
    default:  
      return '';  
  }  
}
// 卡片图片颜色 
function ImgColor(type){
  switch (type) {  
    case 5: return '/src/assets/ZJUI/ZJCalendar/tutor-board-InProcess.png';  
    case 2: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Uncoming.png';
    case 1: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Pending.png';  
    case 3: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Scheduled.png';
    case 4: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Scheduled.png';
    case 7: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Canceled.png';  
    case 6: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Completed.png';
    case 8: return '/src/assets/ZJUI/ZJCalendar/tutor-board-Completed.png';
    default:  
      return '';  
  }
}
// 上一个月
function prevMonth() {  
  currentMonth.value--;  
  if (currentMonth.value < 0) {  
    currentMonth.value = 11;  
    currentYear.value--;  
  }  
  generateDaysOfMonth();  
} 
// 下一个月
function nextMonth() {  
  currentMonth.value++;  
  if (currentMonth.value > 11) {  
    currentMonth.value = 0;  
    currentYear.value++;  
  }  
  generateDaysOfMonth();  
}
// 获取当月天数,并比较
function generateDaysOfMonth() {  
  const Year = currentYear.value;  
  const Month = currentMonth.value; // 注意：getMonth() 返回的是 0-11  
  const daysInMonth = new Date(Year, Month + 1, 0).getDate(); // 获取当前月份的天数   
  // console.log(currentYear,currentMonth,daysInMonth)

  const today = new Date(); // 获取今天的日期  
  const todayYear = today.getFullYear();  
  const todayMonth = today.getMonth();  
  const todayDay = today.getDate();  
  // console.log(todayYear,todayMonth,todayDay)

  // 假设每周从周日开始（0 表示周日，6 表示周六）  
  // 你可以根据需要调整 firstDayOfWeek 的值  
  const firstDayOfWeek = 1;  

  // 获取当前月份第一天的星期几（0-6）  
  const firstDayOfMonth = new Date(Year, Month, 1).getDay();  

  // 计算需要填充的空槽位数量  
  const emptySlots = (firstDayOfWeek - firstDayOfMonth + 7) % 7;  
  // console.log(firstDayOfWeek,firstDayOfMonth,emptySlots)
  // 初始化 daysOfMonth 数组  
  daysOfMonth.value = [];  

  for (let i = 0; i < emptySlots; i++) {  
    daysOfMonth.value.push({ date: null, isEmpty: true, isToday: false });  
  }

  // 填充当前月份的天数  
  for (let day = 1; day <= daysInMonth; day++) {  
    const currentDate = new Date(Year, Month, day); 
    const isToday = currentDate.getFullYear() === todayYear && currentDate.getMonth() === todayMonth && currentDate.getDate() === todayDay;
    // console.log(daysInMonthTime)
    daysOfMonth.value.push({  
      date: currentDate,  
      isEmpty: false,  
      isToday: isToday, 
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day2 = currentDate.getDate();
    const daysInMonthTime= `${padZero(year)}/${padZero(month)}/${padZero(day2)}`;
    for(let i=0;i<+props.CalendarVal?.length;i++){
      const DaysBottomTime = props.CalendarVal[i].time.substring(0, 10);
      // console.log("DaysBottomTime",DaysBottomTime)
      if(daysInMonthTime===DaysBottomTime){
        let b=daysOfMonth.value[day+emptySlots-1]
        b.type=props.CalendarVal[i].type,
        b.time=props.CalendarVal[i].time,
        b.class=props.CalendarVal[i].class
      }
    }
  }
    
  if((35-(emptySlots+daysInMonth))>=0){
    for (let a = 0; a < 35-(emptySlots+daysInMonth); a++) {  
    daysOfMonth.value.push({ date: null, isEmpty: true, isToday: false });
    }
  }else{
    for (let a = 0; a < 42-(emptySlots+daysInMonth); a++) {  
    daysOfMonth.value.push({ date: null, isEmpty: true, isToday: false });  
    }
  }
}
function padZero(value) {
  return value < 10 ? `0${value}` : value;
}
// 点击今天详情
const Today = ref('Today');
function openBoard(date,isEmpty,){
  if(!isEmpty){

    const TodayDate = new Date(); 
    const DianJiDate = new Date(date);
    const daysToPast = Math.floor((TodayDate.getTime() - DianJiDate.getTime()) / (1000 * 60 * 60 * 24));

    // console.log(daysToPast)
    switch(daysToPast){  
      case 0: 
        Today.value = 'Today'; 
        break;
      case 1: 
        Today.value = 'Yesterday'; 
        break; 
      case 2:
        Today.value = 'Day before yesterday'; 
        break; 
      case 3: 
        Today.value = `${daysToPast}`+' days ago'; 
        break;
      case -1: 
        Today.value = 'Tomorrow'; 
        break; 
      case -2:
        Today.value = 'Day after tomorrow'; 
        break; 
      case -3: 
        Today.value = 'After '+`${Math.abs(daysToPast)}`+' days'; 
        break;  
      default: 
        if(daysToPast>0){
          Today.value = `${daysToPast}`+' days ago';
        }else{
          Today.value = 'After '+`${Math.abs(daysToPast)}`+' days'; 
        }
      break; 
    } 
  
    $ZJMessage({
      type: 'warning',
      message: Today.value,
    })
  }
}
function BackToday(){
  Today.value='Today';
  currentMonth.value=new Date().getMonth()
  generateDaysOfMonth();
}
</script>

<style scoped>
.calendar{
  width: 100%;
  color: var(--ZJ-main-text-color);
}
.center-top{
  /* background-color: aqua; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.center-top-left{
  display: flex;
  align-items: center;
  /* background-color: antiquewhite; */
}
.center-top-left a{
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0em;
}
.center-top-left-box{
  cursor: pointer;
  padding: 0 10px;
  height: 30px;
  border-radius: 7px;
  background-color: var(--ZJ-main-hover);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 13px;
}
.center-top-right{
  display: flex;
  justify-content: space-between;
  width: 80px;
  /* background-color: #e2a554; */
}
.center-top-right-box{
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background-color: var(--ZJ-main-hover);
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-top-right-box img{
  width: 16px;
  height: 16px;
}
.center-top-right .center-top-right-box:nth-child(1) img{
  margin-left: 5px;
}
.center-top-right .center-top-right-box:nth-child(2) img{
  margin-right: 5px;
}
.center-main{
  border-radius: 10px;
  box-sizing: border-box;
  /* border: 1px solid rgba(0, 0, 0, 0.3); */
}
/* center主体 */
.weekdays{  
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(7, 1fr); 
  /* background-color: aquamarine;  */
}  
.weekdays > div {
  border: var(--ZJ-main-border-light);
  border-right: none; /* 移除右边框 */
  padding: 16px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0em;	
}
.weekdays > div:first-child {
  border-radius: 10px 0 0 0;
}
.weekdays > div:last-child {
  border-right: var(--ZJ-main-border-light);
  border-radius: 0 10px 0 0;
}

.days {  
  display: grid;  
  text-align: center;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  /* background-color: #eaff7f;  */ 
}  
.days > .days-main {
  text-align: center;  
  line-height: 30px;
  border: var(--ZJ-main-border-light);
  border-top: none;
  border-right: none; /* 移除右边框 */
}
.days > .days-main:nth-child(7),.days > .days-main:nth-child(14),
.days > .days-main:nth-child(21),.days > .days-main:nth-child(28),
.days > .days-main:nth-child(35){
  border-right: var(--ZJ-main-border-light);
}
.days > .days-main.days-main:last-child{
  border-right: var(--ZJ-main-border-light);
  border-radius: 0 0 10px 0;
}
.days > .days-main:nth-last-child(7) {
border-radius: 0 0 0 10px;
}
.days-top{
  padding: 15px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0em;
}

/*  */
/* 颜色1 */
/*  */
.days-bottom{
  display: flex;
  flex-direction: column;
  padding: 10px 10px 6px 10px;
  /* height:68px; */
  border-radius: 6px;
  margin: 4px;
  /* background: #D0F3E9; */
}
.days-bottom-title{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:12px;
}
.days-bottom-title a{
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: normal;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0em;
}
.days-bottom-title-img{
  margin-right: 4px;
  width: 12px;
  height: 12px;
}
.days-bottom-time,.days-bottom-class{
  margin: 4px 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0em;
  color: #07996F;
  text-align: left;
  /* display: flex; */
  /* flex-wrap: wrap; */
}


/* 背景色类 */  
.bg-color-1 { background-color: #D0F3E9; }  
.bg-color-2 { background-color: #DEFFE0; }  
.bg-color-3 { background-color: #DEEFFF; }  
.bg-color-4 { background-color: #E4D4FC; }  
.bg-color-5 { background-color: #EAEAEA; }  
.bg-color-6 { background-color: #FFE3E1; } 
 
.text-color-1 { color: #07996F; }  
.text-color-2 { color: #178A1E; }  
.text-color-3 { color: #0D4B86; }  
.text-color-4 { color: #43148A; }  
.text-color-5 { color: #000000; }  
.text-color-6 { color: #BF1F1F; }
.text-default-color { color: #000000;}  


/* 正常情况 */
.is-normal:hover{  
/* height: 30px;  
line-height: 30px;   */
background-color:var(--ZJ-main-hover);
} 
/* 为空情况 */
.is-empty,.is-empty:hover{
  background: var(--ZJ-main-hover);
}
/* 今天的日期样式 */  
.is-today,.is-today:hover{  
background-color:var(--ZJ-default-main-hover);
color:var(--ZJ-default-main);
}
@media (max-width: 1144px) {
.days-bottom-title a{
font-size: 12px;
}
.days-bottom-time,.days-bottom-class{
font-size: 13px;
}
}
@media (max-width: 1048px) {
.days-bottom{
  padding: 10px 2px 6px 2px;
}
.days-bottom-title{
  display: flex;
  justify-content: center;
  align-items: center;
}
.days-bottom-title a{
font-size: 10px;
margin: 5px 0 0 0;
}
.days-bottom-time,.days-bottom-class{
text-align: center;
font-size: 9px;
font-weight: 600;
line-height: 100%;
}
}
</style>