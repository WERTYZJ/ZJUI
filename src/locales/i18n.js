import { createI18n } from 'vue-i18n'

// 导入语言文件
import zhCN from './language/zh-CN.json'
import enUS from './language/en-US.json'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 语法
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言（当当前语言未找到时）
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n