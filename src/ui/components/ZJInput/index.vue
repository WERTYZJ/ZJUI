<template>
  <div>
    <input v-model="ZJInputVal" :placeholder="props.placeholder">
  </div>
</template>

<script setup>

const ZJInputVal = ref('');

// 接收 props
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  val: {
    type: String,
    default: '',
  }
});

const emits = defineEmits(['ZJInputVal'])

watch(() => ZJInputVal.value, (newVal) => {
  emits('ZJInputVal', newVal)
})

const reSetVal = () => {
  ZJInputVal.value = ''
}

onMounted(() => {
  ZJInputVal.value = props.val
})

// 暴露方法给父组件
defineExpose({
  reSetVal
})
</script>

<style scoped>
input {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: var(--ZJ-main);
  border: none;
  outline: 2px solid var(--ZJ-main-hover);
  text-indent: 10px;
  color: var(--ZJ-main-text-color);
  font-size: 14px;
}

input:focus {
  outline: 2px solid var(--ZJ-default-main);
}

input::placeholder {
  /* background-color: #9B8CDF; */
  background-repeat: no-repeat;
  background-position-x: calc(100% - 15px);
  background-position-y: center;
  /* font-size: 14px; */
  font-weight: normal;
  color: var(--ZJ-main-text-label-color);
}
</style>