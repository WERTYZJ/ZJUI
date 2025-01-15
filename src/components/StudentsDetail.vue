<template>
  <div>
    <Transition name="c">
      <div class="main">

      <div class="close-img" @click="close()">
        <img src="../assets/login-p6.svg" alt="">
      </div>

      <div class="center-Detail">
        <div class="title">Appeal information</div> 
        <div class="Details-main">
          <div class="Details-left">
            <div class="Details-left-top">
              <img src="../assets/tutor-students-p1.png" alt="">
              <div class="Details-left-top-r">
                <a>Ava adm</a>
                <p>Violin</p>
              </div>
            </div>
            <div class="Details-left-bottom" v-for="(item,index) in AppealInfo" :key="index">
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Lesson id</a></div>
                <div class="right-text"><a>{{item.LessonId}}</a></div>
              </div>
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Date</a></div>
                <div class="right-text"><a>{{item.Date}}</a></div>
              </div>
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Time</a></div>
                <div class="right-text"><a>{{item.Time}}</a></div>
              </div>
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Duration</a></div>
                <div class="right-text"><a>{{item.Duration}}</a></div>
              </div>
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Status</a></div>
                <div class="right-text"><a>{{item.Status}}</a></div>
              </div>
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Course Type</a></div>
                <div class="right-text"><a>{{item.CourseType}}</a></div>
              </div>
              <div class="Details-left-bottom-box">
                <div class="left-text"><a>Remaining Lessons</a></div>
                <div class="right-text"><a>{{item.RemainingLessons}}</a></div>
              </div>
            </div>
            <div class="Details-left-btn">
              <button :disabled="responseDisabled" class="btn-res" @click="openTeacherResponse()" ref="response"><a>Response</a></button>
            </div>
          </div>
          
          <div class="Details-right">
            <div class="Details-right-box" v-for="(item,index) in DetailsPro" :key="index">
              <div class="Details-right-box-left">
                <div :class="{'pro-box':true,'pro-box-2':this.current>=index}">
                  <img v-if="current >= index" src="../assets/StudentsDetail.svg" alt="">
                </div>
              </div>
              <div class="Details-right-box-right">
                <div class="Details-right-box-right-name">{{item.name}}</div>
                <div class="Details-right-box-right-title"><a>{{item.title}}</a></div>
              </div>
            </div>
            <div class="Details-right-hr"></div>
          </div>
          
        </div>
      </div>

      </div>
    </Transition>
    <TeacherResponse v-show="showTeacherResponse" class="modal2"
    @closeTeacherResponse="closeTeacherResponse()"
    @closeTeacherResponse2="closeTeacherResponse2()"></TeacherResponse>
  </div>
</template>

<script>
import TeacherResponse from './TeacherResponse.vue';
export default{
  components:{TeacherResponse},
    data(){
      return{ 
        responseDisabled:false,
        // showTeacherResponse打开老师回应窗口
        showTeacherResponse:false,
        // 右侧信息 进度条
        DetailsPro:[
          {
            name:'Appeal Submitted',
          },
          {
            name:"We're reviewing your request",
          },
          {
            name:'Awaiting Teacher Response',
            title:'The teacher has been notified and is preparing a response.'
          },
          {
            name:"Awaiting Student Confirmation",
            title:'he teacher has responded. Please review the response.'
          },
          {
            name:'Waiting for Platform Review',
            title:'Platform is reviewing the appeal details.'
          },
          {
            name:"Resolution in Progress",
            title:'Platform and both parties are working towards a resolution.'
          },
          {
            name:"Refund complete",
            title:'Your refund is completed. You can check your balance with your wallet or financial institution.'
          },
        ],
        // 第几步骤
        current:2,
        // 左侧信息
        AppealInfo:[
          {
            LessonId:'S1222212222221',
            Date:'06/05/2024',
            Time:'7:00pm - 8:00pm',
            Duration:'60 minutes',
            Status:'Scheduled',
            CourseType:'1-on-1 Lesson',
            RemainingLessons:'N/A',
          }
        ]
      };
    },
    methods:{
      //关闭当前修改框组件
      close(){
        this.$emit('closeStudentsDetail');
      },
      // 打开回应窗口
      openTeacherResponse(){
        this.showTeacherResponse = true;
      },
      // 关闭回应窗口
      closeTeacherResponse(){
        this.showTeacherResponse = false;
      },
       // 关闭回应窗口
       closeTeacherResponse2(){
        this.current=3
        this.showTeacherResponse = false;
        this.$refs.response.style='background: #868686;cursor: not-allowed;'
        this.responseDisabled=true;
      }
    }
}
</script>

<style scoped>
.Details-main{
  /* background-color: aquamarine; */
  margin-top: 50px;
  display: flex;
}
.Details-left{
  /* background-color: cadetblue; */
  width:360px;
}
.Details-left-top{
  /* background-color: #b9f8f8; */
  display: flex;
}
.Details-left-top img{
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
.Details-left-top-r{
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
}
.Details-left-top-r a{
  max-width: 250px;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: 600;
line-height: 100%;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #000000;
}
.Details-left-top-r p{
  max-width: 250px;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
  margin-top: 10px;
font-family: AlibabaPuHuiTi;
font-size: 16px;
font-weight: normal;
line-height: 150%;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: rgba(0, 0, 0, 0.5);
}


.Details-left-bottom{
  /* background-color: #e6c1c1; */
  margin-top: 40px;
}
.Details-left-bottom-box{
  /* background-color: brown; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.left-text{
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: normal;
line-height: 100%;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: rgba(0, 0, 0, 0.5);
}
.right-text{
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: normal;
line-height: 100%;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #000000;
}
.Details-left-btn{
  display: flex;
  justify-content: center;
  margin-top: 60px;
  /* background-color: #b9f8f8; */
}
.btn-res{
width: 289px;
height: 50px;
border-radius: 134px;
background: #7050E8;
border: none;
}
.btn-res:hover{
  background-color:#B8A8F4;
}
.btn-res a{
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: bold;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #FFFFFF;
}



.Details-right{
  margin-left: 20px;
  /* background-color: #e0b0e8; */
  width:460px;
  position: relative;
  z-index: 0;
}
.Details-right-hr{
  position: absolute;
  top: 0;
  left: 19.5px;
  width: 1px;
  height:425px;
  border-left: 1px dashed rgba(112, 80, 232, 0.5);
  z-index: 0;
}
.Details-right-box{
  /* background-color: cadetblue; */
  display: flex;
  margin-bottom: 27px;
}
.Details-right-box-left{
  /* background-color: chocolate; */
  height: 20px;
  width:40px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pro-box{
  height: 20px;
  width: 20px;
  background-color: #B8A8F4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.pro-box-2{
  height: 20px;
  width: 20px;
  background-color: #7050E8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.Details-right-box-right{
  /* background-color: #a8e996; */
  width: 410px;
}
.Details-right-box-right-name{
  /* background-color: #B8A8F4; */
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: normal;
line-height: 100%;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #000000;
}
.Details-right-box-right-title{
  /* background-color: #7050E8; */
  margin-top: 5px;
font-family: AlibabaPuHuiTi;
font-size: 16px;
font-weight: normal;
line-height: 100%;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0, 0.5);
}





.main{
position: relative;
width:840px;
/* 限制大小 */
/* max-height: 680px; */
padding: 40px;
margin: 0 20px;
border-radius: 20px;
background: #FFFFFF;
}
.center-Detail{
  /* width: 100%; */
  /* height: 100%; */
/* background-color: antiquewhite; */
display: flex;
flex-direction: column;
}
.close-img{
  position: absolute;
top: 15px;
right:15px;
width: 24px;
height: 24px;
padding: 5px;
border-radius:6px;
}
.close-img:hover{
  background-color: rgb(222, 222, 222);
}
.title{
  width: 100%;
  /* background-color: aquamarine; */
font-family: DIN Black;
font-size: 30px;
font-weight: 1000;
line-height: 100%;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #000000;
text-align: center;
}
</style>