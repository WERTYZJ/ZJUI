<template>
    <div class="barMain">
        <div class="bar-l">
            <div class="barBox" v-for="(i, index) in barData" :key="index">
                <ZJSvgIcons :icon="i.mate" height="18px" width="18px"></ZJSvgIcons>
                <a style="display:flex;min-width: fit-content;">{{ i.name }}</a>
                <div class="barBorClose">
                    <ZJSvgIcons icon="close" height="18px" width="18px"></ZJSvgIcons>
                </div>
            </div>
        </div>
        <div class="bar-r">
            <reloadRoutre></reloadRoutre>
            <fullScreenRouter></fullScreenRouter>
        </div>
    </div>
</template>

<script setup name="ZJHeaderBar">
import { ref } from "vue";
import fullScreenRouter from "./components/fullScreenRouter.vue"
import reloadRoutre from "./components/reloadRouter.vue";

const barData = ref([
    {
        name: '首页',
        mate: 'home',
    },
    {
        name: '首页',
        mate: 'home',
    },
    {
        name: '首页',
        mate: 'home',
    },

])
</script>

<style scoped>
.barMain {
    height: var(--ZJHeaderBar-height);
    background-color: var(--ZJ-main);
    padding: 0 10px 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 1px 1px var(--ZJ-main-hover);
    z-index: 0;
    transition: var(--ZJ-main-transition-width);
}

.bar-l {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: calc(100vw - var(--ZJAsideMenu-width) - 100px);
    overflow: hidden;
    transition: var(--ZJ-main-transition-width);
}

.barBox {
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid var(--ZJ-default-main);
    border-radius: var(--ZJ-button-border-radius);
    font-size: 14px;
    color: var(--ZJ-default-main);
    background-color: var(--ZJ-default-main-hover);
    flex-wrap: nowrap;
    transition: var(--ZJ-main-transition-width);
}

.barBorClose {
    color: var(--ZJ-default-main);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.barBorClose:hover {
    background-color: var(--ZJ-default-main);
    color: var(--ZJ-main);
}

.bar-r {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
</style>
