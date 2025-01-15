<template>
  <div>
    <Transition name="c">
      <div class="main">

      <div class="close-img" @click="close()">
        <img src="../assets/login-p6.svg" alt="">
      </div>

      <div class="AppealLessons-center">
        <div class="title">Teacher Response</div> 
        <div class="AppealLessons-main">
          <div class="AppealLessons-main-title">Reason</div>
          <div class="AppealLessons-main-list">
            <textarea v-model="TeacherResponseMessage" placeholder="I'm sorry that this class did not satisfy you. I will try my best to refund only 80%, can I?"></textarea>
          </div>
          <div class="AppealLessons-main-title">Refund</div>
          <div class="AppealLessons-main-list">
            <ZJDropDownSelect @input="RefundVal = $event" v-model="RefundVal" :options="Refund" label="$ 35.00"></ZJDropDownSelect>
          </div>
          <div class="AppealLessons-main-title">Evidence</div>
          <div class="AppealLessons-main-list">
            <div class="photo-main">
            <transition-group name="photo">
            <div class="photo-box" v-for="(item,index) in imgList" :key="item.id"
            @mouseenter="showMask(index)" @mouseleave="hideMask(index)">
              <img class="photo-box-img" :src="item.src" alt="">
              <Transition name="mask">
              <div class="photo-mask" v-if="item.showMask">
                <div class="photo-mask-main">
                  <img @click="MagnifyImg(item.src)" class="photo-mask-main-img" src="../assets/tutor-photo2.png" alt="">
                </div>
              </div>
              </Transition>
            </div>
            </transition-group>
            </div>
          </div>
        </div>
        <div class="AppealLessons-bottom-btn">
          <button class="btn-res" @click="Submit()"><a>Submit</a></button>
        </div>
      </div>


      </div>
    </Transition>

    <div v-if="showMagnifyImg" class="modal">
      <div class="MagnifyImg">
        <img @click="closeMagnifyImg()" class="MagnifyImg-close" src="../assets/login-p6.png" alt="">
        <img class="MagnifyImg-img" :src="MagnifyImg2" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import ZJDropDownSelect from '../ui/ZJ-dropDownSelect.vue';

export default{
  components:{ZJDropDownSelect},
    data(){
      return{
        // 扩大图片
        showMagnifyImg:false,
        MagnifyImg2:'',
        // 图片列表
        photoId:'',
        imgList:[
          {
            id:0,
            name:'user-3.png',
            src:require('../assets/tutor-video.png')
          },
          {
            id:1,
            name:'user-3.png',
            src:require('../assets/tutor-video2.png')
          },
        ], 
        //老师回复信息
        TeacherResponseMessage:'',
        Refund:['$ 35.00','$ 42.00'],
        RefundVal:'',
        // 左侧个人信息
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
        ],
      };
    },
    methods:{
      showMask(index) {
        if (this.imgList[index]) {
          this.imgList[index].showMask = true;
        }
      },
      hideMask(index) {
        if (this.imgList[index]) {
          this.imgList[index].showMask = false;
        }
      },
        // 扩大
      MagnifyImg(src) {
        this.showMagnifyImg = true;
        this.MagnifyImg2 = src;
        // console.log('Magnify image:', src);
      },
      // 提交按钮
      Submit(){
        if(this.TeacherResponseMessage==='' || this.RefundVal===''){
          this.$message({
            showClose: true,
            type: 'warning',
            message: 'Please fill out the necessary appeal.',
          })
        }else{      
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Wait for review.',
          });
          this.close2();
          this.TeacherResponseMessage='';
          this.RefundVal='';
        }
      },
      //关闭当前修改框组件
      close(){
        this.$emit('closeTeacherResponse');
      },
      close2(){
        this.$emit('closeTeacherResponse2');
      },
      closeMagnifyImg(){
        this.showMagnifyImg = false
      }
     
    }
}
</script>

<style scoped>
.MagnifyImg{
  min-width: 400px;
  min-height:300px;
  position: relative;
  padding: 25px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center
}
.MagnifyImg-img{
  width:100%;
  max-width:900px;
  height:100%;
  max-height:600px;
  border-radius: 10px;
}

.MagnifyImg-close{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.photo-main{
  /* background-color: #a66510; */
  display: flex;
  /* flex-wrap: wrap; */
  overflow: auto;
}
.photo-box{
  width:99px;
  height: 99px;
  margin: 0 10px 10px 0;
  border: 1px solid rgb(222, 222, 222);
  border-radius: 10px;
  position: relative;
}
.photo-box-img{
  width:99px;
  height: 99px;
  border-radius: 10px;
}
.photo-mask{
  width:100px;
  height: 100px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo-mask-main{
  /* background-color: #BE1818; */
  display: flex;
  justify-content: center;
  height: 30px;
  width:90px;
}
.photo-mask-main-img{
  height: 30px;
  width: 30px;
  cursor: pointer;
}
.mask-enter-active{
  opacity: 0;
  transition: all 0.3s ease;
}
.mask-enter-to{
  opacity: 1;
  transition: all 0.3s ease;
} 
.mask-leave-active{
  opacity: 1;
  transition: all 0.3s ease;
}
.mask-leave-to{
  opacity: 0;
  transition: all 0.3s ease;
}




.main{
  position: relative;
/* width:840px; */
/* 限制大小 */
/* max-height: 680px; */
padding: 40px;
margin:20px;
border-radius: 20px;
background: #FFFFFF;
display: flex;
box-shadow: 2px 5px 20px 2px rgba(0, 0, 0, 0.3);
}
.AppealLessons-center{
  width: 100%;
  height: 100%;
/* background-color: antiquewhite; */
}

.AppealLessons-bottom-btn{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:30px;
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



.AppealLessons-main{
  /* background-color: #e0b0e8; */
  width:400px;
  margin-top: 50px;
}
.AppealLessons-main-title{
  /* background-color: aqua; */
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: 600;
line-height: 100%;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #000000;
}
.AppealLessons-main-list{
  /* background-color: #ff0d0d; */
  margin: 15px 0 15px 0;
}
textarea{
  width: calc(100% - 20px);
  height: 120px;
  border-radius:10px;
  padding:10px;
  resize:none;
  border: none;
  background:#F2F2F2;
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: normal;
line-height: 190%;
text-align: justify; /* 浏览器可能不支持 */
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
}
textarea:focus{
 outline: 2px solid #7050E8;
}
textarea::placeholder{
font-family: AlibabaPuHuiTi;
font-size:16px;
font-weight: normal;
line-height: 190%;
letter-spacing: 0em;	
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: rgba(0, 0, 0, 0.5);
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