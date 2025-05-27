<template>
  <div>
    <Transition name="a">
      <div class="verify-main">
      <div class="close-img" @click="closeVerify()">
        <img src="../assets/login-p6.png" alt="">
      </div>

      <div class="verify-center">
        <div class="title">Secuirity Validation</div>
        <div class="verify-title">Validation code sent 
          <a v-if="verifyType=='email'" style="color: #7050E8;"> {{ Email }}</a>
          <a v-if="verifyType=='tel'" style="color: #7050E8;">{{ Code }} {{ Tel }}</a>
        </div>
        <div class="verify-code">
          <input  autofocus
            v-for="(code, index) in pwd2InputCode"
            :key="index"
            v-model="pwd2InputCode[index]"
            @input="handleInput(index, $event)"
            @keydown="handleKeyDown(index, $event)"
            maxlength="1"
            class="verify-code-input"
          />
        </div>
        <div class="verify-code-tips">
          <div class="verify-code-tips2" @click="ReSendEmailOrSmsVerification" ref="count1">
            <a>Resend code</a>
          </div>
          <div class="count1" ref="count2"><a>{{ ResendCount }}</a></div>
        </div>

        <div class="verify-tips" ref="verifyTips">
          <img src="../assets/login-p8.png" alt="">
          <a class="pwd1-tips-err">Please enter the correct verification code</a>
        </div>
        
        <button class="verify-btn" @click="Verify()"><a>Verify</a></button>
        
      </div>
     
      </div>
    </Transition>
  </div>
</template>

<script>

export default{
  props:{
    verifyType:{
      type: [String, Number],  
      default: null  
    },
    Email:{
      type: [String, Number],  
      default: null  
    },
    Tel:{
      type: [String, Number],  
      default: null  
    },
    Code:{
      type: [String, Number],  
      default: null  
    }
  },
  data(){
      return{
        // 倒计时
        countdown: 60,
        interval: null,
        ResendCount: '',
        email: '',
        tipsEmail: false,
        pwd2InputCode: ['', '', '', '', '', ''],
        codeGroup:'',
        emailVerifyData:'',
      };
  },
  mounted() {
    if(this.verifyType=='email'){
      this.sendEmailVerification();
    }else if(this.verifyType=='tel'){
      this.sendSmsVerification();
    }
  },
  methods:{
    // 验证并更改email
    postEmailVerify(){
      this.$store.dispatch('startLoading');
      this.$http({method:'patch',url:'/user/email',
          data:{ 
            email:this.Email,
            captcha:this.codeGroup,
          },
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.$store.getters.getUserData.token}`
          },
        })
      .then(res => {
        // console.log(res.data)
        if(res.data.code == 0) {
          this.$message({
            type: 'success',
            message: 'Verification successful',
          })
          this.closeVerify();
          this.pwd2InputCode = ['', '', '', '', '', ''];
          this.$emit('emailVerifySuccess');
        }else if(res.data.code == 1) {
          this.$message({
            type: 'error',
            message: 'Validation failed',
          })
        }else if(res.data.code == 500) {
          this.$message({
            type: 'warning',
            message: 'The new email address cannot be the same as the original email address',
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
    // 验证并更改sms
    postSmsVerify(){
      this.$store.dispatch('startLoading');
      this.$http({method:'patch',url:'/user/phone',
          data:{ 
            phone:this.Tel,
            captcha:this.codeGroup,
          },
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.$store.getters.getUserData.token}`
          },
        })
      .then(res => {
        // console.log(res.data)
        if(res.data.code == 0) {
          this.$message({
            type: 'success',
            message: 'Verification successful',
          })
          this.closeVerify();
          this.pwd2InputCode = ['', '', '', '', '', ''];
          this.$emit('telVerifySuccess');
        }else if(res.data.code == 1) {
          this.$message({
            type: 'error',
            message: 'Validation failed',
          })
        }else if(res.data.code == 500) {
          this.$message({
            type: 'warning',
            message: 'The new email address cannot be the same as the original email address',
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
    // 发送email验证码
    sendEmailVerification(){
      this.$store.dispatch('startLoading');

      this.$http({method:'get',url:'/captcha/mail',
                params:{email: this.Email,},
              })
        .then(res => {
          // console.log(res.data)
          if(res.data.code == 0) {
            this.$message({
              type: 'success',
              message: 'The verification code is sent successfully',
            })
          }else if(res.data.code == 1) {
            this.$message({
              type: 'error',
              message: 'The verification code failed to be sent',
            })
          }
        })
        .catch(err => {
          console.log('操作失败' + err);
        })
        .finally(() => {  
          this.$store.dispatch('stopLoading');  
          this.startCountdown();
        });
    },
    // 发送sms验证码
    sendSmsVerification(){
      this.$store.dispatch('startLoading');

      this.$http({method:'get',url:'/captcha/sms',
                params:{
                  // projectCode:this.Code,
                  phone: this.Tel,
                },
              })
        .then(res => {
          console.log(res.data)
          if(res.data.code == 0) {
            this.$message({
              type: 'success',
              message: 'The verification code is sent successfully',
            })
          }else if(res.data.code == 1) {
            this.$message({
              type: 'error',
              message: 'The verification code failed to be sent',
            })
          }
        })
        .catch(err => {
          console.log('操作失败' + err);
        })
        .finally(() => {  
          this.$store.dispatch('stopLoading');  
          this.startCountdown();
        });
    },
    // 超时重新发送验证码
    ReSendEmailOrSmsVerification(){
      if(this.verifyType=='email'){
        this.sendEmailVerification();
      }else if(this.verifyType=='tel'){
        this.sendSmsVerification();
      }
    },

    // 开始计时
    startCountdown(){
      this.countdown = 60; // 重置倒计时
      this.ResendCount = this.countdown.toString();
      this.$refs.count1.style.display = 'none';
      this.$refs.count2.style = 'height: 25px;background: #7050E8;width:40px;border-radius: 5px;color: #FFFFFF;display: flex;align-items: center;justify-content: center;font-size: 16px;'
      if (this.interval) {
        clearInterval(this.interval); // 清除之前的倒计时
      }
      this.interval = setInterval(() => {
        this.countdown--;
        this.ResendCount = this.countdown.toString();
        if (this.countdown <= 0) {
          clearInterval(this.interval);
          // 解决报错
          if (this.$refs.count1) {
            this.$refs.count1.style = 'verify-code-tips2';
          if (this.$refs.count2) {
            this.$refs.count2.style.display = 'none';
          }
          }
        }
      }, 1000);
    },
    // 组件销毁前清除计时器
    beforeDestroy() {
      if(this.interval){
        clearInterval(this.interval);
      }
    },
    // 判断输入
    handleInput(index, event) {
      const value = event.target.value;
      this.pwd2InputCode[index] = value;
      // 判断是否输入完成
      if (this.pwd2InputCode.join('').length === 6) {
        this.$emit('emailCode', this.pwd2InputCode.join(''));
        const a = this.$refs.verifyTips.querySelector('a');
        const img = this.$refs.verifyTips.querySelector('img');
        img.src = require('../assets/login-p9.png')
        a.style.color = '#000000';
        a.textContent = 'The verification code is correct';
      }
      // 自动跳到下一个输入框
      if (value && index < this.pwd2InputCode.length - 1) {
        const nextInput = event.target.nextElementSibling;
        if (nextInput) {
          nextTick(() => {
            nextInput.focus();
          });
        }
      }
    },
    // 处理删除操作
    handleKeyDown(index, event) {
      if (event.key === 'Backspace' && !event.target.value && index > 0) {
        const prevInput = event.target.previousElementSibling;
        if (prevInput) {
          nextTick(() => {
            prevInput.focus();
          });
        }
      }
    },
    // 验证验证码是否正确
    Verify(){
      if(!this.pwd2InputCode[5]==''){
        
        var code1 =  this.pwd2InputCode[0];
        var code2 =  this.pwd2InputCode[1];
        var code3 =  this.pwd2InputCode[2];
        var code4 =  this.pwd2InputCode[3];
        var code5 =  this.pwd2InputCode[4];
        var code6 =  this.pwd2InputCode[5];
        this.codeGroup = code1+code2+code3+code4+code5+code6;
        
        if(this.verifyType=='email'){
          this.postEmailVerify();
        }

      }else{
        const a = this.$refs.verifyTips.querySelector('a');
        const img = this.$refs.verifyTips.querySelector('img');
        a.textContent = 'The verification code is incomplete';
        a.style.color = '#C82323';
        img.src = require('../assets/login-p8.png');
      }
    },
    //关闭当前修改框组件
    closeVerify(){
        this.$emit('closeVerify',false);
    },
  }
}
</script>

<style scoped>
button{
  border: none;
}
.verify-main{
  position: relative;
  width:420px;
  height: 400px;
  border-radius: 20px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verify-center{
  width: 400px;
  height: 350px;
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: pwd 0.5s ease-in-out;
}
.title{
  /* width: 268px; */
  font-family: DIN Black;
  font-size: 26px;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #000000;
  text-align: center;
}
.verify-title{
  margin: 30px 0;
  width: 465px;
  height: 47px;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: #000000;
}
input::placeholder{
  position: absolute;
  top: 12px;
  font-family: AlibabaPuHuiTi;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: rgba(0, 0, 0, 0.5);
}
.verify-code {
  display: flex;
}
.verify-code-input:last-child{
  margin-right: 0px;
}
.verify-code-input{
  width: 40px;
  height: 48px;
  margin-right: 20px;
  font-size: 28px;
  text-indent: 13px;
  border: 1px solid #BEBEBE;
  border-radius: 5px;
}
.verify-code-input:focus {
  outline: none;
  border-color: #7050E8;
  box-shadow: 0 0 5px #7050E8;
}
.count1{
  display: none;
}
.verify-tips img{
  width: 12px;
  height: 12px;
}
.verify-tips{
  margin-top: 235px;
  position: absolute;
  height: 16px;
  display: flex;
  align-items: center;
  /* background-color: #9B89E4; */
}
.verify-code-tips2{
  height: 30px;
}
.verify-code-tips{
  display: flex;
  justify-content: end;
  margin-top: 10px;
  /* background-color: #9B89E4; */
  width:350px;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: #7050E8;
}
.verify-btn{
  margin: 60px 0 0px 0;
  width: 300px;
  height: 40px;
  border-radius: 134px;
  background: #7050E8;
}
.verify-btn a{
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: #FFFFFF;
}
.verify-btn:hover{
  background-color: #9B89E4;
}


/* 验证提示 */
.pwd1-tips-success{
  height: 16px;
  font-family: AlibabaPuHuiTi;
  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: #000000;
  margin-left: 5px;
}
.pwd1-tips-err{
  height: 16px;
  font-family: AlibabaPuHuiTi;
  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  color: #C82323;
  margin-left: 5px;
}
.pwd1-tips img,.verify-tips img{
  width: 12px;
  height: 12px;
}
.pwd1-tips{
  margin-top: 220px;
  position: absolute;
  height: 16px;
  display: flex;
  align-items: center;
}


/* 关闭 */
.close-img:hover{
  background-color: rgb(222, 222, 222);
}
.close-img{
  position: absolute;
  top: 15px;
  right:15px;
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius:6px;
}

@keyframes pwd{
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>