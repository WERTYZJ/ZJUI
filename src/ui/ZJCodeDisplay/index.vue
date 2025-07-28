<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div>
    <div class="ZJCodeDisplay">
      <ZJSvgIcons icon="hide" class="hideIcon" @click="handleHide" height="24px" width="24px"></ZJSvgIcons>
      <ZJSvgIcons icon="copy" class="copyIcon" @click="handleCopy"></ZJSvgIcons>
      <div class="hideElStyle code-display" v-show="hideStates">代码已折叠，点击右侧按钮展开代码。</div>
      <pre v-show="!hideStates"><code class="code-display" :class="language" ref="codeBlock">{{ code }}</code></pre>
    </div>
  </div>
</template>

<script setup>

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'; // 你可以选择其他样式
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;


const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'vue' // 默认语言
  },
  hideText: {
    type: Boolean,
    default: false
  }
})

const codeBlock = ref(null);

const copied = ref(false); // 添加复制状态
const hideStates = ref()// 添加隐藏代码状态

// 复制处理函数
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);

    $ZJMessage({
      type: 'success',
      message: '复制成功！',
      duration: 3000,
    });
  } catch (err) {
    $ZJMessage({
      type: 'error',
      message: '复制失败！',
      duration: 3000,
    });
  }
};

const handleHide = () => {
  hideStates.value = !hideStates.value;
  if (hideStates.value) {
    $ZJMessage({
      type: 'success',
      message: '折叠成功！',
      duration: 3000,
    });
  } else {
    $ZJMessage({
      type: 'success',
      message: '展开成功！',
      duration: 3000,
    });
  }
}

onMounted(() => {
  hljs.highlightElement(codeBlock.value);
  hideStates.value = props.hideText
});

</script>

<style scoped>
.ZJCodeDisplay {
  position: relative;
  padding: 20px 0;
}

.code-display {
  background-color: var(--ZJ-main-hover);
  /* 代码块背景色 */
  padding: 10px;
  border-radius: 5px;
  /* 圆角 */
  overflow-x: auto;
  /* 横向滚动 */
  font-size: 16px;
  /* max-height: 200px; */
}

.copyIcon {
  background-color: var(--ZJ-main-code-copy-bg);
  height: 20px;
  width: 20px;
  padding: 4px;
  border-radius: 5px;
  position: absolute;
  right: 6px;
  top: 25px;
}

.hideIcon {
  background-color: var(--ZJ-main-code-copy-bg);
  height: 20px;
  width: 20px;
  padding: 2px;
  border-radius: 5px;
  position: absolute;
  right: 40px;
  top: 25px;
}

.copyIcon:hover,
.hideIcon:hover {
  color: var(--ZJ-default-main);
}

.hideElStyle {
  width: calc(100% - 20px);
  line-height: 18px;
}
</style>
