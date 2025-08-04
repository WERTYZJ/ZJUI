<template>
  <div class="photo">
    <div class="photo-main">
      <transition-group name="photo">
      <div class="photo-box" v-for="(item,index) in imgList" :key="item.id"
      @mouseenter="showMask(index)" @mouseleave="hideMask(index)">
        <img class="photo-box-img" :src="item.src" alt="">
        <Transition name="mask">
        <div class="photo-mask" v-if="item.showMask">
          <div class="photo-mask-main">
            <ZJSvgIcons @click="MagnifyImg(item.src)" icon="search" style="cursor: pointer;"></ZJSvgIcons>
            <ZJSvgIcons @click="DeleteImg(index)" icon="delete" style="cursor: pointer;"></ZJSvgIcons>
          </div>
        </div>
        </Transition>
      </div>
      </transition-group>
      <ZJSvgIcons @click="addImg()" class="addImg" icon="upload" style="height:60px;width:60px;padding: 30px;"></ZJSvgIcons>
    </div>
  </div>
</template>

<script>

export default{
  data() {
    return {
      // photo
      MagnifyImg2:'',
      showMagnifyImg:false,
      photoId:'',
      imgList:[],
      };
  },
  mounted(){},  
  unmounted(){},
  methods: {
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
    // 删除
    DeleteImg(index) {
      if (index >= 0 && index < this.imgList.length) {
        this.imgList.splice(index, 1);
      }
    },
    // 增加
    addImg(){
      const fileImage = document.createElement('input')
      fileImage.type = 'file'
      fileImage.accept = 'image/*'
      fileImage.multiple = true; 
      fileImage.style.display = 'none'
      document.body.appendChild(fileImage);
      fileImage.click();
      fileImage.addEventListener('change', async() => {
        const files = fileImage.files;

        for(let i = 0; i < files.length; i++){
          const file = files[i];
          // if (file && file.size > 5 * 1024 * 1024) {
          //   this.$message({
          //     showClose: true,
          //     type: 'warning',
          //     message: 'The size of the image is more than 5M.',
          //   })
          //   return;
          // }
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target.result;
            const filename = file.name;
            this.imgList.push({id: this.photoId++, src: imageSrc, name: filename ,showMask:false});
            // console.log(imageSrc,filename,this.imgList)
          }
          reader.readAsDataURL(file);

        }

        // 创建一个数组来存储所有的上传 Promise
        // const uploadPromises = [];
        // for(let i=0 ; i<files.length ; i++){
        //   this.photoFile = files[i];
        //       // 将每个上传操作封装成 Promise
        //   const uploadPromise = new Promise((resolve, reject) => {
        //     this.postImgFile()
        //       .then(() => {
        //         resolve();
        //       })
        //       .catch((error) => {
        //         reject(error);
        //       });
        //   });
        //   uploadPromises.push(uploadPromise);
        // }

        // try {
        //   // 等待所有的上传操作完成
        //   await Promise.all(uploadPromises);
        //   this.$message({
        //     type: 'success',
        //     message: 'The file was uploaded successfully',
        //   });
        // } catch (error) {
        //   console.log('File upload failed: ' + error.message)
        //   this.$message({
        //     type: 'error',
        //     message: 'File upload failed',
        //   });
        // } finally {  
        //   document.body.removeChild(fileImage);  
        // }  

      });
    },
  },
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
font-size: 14px;
font-weight: bold;
line-height: normal;
letter-spacing: 0em;
font-variation-settings: "opsz" auto;
font-feature-settings: "kern" on;
color: #FFFFFF;
}
.bottom-right{
width: 130px;
height: 40px;
border-radius: 134px;
background: #7050E8;
border: none;
cursor: pointer;
}
.bottom-left{
width: 130px;
height: 40px;
border-radius: 134px;
background: rgba(112, 80, 232, 0.5);
border: none;
margin-right: 25px;
cursor: pointer;
}
.main-bottom{
  /* background-color: #4400ff; */
  height:50px;
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}
.MagnifyImg-close{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.MagnifyImg-img{
  width:100%;
  max-width:900px;
  height:100%;
  max-height:600px;
  border-radius: 10px;
}
.MagnifyImg{
  /* width: 400px;
  height:400px; */
  position: relative;
  padding: 25px;
  background-color: #FFFFFF;
  border-radius: 10px;
}
.addImg:hover{
  border: 1px dashed var(--ZJ-default-main);
  border-radius: 10px;
  color: var(--ZJ-default-main);
}
.addImg{
  width: 119px;
  height: 119px;
  border: 1px dashed rgb(222, 222, 222);
  border-radius: 10px;
  cursor: pointer;
}
.photo-mask-main-img{
  height: 30px;
  width: 30px;
  cursor: pointer;
}
.photo-mask-main{
  /* background-color: #BE1818; */
  display: flex;
  justify-content: space-around;
  height: 30px;
  width:90px;
  color: var(--ZJ-main);
}
.photo-mask{
  width:120px;
  height: 120px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo-box-img{
  width:119px;
  height: 119px;
  border-radius: 10px;
}
.photo-box{
  width:119px;
  height: 119px;
  margin: 0 10px 10px 0;
  border: var(--ZJ-main-border-light);
  border-radius: 10px;
  position: relative;
}
.photo-main img{
  margin:0 30px 10px 0;
  display: flex;
  flex-direction: column;
}
.photo-main{
  /* background-color: #a66510; */
  display: flex;
  flex-wrap: wrap;
}
.photo{
  /* background-color: #BE1818; */
  margin: 10px 0;
}

</style>