<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>javaScript(问题以及解决方法)</h2>
      </template>
      <p>(一)保留两位小数</p>
      <p>1.1 toFixed() 方法</p>
      <P>toFixed() 方法用于把数字转换为字符串，结果的小数点后有指定位数的数字。</P>
      <p>注意：该方法会将数值四舍五入，例如 3.148 经过 toFixed(2) 方法得到的结果将是 3.15 且 toFixed() 方法会改变数据类型为字符串。</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.2 Math.floor() 方法</p>
      <P>Math.floor() 方法返回小于或等于一个给定数字的最大整数，可以理解 Math.floor() 为向下取整；其相对的是 Math.ceil()，此方法是向上取整。</P>
      <p>注意：该方法不会修改原有数据类型。</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>1.3 字符串+正则匹配 方法</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode=ref(
`let numBer = 3.1415926;
numBer = numBer.toFixed(2);
console.log(numBer); // 3.14
`)

const vueCode2=ref(
`let numBer = 3.1415926;
numBer = Math.floor(numBer * 100) / 100;
console.log(numBer); // 3.14
`)

const vueCode3=ref(
`let numBer = 3.1415926;
numBer = Number(numBer.toString().match(/^\d+(?:\.\d{0,2})?/));
console.log(numBer);// 3.14
`)
</script>
