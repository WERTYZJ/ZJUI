<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJBackTop(返回顶部)</h2>
      </template>
      <h3>返回页面顶部的操作按钮</h3>
      <p>:ZJTopElement="scrollTopElement"返回顶部父元素。</p>
      <p>:ZJTopHeight="scrollTop"返回顶部父元素中滚动条距离顶部的距离。</p>
      <div class="ZJDisplayFlex m-t-10">
        <!-- <ZJBackTop></ZJBackTop> -->
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
  <div ref="scrollTopElement">
    <--内容-->
    <ZJBackTop 
      :ZJTopHeight="scrollTop"
      :ZJTopElement="scrollTopElement"
      >
    </ZJBackTop>
  </div>
</template>

<script setup name="ZJDefaultMain">
import {ref,onMounted,onUnmounted} from 'vue'

const scrollTopElement = ref('')
const scrollTop = ref(0);

const handleScroll = () => {
  if (scrollTopElement.value) {
    scrollTop.value = scrollTopElement.value.scrollTop;
  }
};
 
onMounted(() => {
  const element = scrollTopElement.value;
  if (element) {
    element.addEventListener('scroll', handleScroll);
  }
});
 
onUnmounted(() => {
  const element = scrollTopElement.value;
  if (element) {
    element.removeEventListener('scroll', handleScroll);
  }
});
<script>
`)
</script>
