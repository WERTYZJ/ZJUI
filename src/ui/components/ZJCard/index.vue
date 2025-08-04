<template>
  <div class="ZJ-card">
    <div class="header">
      <slot name="card-header"></slot>
    </div>
    <slot></slot>
    <div class="footer">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.ZJ-card {
  border-radius: 6px;
  border: 1px solid #F2F5F4;
  background-color: var(--ZJ-main);
  /* box-shadow:2px 0 8px 0 rgb(29, 35, 41, 0.05); */
}

.header {
  margin-bottom: 8px;
  border-left: 5px solid var(--ZJ-default-main);
  padding-left: 10px;
}

.footer {
  padding-top: 12px
}
</style>
