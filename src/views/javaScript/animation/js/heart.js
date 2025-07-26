import mojs from "/mojs/core";

const heart = ref(null);

new mojs.Burst({
  // 爆裂范围 {从多大 : 到多大}
  radius: { 0: 50 },
  // 动画挂载的父元素, 如果不填默认挂载到 <body>
  parent: heart.value,
  // 动画延迟的贝塞尔曲线函数
  easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
  // 动画延迟时间
  duration: 1500,
  // 在动画动之前等待的时间 (这里一般设置150ms方便减少低端机型可能会存在的卡顿)
  delay: 300,
  // 扩散的粒子配置
  children: {
    duration: 750,
    // 粒子大小变换 {从多大 : 到多大}
    // rand(from, to) rand函数可以帮我们随机出一个区间的值
    radius: { 0: 'rand(5, 25)' },
    // 形状选择, 这里我们选择了 “圆形”
    shape: 'circle',
    // 粒子可选的填充色
    fill: ['#1abc9c', '#2ecc71', '#00cec9', '#3498db', '#9b59b6', '#fdcb6e', '#f1c40f', '#e67e22', '#e74c3c', '#e84393']
  },
  // 透明度
  opacity: 0.6,
  // 生成的粒子数量
  count: 10,
  onStart() {
    // 动画触发前的钩子函数     
  },
  onComplete() {
    // 动画完成后的钩子函数     
  }
}).play();