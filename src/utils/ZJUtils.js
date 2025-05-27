// utils/ZJUtils.js
export const ZJ_GetImage = (path) => {
  // 添加路径校验
  if (!path) return '';
  return new URL(`/src/assets/${path}`, import.meta.url).href
}