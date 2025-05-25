<template>
  <div class="main" ref="main">
    <div class="finish" ref="finish"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch,defineProps } from 'vue'

const props = defineProps({
  allCount: {
    type: [String, Number],
    default: null
  },
  finishCount: {
    type: [String, Number],
    default: null
  }
})

const mainWidth = ref('')
const main = ref(null)
const finish = ref(null)

const updateWidth = () => {
  mainWidth.value = main.value.offsetWidth
  progress()
}

const progress = () => {
  if (main.value && finish.value && props.allCount) {
    finish.value.style.width = `${(mainWidth.value / props.allCount) * props.finishCount}px`
  }
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
  progress()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

watch(() => [props.allCount, props.finishCount], () => {
  progress()
})
</script>

<style scoped>
.main{
position: relative;
max-width: 400px;
min-width: 200px;
height: 12px;
border-radius: 104px;
/* background: rgba(112, 80, 232, 0.1804); */
background-color: var(--ZJ-default-main-hover);
}
.finish{
position: absolute;
max-width: 100%;
left: 0px;
height: 12px;
border-radius:10px;
/* background: rgba(112, 80, 232, 0.5); */
background-color: var(--ZJ-default-main);
transition: all 0.3s ease;
}
</style>