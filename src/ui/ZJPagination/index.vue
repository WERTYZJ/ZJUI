<template>
  <div class="p-box">
    <div style="position: relative;">
      <div class="p-left" @click="showDropdown" ref="showPageCount">
        <a>{{ everyPageCount2 }} /page</a>
        <ZJSvgIcons icon="select" :class="{ 'ZJRotate-icon-open': isIconOpen, 'ZJRotate-icon-close': !isIconOpen }">
        </ZJSvgIcons>
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
      <div class="p-right-box" @click="PreviousPage()">
        <ZJSvgIcons icon="select" style="transform:rotate(90deg);"></ZJSvgIcons>
      </div>

      <div class="right-box" v-if="this.pageCount <= 4">
        <div :class="{ 'p-right-box': true, 'p-right-box-select': this.selectPageCount == item }"
          v-for="item in pageCount" :key="item" @click="clickPage(item)">{{ item }}</div>
      </div>

      <div class="right-box" v-if="this.pageCount > 4">
        <div v-for="item in visiblePageNumbers" :key="item"
          :class="{ 'p-right-box': true, 'p-right-box-select': this.selectPageCount === item }" @click="clickPage(item)">
          {{ item }}
        </div>
        <div class="p-right-box-more" v-if="lastPageVisible">···</div>
        <div v-if="lastPageVisible"
          :class="{ 'p-right-box': true, 'p-right-box-select': this.selectPageCount === lastPage }"
          @click="clickPage(lastPage)">
          {{ lastPage }}
        </div>
      </div>

      <div class="p-right-box" @click="NextPage()">
        <ZJSvgIcons icon="select" style="transform:rotate(270deg);"></ZJSvgIcons>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    allDataCount: {
      type: [String, Number],
      default: null
    },
    everyPageCount: {
      type: [String, Number],
      default: 10,
    },
    maxPageCount: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      everyPageCount2: null,
      showPageCount: false,
      options: this.Count(),
      pageCount: '',
      selectPageCount: 1,
      isIconOpen: false,
    }
  },
  watch: {
    allDataCount(newVal) {
      if (newVal) {
        this.MountedPage(); // 当 allDataCount 更新时，重新计算分页
      }
    },
    everyPageCount2() {
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
    if (this.everyPageCount) {
      this.everyPageCount2 = this.everyPageCount
    }
    this.MountedPage();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    handleOutsideClick(e) {
      // 检查点击是否发生在下拉框或其子元素之外  
      if (!this.$refs.showPageCount.contains(e.target) && this.showPageCount) {
        this.showPageCount = false;
        this.isIconOpen = false;
      }
    },
    // 初始化分页
    MountedPage() {
      if (!this.allDataCount) {
        return 0;
      } else {
        this.selectPageCount = 1;
        this.pageCount = Math.ceil(this.allDataCount / this.everyPageCount2);
        this.$emit('showPageCount', this.selectPageCount, Number(this.everyPageCount2))
      }
    },
    // 上一页
    PreviousPage() {
      if (!this.allDataCount) {
        return 0;
      } else {
        if (this.pageCount === 1 || this.selectPageCount === 1) {
          return 0;
        } else {
          this.selectPageCount--;
          this.$emit('showPageCount', this.selectPageCount, Number(this.everyPageCount2))
        }
      }
    },
    // 点击页数
    clickPage(val) {
      this.selectPageCount = val
      this.$emit('ShowPageCount', this.selectPageCount, Number(this.everyPageCount2))
    },
    // 下一页
    NextPage() {
      if (!this.allDataCount) {
        return 0;
      } else {
        if (this.pageCount === this.selectPageCount) {
          return 0;
        } else {
          this.selectPageCount++;
          this.$emit('ShowPageCount', this.selectPageCount, Number(this.everyPageCount2))
        }
      }
    },
    // 点击弹出下拉框
    showDropdown() {
      this.showPageCount = !this.showPageCount;
      if (this.showPageCount === true) {
        this.isIconOpen = true;
      } else if (this.showPageCount === false) {
        this.isIconOpen = false;
      }
    },
    // 选择页数
    selectCount(item) {
      this.everyPageCount2 = item
      this.showPageCount = false;
      this.isIconOpen = false;
    },
    // 页数范围5-20
    Count() {
      const Count = []
      for (let i = 1; i <= this.maxPageCount; i++) {
        Count.push(i)
      }
      return Count
    },
  }
}
</script>

<style scoped>
.p-box {
  /* background-color: #8c1f6f; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-left {
  margin-right: 10px;
  border-radius: 3px;
  padding: 5px 8px;
  gap: 8px;
  background: var(--ZJ-main);
  border: var(--ZJ-main-border-light);
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0em;
  color: var(--ZJ-main-text-color);
}

.p-right {
  display: flex;
  /* background-color: hsl(95, 70%, 79%); */
}

.p-right-box {
  margin: 0 4px;
  min-width: 32px;
  height: 32px;
  border-radius: 3px;
  background: var(--ZJ-main);
  border: var(--ZJ-main-border-light);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.p-right-box-more {
  margin: 0 4px;
  min-width: 32px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.p-right-box-select {
  background: var(--ZJ-default-main);
  color: var(--ZJ-main);
}

.right-box {
  display: flex;
  font-size: 14px;
}

/* 页面选择 */
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

.dropdown::before {
  content: '';
  top: -10px;
  position: absolute;
  left: calc(50% - 5px);
  width: 0;
  height: 0;
  transform: rotate(-45deg);
  border-top: solid 15px #DCDCDC;
  border-left: solid 15px transparent;
  border-bottom: solid 15px transparent;
  z-index: 2;
}

.dropdown {
  position: absolute;
  top: 50px;
  width: 100%;
  border-radius: var(--ZJ-main-border-radius-dropdown);
  max-height: 200px;
  min-height: 100%;
  box-shadow: var(--ZJ-main-box-shadow);
  border: var(--ZJ-main-border-light);
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
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  color: var(--ZJ-main-text-color);
  border-radius: var(--ZJ-main-border-radius-5);
  transition: var(--ZJ-main-transition);
  margin: 0 5px;
}

.dropdown li:hover {
  background: var(--ZJ-default-main-hover);
}
</style>