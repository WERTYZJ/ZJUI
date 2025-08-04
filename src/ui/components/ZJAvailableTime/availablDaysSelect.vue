<template>
  <ZJDialog title="可用时间选择" @closeZJDialog="close()">
    <div class="availableBox">
      <div class="available-body">
        <div class="uu">
          <div class="available-body-box" v-for="i in title" :key="i">{{ i }}</div>
        </div>
        <div>
          <div @click="clickSelectData('mon', index, 'monT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in mon" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
        <div>
          <div @click="clickSelectData('thu', index, 'thuT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in thu" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
        <div>
          <div @click="clickSelectData('wed', index, 'wedT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in wed" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
        <div>
          <div @click="clickSelectData('tue', index, 'tueT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in tue" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
        <div>
          <div @click="clickSelectData('fri', index, 'friT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in fri" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
        <div>
          <div @click="clickSelectData('sat', index, 'satT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in sat" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
        <div class="uuu">
          <div @click="clickSelectData('sun', index, 'sunT')"
            :class="{ 'available-body-box': true, 'available-body-box-selected': m == 'true', 'available-body-box-false': m == '' || m == 'false' }"
            v-for="(m, index) in sun" :key="index">
            <div v-if="index < 1">{{ m }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="not">
      <div class="not-left">
        <div class="not-main">
          <div class="not-box"></div>
          <a>Available</a>
        </div>
        <div class="not-main">
          <div class="not-box2"></div>
          <a>Unavailable</a>
        </div>
      </div>
    </div>
    <template #footer>
      <ZJButton type="info" text="确定" @click="clickOK()"></ZJButton>
      <ZJButton type="success" text="取消" @click="close()"></ZJButton>
    </template>
  </ZJDialog>
</template>

<script setup>

const props = defineProps({
  type: {
    type: [String, Number],
    default: null
  },
  readAvailableData: {
    type: Array,
    default: null
  }
})

const title = ref([
  'UTC +8:00', '00:00-00:30', '00:30-01:00', '01:00-01:30', '01:30-02:00', '02:00-02:30', '02:30-03:00', '03:00-03:30', '03:30-04:00',
  '04:00-04:30', '04:30-05:00', '05:00-05:30', '05:30-06:00', '06:00-06:30', '06:30-07:00', '07:00-07:30', '07:30-08:00', '08:00-08:30', '08:30-09:00',
  '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00',
  '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00',
  '19:00-19:30', '19:30-20:00', '20:00-20:30', '20:30-21:00', '21:00-21:30', '21:30-22:00', '22:00-22:30', '22:30-23:00', '23:00-23:30', '23:30-24:00',
]);

const mon = ref(['Monday', ...Array(48).fill('')]);
const thu = ref(['Thursday', ...Array(48).fill('')]);
const wed = ref(['Wednesday', ...Array(48).fill('')]);
const tue = ref(['Tuesday', ...Array(48).fill('')]);
const fri = ref(['Friday', ...Array(48).fill('')]);
const sat = ref(['Saturday', ...Array(48).fill('')]);
const sun = ref(['Sunday', ...Array(48).fill('')]);

const monT = ref([]);
const thuT = ref([]);
const wedT = ref([]);
const tueT = ref([]);
const friT = ref([]);
const satT = ref([]);
const sunT = ref([]);

const refMap = {
  mon: mon.value,
  monT: monT.value,
  thu: thu.value,
  thuT: thuT.value,
  wed: wed.value,
  wedT: wedT.value,
  tue: tue.value,
  tueT: tueT.value,
  fri: fri.value,
  friT: friT.value,
  sat: sat.value,
  satT: satT.value,
  sun: sun.value,
  sunT: sunT.value
};

function clickSelectData(showKey, index, selectKey) {

  const showData = refMap[showKey];
  const selectData = refMap[selectKey];

  if (props.type == 1 && index > 0) {
    const a = showData[index];
    const timeVal = title.value[index]
    if (a == '' || a == 'false') {
      showData[index] = 'true';
      selectData.push(timeVal);
    } else {
      showData[index] = 'false';
      const deleteIndex = selectData.indexOf(timeVal);
      if (deleteIndex !== -1) {
        selectData.splice(deleteIndex, 1);
      }
    }
  }
}


const emits = defineEmits(['close', 'showSelectData', 'showSelectDataAll']);

function close() {
  emits('close')
}

function timeToMinutes(timeString) {
  const [, endTime] = timeString.split('-');
  const [hours, minutes] = endTime.split(':').map(Number);
  return hours * 60 + minutes;
}

const timeRanges = [
  [0, 4 * 60],
  [4 * 60 + 1, 8 * 60],
  [8 * 60 + 1, 12 * 60],
  [12 * 60 + 1, 16 * 60],
  [16 * 60 + 1, 20 * 60],
  [20 * 60 + 1, 24 * 60]
];


const daysRefs = [monT, tueT, wedT, thuT, friT, satT, sunT];
let a = Array(7).fill().map(() => Array(6).fill('false'));

function clickOK() {
  // 遍历每个day的ref
  daysRefs.forEach((dayRef, dayIndex) => {
    // 遍历dayRef中的每个时间字符串
    for (let timeString in dayRef.value) {
      if (Object.prototype.hasOwnProperty.call(dayRef.value, timeString)) {
        const timeInMinutes = timeToMinutes(dayRef.value[timeString]);
        // 遍历时间段
        timeRanges.forEach((range, index) => {
          if (timeInMinutes >= range[0] && timeInMinutes <= range[1]) {
            a[dayIndex][index] = 'true';
          }
        });
      }
    }
  });
  const all1 = []
  daysRefs.forEach(i => {
    all1.push(i.value)
  })
  a = a.map(row => row.map(() => false));
  all1?.forEach((dayRef, dayIndex) => {
    dayRef?.forEach((timeString) => {
      const timeInMinutes = timeToMinutes(timeString);
      timeRanges?.forEach((range, rangeIndex) => {
        if (timeInMinutes >= range[0] && timeInMinutes <= range[1]) {
          a[dayIndex][rangeIndex] = 'true';
        }
      });
    });
  });
  emits('showSelectData', a);
  emits('showSelectDataAll', all1);
  close();
  // console.log(a)
  // console.log(monT.value, tueT.value, wedT.value, thuT.value, friT.value, satT.value, sunT.value);
}

// read
watch(() => props.readAvailableData, (readAvailableData) => {
  // console.log('readAvailableData', readAvailableData);
  readData(readAvailableData);
})

onMounted(() => {
  readData(props.readAvailableData);
})
const weekDays = ref([mon.value, tue.value, wed.value, thu.value, fri.value, sat.value, sun.value]);
function readData(readAvailableData) {
  readAvailableData?.forEach((dayRef, dayIndex) => {
    dayRef?.forEach((timeString) => {
      const timeInMinutes = timeToMinutes(timeString);
      timeRanges?.forEach((range, rangeIndex) => {
        if (timeInMinutes >= range[0] && timeInMinutes <= range[1]) {
          a[dayIndex][rangeIndex] = 'true';
        }
      });
    });
  });
  readAvailableData?.forEach((dayCount, dayIndex) => {
    dayCount?.forEach((range) => {
      const rangeIndex = title.value.indexOf(range);
      if (rangeIndex !== -1) {
        weekDays.value[dayIndex][rangeIndex] = 'true';
      }
    });
  });
  readAvailableData?.forEach((dayData, dayIndex) => {
    daysRefs[dayIndex].value.push(...dayData);
  });
  emits('showSelectData', a);
}

</script>

<style scoped>
.availableBox {
  overflow: auto;
  height: 400px;
  padding-right: 5px;
}

.available-body {
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.available-body-box {
  height: 40px;
  padding: 0 5px;
  /* background-color: #7050E8; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.available-body-box-selected {
  background-color: #8DCD46;
}

.available-body-box-false {
  background-color: rgba(0, 0, 0, 0.05);
  ;
}

.uu .available-body-box:first-child {
  border-radius: 5px 0 0 0;
}

.uu .available-body-box:last-child {
  border-radius: 0 0 0 5px;
}

.uuu .available-body-box:first-child {
  border-radius: 0 5px 0 0;
}

.uuu .available-body-box:last-child {
  border-radius: 0 0 5px 0;
}

.not {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.not-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.not-left {
  display: flex;
  gap: 10px;
}

.not-box {
  background-color: #8DCD46;
  height: 15px;
  width: 15px;
  border-radius: 50%;
}

.not-box2 {
  background: rgba(0, 0, 0, 0.05);
  height: 15px;
  width: 15px;
  border-radius: 50%;
}
</style>