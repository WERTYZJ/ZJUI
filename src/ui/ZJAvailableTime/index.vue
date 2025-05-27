<template>
  <div class="availableDaysBox" @click="clickSelect">
    <div class="available-body">
      <div class="uu"><div class="available-body-box" v-for="m in title" :key="m">{{ m }}</div></div>
      <div><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in mon" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
      <div><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in thu" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
      <div><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in wed" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
      <div><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in tue" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
      <div><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in fri" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
      <div><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in sat" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
      <div class="uuu"><div :class="{'available-body-box':true,'available-body-box-selected': m =='true'}" v-for="(m,index) in sun" :key="index"><div v-if="index<1">{{ m }}</div></div></div>
    </div>
    <div class="bottom-text">Displayed using your current time zone (UTC-08:00)</div>
  </div>
  <availablDaysSelect class="modal" v-show="showSelectAvailableDays"
  @close="close()" @showSelectData="acceptShowData"
  @showSelectDataAll="acceptShowDataAll" :readAvailableData="props.readAvailableData"
  :type="props.type"></availablDaysSelect>
</template>

<script setup>
import availablDaysSelect from './availablDaysSelect.vue';

const emits = defineEmits(['availableData']);
const props = defineProps({
  type:{
    type: [String, Number],  
    default: null  
  },
  readAvailableData:{
    type:Array,  
    default: null  
  },
})

// onMounted(()=>{
//   console.log("44",props.readAvailableData)
// })

const title = ref(['UTC +8:00','00-04','04-08','08-12','12-16','16-20','20-24']);
const mon = ref(['Monday','','','','','','']);
const thu = ref(['Thursday','','','','','','']);
const wed = ref(['Wednesday','','','','','','']);
const tue = ref(['Tuesday','','','','','','']);
const fri = ref(['Friday','','','','','','']);
const sat = ref(['Saturday','','','','','','']);
const sun = ref(['Sunday','','','','','','']);

const showSelectAvailableDays = ref(false)
function clickSelect(){
  showSelectAvailableDays.value = true
}

function close(){
  showSelectAvailableDays.value = false
}

const weekName = [mon, tue, wed, thu, fri, sat, sun];
function acceptShowData(val){
  weekName.forEach((item,index)=>{
    for (let i = 1; i <= val[index].length; i++) {
      item.value[i] = val[index][i-1];
    }
  })
  // console.log(mon.value,val)
}

function acceptShowDataAll(val){
  emits('availableData',val);
}

</script>

<style scoped>
.availableDaysBox{
  /* background-color: aqua; */
  width: 100%;
}
.available-body{
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(8, 1fr); 
  border: var(--ZJ-main-border-light);
  border-radius:6px;
}
.available-body-box{
  height: 40px;
    /* background-color: #7050E8; */
    /* border-radius:10px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: var(--ZJ-main-border-light);
  box-sizing: border-box;
}
.available-body-box-selected{
  background-color: #8DCD46;
}
.uu .available-body-box:first-child{
  border-radius: 5px 0 0 0;
}
.uu .available-body-box:last-child{
  border-radius: 0 0 0 5px;
}
.uuu .available-body-box:first-child{
  border-radius: 0 5px 0 0;
}
.uuu .available-body-box:last-child{
  border-radius: 0 0 5px 0;
}
.bottom-text{
  text-align: center;
  color: #9E9E9E;
  font-size: 14px;
  margin-top: 15px;
}
</style>