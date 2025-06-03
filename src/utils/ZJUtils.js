// utils/ZJUtils.js
export const ZJ_GetImage = (path) => {
  // 添加路径校验
  if (!path) return '';
  // const a = new URL(`./assets/${path}.png`, import.meta.url).href;
  // console.log("aaa",a)
  // console.log("path",path)
  return new URL(`../assets/images/${path}`, import.meta.url).href
}