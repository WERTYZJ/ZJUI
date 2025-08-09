<template>
  <div class="custom-select">
    <div class="selected" @click="toggleDropdown" ref="clickDropdownEl"><a>{{ selectedText || label }}</a>
      <ZJSvgIcons icon="select" :class="{ 'ZJRotate-icon-open': isIconOpen, 'ZJRotate-icon-close': !isIconOpen }">
      </ZJSvgIcons>
    </div>
    <Transition name="Select">
      <div class="dropdown" v-show="isDropdownVisible" ref="clickDropdownBoxEl">
        <div class="dropdown-start">
          <div class="header">
            <button @click="prevMonth">
              <ZJSvgIcons icon="select" style="transform:rotate(90deg);"></ZJSvgIcons>
            </button>
            <div class="header-center">
              <ZJSelect :label="currentYear" :options="yearList" :selectStyle="{ 'border-radius': '5px', }"
                :value="currentYear" :dropMenuStyle="{ 'border-radius': '5px', 'width': '100px' }"
                @ZJSelectVal="currentYear = $event">
              </ZJSelect>
              <ZJSelect :label="MonthInEnglish[currentMonth]" :selectStyle="{ 'border-radius': '5px' }"
                :dropMenuStyle="{ 'border-radius': '5px', width: '130px' }" :options="monthList" :value="currentMonth"
                @ZJSelectVal="currentMonth = $event">
              </ZJSelect>
            </div>
            <button @click="nextMonth">
              <ZJSvgIcons icon="select" style="transform:rotate(270deg);"></ZJSvgIcons>
            </button>
          </div>
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day">{{ day }}</div>
          </div>
          <div class="days">
            <div v-for="(day, index) in daysOfMonth" :key="day.date"
              :class="{ 'is-normal': true, 'is-empty': day.isEmpty, 'is-today': day.isToday, 'is-selected': startActiveTab == day.date }"
              @click="selectItem(day, index)">
              {{ day.date ? day.date.getDate() : '' }}
            </div>
          </div>
        </div>
        <div class="dropdown-end">
          <div class="header">
            <button @click="prevMonth2">
              <ZJSvgIcons icon="select" style="transform:rotate(90deg);"></ZJSvgIcons>
            </button>
            <div class="header-center">
              <ZJSelect :label="currentYear2" :options="yearList" :selectStyle="{ 'border-radius': '5px', }"
                :value="currentYear2" :dropMenuStyle="{ 'border-radius': '5px', 'width': '100px' }"
                @ZJSelectVal="currentYear2 = $event">
              </ZJSelect>
              <ZJSelect :label="MonthInEnglish[currentMonth2]" :selectStyle="{ 'border-radius': '5px' }"
                :dropMenuStyle="{ 'border-radius': '5px', width: '130px' }" :options="monthList" :value="currentMonth2"
                @ZJSelectVal="currentMonth2 = $event">
              </ZJSelect>
            </div>
            <button @click="nextMonth2">
              <ZJSvgIcons icon="select" style="transform:rotate(270deg);"></ZJSvgIcons>
            </button>
          </div>
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day">{{ day }}</div>
          </div>
          <div class="days">
            <div v-for="(day, index) in daysOfMonth2" :key="day.date"
              :class="{ 'is-normal': true, 'is-empty': day.isEmpty, 'is-today': day.isToday, 'is-selected': day.isSelected }"
              @click="selectItem2(day, index)">
              {{ day.date ? day.date.getDate() : '' }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>  
  
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: false,
    default: () => []
  },
  value: {
    type: [String, Number],
    default: null
  },
  label: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['StartTime', 'EndTime'])

// 月份
const MonthInEnglish = ref([
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
])

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const weekdays = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
const daysOfMonth = ref([]);
const selectedText = ref(props.value ? findOptionText(props.value) : '')
const isDropdownVisible = ref(false)
const isIconOpen = ref(false)
const yearList = ref([])
const monthList = ref([])
const startTime = ref('')
const endTime = ref('')
const startActiveTab = ref()
const endActiveTab = ref()

// 上一个月
const prevMonth = () => {
  currentMonth.value--
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  }
}

// 下一个月
const nextMonth = () => {
  currentMonth.value++
  if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

// 获取日期数据
const generateDaysOfMonth = () => {
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const today = new Date()
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay()

  daysOfMonth.value = []

  // 填充前置槽位
  const daysInLastMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();
  for (let i = daysInLastMonth - firstDayOfMonth + 1; i <= daysInLastMonth; i++) {
    const currentDate = new Date(currentYear.value, currentMonth.value - 1, i);
    daysOfMonth.value.push({
      date: currentDate,
      isEmpty: true,
      isToday: false,
      isSelected: false
    })
  }

  // 填充日期
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(currentYear.value, currentMonth.value, day);
    // console.log("currentDate", daysInMonth)
    daysOfMonth.value.push({
      date: currentDate,
      isEmpty: false,
      isToday: currentDate.toDateString() === today.toDateString(),
      isSelected: +startActiveTab.value === +currentDate
    })
  }

  // 填充后置槽位
  const endCount = 7 - daysOfMonth.value.length % 7;
  for (let l = 1; l <= endCount && endCount < 7; l++) {
    const currentDate = new Date(currentYear.value, currentMonth.value + 1, l);
    daysOfMonth.value.push({
      date: currentDate,
      isEmpty: true,
      isToday: false,
      isSelected: false
    })
  }
}

const clickDropdownEl = ref(null);
const clickDropdownBoxEl = ref(null);
const handleOutsideClick = (e) => {
  if (clickDropdownEl.value && !clickDropdownEl.value.contains(e.target)
    && !clickDropdownBoxEl.value.contains(e.target)) {
    isIconOpen.value = false
    isDropdownVisible.value = false
  }
}

const toggleDropdown = () => {
  isIconOpen.value = !isIconOpen.value
  isDropdownVisible.value = !isDropdownVisible.value
}

// 选择日期
const activeTabstates = ref('')
const selectItem = (val, index) => {
  if (!val.isEmpty) {
    const formattedDate = `${currentYear.value}-${(currentMonth.value + 1).toString().padStart(2, '0')}-${val.date.getDate().toString().padStart(2, '0')}`
    startTime.value = formattedDate
    const valid = validateDateRange(startTime.value, endTime.value);
    if ((startTime.value && endTime.value) || (startTime.value && endTime.value == '')) {
      endTime.value = '';
      selectedText.value = formattedDate;
    }
    if (valid == 0) {
      const dateRange = `${startTime.value} -- ${endTime.value}`;
      startActiveTab.value = val.date;
      if (activeTabstates.value == '') {
        daysOfMonth.value[index].isSelected = true
        activeTabstates.value = index
      } else {
        daysOfMonth.value[activeTabstates.value].isSelected = false;
        activeTabstates.value = index;
        daysOfMonth.value[index].isSelected = true;
      }
      selectedText.value = dateRange;
      emit('StartTime', formattedDate);
    }
  }
}

const findOptionText = (value) => {
  return props.options.find(option => option.value === value)?.text || ''
}

// 初始化选择数据
const getSelecteData = () => {
  // 年份
  for (let i = currentYear.value; i >= 1970; i--) {
    yearList.value.push({
      label: i,
      value: i
    })
  }
  // 月份
  for (let i = 0; i <= 11; i++) {
    monthList.value.push({
      label: MonthInEnglish.value[i],
      value: i
    })
  }
}

const validateDateRange = (startTimeStr, endTimeStr) => {
  if (startTimeStr != '' && endTimeStr == '') return 0;
  // 解析日期并验证格式
  const startDate = new Date(startTimeStr);
  const endDate = new Date(endTimeStr);

  // 比较时间戳（精确到天）
  const startTimestamp = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  ).getTime();

  const endTimestamp = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  ).getTime();

  // 核心比较逻辑
  if (endTimestamp > startTimestamp) {
    return 0;
  } else if (endTimestamp === startTimestamp) {
    return 1;
  } else {
    return 1;
  }
}

// 生命周期
onMounted(() => {
  generateDaysOfMonth();
  generateDaysOfMonth2();
  getSelecteData();
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectedText.value = findOptionText(newVal)
  }
})

watch(() => clickDropdownBoxEl.value, (newVal) => {
  if (newVal == null) {
    document.removeEventListener('click', handleOutsideClick)
  } else {
    document.addEventListener('click', handleOutsideClick)
  }
})

watch(() => currentYear.value, (newVal) => {
  generateDaysOfMonth();
})

watch(() => currentMonth.value, (newVal) => {
  generateDaysOfMonth();
})



const currentYear2 = ref(new Date().getFullYear())
const currentMonth2 = ref(new Date().getMonth())
const daysOfMonth2 = ref([])

// 上一个月
const prevMonth2 = () => {
  currentMonth2.value--
  if (currentMonth2.value < 0) {
    currentMonth2.value = 11
    currentYear2.value--
  }
}

// 下一个月
const nextMonth2 = () => {
  currentMonth2.value++
  if (currentMonth2.value > 11) {
    currentMonth2.value = 0
    currentYear2.value++
  }
}

// 获取日期数据
const generateDaysOfMonth2 = () => {
  const daysInMonth = new Date(currentYear2.value, currentMonth2.value + 1, 0).getDate()
  const today = new Date()
  const firstDayOfMonth = new Date(currentYear2.value, currentMonth2.value, 1).getDay()

  daysOfMonth2.value = []

  // 填充前置槽位
  const daysInLastMonth = new Date(currentYear2.value, currentMonth2.value, 0).getDate();
  for (let i = daysInLastMonth - firstDayOfMonth + 1; i <= daysInLastMonth; i++) {
    const currentDate = new Date(currentYear.value, currentMonth.value - 1, i);
    daysOfMonth2.value.push({
      date: currentDate,
      isEmpty: true,
      isToday: false,
      isSelected: false,
    })
  }

  // 填充日期
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(currentYear2.value, currentMonth2.value, day);
    // console.log("currentDate", daysInMonth)
    daysOfMonth2.value.push({
      date: currentDate,
      isEmpty: false,
      isToday: currentDate.toDateString() === today.toDateString(),
      isSelected: +endActiveTab.value === +currentDate
    })
  }

  // 填充后置槽位
  const endCount = 7 - daysOfMonth2.value.length % 7;
  for (let l = 1; l <= endCount && endCount < 7; l++) {
    const currentDate = new Date(currentYear2.value, currentMonth2.value + 1, l);
    daysOfMonth2.value.push({
      date: currentDate,
      isEmpty: true,
      isToday: false,
      isSelected: false,
    })
  }
}

// 选择日期
const activeTabstates2 = ref('')
const selectItem2 = (val, index) => {
  if (!val.isEmpty) {
    if (startTime.value != '') {
      const formattedDate = `${currentYear2.value}-${(currentMonth2.value + 1).toString().padStart(2, '0')}-${val.date.getDate().toString().padStart(2, '0')}`
      endTime.value = formattedDate;
      const valid = validateDateRange(startTime.value, endTime.value);
      if (valid == 0) {
        const dateRange = `${startTime.value} -- ${endTime.value}`;
        selectedText.value = dateRange;
        endActiveTab.value = val.date;
        emit('EndTime', formattedDate);
        startActiveTab.value = val.date;
        if (activeTabstates2.value == '') {
          daysOfMonth2.value[index].isSelected = true
          activeTabstates2.value = index
        } else {
          daysOfMonth2.value[activeTabstates2.value].isSelected = false;
          activeTabstates2.value = index;
          daysOfMonth2.value[index].isSelected = true;
        }
        isDropdownVisible.value = false;
        isIconOpen.value = false;
      }
    }
  }
}

watch(() => currentYear2.value, (newVal) => {
  generateDaysOfMonth2();
})

watch(() => currentMonth2.value, (newVal) => {
  generateDaysOfMonth2();
})
</script>
  
<style scoped> .header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 15px 15px 10px 15px;
   /* background-color: #a4fce0; */
 }

 .header-center {
   display: flex;
   gap: 15px;
 }

 .header button {
   border: none;
   padding: 5px;
   border-radius: 50%;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--ZJ-main-hover);
 }

 .header button:hover {
   background-color: var(--ZJ-main-hover);
 }

 .weekdays {
   display: grid;
   text-align: center;
   grid-template-columns: repeat(7, 1fr);
   /* background-color: aquamarine;  */
   padding: 10px 0;
   font-size: 14px;
   margin: 0 10px;
   font-weight: bold;
 }

 .days {
   display: grid;
   text-align: center;
   grid-template-columns: repeat(7, 1fr);
   /* background-color: #eaff7f; */
   padding: 10px 15px 15px 15px;
   gap: 4px;
 }

 .days div {
   text-align: center;
   height: 35px;
   line-height: 35px;
   font-size: 14px;
   cursor: default;
   border-radius: 5px;
   /* background-color: antiquewhite; */
 }

 /* 正常情况 */
 .is-normal {
   background-color: var(--ZJ-main-hover);

 }

 .is-normal:hover {
   box-shadow: inset 0 0 0 2px var(--ZJ-default-main);
   background-color: var(--ZJ-default-main-hover);
   color: var(--ZJ-default-main);
 }

 /* 为空情况 */
 .is-empty,
 .is-empty:hover {
   /* background-color: var(--ZJ-main-hover); */
   background-color: var(--ZJ-main-message-color);
   color: var(--ZJ-main-text-label-color);
 }

 /* 今天的日期样式 */
 .is-today,
 .is-today:hover {
   background-color: var(--ZJ-default-main-hover);
   color: var(--ZJ-default-main);
   font-weight: bold;
 }

 /* 选中日期样式 */
 .is-selected,
 .is-selected:hover {
   color: var(--ZJ-main);
   background-color: var(--ZJ-default-main);
 }

 .custom-select {
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
 }

 .selected {
   height: 32px;
   width: 100%;
   position: relative;
   padding: 0 12px 0 15px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 5px;
   font-size: 14px;
   font-weight: normal;
   border-radius: var(--ZJ-main-border-radius);
   color: var(--ZJ-main-text-label-color);
   border: var(--ZJ-main-hover);
   background: var(--ZJ-main-hover);
 }

 .dropdown {
   position: absolute;
   top: 47px;
   left: 0;
   width: 100%;
   width: 641px;
   min-height: 100%;
   transition: height 0.2s;
   border-radius: var(--ZJ-main-border-radius-dropdown);
   box-shadow: var(--ZJ-main-box-shadow);
   background-color: var(--ZJ-main-message-color);
   z-index: 2;
   display: flex;
 }

 .dropdown::after {
   content: '';
   top: -9px;
   position: absolute;
   left: 10%;
   width: 0;
   height: 0;
   transform: rotate(-45deg);
   border-top: solid 15px var(--ZJ-main-message-color);
   border-left: solid 15px transparent;
   border-bottom: solid 15px transparent;
   z-index: 2;
 }

 .dropdown-start,
 .dropdown-end {
   flex-shrink: 0;
   width: 320px;
 }

 .dropdown-start {
   border-right: var(--ZJ-main-border-light);
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