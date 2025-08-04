<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJInputOTP(验证码)</h2>
      </template>
      <p>输入一次性密码。</p>
      <p>从v1.6.7开始提供</p>
      <p>codeLength 验证码长度,默认验证码长度为6位;</p>
      <p>countDown 发送时间间隔,默认间隔60s,单位秒(s);</p>
      <p>sendText 右下角发送验证码按钮;</p>
      <p>showSendText 是否隐藏右下角发送按钮,默认false不隐藏,需要手动开启;</p>
      <p>mask 是否隐藏验证码,默认false不隐藏,需要手动开启;</p>
      <p>@sendVerifyCode="" 发送验证码执行函数;</p>
      <p>@waitSending="" 当发送验证码倒计时执行时的函数;</p>
      <p>@ZJInputOTPVal="" 当输入全部验证码时触发的函数;</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJCard>
          <ZJInputOTP :codeLength=6 :countDown=60 sendText="发送验证码" showSendText @sendVerifyCode="sendVerifyCode"
            @waitSending="waitSending" @ZJInputOTPVal="acceptZJInputOTPVal"></ZJInputOTP>
        </ZJCard>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const sendVerifyCode = () => {
  console.log("发送验证码")
}

const acceptZJInputOTPVal = (val) => {
  console.log("输出验证码为", val)
}

const waitSending = (val) => {
  $ZJMessage({
    type: 'warning',
    message: `请等待${val}秒后重试`,
    duration: 3000,
  });
}

const vueCode = ref(`
<template>
  <div>
    <ZJInputOTP :codeLength=6 :countDown=60 sendText="发送验证码" showSendText @sendVerifyCode="sendVerifyCode"
      @waitSending="waitSending" @ZJInputOTPVal="acceptZJInputOTPVal">
    </ZJInputOTP>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const sendVerifyCode = () => {
  console.log("发送验证码")
}

const acceptZJInputOTPVal = (val) => {
  console.log("输出验证码为", val)
}

const waitSending = (val) => {
  $ZJMessage({
    type: 'warning',
    message: '请等待{val}秒后重试',
    duration: 3000,
  });
}

<script>
`)
</script>

<style scoped>
a {
  color: var(--ZJ-default-main);
}
</style>
