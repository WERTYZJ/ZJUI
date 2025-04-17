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
      <p>isIcon 对话框的左侧图表显示，默认不显示。</p>
      <p>type="info" 对话框的类型。（目前支持info,delete,warning）</p>
      <p>@closeZJDialog="openDialog()" 关闭对话框的函数，你可以在这里面进行关闭对话框后的操作(比如关闭加载动画花等)</p>
      <div class="ZJDisplayFlex m-t-10">

        <ZJButton type="default" text="打开info对话框" @click="openDialog()"></ZJButton>
        <ZJDialog v-show="showZJDialog" title="基础信息" type="info" isIcon @closeZJDialog="openDialog()">
          <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
          <template #footer>
            <ZJButton type="info2" text="Confirm" transparent @click="openDialog()"></ZJButton>
            <ZJButton type="default" text="Cancel" @click="openDialog()"></ZJButton>
          </template>
        </ZJDialog>

        <ZJButton type="error" text="打开delete对话框" @click="openDialogDelete()"></ZJButton>
        <ZJDialog v-show="showZJDialogDelete" title="删除操作" type="delete" isIcon @closeZJDialog="openDialogDelete()">
          <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
          <template #footer>
            <ZJButton type="info2" text="Confirm" transparent @click="openDialogDelete()"></ZJButton>
            <ZJButton type="error" text="Cancel" @click="openDialogDelete()"></ZJButton>
          </template>
        </ZJDialog>

        <ZJButton type="warning" text="打开warning对话框" @click="openDialogWarning()"></ZJButton>
        <ZJDialog v-show="showZJDialogWarning" title="提示操作" type="warning" isIcon @closeZJDialog="openDialogWarning()">
          <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
          <template #footer>
            <ZJButton type="info2" text="Confirm" transparent @click="openDialogWarning()"></ZJButton>
            <ZJButton type="warning" text="Cancel" @click="openDialogWarning()"></ZJButton>
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

function openDialog() {
  showZJDialog.value = !showZJDialog.value;
}

const showZJDialogDelete = ref(false);

function openDialogDelete() {
  showZJDialogDelete.value = !showZJDialogDelete.value;
}

const showZJDialogWarning = ref(false);

function openDialogWarning() {
  showZJDialogWarning.value = !showZJDialogWarning.value;
}

const vueCode = ref(
  `<template>
    <ZJButton type="default" text="打开info对话框" @click="openDialog()"></ZJButton>
      <ZJDialog v-show="showZJDialog" title="基础信息" type="info" isIcon @closeZJDialog="openDialog()">
        <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
        <template #footer>
          <ZJButton type="info2" text="Confirm" transparent @click="openDialog()"></ZJButton>
          <ZJButton type="default" text="Cancel" @click="openDialog()"></ZJButton>
        </template>
      </ZJDialog>

      <ZJButton type="error" text="打开delete对话框" @click="openDialogDelete()"></ZJButton>
      <ZJDialog v-show="showZJDialogDelete" title="删除操作" type="delete" isIcon @closeZJDialog="openDialogDelete()">
        <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
        <template #footer>
          <ZJButton type="info2" text="Confirm" transparent @click="openDialogDelete()"></ZJButton>
          <ZJButton type="error" text="Cancel" @click="openDialogDelete()"></ZJButton>
        </template>
      </ZJDialog>

      <ZJButton type="warning" text="打开warning对话框" @click="openDialogWarning()"></ZJButton>
      <ZJDialog v-show="showZJDialogWarning" title="提示操作" type="warning" isIcon @closeZJDialog="openDialogWarning()">
        <p>对话框用来在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
        <template #footer>
          <ZJButton type="info2" text="Confirm" transparent @click="openDialogWarning()"></ZJButton>
          <ZJButton type="warning" text="Cancel" @click="openDialogWarning()"></ZJButton>
        </template>
      </ZJDialog>
</template>

<script setup>
import { ref } from "vue";

const showZJDialog = ref(false);

function openDialog() {
  showZJDialog.value = !showZJDialog.value;
}

const showZJDialogDelete = ref(false);

function openDialogDelete() {
  showZJDialogDelete.value = !showZJDialogDelete.value;
}

const showZJDialogWarning = ref(false);

function openDialogWarning() {
  showZJDialogWarning.value = !showZJDialogWarning.value;
}

<script>
`)
</script>
