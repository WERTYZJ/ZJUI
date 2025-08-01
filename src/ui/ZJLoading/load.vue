<template>
  <div class="loader-main">
    <div class="loader-line"></div>
  </div>
</template>  
  
<script setup>
</script>  
  
<style scoped>  .loader-main {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--ZJ-main-message-color);
    opacity: 0.96;
    z-index: 1000;
  }

  .loader-line {
    display: block;
    --height-of-loader: 4px;
    --loader-color: var(--ZJ-default-main);
    width: 130px;
    height: var(--height-of-loader);
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .loader-line::before {
    content: "";
    position: absolute;
    background: var(--loader-color);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: moving 1s ease-in-out infinite;
    ;
  }

  @keyframes moving {
    50% {
      width: 100%;
    }

    100% {
      width: 0;
      right: 0;
      left: unset;
    }
  }
</style>