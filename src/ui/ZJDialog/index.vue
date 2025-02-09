<template>
  <div class="modal">
    <Transition name="c">
      <div class="ZJDialog">
        <div class="ZJDialog-header">
          <div class="title">{{props.title}}</div>
          <ZJSvgIcons icon="close" class="ZJIconBox" @click="close()"></ZJSvgIcons>
        </div>
        <div class="ZJDialog-main">
          <slot></slot>
        </div>
        <div class="ZJDialog-bottom">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {defineProps,defineEmits} from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: true
  },
})
const emit = defineEmits(['closeZJDialog'])

function close(){
  emit('closeZJDialog');
}
</script>

<style scoped>
.ZJDialog{
  position: relative;
  padding:20px;
  margin:20px;
  border-radius:var(--ZJ-main-border-radius-dropdown);
  background: var(--ZJ-main-message-color);
  color: var(--ZJ-main-text-color);
}
.ZJDialog-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  font-size:20px;
  font-weight:900;
}
.ZJDialog-main{
  margin:20px 0;
  display: flex;
  flex-direction: column;
}
.ZJDialog-bottom{
  display: flex;
  justify-content:end;
  align-items: center;
  gap:15px;
}
</style>