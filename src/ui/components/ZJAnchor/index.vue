<template>
  <div class="other-center">
    <div class="other-center-box" ref="scrollTopElement">

      <div class="center-left" ref="centerLeft">
        <ul>
          <li v-for="(i,index) in props.leftMenu" :key="index"
            :class="{'selectedMenu':selectedMenuIndex==i.value}"
            @click="clickMenu(i.value)"
            >{{ i.label }}</li>
        </ul>
      </div>

      <div class="center-right-main" ref="centerRight"> 

        <div v-for="(i,index) in props.rightMenu"
          :key="index"
          :id="index+1" 
          class="center-right">
          <div class="title">{{i.title}}</div>
          <p>{{ i.text }}</p>
          <p>At ZJUI, students can find the most suitable tutors and courses for their   learning needs and interests, whether it be in arts and hobbies, language learning, programming skills, academic tutoring, or vocational education, and more.</p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  leftMenu:{
    type:Array,
    default:null,
  },
  rightMenu:{
    type:Array,
    default:null,
  }
})

const scrollTopElement = ref('')

onMounted(() => {
  const e = scrollTopElement.value;
  if (e) {
    e.addEventListener('scroll', onScroll);
    // e.addEventListener('scroll', listenScroll);
  }
});
 
onUnmounted(() => {
  const e = scrollTopElement.value;
  if (e) {
    e.removeEventListener('scroll', onScroll);
    // e.removeEventListener('scroll', listenScroll);
  }
});


function  clickMenu(val){
  selectedMenuIndex.value = val;
  const element = document.getElementById(val);  
  if (element) {
    // 使用 scrollIntoView 将元素滚动到窗口中间
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

const selectedMenuIndex = ref(1);
const centerRight = ref(null);

function onScroll() {
  // 获取 .center-right-main 元素
  const centerRightMain = centerRight.value;

  // 检查 centerRightMain 是否存在
  if (!centerRightMain) return; // 如果 DOM 元素不存在，直接返回
  
  // 获取所有锚点元素（.center-right-main 内的 .center-right 元素）
  const navContents = centerRightMain.querySelectorAll('.center-right');
  
  // 获取当前文档的 scrollTop
  const scrollTop = window.scrollY;
  
  // 获取视口的高度
  const viewportHeight = window.innerHeight;
 
  // 遍历所有锚点元素，判断其是否完全可见
  navContents.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top + scrollTop; // 元素相对于文档的顶部位置
    const itemBottom = itemTop + rect.height; // 元素相对于文档的底部位置

    // 检查元素是否完全在视口内
    if (itemTop >= scrollTop && itemBottom <= scrollTop + viewportHeight) {
      if(index<=9){
        selectedMenuIndex.value = index + 1;
      }
    }
  });
  // console.log(selectedMenuIndex.value);
}

// const centerLeft = ref(null)
// function listenScroll(){
//   const valuePropositionMain = scrollTopElement.value;
//   const centerLeft2 =centerLeft.value

//   window.addEventListener('scroll', () => {
//     const valuePropositionMainRect = valuePropositionMain.getBoundingClientRect();
//     if (valuePropositionMainRect.bottom <= window.innerHeight) {
//       centerLeft2.style.bottom = '0';
      
//     } else {
//       centerLeft2.style.top = '90px';
//     }
//   });
// }
</script>

<style scoped>

.other-center{
  width: 100%;
  height: 100%;
  /* background-color: hsl(0, 100%, 70%); */
  display: flex;
  flex-direction: column;
  color: var(--ZJ-main-text-color);
}

.other-center-box{
  display: flex;
  gap: 20px;
  max-height:1000px;
  overflow-y: scroll;
}
.center-left{
  background-color:var(--ZJ-main-bg-color);
  border-radius: 20px;
  padding:20px 30px;
  font-size:16px;
  font-weight: bold;
  height: fit-content;
  position: sticky;
  top:10px;
}
.center-right-main{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.center-right{
  background-color:var(--ZJ-main-bg-color);
  border-radius: 20px;
  padding: 40px;
  height: 100%;
}

p{
  font-size:14px;
  font-weight: 600;
  line-height: 200%;
  text-align: justify;
  word-break: break-all;
  margin-top: 20px;
}
li{
  list-style: none;
  width: 100%;
  padding: 5px;
  cursor: pointer;
  margin: 20px 0;
  width:270px;
}
li:hover{
  background:var(--ZJ-default-main-hover);
  border-radius:var(--ZJ-main-border-radius-dropdown);
  color: var(--ZJ-default-main);
}
.selectedMenu{
  border-radius: var(--ZJ-main-border-radius-dropdown);
  color: var(--ZJ-default-main);
  position: relative;
  z-index: 1;
}
.selectedMenu::before{
  content: '';
  height: 21px;
  width: 21px;
  position: absolute;
  left: -5px;
  top: -1px;
  z-index:-1;
  /* background-color: #7050E8; */
  background-image: url('@/assets/images/ZJUI/ZJAnchor/1.svg');
}
</style>