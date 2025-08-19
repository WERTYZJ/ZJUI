<template>
  <Transition name="mask">
    <div class="modal">
      <Transition name="c">
        <div class="ZJDialog">
          <div class="ZJDialog-header">
            <div class="ZJDialog-header-left">
              <img v-if="props.isIcon" :src="getDialogIcons" alt="">
              <div class="title">{{ props.title }}</div>
            </div>
            <ZJSvgIcons icon="close" class="ZJIconBox" @click="close()"></ZJSvgIcons>
          </div>
          <div class="ZJDialog-main">
            <slot></slot>
          </div>
          <div class="ZJDialog-bottom">
            <slot name="footer"></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isIcon: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['closeZJDialog'])

function close() {
  emit('closeZJDialog');
}

const getDialogIcons = computed(() => {
  if (props.isIcon) {
    switch (props.type) {
      case 'success':
        return new URL('@/assets/images/ZJUI/ZJDialog/success.svg', import.meta.url).href;
      case 'delete':
        return new URL('@/assets/images/ZJUI/ZJDialog/delete.svg', import.meta.url).href;
      case 'info':
        return new URL('@/assets/images/ZJUI/ZJDialog/success.svg', import.meta.url).href;
      case 'info2':
        return new URL('@/assets/images/ZJUI/ZJDialog/success.svg', import.meta.url).href;
      case 'warning':
        return new URL('@/assets/images/ZJUI/ZJDialog/warning.svg', import.meta.url).href;
      default:
        return new URL('@/assets/images/ZJUI/ZJDialog/success.svg', import.meta.url).href;
    }
  }
})
</script>

<style scoped>
.ZJDialog {
  position: relative;
  padding: 20px;
  margin: 20px;
  border-radius: var(--ZJ-main-border-radius-10);
  background: var(--ZJ-main-message-color);
  color: var(--ZJ-main-text-color);
  max-width: 450px;
}

.ZJDialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ZJDialog-header-left {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.ZJDialog-header-left img {
  height: 40px;
  width: 40px;
}

.title {
  font-size: 20px;
  font-weight: 900;
}

.ZJDialog-main {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
}

.ZJDialog-bottom {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;
}
</style>