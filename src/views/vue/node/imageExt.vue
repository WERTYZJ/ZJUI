<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>node.js批量修改图片后缀</h2>
      </template>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(
  `// 导入fs
const fs = require('fs');
// 导入path
const path = require('path');

// 获取当前文件夹里的images文件夹
const imagesPath = path.resolve(__dirname, './images');
// 获取当前文件夹里的images文件夹里的所有图片
const images = fs.readdirSync(imagesPath);

// 遍历图片 我需要把所有的图片的后缀名改成png
images.forEach(image => {
  // 获取图片的路径
  const imagePath = path.resolve(imagesPath, image);
  // 获取图片的后缀名
  const imageExt = path.extname(image);
  // 获取图片的名字
  const imageName = path.basename(image, imageExt);
  // 获取图片的路径
  const newImagePath = path.resolve(imagesPath, $ { imageName }.png);
  // 重命名图片
  fs.renameSync(imagePath, newImagePath);
  console.log(重命名图片：$ { imagePath } -> $ { newImagePath });
})
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
