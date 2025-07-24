<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>js function(函数)</h2>
      </template>
      <p>1.1 replace() 方法,替换函数;</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.2 match() 方法将字符串与正则表达式进行匹配,提示：如果搜索值为字符串，则转换为正则表达式。match() 方法返回包含匹配项的数组。如果未找到匹配项，则 match() 方法返回 null。</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>1.3 FileReader() readAsText(inputElement.files[0], 'utf8'),文件读取;</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
      <p>1.4 使用Object.entries()获取键值对，然后映射为包含key和postName的对象类型转换：parseInt(key)将字符串键转为数字类型</p>
      <ZJCodeDisplay :code="vueCode4" language="vue" />
      <p>1.5 使用Object.values()获取值</p>
      <ZJCodeDisplay :code="vueCode5" language="vue" />
      <p>1.6 使用map函数,map()方法经常拿来遍历数组，但是不改变原数组，但是会返回一个新的数组。</p>
      <ZJCodeDisplay :code="vueCode6" language="vue" />
      <ZJCodeDisplay :code="vueCode7" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(`
//replace() 方法用于在字符串中替换指定的子字符串或正则表达式匹配的内容。它返回一个新的字符串，并不会修改原始字符串。
//示例：替换字符串中的单词
let text = "Hello World!";
let result = text.replace("World", "JavaScript");
console.log(result); // 输出: Hello JavaScript!

//使用正则表达式进行全局替换
//通过正则表达式的 g 标志，可以替换所有匹配项：
let text = "blue sky and blue ocean";
let result = text.replace(/blue/g, "green");
console.log(result); // 输出: green sky and green ocean

//忽略大小写的全局替换
//结合 gi 标志实现全局且忽略大小写的替换：
let text = "Blue sky and blue ocean";
let result = text.replace(/blue/gi, "green");
console.log(result); // 输出: green sky and green ocean

//使用函数动态生成替换内容
//可以传递一个函数作为第二个参数，动态生成替换内容：
let text = "The price is $100.";
let result = text.replace(/\$(\d+)/, (match, p1) => '{ parseInt(p1) * 2}');
console.log(result); // 输出: The price is $200

//注意事项
//默认只替换第一个匹配项：如果需要替换所有匹配项，请使用正则表达式并添加 g 标志。
//不会修改原始字符串：replace() 返回的是新字符串，原始字符串保持不变。
//通过以上方法，replace() 提供了灵活的方式来处理字符串替换任务，无论是简单的文本替换还是复杂的动态生成内容。
`)

const vueCode2 = ref(`
//使用字符串搜索 "ain" ：
let text = "The rain in SPAIN stays mainly in the plain";
let result = text.match("ain");
console.log('result',result)

//使用正则表达式搜索 "ain" ：
let text = "The rain in SPAIN stays mainly in the plain";
let result = text.match(/ain/);
console.log('result',result)

//对 "ain" 的全局搜索：
let text = "The rain in SPAIN stays mainly in the plain";
let result = text.match(/ain/g);
console.log('result',result)

//全局、不区分大小写的搜索：
let text = "The rain in SPAIN stays mainly in the plain";
let result = text.match(/ain/gi);
console.log('result',result)
`)

const vueCode3 = ref(`
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

const vueCode4 = ref(`
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
const vueCode5 = ref(`
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

const vueCode6 = ref(`
 const array = [2, 3, 4, 4, 5, 6]
 console.log("原数组array为",array)
 const map2=array.map((item,index,arr)=>{
            console.log("操作的当前元素",item)
            console.log("当前元素下标",index)
            console.log("被操作的元素",arr)
            //对元素乘以2
            return item*2
 })
 console.log("处理之后先产生的数组map",map2)
`)

const vueCode7 = ref(`
const arrayUsers = [
    {
        id: 1,
        username: "Magic",
        address: "Johnson",
    },
    {
        id: 2,
        username: "Kobe",
        address: "Bryant",
    },
    {
        id: 3,
        username: "Lebron",
        address: "James",
    },
    {
        id: 4,
        username: "Kareem",
        address: "Abdul-Jabbar",
    },
    {
        id: 5,
        username: "Shaquille",
        address: "O’Neal",
    },
];
const newUsers = arrayUsers.map((item) => item.username);
console.log(arrayUsers);
// [
//     { id: 1, username: 'Magic', address: 'Johnson' },
//     { id: 2, username: 'Kobe', address: 'Bryant' },
//     { id: 3, username: 'Lebron', address: 'James' },
//     { id: 4, username: 'Kareem', address: 'Abdul-Jabbar' },
//     { id: 5, username: 'Shaquille', address: 'O’Neal' }
//   ]
console.log(newUsers); // [ 'Magic', 'Kobe', 'Lebron', 'Kareem', 'Shaquille' ]
`)

</script>
