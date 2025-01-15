<template>
 
  <div class="p">
    <div class="p-box">
      <div style="position: relative;">
        <div class="p-left" @click="showDropdown" ref="showPageCount">
          <a>{{ everyPageCount }} /page</a>
          <img src="../assets/tutor-wallet-page.svg" alt="" ref="img">
        </div>
      
        <Transition name="Select"> 
        <div class="dropdown" v-if="showPageCount">  
          <ul>  
            <li v-for="item in options" :key="item.value" @click="selectCount(item)">  
              {{ item.value || item }}  
            </li>  
          </ul>  
        </div> 
        </Transition>
      </div>
      <div class="p-right">
        <div class="p-right-box" @click="PreviousPage()"><img src="../assets/tutor-wallet-left.svg" alt=""></div>

        <div class="right-box" v-if="this.pageCount<=4">
          <div :class="{'p-right-box':true,'p-right-box-select':this.selectPageCount==item}" 
          v-for="item in pageCount" :key="item" @click="clickPage(item)">{{ item }}</div>
        </div>

        <div class="right-box" v-if="this.pageCount > 4">
          <div 
            v-for="item in visiblePageNumbers" 
            :key="item" 
            :class="{'p-right-box': true, 'p-right-box-select': this.selectPageCount === item}" 
            @click="clickPage(item)"
          >
            {{ item }}
          </div>
          <div class="p-right-box-more" v-if="lastPageVisible" >···</div>
          <div 
            v-if="lastPageVisible" 
            :class="{'p-right-box': true, 'p-right-box-select': this.selectPageCount === lastPage}" 
            @click="clickPage(lastPage)"
          >
            {{ lastPage }}
          </div>
        </div>
        
        <div class="p-right-box" @click="NextPage()"><img src="../assets/tutor-wallet-right.svg" alt=""></div>
      </div>
    </div>
  </div>

</template>

<script>

export default{
  props: {  
    allDataCount: {  
      type: [String, Number],  
      default: null  
    },
  },  
  data() {
    return {
      showPageCount: false,
      options:this.Count(),
      everyPageCount:10,
      pageCount:'',
      selectPageCount:1,
    }
  },
  watch: {
    allDataCount(newVal) {
      if (newVal) {
        this.MountedPage(); // 当 allDataCount 更新时，重新计算分页
      }
    },
    everyPageCount(){
      this.MountedPage();
    }
  },
  computed: {
    visiblePageNumbers() {
      const pages = [];
      const start = Math.max(1, this.selectPageCount - 2); // 最多显示前两个页码
      const end = Math.min(this.pageCount, start + 2); // 最多显示后两个页码
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    lastPage() {
      return this.pageCount; // 最后一页
    },
    lastPageVisible() {
      return this.selectPageCount < this.pageCount; // 判断是否显示最后一页
    }
  },
  mounted() {  
    document.addEventListener('click', this.handleOutsideClick); 
    this.MountedPage() 
  },  
  beforeUnmount() {  
    document.removeEventListener('click', this.handleOutsideClick);  
  },
  methods: {
    handleOutsideClick(e) {  
      // 检查点击是否发生在下拉框或其子元素之外  
      if (!this.$refs.showPageCount.contains(e.target) && this.showPageCount) {  
        this.showPageCount = false;  
        this.$refs.img.style.transform = 'rotate(0deg)';  
      }  
    },
    // 初始化分页
    MountedPage(){
      if(!this.allDataCount){
        return 0;
      }else{
        this.selectPageCount=1;
        this.pageCount = Math.ceil(this.allDataCount / this.everyPageCount);
        this.$emit('showPageCount',this.selectPageCount,this.everyPageCount)
      }
    },
    // 上一页
    PreviousPage(){
      if(!this.allDataCount){
        return 0;
      }else{
        if (this.pageCount === 1 || this.selectPageCount === 1 ){
          return 0;
        }else{
          this.selectPageCount--;
          this.$emit('showPageCount',this.selectPageCount,this.everyPageCount)
        }
      }
    },
    // 点击页数
    clickPage(val){
      this.selectPageCount = val
      this.$emit('ShowPageCount',this.selectPageCount,this.everyPageCount)
    },
    // 下一页
    NextPage(){
      if(!this.allDataCount){
        return 0;
      }else{
        if (this.pageCount === this.selectPageCount){
          return 0;
        }else{
          this.selectPageCount++;
          this.$emit('ShowPageCount',this.selectPageCount,this.everyPageCount)
        }
      }
    },
    // 点击弹出下拉框
    showDropdown() {  
      this.showPageCount = !this.showPageCount;
      if(this.showPageCount===true){
        this.$refs.img.style.transform = 'rotate(180deg)'; 
        this.$refs.img.style.transition = 'transform 0.2s ease-in-out';
      }else if(this.showPageCount===false){
        this.$refs.img.style.transform = 'rotate(0deg)'; 
      }
    },
    // 选择页数
    selectCount(item) {  
      this.everyPageCount = item
      this.showPageCount = false;  
      this.$refs.img.style.transform = 'rotate(0deg)'; 
    },
    // 页数范围5-20
    Count(){
      const Count = []
      for(let i =2;i<=20;i++){
        Count.push(i)
      }
      return Count
    },
  }
}
</script>

<style scoped>
.p{
  /* background-color: #c898dd; */
  display: flex;
  justify-content: end;
}
.p-box{
  /* background-color: #8c1f6f; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.p-left{
  cursor: pointer;
  margin-right:10px;
border-radius: 3px;
padding: 5px 8px;
gap: 8px;
background: #FFFFFF;
/* Gray 中性/Gray4-边框 */
border: 1px solid #DCDCDC;
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: 22px;
display: flex;
align-items: center;
letter-spacing: 0em;	
color: rgba(0, 0, 0, 0.9);
}
.p-right{
  display: flex;
  /* background-color: hsl(95, 70%, 79%); */
}
.p-right-box{
  margin: 0 4px;
min-width: 32px;
height: 32px;
border-radius: 3px;
background: #FFFFFF;
border: 1px solid #DCDCDC;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
cursor: default;
}
.p-right-box-more{
  margin: 0 4px;
min-width: 32px;
height: 32px;
border-radius: 3px;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
}
.p-right-box-select{
background: #7050E8;
color: #FFFFFF;
}
.right-box{
  display: flex;
  font-size: 14px;
}





/* 页面选择 */
.dropdown::after {  
  content: '';
  top: -9px;
  position: absolute;
  left: calc(50% - 10.6px);
  width: 0;
  height: 0; 
  transform: rotate(-45deg);
  border-top:solid 15px #FFFFFF;
  border-left:solid 15px  transparent;
  border-bottom:solid 15px transparent;
  z-index:2;  
} 
.dropdown::before {  
  content: '';
  top: -10px;
  position: absolute;
  left: calc(50% - 10.6px);
  width: 0;
  height: 0; 
  transform: rotate(-45deg);
  border-top:solid 15px #E4E7ED;
  border-left:solid 15px  transparent;
  border-bottom:solid 15px transparent;
  z-index:2;  
} 
.dropdown {  
  position: absolute;  
  top:50px;
  width: 100%;
  border-radius:4px;
  max-height:200px;
  min-height: 100%;
  box-shadow: 0px 8px 16px 0px rgba(78,78,78,0.5);
  border: 1px solid #E4E7ED;  
  background-color: #FFFFFF;  
  z-index:2;  
}  
.dropdown ul {  
  list-style: none;  
  padding: 0;  
  margin: 5px 0;  
  overflow: auto;
  max-height:180px;
  height: 100%;
}  
.dropdown li {  
  padding: 10px 20px;  
  cursor: pointer; 
height:16px;
font-family: AlibabaPuHuiTi;
font-size: 16px;
font-weight: normal;
line-height: 100%;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0,0.6); 
}  
.dropdown li:hover {  
  background: rgba(112, 80, 232, 0.05);
} 
</style>