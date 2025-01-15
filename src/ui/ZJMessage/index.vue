<template>
  <transition name="message">
    <div v-if="visible" :class="['message-box', type]">
      <ZJSvgIcons :icon="getIcon(type)" :class="getIconClass(type)"></ZJSvgIcons>
      <span class="message-title">{{ message }}</span>
    </div>
  </transition>
</template>
 
<script setup>
import { ref, onMounted,defineProps } from 'vue';
import ZJSvgIcons from '../ZJSvgIcons/index.vue'
 
// 接收 props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default:2.5,
  },
});
 
function getIcon(type) {
  const iconMap = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  return iconMap[type] || 'default-icon';
}

function getIconClass(type) {
  return type;
}

const visible = ref(true);
 
onMounted(() => {
  if (props.duration) {
    setTimeout(() => {
      visible.value = false; 
    }, props.duration);
  }
});
</script>

<style scoped>
.success {
  color: #18a058;
}
.error {
  color: #d03050;
}
.warning{
  color: #f0a020;
}
.info {
  color: #2080f0; /* 选择一个适合的颜色 */
}

.message-box {
  z-index:10000;
  position: fixed;
  top:35px;
  left: 50%;
  transform: translateX(-50%);
  /* display: inline-flex; */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border-radius:5px;
  color:var(--ZJ-main-text-color);
  box-shadow:var(--ZJ-main-box-shadow);
  background-color: var(--ZJ-main-message-color);
  animation: slideInDown .4s ease-in-out;
}
@keyframes slideInDown {
  0% {
    opacity: 0;
    transform: translateY(-100%) translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%) translateX(-50%);
  }
}
.message-title {
  padding: 0 15px 0 10px;
  font-size: 14px;
}
</style>
