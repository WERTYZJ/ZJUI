<template>
  <button :class="props.type" :style="ZJStyle">
    <ZJSvgIcons v-if="props.icon && !iconRight" :icon="props.icon"></ZJSvgIcons>
    {{ props.text }}
    <ZJSvgIcons v-if="props.icon && iconRight" :icon="props.icon"></ZJSvgIcons>
  </button>
</template>
 
<script setup>

// 接收 props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['default', 'success', 'error', 'warning', 'info', 'info2'].includes(value),
  },
  icon: {
    type: String,
    default: '',
  },
  iconRight: {
    type: Boolean,
    default:false,
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
        fontColor = 'var(--ZJ-success-dark)';
        break;
      case 'error':
        fontColor = 'var(--ZJ-error-dark)';
        break;
      case 'info':
        fontColor = 'var(--ZJ-info-dark)';
        break;
      case 'info2':
        fontColor = 'var(--ZJ-main-text-color)';
        break;
      case 'warning':
        fontColor = 'var(--ZJ-warning-dark)';
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
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
}

.default {
  background-color: var(--ZJ-default-main);
  border: var(--ZJ-default-main-border-light);
}

.default:hover {
  background-color: var(--ZJ-default-main);
  border: var(--ZJ-default-main-border-light);
}

.default:active {
  background-color: var(--ZJ-default-main-active);
  border: var(--ZJ-default-main-active-border);
}


.success {
  background-color: var(--ZJ-success-dark);
  border: var(--ZJ-success-border-dark);
}

.success:hover {
  background-color: var(--ZJ-success-light);
  border: var(--ZJ-success-border-light);
}

.success:active {
  background-color: var(--ZJ-success-active);
  border: var(--ZJ-success-active-border);
}

.error {
  background-color: var(--ZJ-error-dark);
  border: var(--ZJ-error-border-dark);
}

.error:hover {
  background-color: var(--ZJ-error-light);
  border: var(--ZJ-error-border-light);
}

.error:active {
  background-color: var(--ZJ-error-active);
  border: var(--ZJ-error-active-border);
}

.warning {
  background-color: var(--ZJ-warning-dark);
  border: var(--ZJ-warning-border-dark);
}

.warning:hover {
  background-color: var(--ZJ-warning-light);
  border: var(--ZJ-warning-border-light);
}

.warning:active {
  background-color: var(--ZJ-warning-active);
  border: var(--ZJ-warning-active-border);
}

.info {
  background-color: var(--ZJ-info-dark);
  border: var(--ZJ-info-border-dark);
}

.info:hover {
  background-color: var(--ZJ-info-light);
  border: var(--ZJ-info-border-light);
}

.info:active {
  background-color: var(--ZJ-info-active);
  border: var(--ZJ-info-active-border);
}

.info2 {
  border: var(--ZJ-main-border-light);
  color: var(--ZJ-main-text-color);
}

.info2:hover {
  background-color: var(--ZJ-main-hover);
  border: 1px solid var(--ZJ-main-hover);
}

.info2:active {
  background-color: var(--ZJ-main-hover);
  border: var(--ZJ-main-border-light);
}
</style>
