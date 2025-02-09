<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJCalendar(日历)</h2>
      </template>
      <h3>日历用来显示时间日期，以及每天的定时事件</h3>
      <p>CalendarVal传递日历数据</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJCalendar 
          :CalendarVal="CalendarVal"
          >
        </ZJCalendar>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const CalendarVal = ref([
  {
    type:1,
    time:Year()+'/05 13:30',
    class:'English'
  },
  {
    type:2,
    time:Year()+'/06 13:30',
    class:'Chinese'
  },
  {
    type:3,
    time:Year()+'/08 13:30',
    class:'football'
  },
  {
    type:4,
    time:Year()+'/09 13:30',
    class:'basketball'
  },
  {
    type:5,
    time:Year()+'/12 13:30',
    class:'pingpang'
  },
  {
    type:6,
    time:Year()+'/13 13:30',
    class:'java'
  },
  {
    type:7,
    time:Year()+'/15 13:30',
    class:'c++'
  },
  {
    type:8,
    time:Year()+'/18 13:30',
    class:'Python'
  },
]);

function  Year(){
  const today = new Date();
  const todayYear = today.getFullYear();  
  const todayMonth = today.getMonth() + 1;  
  const a = `${todayYear}/${todayMonth < 10 ? '0' + todayMonth : todayMonth}`;
  return a;
}


const vueCode=ref(
`<template>
  <ZJCalendar :CalendarVal="CalendarVal"></ZJCalendar>
</template>

<script setup>
import { ref } from "vue";

const CalendarVal = ref([
  {
    type:1,
    time:Year()+'/05 13:30',
    class:'English'
  },
  {
    type:2,
    time:Year()+'/06 13:30',
    class:'Chinese'
  },
  {
    type:3,
    time:Year()+'/08 13:30',
    class:'football'
  },
  {
    type:4,
    time:Year()+'/09 13:30',
    class:'basketball'
  },
  {
    type:5,
    time:Year()+'/12 13:30',
    class:'pingpang'
  },
  {
    type:6,
    time:Year()+'/13 13:30',
    class:'java'
  },
  {
    type:7,
    time:Year()+'/15 13:30',
    class:'c++'
  },
  {
    type:8,
    time:Year()+'/18 13:30',
    class:'Python'
  },
]);
<script>
`)
</script>
