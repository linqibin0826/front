<template>
  <div class="sign">
    <div class="main">
      <div class="title">
        <a href="/login">登录</a>
        <span>·</span>
        <a href="/register">注册</a>
      </div>

      <div class="sign-up-container">
        <el-form ref="userForm" :model="registerDTO">

          <el-form-item class="input-prepend restyle" prop="nickname"
                        :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]">
            <div>
              <el-input type="text" placeholder="你的昵称" v-model="registerDTO.nickname"/>
              <i class="iconfont icon-user"/>
            </div>
          </el-form-item>

          <el-form-item class="input-prepend restyle no-radius" prop="email"
                        :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
            <div>
              <el-input type="text" placeholder="邮箱" v-model="registerDTO.email"/>
              <i class="iconfont icon-phone"/>
            </div>
          </el-form-item>

          <el-form-item class="input-prepend restyle no-radius" prop="code"
                        :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
            <div style="width: 100%;display: block;float: left;position: relative">
              <el-input type="text" placeholder="验证码" v-model="registerDTO.code"/>
              <i class="iconfont icon-phone"/>
            </div>
            <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
              <a href="javascript:" type="button" @click="getCode()" :value="codeText"
                 style="border: none;background-color: none">{{ codeText }}</a>
            </div>
          </el-form-item>

          <el-form-item class="input-prepend" prop="password"
                        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <div>
              <el-input type="password" placeholder="设置密码" v-model="registerDTO.password"/>
              <i class="iconfont icon-password"/>
            </div>
          </el-form-item>

          <div class="btn">
            <input type="button" class="sign-up-button" value="注册账号" @click="submitRegister()">
          </div>
          <p class="sign-up-msg">
            点击 “注册” 即表示您同意并愿意遵守简书
            <br>
            <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
            和
            <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
          </p>
        </el-form>
        <!-- 更多注册方式 -->
        <div class="more-sign">
          <h6>社交帐号直接登录</h6>
          <ul>
            <li><a
              href="https://github.com/login/oauth/authorize?client_id=d50f9665aab1aae8defc&redirect_uri=http://localhost:8084/callback&scope=user&state=1"><img
              src="https://img.icons8.com/metro/40/000000/github.png"/></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/sign.css'
import '@/assets/css/iconfont.css'

import registerApi from '@/api/register'

export default {
  layout: 'default',
  data() {
    return {
      registerDTO: {
        email: '',
        password: '',
        code: '',
        nickname: ''
      },
      second: 60,
      send: true,
      codeText: '获取验证码'
    }
  },

  created() {
  },

  methods: {
    countdown() {
      let result = setInterval(() => {
        --this.second
        this.codeText = this.second
        if (this.second < 1) {
          clearInterval(result)
          this.send = true
          this.second = 60
          this.codeText = '获取验证码'
        }
      }, 1000)
    },

    getCode() {
      if (!this.send) {
        return;
      }
      this.$refs.userForm.validateField('email', (errMsg) => {
        if (errMsg == '') {
          registerApi.sendCode(this.registerDTO.email).then(res => {
            this.$message({
              type: 'success',
              message: "验证🐎已发送🆗"
            })
            this.send = false;
            this.countdown();
          });
        }
      })
    },

    //注册
    submitRegister() {

      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          registerApi.register(this.registerDTO).then(response => {
            this.$message.success("注册成功")
          })
          this.$router.push({path: `/login`})
        }
      })
    },

    //自定义邮箱校验
    checkEmail(rule, value, callback) {
      // /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value))) {
        return callback(new Error('不正确的邮箱'))
      }
      return callback()
    }
  }
}
</script>

