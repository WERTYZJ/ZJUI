<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJCarousel(走马灯)</h2>
      </template>
      <h3>走马灯用来在有限空间内，循环播放同一类型的图片、文字等内容</h3>
      <p>:DefaultVal="0" 默认显示地基张图片，0为第一张。</p>
      <p>:CarouselVal="CarouselVal" 显示的数据内容img、name、rate、lessons、content。</p>
      <p>:SetTimeout="3000" 定时更换下一张，默认事件4秒（1000 = 1秒）</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJCarousel
         :DefaultVal="0"
         :CarouselVal="CarouselVal"
         :SetTimeout="3000"
         >
        </ZJCarousel>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const CarouselVal  = ref([
  { 
    img:'https://c-ssl.dtstatic.com/uploads/blog/202304/15/20230415081411_f2e46.thumb.400_0.jpg',
    name: "Duff", 
    rate:2.3,
    lessons:'English,Spanish,French',
    content: "The teacher's English pronunciation is very standard and the teaching is excellent." 
  },
  { 
    img:'https://c-ssl.dtstatic.com/uploads/blog/202304/15/20230415081411_f2e46.thumb.400_0.jpg',
    name: "ZhangJian", 
    rate:4.9,
    lessons:'English,Spanish,French',
    content: "The teacher's English pronunciation is very standard and the teaching is excellent." 
  },
  { 
    img:'https://c-ssl.dtstatic.com/uploads/blog/202304/15/20230415081411_f2e46.thumb.400_0.jpg',
    name: "LiNaNa", 
    rate:3.5,
    lessons:'English,Spanish,French',
    content: "The teacher's English pronunciation is very standard and the teaching is excellent." 
  },
])

const vueCode=ref(
`<template>
  <ZJCarousel
    :DefaultVal="0"
    :CarouselVal="CarouselVal"
    >
  </ZJCarousel>
</template>

<script setup>
import { ref } from "vue";

const CarouselVal  = ref([
  { 
    img:'https://c-ssl.dtstatic.com/uploads/blog/202304/15/20230415081411_f2e46.thumb.400_0.jpg',
    name: "Duff", 
    rate:2.3,
    lessons:'English,Spanish,French',
    content: "The teacher's English pronunciation is very standard and the teaching is excellent." 
  },
  { 
    img:'https://c-ssl.dtstatic.com/uploads/blog/202304/15/20230415081411_f2e46.thumb.400_0.jpg',
    name: "ZhangJian", 
    rate:4.9,
    lessons:'English,Spanish,French',
    content: "The teacher's English pronunciation is very standard and the teaching is excellent." 
  },
  { 
    img:'https://c-ssl.dtstatic.com/uploads/blog/202304/15/20230415081411_f2e46.thumb.400_0.jpg',
    name: "LiNaNa", 
    rate:3.5,
    lessons:'English,Spanish,French',
    content: "The teacher's English pronunciation is very standard and the teaching is excellent." 
  },
])
<script>
`)
</script>
