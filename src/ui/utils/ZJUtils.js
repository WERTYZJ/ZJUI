//ZJUtils.js

import { ZJMessage } from "./ZJUI";

const ZJ_Time = () => {
  return (time) => {
    // msgTime函数的逻辑
    const now = new Date();
    const timeStamp = new Date(time);
    const timeDiff = now - timeStamp;
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // 今天的0点

    if (timeDiff < 24 * 60 * 60 * 1000) {
      if (timeStamp < startOfDay) {
        const hours = timeStamp.getHours();
        const minutes = timeStamp.getMinutes();
        return `${padZero(hours)}:${padZero(minutes)} YTD`;
      } else {
        const hours = timeStamp.getHours();
        const minutes = timeStamp.getMinutes();
        if (hours <= 12) {
          return `${padZero(hours)}:${padZero(minutes)} AM`;
        } else {
          return `${padZero(hours)}:${padZero(minutes)} PM`;
        }
      }
    } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
      // const days = ['日', '一', '二', '三', '四', '五', '六'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[timeStamp.getDay()];
      return `${dayOfWeek}`;
    } else {
      const year = timeStamp.getFullYear();
      const month = timeStamp.getMonth() + 1;
      const date = timeStamp.getDate();
      return `${padZero(year)}/${padZero(month)}/${padZero(date)}`;
    }

    function padZero(value) {
      return value < 10 ? `0${value}` : value;
    }
  };
}

const ZJ_FileSize = () => {
  return (fileSize) => {
    if (!fileSize) {
      return 'fileSizeErr'
    }
    var a = fileSize / 1024
    if (a < 1) {
      return (a / 1024).toFixed(2) + 'B'
    }
    if (a < 1024 && a >= 1) {
      return a.toFixed(2) + 'KB'
    }
    if (a >= 1024 && a < 1024 * 1024) {
      return (a / 1024).toFixed(2) + 'MB'
    }
    if (a >= 1024 * 1024) {
      return (a / 1024).toFixed(2) + 'GB'
    }
  };
}

const ZJ_GetImage = (path) => {
  // 添加路径校验
  if (!path) return '';
  // const a = new URL(`./assets/${path}.png`, import.meta.url).href;
  // console.log("aaa",a)
  // console.log("path",path)
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

/* 防抖（Debounce）
 * func是需要执行的函数
 * wait 是延迟的时间
 */

// 搜索输入框：用户在输入时，连续触发 keyup 事件，只有在输入结束后才发送请求。
// 窗口调整：用户调整浏览器窗口大小时，频繁触发 resize 事件。防抖可以确保调整结束后再执行相应操作。
// 表单验证：用户输入表单数据时，可以用防抖来减少频繁的验证请求。

// 使用示例
// const searchInput = document.getElementById('search');
// const handleSearch = debounce(function () {
//   console.log('Sending request for:', this.value);
// }, 500);
// searchInput.addEventListener('keyup', handleSearch);

const ZJ_Debounce = (func, wait) => {
  // 保存定时器的引用
  let timeout;
  // 返回的函数是用户实际调用的函数，它包含了防抖逻辑
  return function (...args) {
    // 保存当前的 this 上下文
    const context = this;
    // 清除之前的定时器，如果存在
    if (timeout) clearTimeout(timeout);
    // 设置一个新的定时器
    // 当指定的 wait 时间过后，将执行 func 函数
    // 并将当前的 this 上下文和参数传入
    timeout = setTimeout(function () {
      // 执行原始函数，绑定正确的 this 上下文和参数
      func.apply(context, args);
    }, wait);
  }
}

/**
 * 节流函数
 * @param {Function} func - 需要节流的函数
 * @param {number} wait - 时间间隔（毫秒），表示在这个时间间隔内最多执行一次函数
 * @returns {Function} - 返回一个节流后的函数
 */

// 页面滚动：用户滚动页面时触发 scroll 事件，使用节流限制处理函数的执行频率。
// 按钮点击：防止用户短时间内多次点击同一个按钮，造成重复提交。
// 游戏动画：限制每秒渲染的帧数，以减少资源消耗。

// 使用示例
// 原始的滚动事件处理函数
// function handleScroll() {
//   console.log('Scroll event triggered');
// }
// // 使用节流函数包装 handleScroll
// const throttledScrollHandler = throttle(handleScroll, 200);
// // 监听滚动事件，并使用节流后的函数
// window.addEventListener('scroll', throttledScrollHandler);

const ZJ_Throttle = (func, wait) => {
  // 上一次执行函数的时间戳，初始值为 0
  let lastTime = 0;
  // 返回一个闭包函数，作为节流后的函数
  return function (...args) {
    // 获取当前时间戳
    const now = Date.now();
    // 如果当前时间与上一次执行时间的差值小于 wait，则执行函数
    if (now - lastTime < wait) {
      ZJMessage({
        type: 'warning',
        message: '请勿重复点击!',
        duration: 2000,
      });
    }
    // 如果当前时间与上一次执行时间的差值大于等于 wait，则执行函数
    if (now - lastTime >= wait) {
      // 更新上一次执行函数的时间戳
      lastTime = now;
      // 调用原始函数，并传入参数
      func.apply(this, args);
    }
  };
}

const ZJ_ErrorImg = (event) => {
  event.target.src = '/ZJ-error-image.svg'
}

export {
  ZJ_GetImage,
  ZJ_Debounce,
  ZJ_Throttle,
  ZJ_ErrorImg,
  ZJ_Time,
  ZJ_FileSize,
};