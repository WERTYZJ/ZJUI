<template>
  <div class="ZJBackTop" v-show="showBackTop" @click="scrollToBottom">
    <ZJSvgIcons icon="ZJBackTop"></ZJSvgIcons>
  </div>
</template>

<script setup>

const showBackTop = ref(false);

const props = defineProps({
  ZJTopHeight: {
    type: Number,
    default:0,
  },
  ZJTopElement: {
    type: Object, // 接收 ref 对象
    default: null
  }
})

watch(() => props.ZJTopHeight, (newVal) => {
  // console.log("new " ,newVal)
  if (newVal > 0) {
    showBackTop.value = true;
  } else {
    showBackTop.value = false;
  }
})

function scrollToBottom() {
  props.ZJTopElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<style scoped>
.ZJBackTop {
  height: 40px;
  width: 70px;
  border-radius: 20px;
  position: absolute;
  bottom: 50px;
  right: 30px;
  background-color: var(--ZJ-main-message-color);
  box-shadow: var(--ZJ-main-box-shadow);
  color: var(--ZJ-main-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}

.ZJBackTop:hover {
  background-color: var(--ZJ-main-hover);
}
</style>