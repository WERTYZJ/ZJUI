<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJDialog(对话框)</h2>
      </template>
      <h3>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作</h3>
      <p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>
      <p>v-show="showZJDialog" 是否隐藏或者显示对话框。</p>
      <p>title="对话框" 对话框的标题。</p>
      <p>@closeZJDialog="openDialog()" 关闭对话框的函数，你可以在这里面进行关闭对话框后的操作(比如关闭加载动画花等)</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJButton type="info" text="打开对话框" @click="openDialog()"></ZJButton>
        <ZJDialog 
          v-show="showZJDialog"
          title="对话框"
          @closeZJDialog="openDialog()"
          >
          <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
          <template #footer>
            <ZJButton type="success" text="Confirm" @click="openDialog()"></ZJButton>
            <ZJButton type="info" text="Cancel" @click="openDialog()"></ZJButton>
          </template>
        </ZJDialog>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showZJDialog = ref(false);

function openDialog(){
  showZJDialog.value = !showZJDialog.value;
}

const vueCode=ref(
`<template>
  <ZJDialog 
    v-show="showZJDialog"
    title="对话框"
    @closeZJDialog="openDialog()"
    >
    <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
    <template #footer>
      <ZJButton type="success" text="Confirm" @click="openDialog()"></ZJButton>
      <ZJButton type="info" text="Cancel" @click="openDialog()"></ZJButton>
    </template>
  </ZJDialog>
</template>

<script setup>
import { ref } from "vue";

const showZJDialog = ref(false);

function openDialog(){
  showZJDialog.value = !showZJDialog.value;
}
<script>
`)
</script>
