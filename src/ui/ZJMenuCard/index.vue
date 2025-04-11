<template>
  <div>
    <div ref="cardFatherElement" class="cardFather" @mouseenter="onMouseEnter(index)" @mouseleave="onMouseLeave">
      <div @click="clickMenuItemCardIndex(item.name, index, item.path)">
        <div class="ZJMenuLi">
          <ZJSvgIcons class="img" :icon="item.meta.icon"></ZJSvgIcons>
          <a>{{ item.name }}</a>
        </div>
        <!-- <hr class="ZJMenuHr"  :class="{ 'ZJMenuHrLast': index === props.item.length - 1}"> -->
      </div>
    </div>

    <div class="ZJMenu cardChild" v-show="showCardChild == index" :style="{ marginLeft: cardFatherElementWidthStyle }"
      @mouseenter="onMouseEnter(index)" @mouseleave="onMouseLeave">
      <AsideMenuItemCard v-for="(child, childIndex) in item.children" :key="childIndex" :item="child"
        :clickMenuItemCardIndex="clickMenuItemCardIndex" :level="level + 1" :index="childIndex"
        @closeAsideMenuCard="closeAsideMenuCard" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed, defineEmits } from 'vue';
import router from '@/router';

const emits = defineEmits(['closeAsideMenuCard']);

const props = defineProps({
  item: {
    type: Object,
  },
  clickSelectedIndex: {
    type: Function
  },
  level: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: 0
  }
});

// 点击
function clickMenuItemCardIndex(name, index, path) {
  //  console.log('name',name);
  // console.log('index',index);
  // console.log('path',path);
  if (path) {
    router.push(`${path}`)
  }
  emits('closeAsideMenuCard');
}

// 样式
const cardFatherElement = ref(null);
const cardFatherElementWidth = ref(0);
const cardFatherElementWidthStyle = computed(() => {
  return `${cardFatherElementWidth.value}px`;
});

onMounted(() => {
  if (cardFatherElement.value) {
    cardFatherElementWidth.value = cardFatherElement.value.offsetWidth;
    // console.log(cardFatherElementWidth.value)
  }
});

const showCardChild = ref(null);

function onMouseEnter(index) {
  // console.log(index)
  showCardChild.value = index;
  if (cardFatherElement.value) {
    cardFatherElementWidth.value = cardFatherElement.value.offsetWidth;
  }
  // console.log(showCardChild.value)
}
function onMouseLeave() {
  showCardChild.value = -1;
  // console.log(showCardChild.value)
}
function closeAsideMenuCard() {
  emits('closeAsideMenuCard');
}
</script>

<style scoped>
a {
  font-size: 14px;
  line-height: normal;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
}

.cardFather {
  position: relative;
}

.cardChild {
  position: absolute;
  margin-top: -41px;
}
</style>
