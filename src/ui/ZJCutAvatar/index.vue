<template>
  <div>
  <div class="cut-main">
    <div class="cut-main-top">
      <a>Please crop your profile picture</a>
      <div class="right-close"  @click="CloseCutAvatar2()">
          <img src="../assets/login-p6.png">
      </div>
    </div>
    <div class="cut-main-center">
      <div class="img-container">
      <img :src="bImage" ref="image" alt="" />
      </div>
      <div class="cut-main-center-right">
        <!-- <div class="before"></div> -->
         <a>After cropping</a>
         <div class="afterCropper">
          <img src="../assets/tutor.img2.png" style="position: absolute; z-index:0;">
          <img :src="CutImg" style="z-index:1;" />
        </div>
      </div>
      
    </div>
    <div class="cut-main-bottom">
      <button class="bottom-left" @click="sureSava"><a>Determine the crop</a></button>
      <button class="bottom-right" @click="CloseCutAvatar()"><a>Confirm the upload</a></button>
    </div>
  </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default{
  props:['AvatarUrl'],
	data(){
		return{
      bImage:this.AvatarUrl,
      myCropper: null,
      CutImg:'',
      cutAvatar:''
		}
	},
	created(){
		this.$nextTick(()=>{
			this.init();
		})
	},
	methods:{
		init(){
			this.myCropper = new Cropper(this.$refs.image,{
				viewMode:1,
				dragNode:'none',
				initialAspectRatio:1,
				aspectRatio:1,
				// preview:'.before',
				background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
			})
		},
		sureSava(){
			this.CutImg = this.myCropper.getCroppedCanvas({
        imageSmoothingQuality: 'high'
      }).toDataURL('image/jpeg'); // 确保使用正确的 MIME 类型

      // 将 Base64 转换为 File 对象
      const base64Data = this.CutImg.split(',')[1]; // 提取 Base64 数据部分
      const byteCharacters = atob(base64Data); // 解码 Base64
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray],{ type: 'image/jpeg' }); // 创建 Blob 对象
      const file = new File([blob], 'avatar.jpg', {type:'image/jpeg',lastModified: Date.now() }); // 创建 File 对象

      this.cutAvatar = file; // 将 File 对象赋值给 CutImg
      // console.log(file); // 输出 File 对象
		},
    CloseCutAvatar(){
      if(this.CutImg===''){
        this.$message({
              showClose: true,
              type: 'warning',
              message: 'Please crop before uploading.',
            }) 
      }else{
        this.$store.dispatch('startLoading');
        const token = this.$store.getters.getUserData.token;

        const formData = new FormData();
        formData.append('avatarFile', this.cutAvatar);

        this.$http({method:'post',url:'/user/avatar',
                data:formData,
                headers: {
                  Authorization: `Bearer ${token}`,
                 'Content-Type':'multipart/form-data'
                },
              })
        .then(res => {
          console.log(res.data)
          if(res.data.code == 0) {
            this.$message({
              type: 'success',
              message: 'The avatar was updated successfully',
            })

            var userInfo = this.$store.getters.getUserData;
            let userData = {
              ...userInfo,
              avatar:res.data.data.avatar,
            };
            this.$store.commit('SET_USER_DATA',userData);

            this.$emit('closeCutAvatar',this.CutImg)
          }else if(res.data.code == 1) {
            this.$message({
              type: 'error',
              message: 'Avatar update failed',
              })
          }
        })
        .catch(err => {
          console.log('操作失败' + err);
        })
        .finally(() => {  
          this.$store.dispatch('stopLoading');  
        });
      }
    },
    CloseCutAvatar2(){
      this.$emit('closeCutAvatar')
    }
	}
}

</script>

<style scoped>
.bottom-right:hover{
  background-color:#5b33ea;
  color: #000000;
}
.bottom-left:hover{
  background-color: rgb(147, 121, 241);
  color: #000000;
}
.bottom-left,.bottom-right{
font-family: AlibabaPuHuiTi;
font-size: 16px;
font-weight: bold;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #FFFFFF;
}
.bottom-right{
width: 170px;
height: 40px;
border-radius: 134px;
background: #7050E8;
border: none;
cursor: pointer;
}
.bottom-left{
width: 170px;
height: 40px;
border-radius: 134px;
background: rgba(112, 80, 232, 0.5);
border: none;
margin-right: 25px;
cursor: pointer;
}
.cut-main-bottom{
  height:50px;
  margin-top:40px;
  display: flex;
  justify-content: flex-end;
  /* background-color: blueviolet; */
}
.cut-main-center-right a{
  margin-bottom: 10px;
font-family: AlibabaPuHuiTi;
font-size: 18px;
font-weight: bold;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #000000;
}
.cut-main-center-right{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  /* background-color: aquamarine; */
}
.cut-main-center{
  display: flex;
}
.right-close:hover{
  background-color: rgb(232, 232, 232);
}
.right-close{
position: absolute;
top: 0px;
right:0px;
width: 25px;
height: 25px;
padding: 5px;
z-index: 2;
border-radius:6px;
}
.cut-main-top  a{
font-family: DIN Black;
font-size: 26px;
font-weight: 900;
line-height: 100%;
text-align: center;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
color: #000000;
}
.cut-main-top{
  position: relative;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-top: 10px;
  width: 100%;
height: 60px;
/* background-color: antiquewhite; */
}
.cut-main{
  width: 680px;
  height: 480px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
}
.container{
  display: flex;
  animation: modal 0.5s ease-in-out;
}
.before{
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin-bottom: 80px;
  /* 这个属性可以得到想要的效果 */
}
.img-container{
  height:300px;
  width: 400px;
  /* overflow: hidden; */
}
.afterCropper{
  width: 120px;
  height:120px;
  /* border: 1px solid salmon;  */
  display: flex;
  align-items: center;
  justify-content: center;

}
.afterCropper img{
  width: 116px;
  height: 116px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid #7050E8;
}


</style>