<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>vue-i18n(vue3配置多语言)</h2>
      </template>
      <p>在vue中安装 "vue-i18n": "^11.1.3"。</p>
      <p>在src下创建locales文件夹,在locales下的language文件夹下创建en-US.json和zh-CN.json。</p>
      <p>en-US.jso如下:</p>
      <ZJCodeDisplay :code="vueCode1" language="vue" />
      <p>zh-CN.json如下:</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>在src下创建locales文件夹下创建i18n.js</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
      <p>在main.js下配置:</p>
      <ZJCodeDisplay :code="vueCode4" language="vue" />
      <p>页面中的切换和使用:</p>
      <ZJCodeDisplay :code="vueCode5" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode1 = ref(`
{
  "layout": {
    "ZJSet": {
      "ThemeConfiguration": "主题配置",
      "ThemeMode": {
        "ThemeMode": "主题模式",
        "DarkSidebar": "深色侧边栏",
        "GrayMode": "灰色模式",
        "ColorDeficiencyMode": "色弱模式"
      },
      "LayoutMode": "布局模式",
      "ThemeColors": "主题颜色",
      "DuplicateTheme": "复制主题",
      "CancelTheme": "取消主题",
      "ChangeSuccess": "语言切换成功!"
    }
  }
}
`)
const vueCode2 = ref(`
{
  "layout": {
    "ZJSet": {
      "ThemeConfiguration": "Theme configuration",
      "ThemeMode": {
        "ThemeMode": "Mode",
        "DarkSidebar": "Dark sidebar",
        "GrayMode": "Gray mode",
        "ColorDeficiencyMode": "Color deficiency mode"
      },
      "LayoutMode": "Layout",
      "ThemeColors": "Colors",
      "DuplicateTheme": "Duplicate theme",
      "CancelTheme": "Cancel theme",
      "ChangeSuccess": "Language changed Successful!"
    }
  }
}
`)
const vueCode3 = ref(`
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
`)
const vueCode4 = ref(`
import { createApp } from 'vue'
import i18n from './locales/i18n'

const app = createApp(App)
// 挂在多语言i8n
app.use(i18n)


app.mount('#app')
`)
const vueCode5 = ref(`
<template>
    <div>
      <div v-for="(item, index) in topMore" :key="index" @click="changeLanguage(item.type)"></div>
      <div>{{ t("layout.ZJSet.ThemeConfiguration") }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();

const topMore = ref(
  [
    {
      name: '中文',
      type: 'zh-CN',
    },
    {
      name: '英文',
      type: 'en-US',
    },
  ])

const changeLanguage = (lang) => {
  locale.value = lang
}

<script>
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
