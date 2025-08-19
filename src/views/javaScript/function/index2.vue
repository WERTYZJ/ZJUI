<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>js function2(函数)</h2>
      </template>
      <p>1.1 使用 Object.keys(data)、Object.entries(data)、reduce()函数,并使用mescrolluni.js实现对象数据的分页逐步叠加;
        并根据每天的时间向该天追加当天数据；</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>1.2 array.reduce()函数,是数组的归并方法，与forEach()、map()、filter()等迭代方法一样都会对数组每一项进行遍历，但是reduce() 可同时将前面数组项遍历产生的结果与当前遍历项进行运算
      </p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>1.3 根据id过滤删除数组里面的对象</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(`
const showDataList = ref([]);
const data= res = {
  data: {
    "2025-8-18":[
      {icon:"http:baidu.com",content:"百度"},
      {icon:"http:baidu.com",content:"搜狐"},
      {icon:"http:baidu.com",content:"腾讯视频"},
     ],
    "2025-8-17":[
      {icon:"http:baidu.com",content:"百度"},
      {icon:"http:baidu.com",content:"搜狐"},
      {icon:"http:baidu.com",content:"腾讯视频"},
     ],
  }
};

const getData = (page) =>{
  ListFunction({
    pageNum: page.num,
    pageSize: page.size,
  })
  .then(res =>{
    const data = res.data;
    if(this.titleIndex==0){
      if(page.num == 1){
        this.lookMeList = [];
        this.lookMeList = data;
      }else{
        Object.keys(data).forEach((timeKey) => {
        if (!showDataList.value[timeKey]) {
          showDataList.value[timeKey] = [];
        }
        showDataList.value[timeKey] = [...showDataList.value[timeKey], ...data[timeKey]];
      });
      }
    }
    const arr = Object.entries(data).map(([title, items]) => ({title,items}));
    const totalLength = arr.reduce((sum, { items }) => sum + items.length, 0);
    mescroll.endSuccess(totalLength, totalLength >= page.size);
  }).catch(() => {
    mescroll.endErr()
  })
}
`)

const vueCode2 = ref(`
arr.reduce(function(prev,cur,index,arr){
...
}, init);
// arr 表示原数组；
// prev 表示上一次调用回调时的返回值，或者初始值 init;
// cur 表示当前正在处理的数组元素；
// index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
// init 表示初始值。
// 常用的参数为:prev 和 cur。
`)
const vueCode3 = ref(`
<script>
export default {
  data() {
    return {
      lookMeList: {
        "2025-8-18": [
          {icon: "http:baidu.com", content: "百度", fromUserId: "id1"},
          {icon: "http:baidu.com", content: "搜狐", fromUserId: "id2"},
          {icon: "http:baidu.com", content: "腾讯视频", fromUserId: "id3"},
        ],
        "2025-8-17": [
          {icon: "http:baidu.com", content: "百度", fromUserId: "id4"},
          {icon: "http:baidu.com", content: "搜狐", fromUserId: "71c193bb8d394690b742c1ef2a8cf657"},
          {icon: "http:baidu.com", content: "腾讯视频", fromUserId: "id6"},
        ],
        "2025-8-16": [
          {icon: "http:baidu.com", content: "搜狐", fromUserId: "71c193bb8d394690b742c1ef2a8cf657"},
        ],
      }
    }
  },
  methods: {
    deleteItemByUserId(data, targetUserId) {
      // 创建深拷贝
      const result = JSON.parse(JSON.stringify(data));
      
      // 遍历每个日期数组
      for (const date in result) {
        // 过滤掉匹配的 fromUserId
        result[date] = result[date].filter(
          item => item.fromUserId !== targetUserId
        );
        
        // 添加判断：如果该日期数组为空，则删除整个日期键
        if (result[date].length === 0) {
          delete result[date];
        }
      }
      
      return result;
    },
    
    // 删除操作的方法
    delLook(id) {
      try {
        // 使用 this 调用组件方法
        const newData = this.deleteItemByUserId(this.lookMeList, id);
        console.log("删除后的数据", newData);
        
        // 更新数据
        this.lookMeList = newData;
        
        // 可选：显示成功消息
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        });
      } catch (error) {
        console.error("删除失败", error);
        uni.showToast({
          title: '删除失败',
          icon: 'none'
        });
      }
    }
  }
}
<script>
`)
</script>
