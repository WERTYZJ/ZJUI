<template>
  <div class="ZJHeaderToolsBox" @click="clickChangeTheme()">
    <ZJSvgIcons icon="light"></ZJSvgIcons>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const defaultTheme = ref('light');

function clickChangeTheme(){
  if(defaultTheme.value==='light'){
    defaultTheme.value ='dark'
  }else{
    defaultTheme.value ='light'
  }
  changeTheme(defaultTheme.value);
}

function changeTheme(theme){
const themes = {
    light: {
      '--ZJ-main':'#FFFFFF',
      '--ZJ-main-bg-color':'#F6F9F8',
      '--ZJ-main-text-color':'#333639',
      '--ZJ-main-text-label-color':'#00000080',
      '--ZJ-main-hover':'#F3F3F5',
      '--ZJ-card-top-left-border':'#ff5733',
      '--ZJ-default-main':'#646CFF',
      '--ZJ-default-main-hover':'#EFF0FF',
      '--ZJ-main-code-copy-bg':'#dedede',
      '--ZJ-main-message-color':'#FFFFFF'
    },
    dark: {
      '--ZJ-main': '#18181C',
      '--ZJ-main-hover':'#2D2D30',
      '--ZJ-main-bg-color':'#101014',
      '--ZJ-main-text-color': '#D5D5D6',
      '--ZJ-main-text-label-color':'#D5D5D6',
      '--ZJ-default-main-hover':'#23243E',
      '--ZJ-card-top-left-border':'#646CFF',
      '--ZJ-main-code-copy-bg':'#23243E',
      '--ZJ-main-message-color':'#48484E',
    }
  };

  for (const [property, value] of Object.entries(themes[theme])) {
    document.documentElement.style.setProperty(property, value);
  }
}

</script>

<style scoped>

</style>