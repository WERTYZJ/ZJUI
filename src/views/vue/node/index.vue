<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>node.js</h2>
      </template>
      <p>1.1 nvm 全称为 node.js version management，顾名思义是用于管理多个 nodejs 的版本控制工具。通过 nvm 可以安装和切换不同版本的 nodejs。nvm 主要是为了解决 node.js
        各种版本存在不兼容现象。</p>
      <p>1.2 nvm下载安装方法： <a href="https://www.cnblogs.com/rnny/p/17839190.html"
          target="_blank">https://www.cnblogs.com/rnny/p/17839190.html</a></p>
      <p>1.3 官网地址： <a href="https://github.com/coreybutler/nvm-windows/releases"
          target="_blank">https://github.com/coreybutler/nvm-windows/releases</a></p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(`
# 查看 nvm 版本，version 可简写成 小v
nvm version
nvm v
# 显示 node 是运行在 32 位还是 64 位
nvm arch
# 显示已经安装的列表，list 可简化为 ls
nvm list
# 显示远程可安装的列表，list 也可简化为 ls
nvm list available
# 卸载指定版本 node
nvm uninstall [version]
# 使用指定版本 node
nvm use [version]
16.20.0
22.17.0
# 开启 node.js 版本管理
nvm on
# 关闭 node.js 版本管理
nvm off
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
