<template>
  <div>
    <div class="e-box">
      <img :src="img" alt="">
      <span>404</span>
    </div>
  </div>
</template>

<script setup>

const img = ref(new URL('@/assets/images/error/404.svg', import.meta.url).href)

</script>

<style scoped>
.e-box {
  padding: 100px 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ZJ-default-main-hover);
  border-radius: 10px;
  position: relative;
}

.e-box img {
  z-index: 1;
  height: 15rem;
  width: 15rem;
}

.e-box span {
  font-size: 22rem;
  line-height: 22rem;
  height: 22rem;
  font-weight: bold;
  position: absolute;
  top: 100;
  z-index: 0;
  color: var(--ZJ-default-main);
  overflow: hidden;
}
</style>