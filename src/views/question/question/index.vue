<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>题目相关</h2>
      </template>
      <p>英语听力得分结果展示</p>

      <div class="genggai">
        <div v-for="(d, wordIndex) in genggaiDataGroup" :key="wordIndex" class="genggai2">
          <div v-if="d.score <= 100" class="fontScore" :style="{ color: getScoreAndTextColor(d.score) }">
            {{ d.score }}
          </div>
          <div class="fontText"
            :style="{ color: getScoreAndTextColor(d.score), backgroundColor: getTextBgColor(d.score) }">
            {{ d.text }}
          </div>
        </div>
      </div>

      <!-- <div class="cepingText">
          <span>测评结果</span>
        </div>

        <div class="bottomBox">
          <div class="jieguoText">
            <div class="tuxing">
              <span class="newText">新纪录</span>
              <span class="newScore">{{ newScore }} 分</span>
            </div>
          </div>
          <div class="wenzi">
            <span>你可以读的更好呦，加油哦！！</span>
          </div>

          <div class="weidu">
            <div class="headerText">
              <span>纬度展示</span>
            </div>
            <div class="weiduBox">
              <div v-for="(i, index) in weiduData" :key="index">
                <div class="weiduBox2">
                  <span class="weiduBox3"
                    :style="{ color: getScoreAndTextColor(i.score), backgroundColor: getTextBgColor(i.score) }">{{ i.score
                    }}</span>
                  <span class="weiduBox3Text">{{ i.title }}</span>
                </div>

              </div>

            </div>
          </div>

          <div class="qita">
            <div class="headerText">
              <span>其他分析</span>
            </div>
            <div class="qitaMain">
              <div class="qitaLi" v-for="(i, index) in qitaData" :key="index">
                <span class="text1">{{ i.title }}</span>
                <span v-if="i.rightVal">{{ i.rightVal }}</span>
              </div>
            </div>
          </div>
        </div> -->

      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>

const dataMore = ref(`{"finalResult":{"code":{"time":"1743386168434","len":7709,"code":"a1de5ddaf90cfba22dd589241addf7c7590f19ee1765f462aec1510245b1f521"},"recordId":"67e9f633dae3e7072c85fc10","tokenId":"","result":{"rank":100,"res":"eng.pred.G4.D4.0.5","integrity":89,"forceout":0,"pron":78,"rhythm":78,"textmode":0,"systime":2592,"oov_words":{},"fluency":{"pause":0,"overall":98,"speed":155},"info":{"snr":20.6477,"trunc":1,"clip":0.00179228,"volume":4321,"tipId":0},"overall":79,"pretime":27,"timerate":0.158619,"accuracy":78,"details":[{"words":[{"dur":360,"endindex":2,"score":82,"end":660,"toneref":0,"stressscore":0,"tonescore":0,"text":"one","is_err":0,"stressref":0,"accent":3,"start":300,"beginindex":0},{"dur":540,"endindex":6,"score":100,"end":1200,"toneref":0,"stressscore":0,"tonescore":0,"text":"day","is_err":0,"stressref":0,"accent":3,"start":660,"beginindex":4}],"dur":900,"endindex":6,"is_leak":0,"text":"one day","beginindex":0,"end":1200,"start":300,"score":94},{"words":[{"dur":280,"endindex":10,"score":100,"end":1820,"toneref":0,"stressscore":0,"tonescore":0,"text":"my","is_err":0,"stressref":0,"accent":3,"start":1540,"beginindex":9},{"dur":0,"endindex":17,"score":0,"end":0,"toneref":0,"stressscore":0,"tonescore":0,"text":"mother","is_err":2,"stressref":0,"accent":0,"start":0,"beginindex":12},{"dur":340,"endindex":24,"score":100,"end":2160,"toneref":0,"stressscore":0,"tonescore":0,"text":"bought","is_err":0,"stressref":0,"accent":2,"start":1820,"beginindex":19},{"dur":360,"endindex":28,"score":96,"end":2520,"toneref":0,"stressscore":0,"tonescore":0,"text":"two","is_err":0,"stressref":0,"accent":3,"start":2160,"beginindex":26},{"dur":460,"endindex":35,"score":94,"end":2980,"toneref":0,"stressscore":0,"tonescore":0,"text":"little","is_err":0,"stressref":0,"accent":3,"start":2520,"beginindex":30},{"dur":520,"endindex":43,"score":100,"end":3500,"toneref":0,"stressscore":0,"tonescore":0,"text":"rabbits","is_err":0,"stressref":0,"accent":3,"start":2980,"beginindex":37},{"dur":320,"endindex":47,"score":100,"end":3820,"toneref":0,"stressscore":0,"tonescore":0,"text":"for","is_err":0,"stressref":0,"accent":1,"start":3500,"beginindex":45},{"dur":440,"endindex":50,"score":80,"end":4260,"toneref":0,"stressscore":0,"tonescore":0,"text":"me","is_err":0,"stressref":0,"accent":3,"start":3820,"beginindex":49}],"dur":2720,"endindex":50,"is_leak":0,"text":"my mother bought two little rabbits for me","beginindex":9,"end":4260,"start":1540,"score":82},{"words":[{"dur":320,"endindex":56,"score":100,"end":5320,"toneref":0,"stressscore":1,"tonescore":0,"text":"they","is_err":0,"stressref":0,"accent":3,"start":5000,"beginindex":53},{"dur":240,"endindex":61,"score":74,"end":6440,"toneref":0,"stressscore":0,"tonescore":0,"text":"have","is_err":1,"stressref":0,"accent":3,"start":6200,"beginindex":58},{"dur":180,"endindex":65,"score":74,"end":6200,"toneref":0,"stressscore":0,"tonescore":0,"text":"two","is_err":0,"stressref":0,"accent":3,"start":6020,"beginindex":63},{"dur":440,"endindex":72,"score":100,"end":6020,"toneref":0,"stressscore":0,"tonescore":0,"text":"little","is_err":0,"stressref":0,"accent":3,"start":5580,"beginindex":67},{"dur":480,"endindex":77,"score":100,"end":6920,"toneref":0,"stressscore":0,"tonescore":0,"text":"ears","is_err":0,"stressref":0,"accent":0,"start":6440,"beginindex":74}],"dur":1920,"endindex":77,"is_leak":0,"text":"they have two little ears","beginindex":53,"end":6920,"start":5000,"score":91},{"words":[{"dur":380,"endindex":82,"score":100,"end":7380,"toneref":0,"stressscore":0,"tonescore":0,"text":"red","is_err":0,"stressref":0,"accent":3,"start":7000,"beginindex":80},{"dur":600,"endindex":87,"score":86,"end":7980,"toneref":0,"stressscore":0,"tonescore":0,"text":"eyes","is_err":0,"stressref":0,"accent":0,"start":7380,"beginindex":84}],"dur":980,"endindex":87,"is_leak":0,"text":"red eyes","beginindex":80,"end":7980,"start":7000,"score":93},{"words":[{"dur":300,"endindex":93,"score":100,"end":8400,"toneref":0,"stressscore":0,"tonescore":0,"text":"with","is_err":0,"stressref":0,"accent":3,"start":8100,"beginindex":90},{"dur":260,"endindex":99,"score":9,"end":8660,"toneref":0,"stressscore":0,"tonescore":0,"text":"white","is_err":0,"stressref":0,"accent":3,"start":8400,"beginindex":95},{"dur":100,"endindex":103,"score":50,"end":8760,"toneref":0,"stressscore":0,"tonescore":0,"text":"and","is_err":0,"stressref":0,"accent":3,"start":8660,"beginindex":101},{"dur":0,"endindex":107,"score":0,"end":0,"toneref":0,"stressscore":0,"tonescore":0,"text":"fat","is_err":2,"stressref":0,"accent":0,"start":0,"beginindex":105},{"dur":640,"endindex":112,"score":100,"end":9400,"toneref":0,"stressscore":0,"tonescore":0,"text":"body","is_err":0,"stressref":0,"accent":0,"start":8760,"beginindex":109}],"dur":2060,"endindex":112,"is_leak":0,"text":"with white and fat body","beginindex":90,"end":10160,"start":8100,"score":44},{"words":[{"dur":140,"endindex":115,"score":24,"end":10560,"toneref":0,"stressscore":0,"tonescore":0,"text":"i","is_err":0,"stressref":0,"accent":3,"start":10420,"beginindex":115},{"dur":300,"endindex":118,"score":100,"end":10860,"toneref":0,"stressscore":0,"tonescore":0,"text":"am","is_err":0,"stressref":0,"accent":3,"start":10560,"beginindex":117},{"dur":440,"endindex":123,"score":100,"end":11300,"toneref":0,"stressscore":0,"tonescore":0,"text":"very","is_err":0,"stressref":0,"accent":2,"start":10860,"beginindex":120},{"dur":580,"endindex":129,"score":71,"end":11880,"toneref":0,"stressscore":0,"tonescore":0,"text":"happy","is_err":0,"stressref":0,"accent":1,"start":11300,"beginindex":125}],"dur":1460,"endindex":129,"is_leak":0,"text":"i am very happy","beginindex":115,"end":11880,"start":10420,"score":85},{"words":[{"dur":320,"endindex":135,"score":86,"end":12620,"toneref":0,"stressscore":0,"tonescore":0,"text":"from","is_err":0,"stressref":0,"accent":1,"start":12300,"beginindex":132},{"dur":300,"endindex":140,"score":6,"end":12920,"toneref":0,"stressscore":0,"tonescore":0,"text":"that","is_err":0,"stressref":0,"accent":3,"start":12620,"beginindex":137},{"dur":340,"endindex":143,"score":68,"end":13260,"toneref":0,"stressscore":0,"tonescore":0,"text":"on","is_err":0,"stressref":0,"accent":2,"start":12920,"beginindex":142}],"dur":960,"endindex":143,"is_leak":0,"text":"from that on","beginindex":132,"end":13260,"start":12300,"score":62},{"words":[{"dur":180,"endindex":148,"score":100,"end":13840,"toneref":0,"stressscore":0,"tonescore":0,"text":"the","is_err":0,"stressref":0,"accent":3,"start":13660,"beginindex":146},{"dur":0,"endindex":152,"score":0,"end":0,"toneref":0,"stressscore":0,"tonescore":0,"text":"two","is_err":2,"stressref":0,"accent":0,"start":0,"beginindex":150},{"dur":400,"endindex":159,"score":100,"end":14240,"toneref":0,"stressscore":1,"tonescore":0,"text":"little","is_err":0,"stressref":0,"accent":3,"start":13840,"beginindex":154},{"dur":500,"endindex":167,"score":100,"end":14740,"toneref":0,"stressscore":0,"tonescore":0,"text":"rabbits","is_err":0,"stressref":0,"accent":3,"start":14240,"beginindex":161},{"dur":460,"endindex":174,"score":68,"end":15200,"toneref":0,"stressscore":0,"tonescore":0,"text":"became","is_err":0,"stressref":0,"accent":3,"start":14740,"beginindex":169},{"dur":160,"endindex":177,"score":100,"end":15360,"toneref":0,"stressscore":0,"tonescore":0,"text":"my","is_err":0,"stressref":0,"accent":3,"start":15200,"beginindex":176},{"dur":0,"endindex":182,"score":0,"end":0,"toneref":0,"stressscore":0,"tonescore":0,"text":"good","is_err":2,"stressref":0,"accent":0,"start":0,"beginindex":179},{"dur":800,"endindex":190,"score":100,"end":16160,"toneref":0,"stressscore":1,"tonescore":0,"text":"friends","is_err":0,"stressref":0,"accent":0,"start":15360,"beginindex":184}],"dur":2500,"endindex":190,"is_leak":0,"text":"the two little rabbits became my good friends","beginindex":146,"end":16160,"start":13660,"score":69}],"wavetime":16343,"delaytime":83},"gId":"67e9f6330148d0a6e42d5644","audioUrl":"download.cloud.chivox.com:8002\/67e9f633dae3e7072c85fc10","dtLastResponse":"2025-03-31 09:56:08:433","params":{"app":{"timestamp":"1743386163171","sig":"640ba962a2c4534531d1108d895466622d2d5fce62187f7cfbb2818b006d118a","applicationId":"1722417192000064","userId":"0","alg":"sha256"},"request":{"coreType":"en.pred.score","attachAudioUrl":1,"tokenId":"","refText":"One day, my mother bought two little rabbits for me. They have two little ears, red eyes, with white and fat body. I am very happy. From that on, the two little rabbits became my good friends.","rank":100,"res":null,"result":{"details":{"word":1}}},"audio":{"sampleBytes":2,"channel":1,"sampleRate":16000,"audioType":"mp3"}},"eof":1,"applicationId":"1722417192000064","refText":"One day, my mother bought two little rabbits for me. They have two little ears, red eyes, with white and fat body. I am very happy. From that on, the two little rabbits became my good friends."}}`);
const dataMore2 = ref([]);
const weiduData = ref([]);
const qitaData = ([]);
const audioUrl = ref('');
const audioEl = ref(null);
const newScore = ref('');
const allText = ref('');
const louduGroup = ref('');//漏读
const duoduGroup = ref('');//多度
const genggaiDataGroup = ref([]);

onMounted(() => {
  getData();
})

const getScoreAndTextColor = (score) => {
  if (score >= 101) return '#000000';
  if (score >= 81) return '#4CAF50';
  if (score >= 71) return '#589be0';
  if (score >= 51) return '#FFA500';
  if (score >= 0) return '#FF5252';
  return '#FF5252';
}
const getTextBgColor = (score) => {
  if (score >= 101) return 'transparent';
  if (score >= 81) return '#d8f0d8';
  if (score >= 71) return '#cae6fd';
  if (score >= 51) return '#ffe3cc';
  if (score >= 0) return '#fbddda';
  return '#fbddda';
}
const getData = () => {
  const parsedData = JSON.parse(dataMore.value);
  // console.log("parsedData", parsedData)
  const result = parsedData.finalResult.result
  // 数据
  const detailsArray = result.details;
  // 音频
  const audioUrl = parsedData.finalResult.audioUrl;

  // 总分
  newScore.value = result.overall;
  // 总文字
  allText.value = parsedData.finalResult.refText;
  // 总数据
  dataMore2.value = detailsArray;
  // console.log("this.dataMore2",parsedData);

  const weiduData1 = result.fluency.overall
  const weiduData2 = result.integrity
  const weiduData3 = result.accuracy

  const weiduDataAll = [
    {
      score: weiduData1,
      title: "流利度"
    },
    {
      score: weiduData2,
      title: "完整度"
    },
    {
      score: weiduData3,
      title: "准确度"
    },
  ]
  weiduData.value = weiduDataAll

  const louDu = result.fluency.overall

  dataMore2.value.forEach((i, lineIndex) => {
    i.words.forEach((a, wordIndex) => {
      // 多读
      if (a.stressscore == 1) {
        duoduGroup.value = duoduGroup.value + a.text + ' '
      }
      // 漏读
      if (a.score == 0) {
        louduGroup.value = louduGroup.value + a.text + ' '
      }
    })
  })

  const yusu = result.fluency.speed
  const tingdun = result.fluency.pause

  const qitaDataAll = [
    {
      title: "你的发音",
      // src: require('@/static/img/highLightMore/fayin.svg'),
      audioUrl: audioUrl,
    },
    {
      title: "多读",
      rightVal: duoduGroup.value
    },
    {
      title: "漏读",
      rightVal: louduGroup.value
    },
    {
      title: "停顿次数",
      rightVal: tingdun + '次'
    },
    {
      title: "语速",
      rightVal: yusu + '词/分钟'
    },
  ]
  qitaData.value = qitaDataAll


  const biaodianGroup = [];

  dataMore2.value.forEach((i, lineIndex) => {
    i.words.forEach((a, wordIndex) => {
      const cutText = allText.value.slice(a.beginindex, a.endindex + 1);
      biaodianGroup.push({
        "dur": a.dur,
        "endindex": a.endindex,
        "score": a.score,
        "end": a.end,
        "toneref": a.toneref,
        "stressscore": a.stressscore,
        "tonescore": a.tonescore,
        "text": cutText,
        "is_err": a.is_err,
        "stressref": a.stressref,
        "accent": a.accent,
        "start": a.start,
        "beginindex": a.beginindex
      })
      if (wordIndex === i.words.length - 1) {
        const biaodian = allText.value.slice(a.endindex + 1, a.endindex + 2);
        biaodianGroup.push({
          "score": 120,
          "text": biaodian,
        })
      }
    })
  })
  genggaiDataGroup.value = biaodianGroup
  // console.log('biaodianGroup', biaodianGroup)
}

const vueCode = ref(`
<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>题目相关</h2>
      </template>
      <p>英语听力得分结果展示</p>
      <div class="content">

        <div class="genggai">
          <div v-for="(d, wordIndex) in genggaiDataGroup" :key="wordIndex" class="genggai2">
            <div v-if="d.score <= 100" class="fontScore" :style="{ color: getScoreAndTextColor(d.score) }">
              {{ d.score }}
            </div>
            <div class="fontText"
              :style="{ color: getScoreAndTextColor(d.score), backgroundColor: getTextBgColor(d.score) }">
              {{ d.text }}
            </div>
          </div>
        </div>
      </div>
    </ZJMain>
  </div>
</template>

<script setup>

const dataMore = ref('{ "finalResult": { "code": { "time": "1743386168434", "len": 7709, "code": "a1de5ddaf90cfba22dd589241addf7c7590f19ee1765f462aec1510245b1f521" }, "recordId": "67e9f633dae3e7072c85fc10", "tokenId": "", "result": { "rank": 100, "res": "eng.pred.G4.D4.0.5", "integrity": 89, "forceout": 0, "pron": 78, "rhythm": 78, "textmode": 0, "systime": 2592, "oov_words": {}, "fluency": { "pause": 0, "overall": 98, "speed": 155 }, "info": { "snr": 20.6477, "trunc": 1, "clip": 0.00179228, "volume": 4321, "tipId": 0 }, "overall": 79, "pretime": 27, "timerate": 0.158619, "accuracy": 78, "details": [{ "words": [{ "dur": 360, "endindex": 2, "score": 82, "end": 660, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "one", "is_err": 0, "stressref": 0, "accent": 3, "start": 300, "beginindex": 0 }, { "dur": 540, "endindex": 6, "score": 100, "end": 1200, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "day", "is_err": 0, "stressref": 0, "accent": 3, "start": 660, "beginindex": 4 }], "dur": 900, "endindex": 6, "is_leak": 0, "text": "one day", "beginindex": 0, "end": 1200, "start": 300, "score": 94 }, { "words": [{ "dur": 280, "endindex": 10, "score": 100, "end": 1820, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "my", "is_err": 0, "stressref": 0, "accent": 3, "start": 1540, "beginindex": 9 }, { "dur": 0, "endindex": 17, "score": 0, "end": 0, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "mother", "is_err": 2, "stressref": 0, "accent": 0, "start": 0, "beginindex": 12 }, { "dur": 340, "endindex": 24, "score": 100, "end": 2160, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "bought", "is_err": 0, "stressref": 0, "accent": 2, "start": 1820, "beginindex": 19 }, { "dur": 360, "endindex": 28, "score": 96, "end": 2520, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "two", "is_err": 0, "stressref": 0, "accent": 3, "start": 2160, "beginindex": 26 }, { "dur": 460, "endindex": 35, "score": 94, "end": 2980, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "little", "is_err": 0, "stressref": 0, "accent": 3, "start": 2520, "beginindex": 30 }, { "dur": 520, "endindex": 43, "score": 100, "end": 3500, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "rabbits", "is_err": 0, "stressref": 0, "accent": 3, "start": 2980, "beginindex": 37 }, { "dur": 320, "endindex": 47, "score": 100, "end": 3820, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "for", "is_err": 0, "stressref": 0, "accent": 1, "start": 3500, "beginindex": 45 }, { "dur": 440, "endindex": 50, "score": 80, "end": 4260, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "me", "is_err": 0, "stressref": 0, "accent": 3, "start": 3820, "beginindex": 49 }], "dur": 2720, "endindex": 50, "is_leak": 0, "text": "my mother bought two little rabbits for me", "beginindex": 9, "end": 4260, "start": 1540, "score": 82 }, { "words": [{ "dur": 320, "endindex": 56, "score": 100, "end": 5320, "toneref": 0, "stressscore": 1, "tonescore": 0, "text": "they", "is_err": 0, "stressref": 0, "accent": 3, "start": 5000, "beginindex": 53 }, { "dur": 240, "endindex": 61, "score": 74, "end": 6440, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "have", "is_err": 1, "stressref": 0, "accent": 3, "start": 6200, "beginindex": 58 }, { "dur": 180, "endindex": 65, "score": 74, "end": 6200, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "two", "is_err": 0, "stressref": 0, "accent": 3, "start": 6020, "beginindex": 63 }, { "dur": 440, "endindex": 72, "score": 100, "end": 6020, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "little", "is_err": 0, "stressref": 0, "accent": 3, "start": 5580, "beginindex": 67 }, { "dur": 480, "endindex": 77, "score": 100, "end": 6920, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "ears", "is_err": 0, "stressref": 0, "accent": 0, "start": 6440, "beginindex": 74 }], "dur": 1920, "endindex": 77, "is_leak": 0, "text": "they have two little ears", "beginindex": 53, "end": 6920, "start": 5000, "score": 91 }, { "words": [{ "dur": 380, "endindex": 82, "score": 100, "end": 7380, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "red", "is_err": 0, "stressref": 0, "accent": 3, "start": 7000, "beginindex": 80 }, { "dur": 600, "endindex": 87, "score": 86, "end": 7980, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "eyes", "is_err": 0, "stressref": 0, "accent": 0, "start": 7380, "beginindex": 84 }], "dur": 980, "endindex": 87, "is_leak": 0, "text": "red eyes", "beginindex": 80, "end": 7980, "start": 7000, "score": 93 }, { "words": [{ "dur": 300, "endindex": 93, "score": 100, "end": 8400, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "with", "is_err": 0, "stressref": 0, "accent": 3, "start": 8100, "beginindex": 90 }, { "dur": 260, "endindex": 99, "score": 9, "end": 8660, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "white", "is_err": 0, "stressref": 0, "accent": 3, "start": 8400, "beginindex": 95 }, { "dur": 100, "endindex": 103, "score": 50, "end": 8760, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "and", "is_err": 0, "stressref": 0, "accent": 3, "start": 8660, "beginindex": 101 }, { "dur": 0, "endindex": 107, "score": 0, "end": 0, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "fat", "is_err": 2, "stressref": 0, "accent": 0, "start": 0, "beginindex": 105 }, { "dur": 640, "endindex": 112, "score": 100, "end": 9400, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "body", "is_err": 0, "stressref": 0, "accent": 0, "start": 8760, "beginindex": 109 }], "dur": 2060, "endindex": 112, "is_leak": 0, "text": "with white and fat body", "beginindex": 90, "end": 10160, "start": 8100, "score": 44 }, { "words": [{ "dur": 140, "endindex": 115, "score": 24, "end": 10560, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "i", "is_err": 0, "stressref": 0, "accent": 3, "start": 10420, "beginindex": 115 }, { "dur": 300, "endindex": 118, "score": 100, "end": 10860, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "am", "is_err": 0, "stressref": 0, "accent": 3, "start": 10560, "beginindex": 117 }, { "dur": 440, "endindex": 123, "score": 100, "end": 11300, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "very", "is_err": 0, "stressref": 0, "accent": 2, "start": 10860, "beginindex": 120 }, { "dur": 580, "endindex": 129, "score": 71, "end": 11880, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "happy", "is_err": 0, "stressref": 0, "accent": 1, "start": 11300, "beginindex": 125 }], "dur": 1460, "endindex": 129, "is_leak": 0, "text": "i am very happy", "beginindex": 115, "end": 11880, "start": 10420, "score": 85 }, { "words": [{ "dur": 320, "endindex": 135, "score": 86, "end": 12620, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "from", "is_err": 0, "stressref": 0, "accent": 1, "start": 12300, "beginindex": 132 }, { "dur": 300, "endindex": 140, "score": 6, "end": 12920, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "that", "is_err": 0, "stressref": 0, "accent": 3, "start": 12620, "beginindex": 137 }, { "dur": 340, "endindex": 143, "score": 68, "end": 13260, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "on", "is_err": 0, "stressref": 0, "accent": 2, "start": 12920, "beginindex": 142 }], "dur": 960, "endindex": 143, "is_leak": 0, "text": "from that on", "beginindex": 132, "end": 13260, "start": 12300, "score": 62 }, { "words": [{ "dur": 180, "endindex": 148, "score": 100, "end": 13840, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "the", "is_err": 0, "stressref": 0, "accent": 3, "start": 13660, "beginindex": 146 }, { "dur": 0, "endindex": 152, "score": 0, "end": 0, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "two", "is_err": 2, "stressref": 0, "accent": 0, "start": 0, "beginindex": 150 }, { "dur": 400, "endindex": 159, "score": 100, "end": 14240, "toneref": 0, "stressscore": 1, "tonescore": 0, "text": "little", "is_err": 0, "stressref": 0, "accent": 3, "start": 13840, "beginindex": 154 }, { "dur": 500, "endindex": 167, "score": 100, "end": 14740, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "rabbits", "is_err": 0, "stressref": 0, "accent": 3, "start": 14240, "beginindex": 161 }, { "dur": 460, "endindex": 174, "score": 68, "end": 15200, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "became", "is_err": 0, "stressref": 0, "accent": 3, "start": 14740, "beginindex": 169 }, { "dur": 160, "endindex": 177, "score": 100, "end": 15360, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "my", "is_err": 0, "stressref": 0, "accent": 3, "start": 15200, "beginindex": 176 }, { "dur": 0, "endindex": 182, "score": 0, "end": 0, "toneref": 0, "stressscore": 0, "tonescore": 0, "text": "good", "is_err": 2, "stressref": 0, "accent": 0, "start": 0, "beginindex": 179 }, { "dur": 800, "endindex": 190, "score": 100, "end": 16160, "toneref": 0, "stressscore": 1, "tonescore": 0, "text": "friends", "is_err": 0, "stressref": 0, "accent": 0, "start": 15360, "beginindex": 184 }], "dur": 2500, "endindex": 190, "is_leak": 0, "text": "the two little rabbits became my good friends", "beginindex": 146, "end": 16160, "start": 13660, "score": 69 }], "wavetime": 16343, "delaytime": 83 }, "gId": "67e9f6330148d0a6e42d5644", "audioUrl": "download.cloud.chivox.com:8002\/67e9f633dae3e7072c85fc10", "dtLastResponse": "2025-03-31 09:56:08:433", "params": { "app": { "timestamp": "1743386163171", "sig": "640ba962a2c4534531d1108d895466622d2d5fce62187f7cfbb2818b006d118a", "applicationId": "1722417192000064", "userId": "0", "alg": "sha256" }, "request": { "coreType": "en.pred.score", "attachAudioUrl": 1, "tokenId": "", "refText": "One day, my mother bought two little rabbits for me. They have two little ears, red eyes, with white and fat body. I am very happy. From that on, the two little rabbits became my good friends.", "rank": 100, "res": null, "result": { "details": { "word": 1 } } }, "audio": { "sampleBytes": 2, "channel": 1, "sampleRate": 16000, "audioType": "mp3" } }, "eof": 1, "applicationId": "1722417192000064", "refText": "One day, my mother bought two little rabbits for me. They have two little ears, red eyes, with white and fat body. I am very happy. From that on, the two little rabbits became my good friends." } }');
const dataMore2 = ref([]);
const weiduData = ref([]);
const qitaData = ([]);
const audioUrl = ref('');
const audioEl = ref(null);
const newScore = ref('');
const allText = ref('');
const louduGroup = ref('');//漏读
const duoduGroup = ref('');//多度
const genggaiDataGroup = ref([]);

onMounted(() => {
  getData();
})

const getScoreAndTextColor = (score) => {
  if (score >= 101) return '#000000';
  if (score >= 81) return '#4CAF50';
  if (score >= 71) return '#589be0';
  if (score >= 51) return '#FFA500';
  if (score >= 0) return '#FF5252';
  return '#FF5252';
}
const getTextBgColor = (score) => {
  if (score >= 101) return 'transparent';
  if (score >= 81) return '#d8f0d8';
  if (score >= 71) return '#cae6fd';
  if (score >= 51) return '#ffe3cc';
  if (score >= 0) return '#fbddda';
  return '#fbddda';
}
const getData = () => {
  const parsedData = JSON.parse(dataMore.value);
  // console.log("parsedData", parsedData)
  const result = parsedData.finalResult.result
  // 数据
  const detailsArray = result.details;
  // 音频
  const audioUrl = parsedData.finalResult.audioUrl;

  // 总分
  newScore.value = result.overall;
  // 总文字
  allText.value = parsedData.finalResult.refText;
  // 总数据
  dataMore2.value = detailsArray;
  // console.log("this.dataMore2",parsedData);

  const weiduData1 = result.fluency.overall
  const weiduData2 = result.integrity
  const weiduData3 = result.accuracy

  const weiduDataAll = [
    {
      score: weiduData1,
      title: "流利度"
    },
    {
      score: weiduData2,
      title: "完整度"
    },
    {
      score: weiduData3,
      title: "准确度"
    },
  ]
  weiduData.value = weiduDataAll

  const louDu = result.fluency.overall

  dataMore2.value.forEach((i, lineIndex) => {
    i.words.forEach((a, wordIndex) => {
      // 多读
      if (a.stressscore == 1) {
        duoduGroup.value = duoduGroup.value + a.text + ' '
      }
      // 漏读
      if (a.score == 0) {
        louduGroup.value = louduGroup.value + a.text + ' '
      }
    })
  })

  const yusu = result.fluency.speed
  const tingdun = result.fluency.pause

  const qitaDataAll = [
    {
      title: "你的发音",
      // src: require('@/static/img/highLightMore/fayin.svg'),
      audioUrl: audioUrl,
    },
    {
      title: "多读",
      rightVal: duoduGroup.value
    },
    {
      title: "漏读",
      rightVal: louduGroup.value
    },
    {
      title: "停顿次数",
      rightVal: tingdun + '次'
    },
    {
      title: "语速",
      rightVal: yusu + '词/分钟'
    },
  ]
  qitaData.value = qitaDataAll


  const biaodianGroup = [];

  dataMore2.value.forEach((i, lineIndex) => {
    i.words.forEach((a, wordIndex) => {
      const cutText = allText.value.slice(a.beginindex, a.endindex + 1);
      biaodianGroup.push({
        "dur": a.dur,
        "endindex": a.endindex,
        "score": a.score,
        "end": a.end,
        "toneref": a.toneref,
        "stressscore": a.stressscore,
        "tonescore": a.tonescore,
        "text": cutText,
        "is_err": a.is_err,
        "stressref": a.stressref,
        "accent": a.accent,
        "start": a.start,
        "beginindex": a.beginindex
      })
      if (wordIndex === i.words.length - 1) {
        const biaodian = allText.value.slice(a.endindex + 1, a.endindex + 2);
        biaodianGroup.push({
          "score": 120,
          "text": biaodian,
        })
      }
    })
  })
  genggaiDataGroup.value = biaodianGroup
  // console.log('biaodianGroup', biaodianGroup)
}
<script>

<style scoped>
.genggai {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.genggai2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  /* // background-color: green; */
}

/* .fontScore {
  color: green; 
} */
.fontText {
  /* background-color: salmon; */
  border-radius: 8px;
  padding: 0 10px;
}

.biaodian {
  padding: 0 10px 0 4px;
  background-color: firebrick;
  display: flex;
  align-items: flex-end;
}


.bottomBox {
  width: calc(100vw - 80px);
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.jieguoText {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* // background-image: url('/static/img/highLightMore/bg.svg'); */
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}

.tuxing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  /* // background-color:#FFA500; */
  padding: 40px;
  color: #FFFFFF;
  font-weight: 900;
}


.wenzi {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

image {
  height: 40px;
  width: 40px;
}

text {
  font-size: 28px;
}


.weidu {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.headerText span {
  background-color: #0181f9;
  border-radius: 20px 0 20px 0;
  padding: 10px 20px;
  font-size: 28px;
  color: #FFFFFF;
}

.weiduBox {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
}

.weiduBox2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 30px;
}

.weiduBox3 {
  padding: 40px 80px;
  border-radius: 10px;
  font-weight: 1000;
}

.weiduBox3Text {
  font-size: 28px;
}


.qita {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.headerText span {
  background-color: #0181f9;
  border-radius: 20px 0 20px 0;
  padding: 10px 20px;
  font-size: 28px;
  color: #FFFFFF;
}

.qitaMain {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 0 20px;
}

/* // background-color: #FFA500; */
.qitaLi {
  display: flex;
  justify-content: space-between;
}

.text1 {
  min-width: 160px;
}

.qitaLi span {
  font-size: 28px;
  word-break: break-all;
  /* // background-color: #0181f9; */
}

img {
  height: 34px;
  width: 34px;
}

.content {
  padding: 20px;
  display: flex;
  background: #f0f5f9;
  border-radius: 10px;
}

.cepingText {
  display: flex;
  justify-content: start;
  width: calc(100% - 40px);
  /* background-color: red; */
  font-size: 20px;
  padding: 10px;
}
</style>
`)
</script>

<style scoped>
.cepingText {
  display: flex;
  justify-content: start;
  width: calc(100% - 40px);
  font-size: 20px;
  padding: 10px;
}

.genggai {
  width: calc(100% - 40px);
  background-color: var(--ZJ-main-hover);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.genggai2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  /* // background-color: green; */
}

/* .fontScore {
  color: green; 
} */
.fontText {
  /* background-color: salmon; */
  border-radius: 8px;
  padding: 2px 10px;
}

.biaodian {
  padding: 0 10px 0 4px;
  background-color: firebrick;
  display: flex;
  align-items: flex-end;
}


.bottomBox {
  width: calc(100vw - 80px);
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.jieguoText {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* // background-image: url('/static/img/highLightMore/bg.svg'); */
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}

.tuxing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  /* // background-color:#FFA500; */
  padding: 40px;
  color: #FFFFFF;
  font-weight: 900;
}


.wenzi {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

image {
  height: 40px;
  width: 40px;
}

text {
  font-size: 28px;
}


.weidu {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.headerText span {
  background-color: #0181f9;
  border-radius: 20px 0 20px 0;
  padding: 10px 20px;
  font-size: 28px;
  color: #FFFFFF;
}

.weiduBox {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
}

.weiduBox2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 30px;
}

.weiduBox3 {
  padding: 40px 80px;
  border-radius: 10px;
  font-weight: 1000;
}

.weiduBox3Text {
  font-size: 28px;
}


.qita {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.headerText span {
  background-color: #0181f9;
  border-radius: 20px 0 20px 0;
  padding: 10px 20px;
  font-size: 28px;
  color: #FFFFFF;
}

.qitaMain {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 0 20px;
}

/* // background-color: #FFA500; */
.qitaLi {
  display: flex;
  justify-content: space-between;
}

.text1 {
  min-width: 160px;
}

.qitaLi span {
  font-size: 28px;
  word-break: break-all;
  /* // background-color: #0181f9; */
}

img {
  height: 34px;
  width: 34px;
}
</style>