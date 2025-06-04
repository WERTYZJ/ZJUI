<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>js function(函数)</h2>
      </template>
      <p>(一)替换函数</p>
      <p>1.1 .replace() 方法</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.2 .match() 方法将字符串与正则表达式进行匹配。</p>
      <p>(二)文件读取</p>
      <p>1.1 FileReader() readAsText(inputElement.files[0], 'utf8')</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(
  `this.content = this.content.replace(/<\/a >/g, '</a ></div >');
`)

const vueCode2 = ref(`
// 获取<input>元素和文件
const inputElement = document.querySelector('input[type=file]');
inputElement.addEventListener('change', function() {
// 创建FileReader对象
const reader = new FileReader();

// 读取第一个选中的文件
reader.readAsText(inputElement.files[0], 'utf8');

// 当文件读取完成后执行的函数
reader.onload = function() {
// 输出文件内容
console.log(reader.result);
};
}, false);
`)

</script>
