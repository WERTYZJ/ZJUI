<template>
  <div class="verify-main">
    <div class="verify-code">
      <input autofocus v-for="(i, index) in verifyCode" :key="index" v-model="verifyCode[index]"
        @input="handleInput(index, $event)" @keydown="handleKeyDown(index, $event)" maxlength="1"
        class="verify-code-input" :type="inputType" />
    </div>
    <div class="verify-code-tips" v-show="showSendText">
      <div :class="{ 'tips-box-sendIng': sendIng }" @click="startCountdown">
        <a v-if="!sendIng">{{ sendText }}</a>
        <a v-if="sendIng">{{ verifyCount }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  codeLength: {
    type: Number,
    default: 6
  },
  countDown: {
    type: Number,
    default: 60
  },
  sendText: {
    type: String,
    default: '发送验证码'
  },
  showSendText: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['sendVerifyCode', 'ZJInputOTPVal', 'waitSending'])

const countdown = ref(); // 倒计时时长
const interval = ref(null);//计时器
const verifyCount = ref();//验证码计时器
const verifyCode = ref([...Array(props.codeLength).fill('')]);//验证码数组
const verifyCodeGroup = ref('');//验证码
const sendIng = ref(false);//发送状态

// 输入框类型的计算
const inputType = computed(() => {
  if (props.mask) {
    return 'password';
  } else {
    return 'text';
  }
})

// 开始计时
const startCountdown = () => {
  if (interval.value) {
    emits('waitSending', verifyCount.value)
    return
  };
  emits('sendVerifyCode')
  sendIng.value = true;
  countdown.value = props.countDown; // 重置倒计时
  verifyCount.value = countdown.value;
  interval.value = setInterval(() => {
    countdown.value--;
    verifyCount.value = countdown.value;
    if (countdown.value <= 0) {
      clearInterval(interval.value);
      interval.value = null;
      sendIng.value = false;
      countdown.value = props.countDown
    }
  }, 1000);
}

// 判断输入
const handleInput = (index, event) => {
  const value = event.target.value;
  verifyCode.value[index] = value;
  // 自动跳到下一个输入框
  if (value && index < verifyCode.value.length - 1) {
    const nextInput = event.target.nextElementSibling;
    if (nextInput) {
      nextTick(() => {
        nextInput.focus();
      });
    }
  }
  Verify();
}

// 处理删除操作
const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace' && !event.target.value && index > 0) {
    const prevInput = event.target.previousElementSibling;
    if (prevInput) {
      nextTick(() => {
        prevInput.focus();
      });
    }
  }
}

// 当验证码为6执行操作
const Verify = () => {
  if (!verifyCode.value[props.codeLength - 1] == '') {
    verifyCodeGroup.value = verifyCode.value.join('');
    emits('ZJInputOTPVal', verifyCodeGroup.value)
  }
}

// 组件销毁前清除计时器
onMounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
})
</script>

<style scoped>
.verify-main {
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.verify-code {
  display: flex;
  gap: 20px;
}

.verify-code-input {
  width: 35px;
  height: 38px;
  font-size: 20px;
  text-align: center;
  border: var(--ZJ-main-border-light);
  border-radius: 5px;
  background-color: var(--ZJ-main);
}

.verify-code-input:focus {
  outline: none;
  border-color: var(--ZJ-default-main);
  box-shadow: 0 0 5px var(--ZJ-default-main);
}

.verify-code-input:hover {
  border-color: var(--ZJ-default-main);
}

.verify-code-tips {
  display: flex;
  justify-content: end;
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0em;
  color: var(--ZJ-default-main);
}

.tips-box-sendIng {
  height: 25px;
  background: #7050E8;
  min-width: 30px;
  padding: 0 5px;
  border-radius: 5px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>