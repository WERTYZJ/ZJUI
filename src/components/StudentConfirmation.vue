<template>
  <div>
    <Transition name="c">
      <div class="main">

      <div class="close-img" @click="close()">
        <img src="../assets/login-p6.svg" alt="">
      </div>

      <div class="AppealLessons-center">
        <div class="title">Student Confirmation</div> 
        <div class="AppealLessons-main">
          <div class="AppealLessons-main-title">Request Refund</div>
          <div class="AppealLessons-main-list">
            <!-- <input class="Request" type="text" placeholder="$35.00"> -->
            <div class="Request"><a>{{ request }}</a></div>
          </div>
          <div class="AppealLessons-main-title">Additional comments</div>
          <div class="AppealLessons-main-list">
            <textarea v-model="TeacherResponseMessage" placeholder=""></textarea>
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

export default{
  props: {
    timetableId:{
      type:[String, Number],  
      default: null  
    },
    courseId:{
      type:[String, Number],  
      default: null  
    }
  }, 
  data(){
    return{
      // 扩大图片
      showMagnifyImg:false,
      MagnifyImg2:'',
      // 图片列表
      photoId:'',
      imgList:[
        // {
        //   id:0,
        //   name:'user-3.png',
        //   src:require('../assets/tutor-video.png')
        // },
        // {
        //   id:1,
        //   name:'user-3.png',
        //   src:require('../assets/tutor-video2.png')
        // },
      ], 
      //老师回复信息
      request:'',
      TeacherResponseMessage:'',
      complaintVoucher:'',
    };
  },
  watch:{
    timetableId(){
      this.getTutorComplaint();
    },
  },
  methods:{
    // 获取导师回复申诉信息
    getTutorComplaint(){
      this.$store.dispatch('startLoading');
      this.$http({method:'post',url:'/student_lesson/getTutorComplaint',
          data:{timetableId:this.timetableId,},
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${this.$store.getters.getUserData.token}`
          },
      })
      .then(res => {
        console.log(res.data)
        if(res.data.code == 0 || res.data.code == 200) {
          const a = res.data.data;
          this.request = `$ ${a.amount}`;
          this.TeacherResponseMessage = a.content;
          this.complaintVoucher = a.complaintVoucher;
          const imgUrl = a.complaintVoucher.split(',');
          imgUrl.array.forEach((i,index) => {
            this.imgList.push({
                id:index,
                name:i,
                src:i
              })
          });
        }else if(res.data.code == 1 || res.data.code == 500) {
          this.$message({
            type: 'error',
            message: 'error',
          })
        }
      })
      .catch(err => {
        console.log('操作失败' + err);
      })
      .finally(() => {  
        this.$store.dispatch('stopLoading');  
      });
    },
    // 学生确认申诉信息
    postStudentConfirmation(){
      this.$store.dispatch('startLoading');
      this.$http({method:'post',url:'/student_lesson/studentComplaint',
          data:{
            courseId:this.courseId,
            timetableId:this.timetableId,
            content:this.TeacherResponseMessage,
            amount:this.request,
            complaintVoucher:this.complaintVoucher,
          },
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${this.$store.getters.getUserData.token}`
          },
      })
      .then(res => {
        console.log(res.data)
        if(res.data.code == 0 || res.data.code == 200) {
          this.close2();
        }else if(res.data.code == 1 || res.data.code == 500) {
          this.$message({
            type: 'error',
            message: 'error',
          })
        }
      })
      .catch(err => {
        console.log('操作失败' + err);
      })
      .finally(() => {  
        this.$store.dispatch('stopLoading');  
      });
    },
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
       this.postStudentConfirmation();
    },
    close2(){
      this.$emit('closeStudentConfirmation2');
    },
    //关闭当前修改框组件
    close(){
      this.$emit('closeStudentConfirmation');
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
padding:30px 40px;
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
width: 220px;
height: 40px;
border-radius: 134px;
background: #7050E8;
border: none;
}
.btn-res:hover{
  background-color:#B8A8F4;
}
.btn-res a{
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: bold;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #FFFFFF;
}



.AppealLessons-main{
  /* background-color: #e0b0e8; */
  width:400px;
  margin-top: 30px;
}
.AppealLessons-main-title{
  /* background-color: aqua; */
font-family: AlibabaPuHuiTi;
font-size: 14px;
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
  height: 100px;
  border-radius:10px;
  padding:10px;
  resize:none;
  border: none;
  background:#F2F2F2;
font-family: AlibabaPuHuiTi;
font-size: 14px;
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
font-size:14px;
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
font-size: 26px;
font-weight: 1000;
line-height: 100%;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #000000;
text-align: center;
}
.Request{
height: 40px;
border-radius: 10px;
background: #F2F2F2;
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: normal;
letter-spacing: 0em;
color: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
}
.Request a{
  margin-left: 10px;
font-family: AlibabaPuHuiTi;
font-size: 14px;
font-weight: normal;
line-height: normal;
color: rgba(0, 0, 0, 0.5);
}
</style>