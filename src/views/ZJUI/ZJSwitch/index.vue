<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJSwitch(开关)</h2>
      </template>
      <h3>开关用来打开或者关闭一项功能</h3>
      <p>ZJSwitchVal="true" 开关的默认开启状态，true为开启，false为关闭。</p>
      <p>@ZJSwitchNewVal="openDialog()"接收到的更改后的开关状态。（状态同上）</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJSwitch ZJSwitchVal="true" @ZJSwitchNewVal="acceptSwitchVal($event, 0)"></ZJSwitch>
        <ZJSwitch ZJSwitchVal="false" @ZJSwitchNewVal="acceptSwitchVal($event, 1)"></ZJSwitch>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

function acceptSwitchVal(e, index) {
  console.log("开关的数值为", e)
  console.log("开关的数值index为", index)
}

const vueCode = ref(
  `<template>
    <div>
      <ZJSwitch ZJSwitchVal="true" @ZJSwitchNewVal="acceptSwitchVal($event, 0)"></ZJSwitch>
      <ZJSwitch ZJSwitchVal="false" @ZJSwitchNewVal="acceptSwitchVal($event, 1)"></ZJSwitch>
    </div>
</template>

<script setup>
import { ref } from "vue";

function acceptSwitchVal(e, index) {
  console.log("开关的数值为", e)
  console.log("开关的数值index为", index)
}
<script>
`)
</script>
