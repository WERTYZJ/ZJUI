// 导入组件
import ZJMain from "./ZJMain/index.vue";
import ZJCard from "./ZJCard/index.vue";
import ZJCodeDisplay from './ZJCodeDisplay/index.vue';
import ZJSvgIcons from './ZJSvgIcons/index.vue';
import ZJButton from './ZJButton/index.vue';
import ZJMenu from "./ZJMenu/index.vue";
import ZJProgress from "./ZJProgress/index.vue";
import ZJRate from "./ZJRate/index.vue";
import ZJPagination from "./ZJPagination/index.vue";
import ZJSelect from "./ZJSelect/index.vue";
import ZJSelectDate from "./ZJSelectDate/index.vue";
import ZJSelectDateMore from "./ZJSelectDateMore/index.vue";
import ZJSelectTime from "./ZJSelectTime/index.vue";
import ZJNoData from "./ZJNoData.vue/index.vue";
import ZJLoading from "./ZJLoading/index2.vue";
import ZJCutAvatar from "./ZJCutAvatar/index.vue";
import ZJUpload from "./ZJUpload/index.vue";
import ZJCalendar from "./ZJCalendar/index.vue";
import ZJAnchor from "./ZJAnchor/index.vue";
import ZJDialog from "./ZJDialog/index.vue";
import ZJBackTop from "./ZJBackTop/index.vue"
// 导入函数
import ZJMessage from "./ZJMessage/ZJMessage.js";

// 对外暴露插件对象，注册全局组件
const components = {
  ZJMain,
  ZJCard,
  ZJCodeDisplay,
  ZJSvgIcons,
  ZJButton,
  ZJMenu,
  ZJProgress,
  ZJRate,
  ZJPagination,
  ZJSelect,
  ZJSelectDate,
  ZJSelectDateMore,
  ZJSelectTime,
  ZJNoData,
  ZJLoading,
  ZJCutAvatar,
  ZJUpload,
  ZJCalendar,
  ZJAnchor,
  ZJDialog,
  ZJBackTop,
};

// 插件对象
const ZJUI = {
  // install方法，用于安装插件
  install(app) {
    // 使用Object.keys()遍历对象的所有键
    Object.keys(components).forEach((key) => {
      // 动态注册全局组件
      app.component(key, components[key]);
    });
    // 注册 ZJMessage 为全局方法
    app.config.globalProperties.$ZJMessage = ZJMessage;
  }
};

// 导出插件
export default ZJUI;