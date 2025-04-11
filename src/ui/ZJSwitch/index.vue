<template>
    <div>
        <input type="checkbox" class="switch" v-model="switchVal">
    </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
    ZJSwitchVal: {
        type: Boolean,
        default: false
    },
});

const switchVal = ref(null);

onMounted(() => {
    switchVal.value = props.ZJSwitchVal
})

const emits = defineEmits(['ZJSwitchNewVal'])

watch(() => switchVal.value, (newVal) => {
    emits('ZJSwitchNewVal', newVal)
})
</script>

<style scoped>
.switch {
    width: 40px;
    height: 20px;
    -webkit-appearance: none;
    appearance: none;
    background-color: hsl(0, 3%, 86%);
    border-radius: 40px;
    border: 2px solid rgba(223, 221, 221, 0.15);
    position: relative;
}

.switch::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: var(--ZJ-main-message-color);
    border-radius: 50%;
    transition: all 0.15s ease-in-out;
}

.switch:checked {
    background-color: var(--ZJ-default-main);
}

.switch::before {
    transition: all 0.15s ease-in-out;
}

.switch:checked::before {
    left: calc(100% - 16px);
}
</style>
