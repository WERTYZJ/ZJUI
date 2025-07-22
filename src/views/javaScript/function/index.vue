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
      <p>1.3 FileReader() readAsText(inputElement.files[0], 'utf8')</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>1.4 使用Object.entries()获取键值对，然后映射为包含key和postName的对象类型转换：parseInt(key)将字符串键转为数字类型</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
      <p>1.5 使用Object.values()获取值</p>
      <ZJCodeDisplay :code="vueCode4" language="vue" />
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

const vueCode3 = ref(`
const res = {
  data: {
    "1": "船长",
    "4": "二/三副",
    "7": "轮机长",
    "10": "二/三管轮"
  }
};

// 转换函数：添加key属性，并确保包含key=14
const listData = Object.entries(res.data).map(([key, value]) => ({
  key: parseInt(key),  // 将字符串键转为数字
  postName: value
}));

// 添加key=14的职位（示例职位名，请替换为实际值）
listData.push({
  key: 14,
  postName: "新增职位" // 请替换为实际职位名称
});

console.log(listData);
/* 输出：
[
  { key: 1, postName: "船长" },
  { key: 4, postName: "二/三副" },
  { key: 7, postName: "轮机长" },
  { key: 10, postName: "二/三管轮" },
  { key: 14, postName: "新增职位" } // 新增的key=14
]
*/
`)
const vueCode4 = ref(`
const input = {
    "1": "船长",
    "4": "二/三副",
    "7": "轮机长",
    "10": "二/三管轮"
};

// 转换函数
const convertToPostList = (obj) => {
    return Object.values(obj).map(value => ({ postName: value }));
};

// 执行转换
const postListData = convertToPostList(input);

console.log(postListData);
/* 输出：
[
    { postName: "船长" },
    { postName: "二/三副" },
    { postName: "轮机长" },
    { postName: "二/三管轮" }
]
*/
`)

</script>
