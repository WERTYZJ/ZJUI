<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>bobber</h2>
      </template>
      <div style="display:flex;flex-direction: column;gap: 20px;">
        <p>点击单词显示高亮</p>
        <!-- 使用行内元素包裹保证排版 -->
        <div class="boxqqq">
          <div v-for="(node, index) in parsedNodes" :key="index" class="box2333">
            <span v-if="node.type === 'text'">{{ node.content }}</span>
            <span v-else class="a-tag" @click="toggleColor(node.i)"
              :style="{ color: selectedColors[node.i] ? '#62d2a2' : '', backgroundColor: selectedColors[node.i] ? 'rgba(66,185,131,0.1)' : '', borderRadius: selectedColors[node.i] ? '8px' : '' }">{{
                node.content }}</span>
          </div>
        </div>
        <ZJButton type="default" text="下一个单词" @click="nextWord()" style="width:fit-content;"></ZJButton>
      </div>
    </ZJMain>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      rawNodes: `<span><a i='1'>A</a> <a i='2'>VHF</a> <a i='3'>transceiver</a> (<a i='4'>transmitter</a> + <a i='5'>receiver</a>) <a i='6'>transmits</a> <a i='7'>and</a> <a i='8'>receives</a> <a i='9'>radio</a> <a i='10'>signals</a>.</span> 
	  <span><a i='11'>The</a> <a i='12'>VHF</a> <a i='13'>is</a> <a i='14'>used</a> <a i='15'>to</a> <a i='16'>bridge</a> <a i='17'>short</a> <a i='18'>distances</a>, <a i='19'>is</a> <a i='20'>easy</a> <a i='21'>to</a> <a i='22'>operate</a> <a i='23'>and</a> <a i='24'>is</a> <a i='25'>allowed</a> <a i='26'>to</a> <a i='27'>be</a> <a i='28'>used</a> <a i='29'>both</a> <a i='30'>in</a> <a i='31'>territorial</a> <a i='32'>waters</a> <a i='33'>and</a> <a i='34'>inland</a> <a i='35'>waterways</a>.</span>
	  <span> <a i='36'>Its</a> <a i='37'>receiver</a> "<a i='38'>has</a> <a i='39'>a</a> <a i='40'>push</a>-<a i='41'>to</a>-<a i='42'>talk</a> <a i='43'>button</a>".</span>`,
      parsedNodes: [],
      selectedColors: {},
      count: 0,
    }
  },
  created() {
    this.parseHtml()
  },
  methods: {
    nextWord() {
      this.count++;
      this.toggleColor(this.count);
    },
    parseHtml() {
      const nodes = []
      let tempStr = this.rawNodes

      // 使用正则表达式匹配a标签
      const aTagReg = /<a\s+i='(\d+)'>(.*?)<\/a>/g

      let match
      let lastIndex = 0

      while ((match = aTagReg.exec(tempStr)) !== null) {
        // 处理匹配前的文本
        const textBefore = tempStr.slice(lastIndex, match.index)

        if (textBefore) {
          nodes.push({
            type: 'text',
            content: textBefore
              // 先处理闭合标签（保留斜杠）
              .replace(/<\/span>/g, ' ')
              // 再处理开始标签
              .replace(/<span>/g, ' ')
              // 最后处理特殊字符
              .replace(/&nbsp;/g, ' ')
              .replace(/</g, ' ')
          })
        }

        // 处理匹配到的a标签
        nodes.push({
          type: 'a',
          i: match[1],
          content: match[2]
        })

        lastIndex = aTagReg.lastIndex
      }

      // 处理剩余文本
      const remainingText = tempStr.slice(lastIndex)

      if (remainingText) {
        nodes.push({
          type: 'text',
          content: remainingText
            // 先处理闭合标签（保留斜杠）
            .replace(/<\/span>/g, ' ')
            // 再处理开始标签
            .replace(/<span>/g, ' ')
            // 最后处理特殊字符
            .replace(/&nbsp;/g, ' ')
            .replace(/</g, ' ')
        })
      }

      this.parsedNodes = nodes
    },
    toggleColor(i) {

      // 每个数据所需时间 = 音频总时长 / 数据总个数 
      // 第n个需要高亮的数据 = 现在播放时长 / 每个数据所需时间

      // console.log("数据长度", this.parsedNodes.length)
      // console.log("数据",this.parsedNodes)
      // console.log(i)
      this.selectedColors[i] = !this.selectedColors[i];
    }
  }
}
</script>

<style scoped>
.boxqqq {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* background-color: red; */
  background-color: var(--ZJ-main-hover);
  border-radius: 10px;
  padding: 20px;
  /* word-break: break-all;
	word-wrap: break-word;
	white-space: nowrap; */
  /* background-color: aqua; */
}

.box2333 {
  /* background-color: chocolate; */
  margin: 10px 0;
}

.box2333 span {
  color: var(--ZJ-main-text-color);
  text-decoration: none;
}

.a-tag {
  /* display: inline; */
  color: #333;
  padding: 4px;
  margin: 0 4px;
}
</style>