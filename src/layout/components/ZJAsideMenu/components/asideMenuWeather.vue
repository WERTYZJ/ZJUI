<template>
  <div>
    <div class="main">
      <div class="top">
        <img src="@/assets/layout/weather/1.png" alt="">
        <span>27du</span>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <span>多云传情</span>
          <span>星期二，10/22</span>
        </div>
        <div class="bottom-right">
          <span>3</span>
          <span>45</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axiox from "axios"
import { onMounted } from "vue";

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
});

onMounted(() => {
  getWeatherData()
})

const getWeatherData = () => {
  // https://whyta.cn/api/tianqi
  axiox({
    method: 'get',
    url: 'https://whyta.cn/api/tianqi',
    data: {
      key: '36de5db81215',
      city: '武汉',
    },
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   Authorization: `Bearer ${this.$store.getters.getUserData.token}`
    // },
  })
    .then(res => {
      // console.log(res.data)
      if (res.data.status == 1) {
        console.log('操作成功', res.data.status);
      } else {
        console.log('操作失败');
      }
    })
    .catch(err => {
      console.log('操作失败' + err);
    })
}

</script>

<style scoped>
.main {
  background-color: rebeccapurple;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  width: 100%;
  height: 100px;
  border-radius: var(--ZJ-main-border-radius-5);
}

.top {
  display: flex;
  justify-content: space-between;
}

.bottom {
  display: flex;
  justify-content: space-between;
}

span {
  color: var(--ZJ-main-message-color);
}
</style>
