<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>在JavaScript中添加DOM元素</h2>
      </template>

      <h3>1.1使用appendChild()方法;</h3>
      <p>appendChild()方法用于将一个新的子节点添加到指定父节点的末尾。以下是一个示例：</p>
      <ZJCodeDisplay :code="vueCode" language="vue" />
      <p>在这个示例中，我们创建了一个新的 div 元素，并将其添加到 id 为 container 的元素的末尾。</p>

      <h3>1.2使用insertBefore()方法</h3>
      <p>insertBefore()方法用于在指定的子节点之前插入一个新的子节点。以下是一个示例：</p>
      <ZJCodeDisplay :code="vueCode2" language="vue" />
      <p>在这个示例中，我们创建了一个新的 div 元素，并将其插入到 class 为 bb 的元素之前。</p>

      <h3>1.3使用replaceChild()方法</h3>
      <p>replaceChild() 方法用于替换现有的子节点。以下是一个示例：</p>
      <ZJCodeDisplay :code="vueCode3" language="vue" />
      <p>在这个示例中，我们创建了一个新的 div 元素，并用它替换了 class 为 bb 的元素。</p>

      <h3>1.4使用removeChild()方法</h3>
      <p>removeChild() 方法用于移除指定的子节点。以下是一个示例：</p>
      <ZJCodeDisplay :code="vueCode4" language="vue" />
      <p>在这个示例中，我们移除了 class 为 bb 的元素。</p>

    </ZJMain>
  </div>
</template>

<script setup>

const vueCode = ref(
  `<div id="container">
  <div class="aa">aa</div>
  <div class="bb">bb</div>
</div>

<script>
  var newDiv = document.createElement('div');
  newDiv.innerHTML = '这是一个新的 div';
  document.getElementById('container').appendChild(newDiv);
<script>
`)

const vueCode2 = ref(`
<div id="container">
  <div class="aa">aa</div>
  <div class="bb">bb</div>
<div>

<script>
  var newDiv = document.createElement('div');
  newDiv.innerHTML = '这是一个新的 div';
  var referenceNode = document.getElementsByClassName('bb')[0];
  document.getElementById('container').insertBefore(newDiv, referenceNode);
<script>
`)

const vueCode3 = ref(`
<div id="container">
  <div class="aa">aa</div>
  <div class="bb">bb</div>
<div>

<script>
  var newDiv = document.createElement('div');
  newDiv.innerHTML = '这是一个新的 div';
  var oldDiv = document.getElementsByClassName('bb')[0];
  document.getElementById('container').replaceChild(newDiv, oldDiv);
<script>
`)

const vueCode4 = ref(`<div id="container">
  <div class="aa">aa</div>
  <div class="bb">bb</div>
</div>

<script>
  var parent = document.getElementById('container');
  var child = document.getElementsByClassName('bb')[0];
  parent.removeChild(child);
<script>
`)
</script>
