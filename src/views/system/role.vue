<template>
  <div>
    <ZJMain>
      <div class="role-header">
        <ZJInput @ZJInputVal="$event => searchRoleKey" placeholder="请输入角色内容" :val="searchRoleKey"></ZJInput>
        <ZJButton type="default" text="搜索"></ZJButton>
        <ZJButton type="error" text="重置"></ZJButton>
      </div>
      <div class="role-main">
        <div class="role-main-box-tab">
          <a v-for="(i, index) in roleDataListTab" :key="index">{{ i }}</a>
        </div>
        <div class="role-main-box" v-for="(i, index) in roleDataList" :key="index">
          <a>{{ i.roleId }}</a>
          <a>{{ i.roleName }}</a>
          <a>{{ i.roleKey }}</a>
          <a>{{ i.status }}</a>
          <a>{{ i.createTime }}</a>
          <a style="display: flex;justify-content: center;align-items: center;gap: 10px;">
            <ZJButton type="default" text="修改"></ZJButton>
            <ZJButton type="error" text="删除"></ZJButton>
          </a>
        </div>
      </div>
      <div class="role-footer">
        <ZJPagination everyPageCount="10" maxPageCount="20" allDataCount="22" @showPageCount="AcceptPageCount">
        </ZJPagination>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import roleData from "../../mock/system/role.json"

const searchRoleKey = ref('')

const roleDataList = ref([]);
const roleDataListTab = ref([
  '角色编号',
  '角色名称',
  '权限字符',
  '状态',
  '创建时间',
  '修改',
])

onMounted(() => {
  roleDataList.value = roleData.data
})

function AcceptPageCount(page, size) {
  console.log("page", page)
  console.log("size", size)
}


// webpack获取静态页面的方法
// const files = require.context("@/views", true, /\.vue$/).keys();
// console.log(files);

// 获取所有 .vue 文件（递归）
// const files = import.meta.glob('@/views/**/*.vue');
// 如果需要立即加载（类似 eager 模式）
// const files = import.meta.glob('@/views/**/*.vue', { eager: true });

// 获取文件路径列表
// const filePaths = Object.keys(files);
// console.log(filePaths);

// 获取所有 .vue 文件（递归）
const files = import.meta.glob('@/views/**/*.vue');

// 过滤掉路径中包含 "components" 的文件
const filteredFiles = Object.keys(files).filter(
  (path) => !path.includes('/components/') // 严格匹配目录名
);

// console.log(filteredFiles);

</script>

<style scoped>
.role-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.role-main {
  margin-top: 20px;
}

.role-main-box-tab {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  place-items: center;
  border-radius: 5px;
  padding: 8px 0;
  margin: 2px 0;
  background-color: var(--ZJ-main-bg-color);
}

.role-main-box {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  place-items: center;
  border-radius: 5px;
  padding: 8px 0;
  margin: 2px 0;
}

.role-main-box:hover {
  background-color: var(--ZJ-main-hover);
}

.role-footer {
  display: flex;
  justify-content: end;
  margin-top: 15px;
}
</style>