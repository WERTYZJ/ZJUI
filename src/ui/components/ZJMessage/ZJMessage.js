// ZJMessage.js
import { createApp } from 'vue';
import MessageBox from './index.vue';

let messageInstance = null; // 用于存储当前的消息实例
let mountNode = null; // 用于存储当前的挂载节点
let closeTimer = null; // 用于存储定时器

const ZJMessage = (options) => {
  // 如果已有消息实例，则清除定时器
  if (closeTimer) {
    clearTimeout(closeTimer);
  }

  // 如果已有消息实例，则先卸载它
  if (messageInstance) {
    messageInstance.unmount();
    mountNode.remove();
  }

  // 创建新的消息实例
  messageInstance = createApp(MessageBox, {
    type: options.type || 'info',
    message: options.message,
    duration: options.duration || 2500,
  });

  // 创建挂载节点并添加到文档中
  mountNode = document.createElement('div');
  document.body.appendChild(mountNode);

  messageInstance.mount(mountNode);

  // 设置一个定时器来自动卸载消息（基于duration）
  if (options.duration) {
    closeTimer = setTimeout(() => {
      if (messageInstance) {
        messageInstance.unmount();
        mountNode.remove();
        messageInstance = null; // 重置消息实例
        mountNode = null; // 重置挂载节点
        closeTimer = null; // 重置定时器
      }
    }, options.duration + 500);
  }
};

export default ZJMessage;
