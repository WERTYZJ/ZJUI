<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div class="ZJCodeDisplay">
    <ZJSvgIcons icon="copy" class="copyIcon"></ZJSvgIcons>
    <pre>
      <code class="code-display" :class="language" ref="codeBlock">{{ code }}</code>
    </pre>
  </div>
</template>

<script setup>
import { ref, onMounted,defineProps } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'; // 你可以选择其他样式

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: '' // 默认语言
  }
})

const codeBlock = ref(null);

onMounted(() => {
  hljs.highlightElement(codeBlock.value);
});

</script>

<style scoped>
.ZJCodeDisplay{
  position: relative;
}
.code-display {
  background-color:var(--ZJ-main-hover); /* 代码块背景色 */
  padding:10px;
  border-radius: 5px; /* 圆角 */
  overflow-x: auto; /* 横向滚动 */
  font-size: 16px;
  /* max-height: 200px; */
}
.copyIcon{
  background-color:var(--ZJ-main-code-copy-bg);
  height: 20px;
  width: 20px;
  padding:4px;
  border-radius: 5px;
  position: absolute;
  right:6px;
  top: 30px;
}
.copyIcon:hover{
  background-color:var(--ZJ-default-main-hover);
  color: var(--ZJ-default-main);
}
</style>
