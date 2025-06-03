<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>uniApp插件市场</h2>
      </template>
      <p>1.mescrol</p>
      <p>mescroll的uni版本, 是在 uni-app 运行的下拉刷新和上拉加载的组件</p>
      <p>官方文档：<a>https://www.mescroll.com/uni.html</a></p>
      <p>2.监听scroll-view滚动条的上下滚动状态</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>3.获取设备信息的uniApp函数</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(`
<scroll-view scroll-y @scroll="handleScroll">
  // 主要内容
  <view class="comment">
    // 次要内容	当滚动出现此内容显示在可视窗口的时候，执行的逻辑
  </view>
</scroll-view>

handleScroll(event) {
    const scrollHeight = event.detail.scrollHeight
    const scrollTop = event.detail.scrollTop;
    const scrollBottom = scrollHeight - scrollTop - 500
    // console.log('xsdasdasd:', event.detail);
    // console.log('距离底部:', scrollBottom);
    
    this.$u.getRect('.comment').then(rect => {
      const talkHeight = rect.height
      // console.log("asdasd",rect)
      if(scrollBottom<talkHeight){
        this.onViewScroll()
        // console.log('距离底部:', scrollBottom);
        this.showComment = true;
        this.showCommentInput = true;
        this.$emit("showCommentInput", this.showCommentInput);
      }else{
        this.showComment = false;
        this.showCommentInput = false
        this.$emit("showCommentInput", this.showCommentInput);
      }
    })
    
  },
`)

const vueCode3 = ref(`
//获取整个页面的高度，从而计算出页面可用的高度，因为使用了自定义的navbar所以this.pageHeight不是单纯的res.windowHeight。（ps: uview组件的navbar高度是固定的44px,不包括statusBarHeight）
			uni.getSystemInfo({
				success: (res) => {
					let bottomArea = 0;
					if (res.safeAreaInsets && res.safeAreaInsets.bottom) {
						bottomArea = res.safeAreaInsets.bottom;
					}
					this.height = (res.windowHeight - res.statusBarHeight - 44) + 'px';
				}
			})
`)
</script>
