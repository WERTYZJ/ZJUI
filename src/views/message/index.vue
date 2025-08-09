<template>
  <div class="Message">
    <div class="dia-left" ref="showLeft">
      <div class="dia-left-top">
        <input type="text" v-model="searchKeyword" class="dia-left-top-search" placeholder="Search">
        <!-- <div class="dia-left-top-right"><img :src="'/assets/ZJUI/ZJChat/mouseRight/topLeftMore.svg')" alt=""></div> -->
      </div>
      <div class="dia-left-center">
        <!-- 解决右键对话框被隐藏的问题 -->
        <!-- <el-scrollbar max-height="620px"> -->
        <TransitionGroup name="l">
          <li v-for="(item, index) in filterUserList" :key="item.conversationID"
            @click.left="selectItem(index, item.conversationName, item.conversationID, item.conversationAvatarUrl, item.type);"
            @click.right="contextMenu($event, index)" :class="{
              'selected': selectedIndex === index, 'right-selected': showContextMenu && contextMenuIndex === index,
              'isPinned': item.isPinned == true, 'isPinned-right-selected': showContextMenu && contextMenuIndex === index && item.isPinned == true,
            }">
            <div class="user">
              <div class="avatar">
                <img
                  v-if="item.conversationAvatarUrl == '' || item.conversationAvatarUrl == undefined || item.conversationAvatarUrl == null"
                  src="@/assets/images/logo/logo.png">
                <img v-if="item.conversationAvatarUrl" :src="item.conversationAvatarUrl">
              </div>
              <div class="user-right">
                <div class="user-right-box">
                  <p class="nick">{{ item.conversationName }}</p>
                  <p v-if="filterUserList.length" class="time">{{ msgTime(item.orderKey) }}</p>
                </div>
                <div class="user-right-box">
                  <!-- {{ item.lastMessage.message }} -->
                  <p v-if="item?.lastMessage?.type == 1" class="msg">{{ item.lastMessage ? item.lastMessage.message ||
                    '无消息内容' : '无消息' }} </p>
                  <!-- {{ item.lastMessage.fileName }} -->
                  <p v-if="item.lastMessage?.type == 11" class="msg">[Image]{{ item.lastMessage.fileName }}</p>
                  <p v-if="item.lastMessage?.type == 12" class="msg">[File]{{ item.lastMessage.fileName }}</p>
                  <p v-if="item.lastMessage?.type == 13" class="msg">[Audio]{{ item.lastMessage.fileName }}</p>
                  <p v-if="item.lastMessage?.type == 14" class="msg">[video]{{ item.lastMessage.fileName }}</p>
                  <div class="unread_count">
                    <a v-if="item.unreadMessageCount == 0" class="unread_count_hidden">{{ item.unreadMessageCount
                    }}</a>
                    <a v-else-if="item.unreadMessageCount > 0 && item.unreadMessageCount < 10"
                      class="unread_count_circle">{{ item.unreadMessageCount }}</a>
                    <a v-else-if="item.unreadMessageCount > 9 && item.unreadMessageCount < 100"
                      class="unread_count_oval">{{ item.unreadMessageCount }}</a>
                    <a v-else-if="item.unreadMessageCount >= 100" class="unread_count_more">99+</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 鼠标右键  -->
            <div class="MouseRight-box" v-if="showContextMenu && contextMenuIndex === index"
              :style="{ top: contextMenuTop + 'px', left: contextMenuLeft + 'px' }">
              <div v-for="data in MouseRight" :key="data" class="MouseRight-menu"
                @click="(event) => { event.stopPropagation(); clickMouseRight(index, data.value, item.conversationID, item.type, item.isPinned) }"
                @mouseenter="enterMouseRight(data.value)" @mouseleave="leaveMouseRight(data.value)">
                <div v-if="data.value == 1 && item.isPinned == true"><img :src="data.img2"><a>{{ data.name2 }}</a>
                </div>
                <!-- <div v-else-if="data.value==3 && item.unreadMessageCount==0"><img :src="data.img2"><a>{{ data.name2 }}</a></div> -->
                <!-- <div v-if="data.value==1 && item.isPinned==true"><img :src="data.img2"><a>{{ data.name2 }}</a></div>
              <div v-else-if="data.value==3 && item.unreadMessageCount==0"><img :src="data.img2"><a>{{ data.name2 }}</a></div> -->
                <div v-else><img :src="data.img"><a>{{ data.name }}</a></div>
              </div>
              <div class="MouseRight-menu-account" v-show="showMouseRightMenuAccount">
                <div class="MouseRight-menu"><a>ID:{{ item.conversationID }}</a></div>
              </div>
            </div>

          </li>
        </TransitionGroup>
        <!-- </el-scrollbar> -->
        <!-- <ZJNoData v-if="this.userList == ''" icon="1" label="No more conversation data" size="auto"></ZJNoData> -->
      </div>
    </div>
    <div class="dia-right" ref="showRight">
      <div class="dia-right-top">
        <div class="dia-right-top-box"><img v-show="showBackList" @click="backList()" class="dia-right-top-box-back"
            src="@/assets/images/ZJUI/ZJChat/Message/back.svg" alt=""><a>{{ showUserName }}</a></div>
        <div class="dia-right-top-box" @click="() => open('openRightMore')" ref="rightMore">
          <img src="@/assets/images/ZJUI/ZJChat/Message/topBarMore.svg" alt="">
        </div>
        <div class="dia-right-top-more" v-show="showDiaRightMore">
          <div v-for="data in diaRightMore" :key="data" class="MouseRight-menu">
            <div @click="clickRightMore(data.value)"><img :src="data.img"><a>{{ data.name }}</a></div>
          </div>
        </div>
      </div>
      <!-- <div class="dia-right-load" v-show="showGetMsgLoad">
        <div class="dia-right-load-box" v-loading="loading" element-loading-background="rgba(255,255,255, 0)"></div>
      </div> -->
      <div class="dia-right-main" ref="mainScroll">
        <!-- <el-scrollbar max-height="525px" ref="scrollbarRef"> -->

        <div v-for="(item) in msgList" :key="item.messageID" class="msg-box" ref="targetMessageRef">
          <div :class="{ 'msg-box-left': true, 'right': item.senderUserID == this.selfUserID }">
            <div class="msg-head-img">
              <img v-if="item.senderUserID == this.showUserID" :src="this.showUserAvatar">
              <img v-if="item.senderUserID == this.selfUserID" :src="this.selfAvatar">
            </div>

            <div v-if="item.type == 1" class="msg-textarea">
              <!-- 文本 -->
              <div class="msg-textarea-box">{{ item.message }}</div>
              <!-- 时间 -->
              <div class="msg-textarea-time">{{ msgTime(item.timestamp) }}</div>
            </div>

            <!-- 图片 -->
            <div v-else-if="item.type == 11" class="msg-textarea-file">
              <img :src="item.thumbnailDownloadUrl" alt="">
            </div>

            <!-- 文件 -->
            <div v-if="item.type == 12" class="msg-textarea" @click="openFileWindow(item.fileDownloadUrl)"
              style="cursor: pointer;">
              <div class="msg-textarea-box"><a>{{ item.fileName }}</a></div>
              <!-- <div  class="msg-textarea-box"><img src="../assets/Message/file.svg" alt=""><a>{{ item.fileName }}</a></div> -->
              <div class="msg-textarea-SizeAndTime"><a>{{ FileSize(item.fileSize) }}</a><a>{{
                msgTime(item.timestamp)
              }}</a></div>
            </div>

            <!-- 音频 -->
            <div v-else-if="item.type == 13" class="msg-textarea-file">
              <audio :src="item.fileDownloadUrl" controls>
                <a>暂不支持查看audio</a>
              </audio>
            </div>

            <!-- 视频 -->
            <div v-else-if="item.type == 14" class="msg-textarea-file">
              <!-- controls autoplay loop muted></video> -->
              <video controls>
                <source :src="item.fileDownloadUrl" type="video/mp4">
                <a>暂不支持查看video</a>
              </video>
            </div>

          </div>
        </div>

        <!-- </el-scrollbar> -->

        <!-- <LoadingView v-show="msgLoading" class="MessageLoading" :fileName="fileName" :AllCount="allFileSize"
                :FinishCount="finishFileSize" isProgress='true'></LoadingView> -->
      </div>
      <div class="dia-right-backBottom" v-show="showBackBottom" @click="scrollToBottom">
        <img :src="'@/assets/images//ZJUI/ZJChat/mouseRight/Message-backBottom.svg'" alt="">
      </div>
      <div class="dia-right-bottom-bar">

        <div class="dia-right-bottom-bar-img" v-for="(item, index) in bottomBar" :key="index"
          @mouseover="hoverBottomBarIndex = index; hoverBottomBarImgSrc = item.img2"
          @mouseleave="hoverBottomBarIndex = null; hoverBottomBarImgSrc = null" @click="clickBottomBar(item.val)"
          ref="emo">
          <img :src="hoverBottomBarIndex === index ? hoverBottomBarImgSrc : item.img" alt="">
        </div>

        <Transition name="emo">
          <div class="Emoticons-box" v-show="showEmoticons">
            <div class="Emoticons-main">
              <div class="Emoticons-main-title">EMOJI表情</div>
              <div class="Emoticons-main-center">
                <div class="Emoticons-main-center-box" v-for="(item, index) in EmoticonsData" :key="index"
                  @click="sendEmoMsg(item.emo)">{{ item.emo }}</div>
              </div>
            </div>
          </div>
        </Transition>

      </div>
      <div class="dia-right-bottom">
        <textarea placeholder="Your massage" v-model="msg" id="sendMsg" name="sendMsg" @keydown="enter($event)"
          aria-label="发送消息"></textarea>
        <button @click="sendTextMsg()" class="send-btn"><img src="@/assets/images/ZJUI/ZJChat/message-send.svg"
            alt=""></button>
      </div>
    </div>
  </div>
</template>

<script>

// import LoadingView from '@/ui/ZJ-loading.vue';
import Time from '@/ui/utils/ZJTime';
import FileSize from '@/ui/utils/ZJFileSize';
// import zim from '@/tools/ZIMConfig';
// import ZJNoData from '@/ui/ZJ-noData.vue';
// import { generateToken } from '@/tools/ZIMToken';

export default {
  name: 'messageIndex',
  data() {
    return {
      // 展示返回
      showBackBottom: false,
      // 加载动画
      showGetMsgLoad: false,
      loading: true,
      lastScrollTop: 0, // 用于存储上一次的 scrollTop 值
      // ActiveContacts
      ActiveContacts: [
        // {
        //   img:'/assets/ZJUI/ZJChat/tutor-board-active2.png'),
        //   name:'Iery Wang',
        // },
      ],
      // 自己相关
      selfUserID: 123456789,
      selfAvatar: new URL('@/assets/images/logo/logo.png', import.meta.url).href,
      selfName: '',
      msg: '',// 消息 
      showBackList: false,
      showUserName: 'ZIUI客服1号',// 好友名字
      showUserID: 123456, //好友id
      showUserAvatar: new URL('@/assets/images/logo/logo.png', import.meta.url).href,//好友头像
      showUserType: '',//消息类型,单聊，多聊
      ifMsgScrollTop: false,
      // 用户列表
      userList: [
        {
          conversationName: 'ZIUI客服1号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: true,
          orderKey: 1734586556666,
          unreadMessageCount: 0,
          lastMessage: {
            type: 1,
            message: '今天过得怎么样！',
            timestamp: 1634586556666,
          },
        },
        {
          conversationName: 'ZIUI客服2号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1714586556966,
          unreadMessageCount: 99,
          lastMessage: {
            type: 1,
            message: '好开心',
            timestamp: 1764586556966,
          },
        },
        {
          conversationName: 'ZIUI客服3号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1724586556666,
          unreadMessageCount: 1,
          lastMessage: {
            type: 11,
            fileName: '好开心.png',
            timestamp: 1774586556666,
          },
        },
        {
          conversationName: 'ZIUI客服1号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1734586556666,
          unreadMessageCount: 10,
          lastMessage: {
            type: 1,
            message: '今天过得怎么样！',
            timestamp: 1744586556666,
          },
        },
        {
          conversationName: 'ZIUI客服2号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1704586556966,
          unreadMessageCount: 99,
          lastMessage: {
            type: 1,
            message: '好开心',
            timestamp: 1704586556966,
          },
        },
        {
          conversationName: '岳山',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1664586556666,
          unreadMessageCount: 1,
          lastMessage: {
            type: 11,
            fileName: '好开心.png',
            timestamp: 1664586556666,
          },
        },
        {
          conversationName: 'ZIUI客服1号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1684586556666,
          unreadMessageCount: 10,
          lastMessage: {
            type: 1,
            message: '今天过得怎么样！',
            timestamp: 1684586556666,
          },
        },
        {
          conversationName: 'ZIUI客服2号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1764586556966,
          unreadMessageCount: 99,
          lastMessage: {
            type: 1,
            message: '好开心',
            timestamp: 1644586556966,
          },
        },
        {
          conversationName: 'ZIUI客服3号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1654586556666,
          unreadMessageCount: 1,
          lastMessage: {
            type: 11,
            fileName: '好开心.png',
            timestamp: 1624586556666,
          },
        },
        {
          conversationName: 'ZIUI客服1号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1734586556666,
          unreadMessageCount: 0,
          lastMessage: {
            type: 1,
            message: '今天过得怎么样！',
            timestamp: 1694586556666,
          },
        },
        {
          conversationName: 'Enggsd',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: true,
          orderKey: 1764586556966,
          unreadMessageCount: 99,
          lastMessage: {
            type: 1,
            message: '好开心',
            timestamp: 1644586556966,
          },
        },
        {
          conversationName: 'ZIUI客服3号',
          conversationID: 123456,
          conversationAvatarUrl: this.showUserAvatar,
          type: 1,
          isPinned: false,
          orderKey: 1774586556666,
          unreadMessageCount: 1,
          lastMessage: {
            type: 11,
            fileName: '好开心.png',
            timestamp: 1774586556666,
          },
        },
      ],
      filterUserList: [],//搜索后的用户数据
      //用户消息列表
      msgList: [
        {
          messageID: 1,
          senderUserID: 123456,
          type: 1,
          message: '今天过得怎么样',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456789,
          type: 1,
          message: '我过得不错',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456,
          type: 1,
          message: '今天过得怎么样',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456789,
          type: 1,
          message: '我过得不错',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456,
          type: 1,
          message: '今天过得怎么样',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456789,
          type: 1,
          message: '我过得不错',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456,
          type: 1,
          message: '今天过得怎么样',
          timestamp: 1734586556666,
        },
        {
          messageID: 1,
          senderUserID: 123456789,
          type: 1,
          message: '我过得不错',
          timestamp: 1734586556666,
        },
      ],
      searchKeyword: '',
      showContextMenu: false,//右键菜单
      contextMenuIndex: -1,
      contextMenuTop: 0,
      contextMenuLeft: 0,
      MouseRight: [
        {
          name: '置顶',
          name2: '取消置顶',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-1.png', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-1-2.png', import.meta.url).href,
          value: 1
        },
        {
          name: '查看账号',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-2.png', import.meta.url).href,
          value: 2
        },
        {
          name: '标记已读',
          name2: '标记未读',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-3.png', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-3-2.png', import.meta.url).href,
          value: 3
        },
        {
          name: '打开独立聊天窗口',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-4.png', import.meta.url).href,
          value: 4
        },
        {
          name: '设置免打扰',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-5.png', import.meta.url).href,
          value: 5
        },
        {
          name: '从消息列表中删除',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-6.png', import.meta.url).href,
          value: 6
        },
        {
          name: '屏蔽此人消息',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-7.png', import.meta.url).href,
          value: 7
        },
      ],
      showDiaRightMore: false,
      diaRightMore: [
        {
          name: '删除所有消息',
          name2: '',
          img: new URL('@/assets/images/ZJUI/ZJChat/mouseRight/a-6.png', import.meta.url).href,
          value: 1,
        },
      ],
      showMouseRightMenuAccount: false,
      selectedIndex: 0,  // 声明选中的索引属性
      // 底部导航
      bottomBar: [
        {
          val: 1,
          img: new URL('@/assets/images/ZJUI/ZJChat/Message/emo.svg', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/Message/emo-2.svg', import.meta.url).href,
        },
        {
          val: 2,
          img: new URL('@/assets/images/ZJUI/ZJChat/Message/image.svg', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/Message/image-2.svg', import.meta.url).href,
        },
        {
          val: 3,
          img: new URL('@/assets/images/ZJUI/ZJChat/Message/video.svg', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/Message/video-2.svg', import.meta.url).href,
        },
        {
          val: 4,
          img: new URL('@/assets/images/ZJUI/ZJChat/Message/audio.svg', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/Message/audio-2.svg', import.meta.url).href,
        },
        {
          val: 5,
          img: new URL('@/assets/images/ZJUI/ZJChat/Message/file.svg', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/Message/file-2.svg', import.meta.url).href,
        },
        {
          val: 6,
          img: new URL('@/assets/images/ZJUI/ZJChat/Message/document.svg', import.meta.url).href,
          img2: new URL('@/assets/images/ZJUI/ZJChat/Message/document-2.svg', import.meta.url).href,
        },
      ],
      hoverBottomBarImgSrc: null, // 用于存储当前悬停的图片 URL  
      hoverBottomBarIndex: null,  // 用于存储当前悬停的元素的索引  
      showEmoticons: false,
      msgLoading: false,
      EmoticonsData: [
        {
          emo: '😊',
        },
        {
          emo: '😚',
        },
        {
          emo: '😓',
        },
        {
          emo: '😰',
        },
        {
          emo: '😝',
        },
        {
          emo: '😜',
        },
        {
          emo: '😍',
        },
        {
          emo: '😂',
        },
        {
          emo: '👍',
        },
        {
          emo: '🌹',
        },
      ],
      fileName: '',
      allFileSize: '',
      finishFileSize: ''
    }
  },
  created() {
    // 初始化时设置数据
    const uid = this.$route.query.uid;
    const msg = this.$route.query.msg;
    if (uid != undefined) {
      if (msg != '' || msg != undefined) {
        this.showUserID = uid;
        this.msg = msg;
        this.sendTextMsg();
      }
    }
    // console.log('uid',uid)
    // console.log('msg',msg)
  },
  computed: {
    // 使用computed属性来缓存msgTime函数的结果,解决时间报错问题
    msgTime() {
      return Time();
    },
    userDataStore() {
      return this.$store.getters.getUserData;
    },
    FileSize() {
      return FileSize();
    },
  },
  mounted() {
    // 监听对话滚动条
    // const scrollbarWrapper = this.$refs.scrollbarRef.$el.querySelector('.el-scrollbar__wrap');
    // scrollbarWrapper.addEventListener('scroll', this.handleScroll);
    // 为了确保在组件挂载时能够正确初始化 lastScrollTop  
    // this.$nextTick(() => {
    //   this.lastScrollTop = scrollbarWrapper.scrollTop;
    // });
    document.addEventListener('click', this.emoOutsideClick);
    window.addEventListener('resize', this.showMsg);
    document.addEventListener('click', this.rightMoreOutsideClick);

    // 初始化第三方聊天模块
    // this.OpenZeCloudGo();
  },
  beforeUnmount() {
    // 移除监听对话滚动条
    // const scrollbarWrapper = this.$refs.scrollbarRef.$el.querySelector('.el-scrollbar__wrap');
    // scrollbarWrapper.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.emoOutsideClick);
    window.removeEventListener('resize', this.showMsg);
    document.removeEventListener('click', this.rightMoreOutsideClick);
  },
  watch: {
    searchKeyword: {
      handler(newValue) {
        // 先执行原始过滤逻辑
        const filteredResults = this.userList.filter(item =>
          item.conversationName.toLowerCase().includes(newValue.toLowerCase())
        );
        this.filterUserList = filteredResults.sort((a, b) => {
          // 第一优先级：置顶状态排序
          if (a.isPinned && !b.isPinned) return -1;  // 置顶在前
          if (!a.isPinned && b.isPinned) return 1;

          // 时间戳比较函数
          const compareTimestamps = (x, y) => {
            const xTime = x.lastMessage?.timestamp;
            const yTime = y.lastMessage?.timestamp;

            if (xTime && yTime) {
              return new Date(yTime) - new Date(xTime); // 降序排列（新时间在前）
            }
            if (xTime) return -1;  // 有时间的排前面
            if (yTime) return 1;
            return 0;
          };

          // 第二优先级：都是置顶时按时间降序排列
          if (a.isPinned && b.isPinned) {
            return compareTimestamps(a, b);
          }

          // 第三优先级：非置顶时按时间降序排列
          return compareTimestamps(a, b);
        });
      },
      immediate: true // 添加立即执行选项
    },
  },
  unmounted() { },
  methods: {
    // 对话框滚动条
    handleScroll(event) {
      // console.log(event)
      var scrollbarWrapper = event.target.scrollTop;
      // 检查 scrollTop 是否为 0，即滚动条是否滚动到了顶部  
      if (scrollbarWrapper === 0) {
        // console.log("滚动条已经滚动到了顶部");
        var account = this.showUserID;
        if (this.msgList.length > 0) {
          this.selectMsg(account);
        }
      }

      // 检查滚动方向  
      if (scrollbarWrapper > this.lastScrollTop) {
        this.showBackBottom = true;
      } else if (scrollbarWrapper < this.lastScrollTop) {
        this.showBackBottom = false;
      }
      // 更新上一次的 scrollTop 值  
      this.lastScrollTop = scrollbarWrapper;

      var scrollTop = event.target.scrollTop; // 当前滚动位置  
      var scrollHeight = event.target.scrollHeight; // 滚动容器总高度  
      var clientHeight = event.target.clientHeight; // 滚动容器可见高度  

      // 检查是否滚动到底部  
      var isBottom = scrollTop + clientHeight >= scrollHeight - 1; // 减1是为了处理可能的浮点数精度问题 
      if (isBottom === true) {
        this.showBackBottom = false;
      }

    },
    // 更多
    // rightMoreOutsideClick(e) {
    //   if (!this.$refs.rightMore.contains(e.target) && this.showDiaRightMore) {
    //     this.showDiaRightMore = false;
    //   }
    // },
    // 表情发送框
    // emoOutsideClick(e) {
    //   if (!this.$refs.emo[0].contains(e.target) && this.showEmoticons) {
    //     this.showEmoticons = false;
    //   }
    // },
    // 第三方IM
    OpenZeCloudGo() {

      this.selfUserID = 123456789;
      this.selfAvatar = '/assets/ZJUI/ZJChat/tutor-over-bottom3.png';
      this.selfName = 'as';

      var this2 = this;
      var userInfo = {
        userID: `${this.selfUserID}`,
        userName: this.selfName,
        userAvatarUrl: this.selfAvatar,
      };
      var token = this.selfUserID

      zim.login(userInfo, token)
        .then(function () {
          // console.log("第三方聊天ZIM登陆成功:") 
          var config = {
            nextConversation: null,
            count: 10,
          };
          zim.queryConversationList(config)
            .then(function ({ conversationList }) {
              console.log("IM-conversationList-获取消息列表", conversationList);
              this2.userList.push(...conversationList);

              this2.selectedIndex = 0;// 更新选中项的索引
              this2.showUserName = conversationList[0].conversationName; // 更新接收者名字
              this2.showUserID = conversationList[0].conversationID;// 接收者id
              this2.showUserType = conversationList[0].type

              // 首次本地查询对话
              var index = 0;
              var name = conversationList[0].conversationName;
              var account = conversationList[0].conversationID;
              var avatar = conversationList[0].conversationAvatarUrl;
              var type = conversationList[0].type

              this2.selectItem(index, name, account, avatar, type)

            })
            .catch(function (err) {
              console.log("err", err)
            })

          zim.updateUserAvatarUrl(this2.selfAvatar)
            // .then(function(res){
            //   console.log("IM-头像更改成功",res);
            // })
            .catch(function (err) {
              console.log("IM-头像更改失败", err)
            })

          zim.updateUserName(this2.selfName)
            // .then(function(res){
            //   console.log("IM-用户名获取成功",res);
            // })
            .catch(function (err) {
              console.log("IM-用户名获取失败", err)
            })
        })
        .catch(function (err) {
          console.log("第三方聊天ZIM登陆失败:", err)
        });

      zim.on('error', function (zim, errorInfo) {
        console.log('IM-error', errorInfo.code, errorInfo.message);
      });

      zim.on('connectionStateChanged', function (zim, { state, event, }) {
        // console.log('IM-connectionStateChanged', state, event, extendedData); 
        if (state == 0 && event == 3) {
          zim.login(userInfo, token)
        }
      });

      // token过期重新获取
      zim.on('tokenWillExpire', function (zim) {
        // zim.on('tokenWillExpire', function (zim, { second }) {
        // console.log('IM-tokenWillExpire', second);
        // var token = '';
        zim.renewToken(token)
          .then(function ({ token }) {
            console.log("token", token);
          })
          .catch(function (err) {
            console.log("err", err)
          })
      });

      // 接收来自1v1的消息,首次获取所有的数据库消息 Callback for receiving the one-to-one message.
      zim.on('peerMessageReceived', function (zim, { messageList, fromConversationID }) {
        // console.log("IM-messageList-接收来自1v1的单独消息", messageList);
        // console.log("fromConversationID", fromConversationID);
        if (this2.showUserID == fromConversationID) {
          this2.msgList.push(...messageList);
          this2.scrollToBottom();
        }
      });

      // 《实时监听》消息变化并《更新》消息列表
      zim.on('conversationChanged', function (zim, { infoList }) {
        // console.log('IM-conversationChanged-《实时监听》一对一消息变化并《更新》消息列表', infoList);
        var a = infoList[0].conversation
        var found = false;
        for (let i = 0; i < this2.userList.length; i++) {
          if (this2.userList[i].conversationID == a.conversationID) {
            this2.userList.splice(i, 1, a);
            found = true;
            break;
          }
        }

        if (!found) {
          this2.userList.unshift(a); // 如果没有找到匹配的元素，则将a添加到开头  
        }
      })
    },
    // 分步查询对话消息
    selectMsg(account) {
      this.showGetMsgLoad = true;
      var conversationID = account;
      console.log(conversationID)
      // var conversationType = 0;
      // // Retrieve 30 messages each time, starting from the latest message
      // var config = {
      //     nextMessage:this.msgList[0], // Set nextMessage to null for the first retrieval
      //     count:10,
      //     reverse: true
      // }

      // var this2=this
      // function queryMessageCallback({ messageList }) {
      //   console.log("IM-messageList-获取1v1消息列表",messageList);
      //   if(messageList==''){
      //     this2.$message({
      //           type:'warning',
      //           message:'No further news yet',
      //         });
      //     }
      //   this2.msgList.unshift(...messageList) 
      // }
      setTimeout(() => {
        // zim.queryHistoryMessage(conversationID, conversationType, config).then(queryMessageCallback);
        this.showGetMsgLoad = false;
        // this.$nextTick(() => {  
        //   const scrollbarWrapper = this.$refs.scrollbarRef.$el.querySelector('.el-scrollbar__wrap');
        //   var a=this.msgList.length-10  
        //   const targetMessage = this.$refs.targetMessageRef[a];

        //   if (scrollbarWrapper && targetMessage) {  
        //     // 获取目标消息的offsetTop，并可能需要调整以考虑滚动容器的内边距和边框  
        //     const targetOffsetTop = targetMessage.offsetTop;  
        //     // 如果滚动容器有内边距或边框，您可能需要从targetOffsetTop中减去这些值  
        //     const adjustedOffsetTop = targetOffsetTop - scrollbarWrapper.style.padding;  
        //     // 但请注意，style.paddingTop返回的是像素值，可能需要进一步处理  

        //     // 在这里，我们暂时不考虑内边距和边框，因为具体情况取决于您的CSS  
        //     scrollbarWrapper.scrollTo({  
        //       top: adjustedOffsetTop, // 滚动到目标消息的顶部  
        //       behavior: 'smooth' // 平滑滚动  
        //     });   
        //   }  
        // }); 
      }, 2000);

    },
    // 为li标签选中的索引添加效果
    selectItem(index, name, account, avatar, type) {

      if (window.innerWidth < 1100) {
        this.$refs.showLeft.style.display = 'none';
        this.$refs.showRight.style.display = 'block';
      }

      this.selectedIndex = index;// 更新选中项的索引
      // console.log(index,type)
      this.showUserName = name; // 更新接收者名字
      this.showUserID = account;// 接收者id
      this.showUserAvatar = avatar;
      this.showUserType = type

      this.msgList = [];//清除消息

      // 查询对话
      // var conversationID = account;
      // var conversationType = type;
      // console.log("conversationType",conversationType)
      // var config = {
      //     nextMessage: null,
      //     count:10,
      //     reverse: true
      // }

      // var this2=this
      // function queryMessageCallback({ messageList }) {
      // console.log("IM-messageList-获取1v1消息列表",messageList);
      // this2.msgList.push(...messageList) 
      // this2.scrollToBottom2();  

      // var fetchMore = this2.ifMsgScrollTop;
      // // When scrolling down to the topmost message on the screen, retrieve earlier messages
      // if (fetchMore && this2.msgList.length > 0) {
      //     // For subsequent pagination, set nextMessage to the first message in the current retrieved message list
      //     config.nextMessage = this2.msgList[0];
      //     zim.queryHistoryMessage(conversationID, conversationType, config).then(queryMessageCallback);
      // }
      // }

      // zim.queryHistoryMessage(conversationID, conversationType, config).then(queryMessageCallback);

    },
    // 监听消息框
    showMsg() {
      if (window.innerWidth > 900) {
        this.$refs.showLeft.style.display = 'block';
        this.$refs.showRight.style.display = 'block';
        this.showBackList = false;
      } else if (window.innerWidth <= 900) {
        if (this.$refs.showLeft.style.display == 'block') {
          this.$refs.showRight.style.display = 'none';
        }
        if (this.$refs.showRight.style.display == 'block') {
          this.$refs.showLeft.style.display = 'none'
        }
        this.showBackList = true;
        //  window.removeEventListener('resize', this.showMsg);
      }
      // 频繁调整样式和检查窗口大小可能会导致性能下降。  
      // 考虑使用防抖（debounce）或节流（throttle）技术来优化性能。
    },
    // 返回用户消息列表
    backList() {
      this.$refs.showLeft.style.display = 'block';
      this.$refs.showRight.style.display = 'none';
    },
    // 右键菜单框位置
    contextMenu(event, index) {

      // console.log(index)
      this.showContextMenu = true
      this.contextMenuIndex = index;

      // console.log(event)
      // 获取鼠标点击位置
      const x = event.layerX;
      const y = event.layerY;

      // // 获取页面的高度
      const pageHeight = window.innerHeight;

      // // 设置弹出框位置，不超过页面底部边缘
      const contextMenuHeight = 250
      const adjustedTop = Math.min(y, pageHeight - contextMenuHeight);
      this.contextMenuTop = adjustedTop;
      this.contextMenuLeft = x;

      // // 阻止默认右键菜单弹出
      event.preventDefault();
      // // 点击页面其他地方时隐藏右键菜单框
      document.addEventListener('click', this.hideContextMenu);
    },
    // 隐藏右键菜单框
    hideContextMenu() {
      // 隐藏右键菜单框
      this.showContextMenu = false;
      this.contextMenuIndex = -1,
        document.removeEventListener('click', this.hideContextMenu);
    },
    // 鼠标右键
    clickMouseRight(index, val, userID, msgType, Pinned) {
      // const zim = ZIM.getInstance();
      const conversationID = userID;
      const conversationType = msgType;
      const this2 = this

      if (val == 1) {
        var isPinned = '';
        if (Pinned == false) {
          isPinned = true;
        } else {
          isPinned = false;
        }
        zim.updateConversationPinnedState(isPinned, conversationID, conversationType)
          .then(function (res) {
            console.log(res)
            this2.$message({
              type: 'success',
              message: 'Pinned to the top',
            });
            // 删除多插入的一条数据
            this2.userList.splice(index, 1)
          })
          .catch(function (err) {
            console.log(err)
            this2.$message({
              type: 'error',
              message: 'Pinning failed',
            });
          })
      } else if (val == 2) {
        // navigator.clipboard.writeText(userID)
        //   .then(() => {
        //     // 成功复制后显示消息提示
        //     this.$message({
        //       type: 'success',
        //       message: '账号已复制到剪贴板',
        //     });
        //   })
        //   .catch((error) => {
        //     // 处理复制失败的情况，例如权限问题或浏览器不支持
        //     console.error('复制到剪贴板时发生错误:', error);
        //   });

      } else if (val == 3) {
        // Taking setting a mark with 1 for a one-on-one conversation and a group chat conversation as an example
        zim.clearConversationUnreadMessageCount(conversationID, conversationType)
          .then(function (res) {
            // Operation succeeded.
            console.log(res)
            this2.$message({
              type: 'success',
              message: 'The message is marked as read successful',
            });
          })
          .catch(function (err) {
            // Operation failed.
            console.log(err)
            this2.$message({
              type: 'error',
              message: 'The message read mark failed',
            });
          })

      } else if (val == 4) {
        this.$message({
          type: 'success',
          message: '请等待后续版本',
          duration: 2000,
        });
      } else if (val == 5) {
        this.$message({
          type: 'success',
          message: '请等待后续版本',
          duration: 2000,
        });
      } else if (val == 6) {
        // const zim = ZIM.getInstance();
        const conversationID = userID;
        const conversationType = msgType;
        const this2 = this

        var config = { isAlsoDeleteServerConversation: true };
        zim.deleteConversation(conversationID, conversationType, config)
          .then(function (res) {
            console.log(res)
            this2.$message({
              type: 'success',
              message: 'The message list is deleted',
            });
            this2.userList.splice(index, 1)
            this2.showUserName = '';
            this2.showUserID = '';
            this2.showUserAvatar = '';
            this2.msgList = [];
          })
          .catch(function (err) {
            console.log(err)
            this2.$message({
              type: 'error',
              message: 'Failed to delete the message list',
            });
          })
      } else if (val == 7) {
        this.$message({
          type: 'success',
          message: '请等待后续版本',
          duration: 2000,
        });
      }
      this.hideContextMenu()
    },
    // 移入鼠标右键
    enterMouseRight(index) {
      if (index == 2) {
        this.showMouseRightMenuAccount = true;
      }
    },
    // 移出鼠标右键
    leaveMouseRight(index) {
      if (index == 2) {
        this.showMouseRightMenuAccount = false;
      }
    },
    // enter发送消息 enter+ctrl快捷发送消息
    enter(event) {
      if (event.keyCode == 13) {
        if (!event.ctrlKey) {
          event.preventDefault();
          this.sendTextMsg();
        } else {
          this.msg = this.msg + '\n';
        }
      }
    },
    // 消息文字发送 
    sendTextMsg() {
      const msg = this.msg;
      let timestamp2 = Math.floor(Date.now());
      this.msgList.push(
        {
          messageID: this.msgList.length + 1,
          senderUserID: this.selfUserID,
          type: 1,
          message: msg,
          timestamp: timestamp2,
        },
      )
      this.msg = '';
      //     // 滚动条滚动到底部
      this.scrollToBottom()
      if (!msg.trim().length) {

        return;
      } else if (msg.length > 999) {
        this.$message({
          type: 'warning',
          message: 'The word count cannot exceed 999.',
        })
        return;
      }


      // 接收者id
      // var toConversationID = this.showUserID; // Peer user's ID.
      // var conversationType = 0; // Message type; 1-on- chat: 0, in-room chat: 1, group chat:2 
      // var config = { 
      //     priority: 1, // Set priority for the message. 1: Low (by default). 2: Medium. 3: High.
      // };

      // var messageTextObj = { 
      //   type: 1, 
      //   message:this.msg, 
      //   extendedData:'no', 
      // };
      // 发送消息前加载
      // var notification = {
      //   onMessageAttached:(message)=> {
      //     // todo: Loading
      //     // console.log("Loading",message)

      //     this.msgList.push(message)

      //     this.msg = '';
      //     // 滚动条滚动到底部
      //     this.scrollToBottom()
      //     // console.log(this.msgList)
      //   }
      // }
      // 发送消息
      // zim.sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
      //     .then(function ({ message }) {
      //       console.log("IM-Message sent successfully",message)
      //     })
      //     .catch(function (err) {
      //       console.log(err)
      //     });

    },
    // 消息emo表情发送 
    sendEmoMsg(emo) {
      var emoMsg = this.msg + emo
      this.msg = emoMsg;
      this.showEmoticons = false
    },
    //发送图片
    sendImageMsg() {
      var this2 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*'
      // fileImage.style.display = 'none'
      input.click();
      input.onchange = function () {
        var file = input.files[0];
        if (file && file.size > 10 * 1024 * 1024) {
          this2.$message({
            type: 'warning',
            message: 'The size of the image is more than 10MB',
          })
          return;
        }
        sendMediaMessage(this.files[0]);
      }

      var conversationID = this.showUserID;
      var config = { priority: 1 };
      var notification = {
        onMessageAttached: (message) => {
          // todo: Loading
          console.log(message);
          this2.msgLoading = true;
        },
        onMediaUploadingProgress: function (message, currentFileSize, totalFileSize) {
          // todo: upload progress
          console.log(message, currentFileSize, totalFileSize)
          this2.fileName = message.fileName;
          this2.allFileSize = totalFileSize;
          this2.finishFileSize = currentFileSize;
          if (currentFileSize === totalFileSize) {
            setTimeout(() => {
              this2.msgList.push({ ...message })
              this2.msgLoading = false;
              setTimeout(() => {
                this2.scrollToBottom2();
              }, 500)
              this2.fileName = '';
              this2.allFileSize = '';
              this2.finishFileSize = '';
            }, 1000);
          }
        },
      };
      function sendMediaMessage(file) {

        var mediaMessageObj = {
          fileLocalPath: file,
          type: 11,
        };

        zim.sendMediaMessage(mediaMessageObj, conversationID, 0, config, notification,);
      }

    },
    //发送音频
    sendAudioMsg() {
      var this2 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'audio/*'
      // fileImage.style.display = 'none'
      input.click();
      input.onchange = function () {
        var file = input.files[0];
        if (file && file.size > 6 * 1024 * 1024) {
          this2.$message({
            type: 'warning',
            message: 'The size of the Audio is more than 6MB',
          })
          return;
        }
        // 创建一个 URL 对象
        var audioURL = URL.createObjectURL(file);
        var audio = document.createElement('audio');

        // 设置音频源
        audio.src = audioURL;

        // 监听 loadedmetadata 事件
        audio.onloadedmetadata = function () {
          // console.log('音频时长: ' + audio.duration + ' 秒');

          // 发送媒体消息，并传递音频时长
          sendMediaMessage(file, audio.duration);

          // 释放 URL 对象
          URL.revokeObjectURL(audioURL);
        };
      }

      var conversationID = this.showUserID;
      var config = { priority: 1 };
      var notification = {
        onMessageAttached: (message) => {
          // todo: Loading
          console.log(message);
          this2.msgLoading = true;
        },
        onMediaUploadingProgress: function (message, currentFileSize, totalFileSize) {
          // todo: upload progress
          console.log(message, currentFileSize, totalFileSize)
          this2.fileName = message.fileName;
          this2.allFileSize = totalFileSize;
          this2.finishFileSize = currentFileSize;
          if (currentFileSize === totalFileSize) {
            setTimeout(() => {
              this2.msgList.push({ ...message })
              this2.msgLoading = false;
              setTimeout(() => {
                this2.scrollToBottom2();
              }, 500)
              this2.fileName = '';
              this2.allFileSize = '';
              this2.finishFileSize = '';
            }, 1000);
          }
        },
      };
      function sendMediaMessage(file, fileDuration) {

        // for an image message
        var mediaMessageObj = {
          fileLocalPath: file,
          type: 13,
          audioDuration: fileDuration,
        };

        zim.sendMediaMessage(mediaMessageObj, conversationID, 0, config, notification,);
      }

    },
    //发送视频
    sendVideoMsg() {
      var this2 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*'
      input.click();
      input.onchange = function () {
        var file = input.files[0];
        if (file && file.size > 100 * 1024 * 1024) {
          this2.$message({
            type: 'warning',
            message: 'The size of the Video is more than 100MB',
          })
          return;
        }
        // 创建一个 URL 对象
        var videoURL = URL.createObjectURL(file);
        var video = document.createElement('video');

        // 设置视频源
        video.src = videoURL;

        // 监听 loadedmetadata 事件
        video.onloadedmetadata = function () {
          // console.log('视频时长: ' + video.duration + ' 秒');
          sendMediaMessage(file, video.duration);
          // 释放 URL 对象
          URL.revokeObjectURL(videoURL);
        };


      }

      var conversationID = this.showUserID;
      var config = { priority: 1 };
      var notification = {
        onMessageAttached: function (message) {
          // todo: Loading
          console.log(message)
          this2.msgLoading = true;
        },
        onMediaUploadingProgress: function (message, currentFileSize, totalFileSize) {
          // todo: upload progress
          console.log(message, currentFileSize, totalFileSize)

          this2.fileName = message.fileName;
          this2.allFileSize = totalFileSize;
          this2.finishFileSize = currentFileSize;

          if (currentFileSize === totalFileSize) {
            setTimeout(() => {
              this2.msgList.push({ ...message })
              this2.msgLoading = false;
              setTimeout(() => {
                this2.scrollToBottom2();
              }, 500)
              this2.fileName = '';
              this2.allFileSize = '';
              this2.finishFileSize = '';
            }, 1000);
          }
        }
      };

      function sendMediaMessage(file, fileDuration) {

        var mediaMessageObj = {
          fileLocalPath: file,
          type: 14,
          videoDuration: fileDuration,
        };

        zim.sendMediaMessage(mediaMessageObj, conversationID, 0, config, notification,);
      }

    },
    //发送文件
    sendFileMsg() {
      var this2 = this;
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = '*/*'
      input.click();
      input.onchange = function () {
        var file = input.files[0];
        if (file && file.size > 100 * 1024 * 1024) {
          this2.$message({
            type: 'warning',
            message: 'The size of the file is more than 100MB',
          })
          return;
        }
        sendMediaMessage(this.files[0]);
      }

      var conversationID = this.showUserID;
      var config = { priority: 1 };
      var notification = {
        onMessageAttached: (message) => {
          // todo: Loading
          this2.msgLoading = true;
          console.log(message);
        },
        onMediaUploadingProgress: function (message, currentFileSize, totalFileSize) {
          // todo: upload progress
          console.log(message, currentFileSize, totalFileSize)
          this2.fileName = message.fileName;
          this2.allFileSize = totalFileSize;
          this2.finishFileSize = currentFileSize;
          if (currentFileSize === totalFileSize) {
            setTimeout(() => {
              this2.msgList.push({ ...message })
              this2.msgLoading = false;
              setTimeout(() => {
                this2.scrollToBottom2();
              }, 500)
              this2.fileName = '';
              this2.allFileSize = '';
              this2.finishFileSize = '';
            }, 1000);
          }
        },
      };
      function sendMediaMessage(file) {

        var mediaMessageObj = {
          fileLocalPath: file,
          type: 12,
        };

        zim.sendMediaMessage(mediaMessageObj, conversationID, 0, config, notification,);
      }

    },
    // 底部导航栏
    clickBottomBar(val) {
      // if(this.selectedIndex=='' || this.selectedIndex==undefined || this.selectedIndex==null ){
      //     this.$message({
      //         type: 'warning',
      //         message: 'Please select a list of friends',
      //       })
      //     return
      //   }
      if (val == 1) {
        this.showEmoticons = !this.showEmoticons
      } else if (val == 2) {
        this.sendImageMsg()
      } else if (val == 3) {
        this.sendVideoMsg()
      } else if (val == 4) {
        this.sendAudioMsg()
      } else if (val == 5) {
        this.sendFileMsg()
      }
    },
    // 右侧更多管理
    clickRightMore(val) {
      if (val == 1) {
        // Delete all messages of the specified session.
        var conversationID = this.showUserID;
        var conversationType = 0;
        var config = { isAlsoDeleteServerMessage: true };
        var this2 = this

        zim.deleteAllMessage(conversationID, conversationType, config)
          .then(function ({ conversationID, conversationType }) {
            // Operation successful.
            console.log("删除成功", conversationID, conversationType);
            this2.$message({
              type: 'success',
              message: 'All messages were deleted',
            })
            this2.msgList = ''
          })
          .catch(function (err) {
            console.log("删除失败", err)
          });
      }
    },
    // 滚动条（平滑）滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        // 确保DOM已更新  
        const scrollbarWrapper = this.$refs.scrollbarRef.$el.querySelector('.el-scrollbar__wrap');
        if (scrollbarWrapper) {
          scrollbarWrapper.scrollTo({
            top: scrollbarWrapper.scrollHeight, // 滚动到最底部  
            behavior: 'smooth' // 平滑滚动  
          });
        }
      });
    },
    // 滚动条滚动到底部
    scrollToBottom2() {
      this.$nextTick(() => {
        // 确保DOM已更新  
        const scrollbarWrapper = this.$refs.scrollbarRef.$el.querySelector('.el-scrollbar__wrap');
        if (scrollbarWrapper) {
          scrollbarWrapper.scrollTo({
            top: scrollbarWrapper.scrollHeight,
          });
        }
      });
    },
    // 新窗口打开文件
    openFileWindow(url) {
      // window.location.href = url;
      // var windowName = "_blank";
      // var windowFeatures = "width=600,height=400"; 
      window.open(url)
      // 打开新窗口  
      // window.open(url2,windowName,windowFeatures);
    },
    //所有需要打开组件
    open(action) {
      if (action === 'openRightMore') {
        this.showDiaRightMore = !this.showDiaRightMore
      }
    },
    //所有需要关闭组件
    close(action) {
      if (action === 'closeVerity') {
        this.showVerity = false;
      }
    },
  }
}
</script>

<style scoped>
/*  */
/* Message */
/*  */
.Message {
  border-radius: var(--ZJ-main-border-radius-10);
  background: var(--ZJ-main);
  display: flex;
  width: calc(100% - 30px);
  overflow: hidden;
  padding: 0;
  /* box-shadow: inset 0px 0px 0px 1px #D8D8D8; */
}

.dia-left {
  /* background-color: aqua; */
  width: 390px;
  flex-shrink: 0;
  height: 700px;
  border-right: 1px solid #D8D8D8;
  position: relative;
}

.dia-left-top {
  /* background-color: #eaed8f; */
  padding: 0 15px 0 30px;
  width: calc(100% - 45px);
  height: 69px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #D8D8D8;
  gap: 10px;
}

/* .dia-left-top-right{
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: #F2F2F2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dia-left-top-right:hover{
  background-color: #e5e4e8;
}
.dia-left-top-right img{
  width: 30px;
  height: 30px;
} */
.dia-left-top-search {
  /* width:340px; */
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: var(--ZJ-main-hover);
  border: none;
  text-indent: 15px;
}

.dia-left-top-search::placeholder {
  /* background-color: #9B8CDF; */
  background-image: url('/assets/ZJUI/ZJChat/tutor-students-search.svg');
  background-repeat: no-repeat;
  background-position-x: calc(100% - 15px);
  background-position-y: center;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  font-weight: normal;
  color: var(--ZJ-main-text-label-color);
}

.dia-left-top-search:focus {
  outline: 2px solid var(--ZJ-default-main);
}


/*  */
/* Message left list */
/*  */
.dia-left-center {
  height: 630px;
  /* background-color: brown; */
  border-radius: 0 0 0 10px;
  overflow-y: auto;
  /* 允许垂直方向滚动 */
  overflow-x: hidden;
  /* 禁止水平方向滚动，如果需要水平滚动则改为 auto */
  scrollbar-width: none;
  /* 针对 WebKit 浏览器隐藏滚动条 */
  -ms-overflow-style: none;
  /* 针对 IE 和 Edge 隐藏滚动条 */
}

.user {
  /* background-color: aquamarine; */
  /* height:70px; */
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
}

.avatar {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  /* background-color: antiquewhite; */
}

.avatar img {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
}

.user-right {
  /* background-color: #d0b4ea; */
  width: 100%;
  margin-left: 15px;
}

.user-right-box {
  display: flex;
  justify-content: space-between;
}

.user-right-box:nth-child(1) {
  margin-bottom: 10px;
}

.nick {
  /* background-color: chartreuse; */
  width: 180px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0em;
  color: var(--ZJ-main-text-color);
}

.time {
  /* background-color: rgb(155, 197, 210); */
  width: 100px;
  font-size: 13px;
  font-weight: 600;
  text-align: right;
  letter-spacing: 0em;
  color: var(--ZJ-main-text-label-color);
}

.msg {
  /* background-color: rgb(190, 171, 207); */
  width: 240px;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0em;
  color: var(--ZJ-main-text-label-color);
}

.unread_count {
  /* background-color: rgb(61, 188, 216); */
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.msg,
.nick,
.time,
.unread_count {
  line-height: 20px;
  overflow: hidden;
  /* 显示省略符号来代表被修剪的文本。 */
  text-overflow: ellipsis;
  /* 文本不换行 */
  white-space: nowrap;
}

li {
  width: 390px;
  list-style: none;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #D8D8D8;
  cursor: default;
}

li:hover {
  background-color: var(--ZJ-main-hover);
  /* box-shadow:
    inset 1px 0 0 0 #D8D8D8; */
}

/* 点击后样式 */
.selected,
.selected:hover {
  background-color: var(--ZJ-main-hover);
  /* box-shadow:
    inset 1px 0 0 0 #D8D8D8; */
  /* 左侧阴影 */
}

/* 鼠标右键点击时的样式 */
.right-selected,
.right-selected:hover {
  /* 内阴影 */
  /* box-shadow: inset 0px 0px 5px 2px #0098ff; */
  box-shadow: inset 0px 0px 0px 2px #0098ff;
}

/* 置顶的样式 */
.isPinned,
.isPinned:hover {
  /* 内阴影 */
  background-color: var(--ZJ-main-hover);
  /* box-shadow:
    inset 1px 0 0 0 #D8D8D8; */
}

.isPinned .unread_count_circle,
.isPinned .unread_count_oval,
.isPinned .unread_count_more {
  background: #7050E8;
}

/* 置顶右键样式 */
.isPinned-right-selected,
.isPinned-right-selected:hover {
  /* box-shadow: inset 0px 0px 5px 2px #7050E8; */
  box-shadow: inset 0px 0px 0px 2px var(--ZJ-default-main);
}




/* 鼠标右键box */
.MouseRight-box {
  position: absolute;
  background-color: var(--ZJ-main-message-color);
  min-width: 177px;
  text-align: left;
  /* box-shadow: 1px 4px 8px 1px rgba(0, 0, 0, 0.2); */
  box-shadow: var(--ZJ-main-box-shadow);
  border-radius: 5px;
  z-index: 2;
}

.MouseRight-menu-account {
  position: absolute;
  top: 35px;
  /* left:175px; */
  left: calc(100% + 5px);
  width: 100%;
  /* width:170px;
  height:40px; */
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.2);
}

.MouseRight-menu {
  /* width: 160px; */
  display: flex;
  margin: 5px;
}

.MouseRight-menu div {
  display: flex;
}

.MouseRight-menu:hover {
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}

.MouseRight-menu img {
  width: 14px;
  height: 14px;
  line-height: 14px;
  margin: 8px 2px 8px 8px;
}

.MouseRight-menu a {
  font-size: 14px;
  color: black;
  margin: 5px;
}

.MouseRight-menu:hover img {
  animation: MouseRight 0.5s ease-in;
}

@keyframes MouseRight {
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.2);
  }

  60% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}







/* .selected p{
	color: rgb(255, 255, 255);
} */
/* 红色消息提示样式 */
/* 0 */
.unread_count_hidden {
  display: none;
}

/* 1-9 */
.unread_count_circle {
  background: #247EED;
  font-weight: 550;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  line-height: 150%;
  color: #FFFFFF;
}

/* 10-99 */
.unread_count_oval {
  background: #247EED;
  font-weight: 550;
  height: 20px;
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  line-height: 150%;
  border-radius: 15px;
  color: #FFFFFF;
}

/* 99+ */
.unread_count_more {
  background: #247EED;
  font-weight: 550;
  height: 20px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  line-height: 150%;
  border-radius: 12px;
  color: #FFFFFF;
}

/*  */
/* dia-right */
/*  */
.dia-right {
  /* background-color: hsl(322, 35%, 86%); */
  width: 100%;
  min-width: 370px;
  height: 700px;
  border-radius: 0 10px 10px 0;
  position: relative;
}

.dia-right-top {
  /* background-color: #7050E8;  */
  height: 54px;
  padding: 0 20px;
  width: calc(100% - 40px);
  border-radius: 0 10px 0 0;
  border-bottom: 1px solid #D8D8D8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dia-right-top-box {
  /* background-color: hsl(85, 77%, 61%); */
  font-size: 18px;
  font-weight: 600;
  color: var(--ZJ-main-text-color);
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.dia-right-top-more {
  position: absolute;
  top: 60px;
  right: 20px;
  position: absolute;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 2;
  cursor: default;
}

.dia-right-top-box-back {
  /* background-color: #0098ff; */
  height: 20px;
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.dia-right-top-box img {
  height: 24px;
  width: 24px;
  /* background-color: #0098ff; */
}

.dia-right-main {
  /* background-color: hwb(149 19% 40%); */
  height: 525px;
  position: relative;
  overflow: auto;
}


.dia-right-load {
  width: 100%;
  height: 60px;
  position: absolute;
  z-index: 2;
  /* background-image: linear-gradient(to top, transparent, rgb(242,242,242));  */
  align-items: center;
  display: flex;
  justify-content: center;
  /* background-color: #D8D8D8; */
  transition: height 0.3s;
}

.dia-right-load-box {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 0 8px #D8D8D8;
}



/* 对话框样式 */
.msg-box {
  margin: 0px 0 1px 0;
  padding: 10px 20px;
  /* display: flex; */
  /* background-color: hsl(213, 49%, 86%); */
}

.msg-box-left {
  /* background-color: hsl(308, 87%, 79%); */
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.msg-head-img {
  /* background-color: hsl(252, 69%, 85%); */
  width: 50px;
  height: 50px;
  margin-bottom: 0;
}

.msg-head-img img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.msg-textarea {
  background-color: var(--ZJ-main-hover);
  border-radius: 10px 10px 10px 0;
  padding: 10px;
  max-width: 400px;
  min-width: 200px;
  position: relative;
}

.msg-textarea::before {
  content: '';
  width: 20px;
  height: 20px;
  bottom: 0;
  position: absolute;
  left: -20px;
  background: radial-gradient(circle at 0 0, transparent 20px, var(--ZJ-main-hover) 20px);
}

.msg-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  /* background-color: hsl(148, 55%, 48%) */
}

/*  */
/* 文件 */
/*  */
.msg-textarea-file {
  /* background-color:#F2F2F2; */
  border-radius: 10px;
  max-width: 400px;
  min-width: 200px;
}

.msg-textarea-file img,
.msg-textarea-file video {
  border-radius: 10px;
  max-width: 300px;
  /* max-height: 300px; */
}

.msg-textarea-file audio {
  max-width: 300px;
  max-height: 300px;
}

.msg-textarea-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  word-break: break-all;
  /* background-color: antiquewhite; */
  font-size: 12px;
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0em;
  color: var(--ZJ-main-text-color);
}

.msg-textarea-time {
  /* background-color: aquamarine; */
  margin-top: 5px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  line-height: 150%;
  color: var(--ZJ-main-text-label-color);
}

.msg-textarea-SizeAndTime {
  /* background-color: aquamarine; */
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  font-weight: normal;
  line-height: 150%;
  color: var(--ZJ-main-text-label-color);
}


/* 右侧的样式 */
.right {
  /* background-color: hwb(128 25% 26%); */
  gap: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.right .msg-head-img {
  /* background-color: hwb(0 36% 16%); */
  width: 50px;
  height: 50px;
  order: 1;
}

.right .msg-head-img img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.right .msg-textarea {
  background-color: #7050E8;
  border-radius: 10px 10px 0px 10px;
  padding: 10px;
  max-width: 400px;
  position: relative;
  font-family: AlibabaPuHuiTi;
  font-size: 12px;
  font-weight: normal;
  line-height: 150%;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
}

.right .msg-textarea::before {
  display: none;
}

.right .msg-textarea::after {
  content: '';
  width: 20px;
  height: 20px;
  bottom: 0;
  right: -20px;
  position: absolute;
  background: radial-gradient(circle at 100% 0, transparent 20px, #7050E8 20px);
}

.right .msg-textarea-box {
  /* background-color: antiquewhite; */
  color: #FFFFFF;
}

/* .right .msg-textarea-file{
  background-color:#7050E8;
} */
.right .msg-textarea-time {
  /* background-color: aquamarine; */
  text-align: right;
  color: #FFFFFF;
}

.right .msg-textarea-SizeAndTime {
  color: #FFFFFF;
}




.dia-right-backBottom {
  height: 40px;
  width: 70px;
  border-radius: 20px;
  position: absolute;
  bottom: 140px;
  right: 20px;
  background-color: #FFFFFF;
  box-shadow: 0 0 8px #D8D8D8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dia-right-backBottom:hover {
  background-color: #F6F6F6;
}

/*  */
/* 底部发送导航 */
/*  */
.dia-right-bottom-bar {
  position: absolute;
  bottom: 79px;
  /* background-color: cadetblue; */
  height: 40px;
  padding: 0px 15px;
  width: calc(100% - 30px);
  display: flex;
  align-items: end;
  gap: 20px;
  border-top: 1px solid #D8D8D8;
}

.dia-right-bottom-bar-img {
  height: 24px;
  width: 24px;
  /* background-color: #bdf4bb; */
  display: contents;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 靠右方法一 */
.dia-right-bottom-bar-img:nth-child(6) {
  margin-left: auto;
}

/* 靠右方法二 */
/* .dia-right-bottom-bar-img:nth-child(6){
  background-color: #0098ff;
  position: absolute;
  right: 20px;
} */
.dia-right-bottom-bar-img img {
  height: 24px;
  height: 24px;
}

/*  */
/* 底部导航表情框 */
/*  */
.Emoticons-box {
  position: absolute;
  bottom: 60px;
  background-color: rgb(255, 255, 255);
  width: 310px;
  padding: 10px;
  height: 200px;
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1;
}

/* .Emoticons-main{
  background-color: #bdf4bb;
} */
.Emoticons-main-title {
  /* background-color: #9379f1; */
  font-family: AlibabaPuHuiTi;
  font-size: 12px;
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: rgba(0, 0, 0, 0.5);
}

.Emoticons-main-center {
  /* background-color: #bdf4bb; */
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.Emoticons-main-center-box {
  background-color: #F2F3FF;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: inline-flex;
  gap: 10px;
  cursor: pointer;
}

.Emoticons-main-center-box:hover {
  background-color: #d8d1f5;
  transition: all 0.2s ease-in-out;
  opacity: 1.2;
  scale: 1.2;
}

.Emoticons-main-center-box img {
  height: 24px;
  width: 24px;
}


/*  */
/* 底部发送框的样式 */
/*  */
.dia-right-bottom {
  /* background-color: hsl(31, 89%, 64%); */
  height: 40px;
  padding: 15px;
  width: calc(100% - 30px);
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 0;
  display: flex;
}

textarea {
  width: calc(100% - 80px);
  height: 20px;
  /* min-height:30px; */
  /* max-height: 100px; */
  border-radius: 10px;
  padding: 10px;
  resize: none;
  border: none;
  background: var(--ZJ-main-hover);
  font-size: 14px;
  font-weight: normal;
}

textarea:focus {
  outline: 2px solid var(--ZJ-default-main);
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--ZJ-default-main);
  border: none;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.send-btn img {
  width: 25px;
  height: 25px;
}

.send-btn:hover {
  background-color: var(--ZJ-default-main-hover2);
}



@media (max-width:900px) {
  .Message {
    display: flex;
    flex-wrap: wrap;
  }

  .dia-right {
    width: 100%;
  }

  .dia-left {
    width: 100%;
    height: 700px;
    border-right: none;
  }

  .dia-right2 {
    display: none;
  }

  .dia-left-top {
    display: flex;
    justify-content: space-around;
  }

  .dia-left-center {
    overflow: hidden;
    border-radius: 0 0 10px 10px;
  }

  li {
    width: 100%;
  }
}

/* list 动画效果*/
.l-enter-active {
  opacity: 0;
  transform: translateX(-200px) scale(0);
}

.l-enter-to {
  opacity: 1;
  transition: all 0.5s ease-in-out;
  transform: translateX(0px) scale(1);
}

.l-leave-active {
  opacity: 1;
  transition: all 0.5s ease-in-out;
  transform: translateX(0px) scale(1);
}

.l-leave-to {
  opacity: 0;
  transform: translateX(200px) scale(0);
}


.emo-enter-active {
  opacity: 0;
  transition: all 0.2s ease-in-out;
  transform: translate(-100px, 50px) scale(0.5);
}

.emo-enter-to {
  opacity: 1;
  transition: all 0.2s ease-in-out;
  transform: translate(0px, 0px) scale(1);
}

.emo-leave-active {
  opacity: 1;
  transition: all 0.2s ease-in-out;
  transform: translate(0px, 0px) scale(1);
}

.emo-leave-to {
  opacity: 0;
  transition: all 0.2s ease-in-out;
  transform: translate(-100px, 50px) scale(0.5);
}
</style>