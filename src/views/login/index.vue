<template>
  <div class="login-main">
    <div class="box">
      <div class="box-header">
        <div class="box-avatar">
          <img src="/logo.png" alt="">
        </div>
        <ZJInput @ZJInputVal="$event => account" placeholder="账号" :val="account"></ZJInput>
        <ZJInput @ZJInputVal="$event => password" placeholder="密码" :val="password"></ZJInput>
      </div>
      <div class="box-main">
        <!-- <ZJButton type="info" text="注册" class="btn-login"></ZJButton> -->
        <ZJSelect :label="userType[2].label" :options="userType" @ZJSelectVal="userTypeVal"></ZJSelect>
        <ZJButton type="default" text="登录" class="btn-login" @click="clickLogin()"></ZJButton>
        <div class="box-footer">
          <span>忘记密码</span>
          <span>注册</span>
        </div>
      </div>

    </div>
    <div class="login-footer-img">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0099ff" fill-opacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,
                                864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,
                                320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,
                                320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>

  </div>
</template>

<script setup>

import { ref, getCurrentInstance } from 'vue'
import { useUserStore } from '../../store';
import { getRoutes } from '../../router';
import router from '../../router';

const userStore = useUserStore();
const { appContext } = getCurrentInstance();
const $ZJMessage = appContext.config.globalProperties.$ZJMessage;

const account = ref('123456');
const password = ref('admin123');

const userType = ref([
  {
    label: "用户",
    value: 1,
  },
  {
    label: "管理员",
    value: 2,
  },
  {
    label: "超级管理员",
    value: 3,
  },
])

const userTypeVal = ref(3);

const clickLogin = () => {
  userStore.isLoading = true;
  setTimeout(() => {
    userStore.isLoading = false;
    userStore.userData = {
      userID: 123456,
      token: 'asdsadasfdfgdfghfhfh445asd',
      userAvatar: "/logo.png",
      userName: "ZJUI-Admin",
      userType: userTypeVal.value,
    }

    // 动态添加路由
    const list = getRoutes(userStore.userData.userType);
    userStore.routerList = list;

    $ZJMessage({
      type: 'success',
      message: '登录成功！',
      duration: 3000,
    });
  }, 1500)
}

</script>

<style scoped>
.login-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f5f5;
  position: relative;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
}

.login-main::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #3399ff;
  clip-path: circle(20% at 100% 0);
}

.login-footer-img {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.box {
  position: relative;
  width: 320px;
  height: 420px;
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* box-shadow: 0 0 1px #3399ff; */
  border-radius: 30px;
  background-color: #fff;
}

.box-avatar {
  width: 220px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.box-avatar img {
  border-radius: 50%;
  height: 64px;
  width: 64px;
}

.box-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.box-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn-login {
  width: 220px;
  display: flex;
  justify-content: center;
  height: 40px;
}

.box-footer {
  display: flex;
  width: 220px;
  justify-content: space-between;
}

span {
  font-size: 14px;
}
</style>