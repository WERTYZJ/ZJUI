<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>JavaScript原生拖拽</h2>
      </template>

      <ZJCard style="padding: 10px;">
        <ZJDrag></ZJDrag>
      </ZJCard>

      <h3>1.1 dragstart事件:</h3>
      <p>当用户开始拖动一个元素时触发，这个事件通常用于设置被拖动元素的数据；</p>

      <h3>1.2 drag事件:</h3>
      <p>在元素被拖动的过程中持续触发。可以用于实时更新一些视觉效果等,不过在实际应用中使用相对较少；</p>

      <h3>1.3 dragend事件:</h3>
      <p>当拖动操作结束时触发，不管是成功放置还是中途取消。例如，可以在这个事件中清理一些在拖动过程中设置的临时状态；</p>

      <h3>1.4 dragenter事件:</h3>
      <p>当被拖动的元素进入一个有效的放置目标时触发；</p>

      <h3>1.5 dragover事件:</h3>
      <p>当被拖动的元素在放置目标元素上方移动时触发。和dragenter一样,通常需要调用e.preventDefault()来允许放置操作；</p>

      <h3>1.6 drop事件:</h3>
      <p>当被拖动的元素被放置到目标元素上时触发。这个事件用于处理放置后的逻辑，例如获取被拖动元素携带的数据并进行相应的操作；</p>

      <h3>1.7 dragleave事件:</h3>
      <p>当被拖动的元素离开一个放置目标时触发。例如,可以在这个事件中恢复放置目标元素在被拖动元素进入之前的视觉状态；</p>

      <h3>DataTransfer对象</h3>

      <h3>2.1 setData(format, data):</h3>
      <p>用于设置被拖动元素携带的数据。format是数据的类型,如text/plain、text/html等,data是具体的数据内容。</p>

      <h3>2.2 getData(format):</h3>
      <p>用于获取被拖动元素携带的数据。format是在setData中设置的数据类型,通过这个方法可以根据类型获取相应的数据。</p>

      <h3>2.3 clearData([format]):</h3>
      <p>可以清除存储的数据。如果不传入format参数,则清除所有存储的数据;如果传入特定的数据类型参数,则只清除该类型的数据。</p>

      <ZJCodeDisplay :code="vueCode" language="vue" />

    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(
  `<template>
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
  // 实现拖拽左侧的div到右侧的表格中
  var items = document.querySelectorAll('.item');
  var tds = document.querySelectorAll('.dragBox');
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
  for (let i = 0; i < tds.length; i++) {

    // 这一步是必须的，阻止默认行为 否则ondrop事件不会触发
    tds[i].ondragover = function (e) {
      e.preventDefault();
      // 已经有一个元素放置到td上了，则不执行
      if (e.target.innerHTML) {
        return;
      }
      // 给当前td添加一个背景色 移动到td上时显示
      e.target.style.backgroundColor = 'var(--ZJ-default-main-hover2)';
    }

    // 当鼠标离开td时，清除背景色
    tds[i].ondragleave = function (e) {
      // 已经有一个元素放置到td上了，则不执行
      if (e.target.innerHTML) {
        return;
      }
      e.target.style.backgroundColor = '';
    }

    // ondrop事件可以获取到最终放置的元素
    tds[i].ondrop = function (e) {
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
<script>


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
`)
</script>
