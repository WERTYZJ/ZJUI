<template>
  <div class="main-top">
    <div class="main-top-left" @click="UploadAvatar()">
      <div class="before">
        <img :src="BeforeUploadImg || require('@/assets/ZJUI/ZJCutAvatar/before.png')" @error="AvatarError">
      </div>
      <div class="after">
        <img :src="avatarUrl" v-if="avatarUrl" class="img-send">
      </div>
      <img src="" alt="">
      <div class="revise-img"><img :src="require('@/assets/ZJUI/ZJCutAvatar/before2.png')" alt=""></div>
    </div>
  </div>

  <ZJDialog v-show="showCutAvatar" title="请裁剪您的头像" @closeZJDialog="CloseCutAvatar2()">
    <div class="cut-main-center">
      <div class="img-container">
        <img :src="avatarUrl" ref="image" alt="" />
      </div>
      <div class="cut-main-center-right">
        <!-- <div class="before"></div> -->
        <!-- <a>After cropping</a> -->
        <a>裁剪预览</a>
        <div class="afterCropper">
          <img src="@/assets/ZJUI/ZJCutAvatar/img.png" style="position: absolute; z-index:0;">
          <img :src="CutImg" style="z-index:1;" />
        </div>
      </div>

    </div>
    <template #footer>
      <ZJButton type="info2" text="确定裁剪" @click="sureSava"></ZJButton>
      <ZJButton type="default" text="确定上传" @click="CloseCutAvatar()" style="margin-right: 40px;"></ZJButton>
    </template>
  </ZJDialog>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  // props:['AvatarUrl'],
  data() {
    return {
      myCropper: null,
      CutImg: '',
      cutAvatar: '',
      // 展示裁剪弹窗
      showCutAvatar: false,
      avatarUrl: '',
    }
  },
  mounted() {
    this.initCropper();
  },
  methods: {
    initCropper() {
      // 销毁旧实例
      if (this.myCropper) {
        this.myCropper.destroy();
      }

      // 确保DOM元素存在
      if (this.$refs.image) {
        this.myCropper = new Cropper(this.$refs.image, {
          viewMode: 1,
          dragMode: 'none',  // 修正拼写错误 dragNode -> dragMode
          initialAspectRatio: 1,
          aspectRatio: 1,
          background: false,
          autoCropArea: 0.6,
          zoomOnWheel: false
        });
      }
    },
    sureSava() {
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
      const blob = new Blob([byteArray], { type: 'image/jpeg' }); // 创建 Blob 对象
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg', lastModified: Date.now() }); // 创建 File 对象

      this.cutAvatar = file; // 将 File 对象赋值给 CutImg
      // console.log(file); // 输出 File 对象
      this.avatarUrl = this.CutImg;
    },
    CloseCutAvatar() {
      if (this.CutImg === '') {
        this.$ZJMessage({
          type: 'warning',
          message: '上传前请先进行裁剪',
        })
      } else {
        this.$ZJMessage({
          type: 'success',
          message: '上传成功',
        })
        this.CloseCutAvatar2();
        this.$emit('avatarUrl', this.CutImg)
      }
    },
    CloseCutAvatar2() {
      this.showCutAvatar = false;
    },
    //修改头像
    async UploadAvatar() {
      const fileImage = document.createElement('input')
      fileImage.type = 'file'
      fileImage.accept = 'image/*'
      fileImage.style.display = 'none'
      document.body.appendChild(fileImage);
      fileImage.click();
      fileImage.addEventListener('change', () => {
        const file = fileImage.files[0];
        // 判断文件大小是否超过5MB
        // if (file && file.size > 2 * 1024 * 1024) { 
        //     this.$message({
        //       showClose: true,
        //       type: 'warning',
        //       message: 'The size of the image is more than 2M.',
        //     })
        //     return;
        // }else if(file && file.size <  250 * 250){
        //   this.$message({
        //       showClose: true,
        //       type: 'warning',
        //       message: 'The size of the image is At least 250*250 pixels.',
        //     })
        //     return;
        // }
        const reader = new FileReader();

        reader.onload = () => {
          this.avatarUrl = reader.result;
          // 打开裁剪  BaoCuo
          this.showCutAvatar = true;
          // 等待DOM更新后重新初始化
          this.$nextTick(() => {
            this.initCropper();
          });
        }
        reader.readAsDataURL(file);
      })

    }
  }
}

</script>

<style scoped>
.cut-main-center-right a {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}

.cut-main-center-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  /* background-color: aquamarine; */
}

.cut-main-center {
  display: flex;
}

.before {
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin-bottom: 80px;
}

.img-container {
  height: 300px;
  width: 400px;
  /* overflow: hidden; */
}

.afterCropper {
  width: 120px;
  height: 120px;
  /* border: 1px solid salmon;  */
  display: flex;
  align-items: center;
  justify-content: center;
}

.afterCropper img {
  width: 116px;
  height: 116px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid var(--ZJ-default-main);
}


.revise-img {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  width: 32px;
  height: 32px;
  background: #F8BE00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.img-send {
  height: 120px;
  width: 120px;
  position: absolute;
  border-radius: 50%;
}

.after {
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.after img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.before {
  z-index: 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.before img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.main-top-left {
  position: relative;
  width: 100px;
  height: 100px;
  /* border-radius: 50%; */
  cursor: pointer;
  /* background-color: #4400ff; */
}

.main-top {
  /* max-width:1240px; */
  /* height: 120px; */
  /* background-color: #a66510; */
  display: flex;
}
</style>