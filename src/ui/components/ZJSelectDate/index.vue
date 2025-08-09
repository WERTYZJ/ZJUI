<template>
  <div class="custom-select">
    <div class="selected" @click="toggleDropdown" ref="clickDropdownEl"><a>{{ selectedText || label }}</a>
      <ZJSvgIcons icon="select" :class="{ 'ZJRotate-icon-open': isIconOpen, 'ZJRotate-icon-close': !isIconOpen }">
      </ZJSvgIcons>
    </div>
    <Transition name="Select">
      <div class="dropdown" v-show="isDropdownVisible" ref="clickDropdownBoxEl">
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
            :class="{ 'is-normal': true, 'is-empty': day.isEmpty, 'is-today': day.isToday, 'is-selected': day.isSelected }"
            @click="selectItem(day, index)">
            {{ day.date ? day.date.getDate() : '' }}
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

const emit = defineEmits(['ZJSelectDataVal'])

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
const daysOfMonth = ref([])
const selectedText = ref(props.value ? findOptionText(props.value) : '')
const isDropdownVisible = ref(false)
const isIconOpen = ref(false)
const yearList = ref([])
const monthList = ref([])
const selectedActiveTab = ref('')

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
    daysOfMonth.value.push({
      date: currentDate,
      isEmpty: false,
      isToday: currentDate.toDateString() === today.toDateString(),
      isSelected: +selectedActiveTab.value === +currentDate
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
    emit('ZJSelectDataVal', formattedDate)
    selectedActiveTab.value = val.date;
    if (activeTabstates.value == '') {
      daysOfMonth.value[index].isSelected = true
      activeTabstates.value = index
    } else {
      daysOfMonth.value[activeTabstates.value].isSelected = false;
      activeTabstates.value = index;
      daysOfMonth.value[index].isSelected = true;
    }
    selectedText.value = formattedDate
    isDropdownVisible.value = false
    isIconOpen.value = false
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

// 生命周期
onMounted(() => {
  generateDaysOfMonth();
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
   min-width: 350px;
   min-height: 100%;
   transition: height 0.2s;
   border-radius: var(--ZJ-main-border-radius-dropdown);
   box-shadow: var(--ZJ-main-box-shadow);
   background-color: var(--ZJ-main-message-color);
   z-index: 2;
 }

 .dropdown::after {
   content: '';
   top: -9px;
   position: absolute;
   left: calc(50% - 5px);
   width: 0;
   height: 0;
   transform: rotate(-45deg);
   border-top: solid 15px var(--ZJ-main-message-color);
   border-left: solid 15px transparent;
   border-bottom: solid 15px transparent;
   z-index: 2;
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