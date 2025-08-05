<template>
  <div class="content">
    <div class="selectBar">
      <div v-for="(i, index) in leftBarList" :key="index" draggable="true" class="item"
        :style="{ color: getColor('text', index), backgroundColor: getColor('bg', index) }">{{ i.name }}</div>
    </div>

    <div class="selectBox">
      <table border="1">
        <tr v-for="(i, index) in 6" :key="index">
          <td v-for="(j, index) in 4" :key="index">
            <div class="dragBox"></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>

const leftBarList = ref([
  {
    name: '语文',
  },
  {
    name: '数学',
  },
  {
    name: '英语',
  },
  {
    name: '历史',
  },
  {
    name: '地理',
  },
  // {
  //   name: '政治',
  // },
  // {
  //   name: '物理',
  // },
  // {
  //   name: '化学',
  // },
  // {
  //   name: '体育',
  // },
  // {
  //   name: '美术',
  // },
])

const getColor = (type, index) => {
  if (type == 'text') {
    switch (index) {
      case 0:
        return '#4CAF50';
      case 1:
        return '#589be0';
      case 2:
        return '#FFA500';
      case 3:
        return '#FF5252';
      case 4:
        return '#d59bf6';
      // case 5:
      //   return '#fcbad3';
      default:
        return '#000000';
    }
  }
  if (type == 'bg') {
    switch (index) {
      case 0:
        return '#d8f0d8';
      case 1:
        return '#cae6fd';
      case 2:
        return '#ffe3cc';
      case 3:
        return '#fbddda';
      case 4:
        return '#f4e0ff';
      // case 5:
      //   return '#ffe3ee';
      default:
        return '#ffe3cc';
    }
  }
}

onMounted(() => {
  startDrag();
})

const startDrag = () => {
  var items = document.querySelectorAll('.item');
  var dragBoxs = document.querySelectorAll('.dragBox');
  var dragIndex = 0; // 记录当前拖拽的元素
  // 给左侧的div添加拖拽事件
  for (let i = 0; i < items.length; i++) {
    // 给每个元素添加索引
    items[i].ondragstart = function (e) {
      dragIndex = i;
      e.dataTransfer.setData('text/plain', e.target.innerHTML);
    }
    // 记录当前拖拽的元素
    items[i].ondragend = function (e) {
      e.dataTransfer.setData('text/plain', e.target.innerHTML);
    }
  }

  // 给右侧的td添加拖拽事件
  for (let i = 0; i < dragBoxs.length; i++) {

    // 这一步是必须的，阻止默认行为 否则ondrop事件不会触发
    dragBoxs[i].ondragover = function (e) {
      e.preventDefault();
      // 已经有一个元素放置到td上了，则不执行
      if (e.target.innerHTML) {
        return;
      }
      // 给当前td添加一个背景色 移动到td上时显示
      e.target.style.backgroundColor = 'var(--ZJ-default-main-hover2)';
    }

    // 当鼠标离开td时，清除背景色
    dragBoxs[i].ondragleave = function (e) {
      // 已经有一个元素放置到td上了，则不执行
      if (e.target.innerHTML) {
        return;
      }
      e.target.style.backgroundColor = '';
    }

    // ondrop事件可以获取到最终放置的元素
    dragBoxs[i].ondrop = function (e) {
      e.preventDefault();

      // 已经有一个元素放置到td上了，则不执行
      if (e.target.innerHTML) {
        return;
      }

      // 获取当前拖拽元素的值
      const data = e.dataTransfer.getData('text/plain');
      // 设置给当前td的值
      e.target.innerHTML = data;
      console.log(e.target.innerHTML, dragIndex);

      // 获取当前被拖拽的元素的样式，然后添加给右侧的td
      const style = window.getComputedStyle(items[dragIndex]);
      e.target.style.backgroundColor = style.backgroundColor;
      e.target.style.color = style.color;
      // e.target.style.border = style.border;
      e.target.style.width = style.width;
      e.target.style.height = style.height;
      e.target.style.textAlign = style.textAlign;
    }
  }
}
</script>


<style scoped>
.content {
  display: flex;
  width: 100%;
}

.selectBar {
  box-sizing: border-box;
}

.item {
  width: 150px;
  height: 40px;
  margin: 0 0 10px 0;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.selectBox {
  margin-left: 30px;
}

table {
  border-collapse: collapse;
  border: var(--ZJ-main-border-light);
}

tr {
  width: 100%;
}

td {
  width: 150px;
  height: 40px;
  border: var(--ZJ-main-border-light);
  padding: 4px;
}

.dragBox {
  width: 150px;
  height: 40px;
  line-height: 40px;
}
</style>