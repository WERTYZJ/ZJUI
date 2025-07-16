<template>
  <div>
    <ZJMain>
      <div class="role-header">
        <ZJInput @ZJInputVal="$event => searchRoleKey" placeholder="请输入角色内容" :val="searchRoleKey"></ZJInput>
        <ZJButton type="default" text="搜索"></ZJButton>
        <ZJButton type="error" text="重置"></ZJButton>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>
const searchRoleKey = ref('')
</script>

<style scoped>
.role-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>