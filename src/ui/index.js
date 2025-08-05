// 导入组件
import ZJMain from "./components/ZJMain/index.vue";
import ZJCard from "./components/ZJCard/index.vue";
import ZJCodeDisplay from './components/ZJCodeDisplay/index.vue';
import ZJSvgIcons from './components/ZJSvgIcons/index.vue';
import ZJButton from './components/ZJButton/index.vue';
import ZJMenu from "./components/ZJMenu/index.vue";
import ZJProgress from "./components/ZJProgress/index.vue";
import ZJProgressCircle from "./components/ZJProgressCircle/index.vue";
import ZJRate from "./components/ZJRate/index.vue";
import ZJPagination from "./components/ZJPagination/index.vue";
import ZJSelect from "./components/ZJSelect/index.vue";
import ZJSelectDate from "./components/ZJSelectDate/index.vue";
import ZJSelectDateMore from "./components/ZJSelectDateMore/index.vue";
import ZJSelectTime from "./components/ZJSelectTime/index.vue";
import ZJNoData from "./components/ZJNoData.vue/index.vue";
import ZJLoading from "./components/ZJLoading/index2.vue";
import ZJCutAvatar from "./components/ZJCutAvatar/index.vue";
import ZJUpload from "./components/ZJUpload/index.vue";
import ZJCalendar from "./components/ZJCalendar/index.vue";
import ZJAnchor from "./components/ZJAnchor/index.vue";
import ZJDialog from "./components/ZJDialog/index.vue";
import ZJBackTop from "./components/ZJBackTop/index.vue";
import ZJCarousel from "./components/ZJCarousel/index.vue";
import ZJAvailableTime from "./components/ZJAvailableTime/index.vue";
import ZJSwitch from './components/ZJSwitch/index.vue';
import ZJInput from "./components/ZJInput/index.vue";
import ZJInputOTP from "./components/ZJInputOTP/index.vue";
import ZJDrag from "./components/ZJDrag/index.vue";
// 导入函数
import ZJMessage from "./components/ZJMessage/ZJMessage.js";
import { ZJ_GetImage } from "./utils/ZJUtils.js";

// 对外暴露插件对象，注册全局组件
const components = {
  ZJMain,
  ZJCard,
  ZJCodeDisplay,
  ZJSvgIcons,
  ZJButton,
  ZJMenu,
  ZJProgress,
  ZJProgressCircle,
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
  ZJCarousel,
  ZJAvailableTime,
  ZJSwitch,
  ZJInput,
  ZJInputOTP,
  ZJDrag
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
    app.config.globalProperties.$ZJ_GetImage = ZJ_GetImage;
  }
};

// 导出插件
export default ZJUI;