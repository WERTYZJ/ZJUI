<template>
  <div class="custom-select">
    <div class="selected m-pointer" ref="clickDropdownEl" @click="toggleDropdown" :style="selectStyle">
      <a class="m-pointer">{{ selectedText || label }}</a>
      <ZJSvgIcons icon="select"
        :class="{ 'ZJRotate-icon-open m-pointer': isIconOpen, 'ZJRotate-icon-close m-pointer': !isIconOpen }">
      </ZJSvgIcons>
      <!-- <img ref="img" src="../assets/ui/select.svg" alt=""> -->
    </div>
    <Transition name="Select">
      <div class="dropdown" v-show="isDropdownVisible" :style="dropMenuStyle" ref="clickDropdownBoxEl">
        <ul>
          <li v-for="item in options" :key="item.value" @click="selectItem(item)">
            {{ item.label ?? item }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>  
  
<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  value: {
    type: [String, Number],
    default: null
  },
  label: {
    type: [String, Number],
    default: null
  },
  size: {
    type: [String, Number],
    default: null
  },
  selectStyle: {
    type: Object,
    default: () => ({})
  },
  dropMenuStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['ZJSelectVal']);

const findOptionText = (value) => {
  return props.options.find(option => option.value === value)?.text || ''
}

// 响应式状态
const selectedText = ref(props.label ? findOptionText(props.label) : '')
const isDropdownVisible = ref(false)
const isIconOpen = ref(false)

const clickDropdownEl = ref(null);
const clickDropdownBoxEl = ref(null);

const handleOutsideClick = (e) => {
  if (clickDropdownEl.value && !clickDropdownEl.value.contains(e.target)
    && !clickDropdownBoxEl.value.contains(e.target)) {
    isDropdownVisible.value = false
    isIconOpen.value = false
  }
}

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
  isIconOpen.value = isDropdownVisible.value
}

const selectItem = (item) => {
  emit('ZJSelectVal', item.value ?? item)
  selectedText.value = item.label ?? item
  isDropdownVisible.value = false
  isIconOpen.value = false
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

// 监听器
watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectedText.value = findOptionText(newVal)
  }
})

watch(() => clickDropdownBoxEl.value, (newVal) => {
  if (newVal == null) {
    document.removeEventListener('click', handleOutsideClick)
  } else {
    document.addEventListener('click', handleOutsideClick)
  }
})
</script>
  
<style scoped>
.custom-select {
  position: relative;
  /* display: inline-block;   */
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  height: 32px;
  position: relative;
  padding: 0 12px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: normal;
  border-radius: var(--ZJ-main-border-radius);
  color: var(--ZJ-main-text-label-color);
  border: var(--ZJ-main-hover);
  background: var(--ZJ-main-hover);
}

.dropdown::after {
  content: '';
  top: -9px;
  position: absolute;
  left: calc(50% - 5px);
  width: 0;
  height: 0;
  transform: rotate(-45deg);
  border-top: solid 15px var(--ZJ-main-message-color);
  border-left: solid 15px transparent;
  border-bottom: solid 15px transparent;
  z-index: 2;
}

.dropdown {
  position: absolute;
  top: 47px;
  left: 0;
  width: 100%;
  border-radius: var(--ZJ-main-border-radius-dropdown);
  max-height: 200px;
  min-height: 100%;
  box-shadow: var(--ZJ-main-box-shadow);
  background-color: var(--ZJ-main-message-color);
  z-index: 2;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 5px 0;
  overflow: auto;
  max-height: 180px;
  height: 100%;
}

.dropdown li {
  padding: 8px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;
  color: var(--ZJ-main-text-color);
  border-radius: var(--ZJ-main-border-radius-5);
  transition: var(--ZJ-main-transition);
}

.dropdown li:hover {
  background: var(--ZJ-default-main-hover);
}
</style>