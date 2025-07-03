<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJPagination(分页)</h2>
      </template>
      <h3>分页用来将若干数据分成一页一页的数据进行展示</h3>
      <p>分页数据总数量:allDataCount="100"(必须)</p>
      <p>每一页数据数量:everyPageCount="16"(不必须,默认20)</p>
      <p>每页最大数据数量:maxPageCount="20"(不必须,默认20)</p>
      <p>选择每一页面数据时,传递的页数page,数量size函数:@showPageCount="AcceptPageCount"</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJPagination :everyPageCount="16" :maxPageCount="20" :allDataCount="100" @showPageCount="AcceptPageCount">
        </ZJPagination>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

function AcceptPageCount(page, size) {
  console.log("page", page)
  console.log("size", size)
}

const vueCode = ref(
  `<template>
  <ZJPagination
    everyPageCount="16"
    maxPageCount="20"
    allDataCount="100"
    @showPageCount="AcceptPageCount"></ZJPagination>
</template>

function AcceptPageCount(page,size){
  console.log("page",page)
  console.log("size",size)
}
`)
</script>
