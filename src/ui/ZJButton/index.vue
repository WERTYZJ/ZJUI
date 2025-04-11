<template>
  <button :class="props.type" :style="ZJStyle">
    <ZJSvgIcons v-if="props.icon" :icon="props.icon"></ZJSvgIcons>
    {{ props.text }}
  </button>
</template>
 
<script setup>
import { defineProps, computed } from 'vue';

// 接收 props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['default', 'success', 'error', 'warning', 'info'].includes(value),
  },
  icon: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: () => ({})
  },
  dashed: {
    type: Boolean,
    default: false,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});

const ZJStyle = computed(() => {
  let fontColor
  if (props.transparent) {
    switch (props.type) {
      case 'success':
        fontColor = 'var(--ZJ-button-success-dark)';
        break;
      case 'error':
        fontColor = 'var(--ZJ-button-error-dark)';
        break;
      case 'info':
        fontColor = 'var(--ZJ-button-info-dark)';
        break;
      case 'warning':
        fontColor = 'var(--ZJ-button-warning-dark)';
        break;
      default:
        fontColor = 'var(--ZJ-default-main)';
    }
  }
  const styleGroup = {
    ...props.style,
    ...(props.dashed ? { borderStyle: 'dashed' } : {}),
    ...(props.transparent ? { backgroundColor: 'transparent' } : {}),
    ...{ color: fontColor },
  }

  return styleGroup;
});

</script>

<style scoped>
button {
  color: #FFF;
  font-size: var(--ZJ-button-font-size);
  height: var(--ZJ-button-height);
  padding: var(--ZJ-button-padding);
  border-radius: var(--ZJ-button-border-radius);
  transition: var(--ZJ-button-transition);
}

.success {
  background-color: var(--ZJ-button-success-dark);
  border: var(--ZJ-button-success-border-dark);
}

.success:hover {
  background-color: var(--ZJ-button-success-light);
  border: var(--ZJ-button-success-border-light);
}

.success:active {
  background-color: var(--ZJ-button-success-active);
  border: var(--ZJ-button-success-active-border);
}

.error {
  background-color: var(--ZJ-button-error-dark);
  border: var(--ZJ-button-error-border-dark);
}

.error:hover {
  background-color: var(--ZJ-button-error-light);
  border: var(--ZJ-button-error-border-light);
}

.error:active {
  background-color: var(--ZJ-button-error-active);
  border: var(--ZJ-button-error-active-border);
}

.warning {
  background-color: var(--ZJ-button-warning-dark);
  border: var(--ZJ-button-warning-border-dark);
}

.warning:hover {
  background-color: var(--ZJ-button-warning-light);
  border: var(--ZJ-button-warning-border-light);
}

.warning:active {
  background-color: var(--ZJ-button-warning-active);
  border: var(--ZJ-button-warning-active-border);
}

.info {
  background-color: var(--ZJ-button-info-dark);
  border: var(--ZJ-button-info-border-dark);
}

.info:hover {
  background-color: var(--ZJ-button-info-light);
  border: var(--ZJ-button-info-border-light);
}

.info:active {
  background-color: var(--ZJ-button-info-active);
  border: var(--ZJ-button-info-active-border);
}</style>
