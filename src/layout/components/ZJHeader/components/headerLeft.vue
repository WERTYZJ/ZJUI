<template>
  <div class="headerLeft">
    <ZJSvgIcons :icon="$route.meta.icon"></ZJSvgIcons>
    <a>{{ routeName }}</a>
  </div>
</template>

<script setup>

const route = useRoute();
const routeName = ref(route.name);
 
watch(() => route.name, (newName) => {
  routeName.value = newName; 
});

</script>

<style scoped>
.headerLeft{
  display: flex;
  align-items: center;
  justify-content: center;
  gap:5px;
  color: var(--ZJ-main-text-color);
  /* background-color: antiquewhite; */
}
a{
  white-space: nowrap;
}
</style>