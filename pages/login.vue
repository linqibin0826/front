<template>
  <div class="sign">
    <div class="main">
      <div class="title">
        <a href="/login">登录</a>
        <span>·</span>
        <a href="/register">注册</a>
      </div>
      <div class="sign-up-container">
        <el-form ref="userForm" :model="user">

          <el-form-item class="input-prepend restyle" prop="email"
                        :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
            <div>
              <el-input type="text" placeholder="邮箱" v-model="user.email"/>
              <i class="iconfont icon-phone"/>
            </div>
          </el-form-item>

          <el-form-item class="input-prepend" prop="password"
                        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <div>
              <el-input type="password" placeholder="密码" v-model="user.password"/>
              <i class="iconfont icon-password"/>
            </div>
          </el-form-item>

          <div class="btn">
            <input type="button" class="sign-in-button" value="登录账号" @click="login()">
            <input type="button" class="forget-password-button" value="忘记密码" @click="login()">
          </div>
        </el-form>
        <!-- 更多登录方式 -->
        <div class="more-sign">
          <h6>社交帐号登录</h6>
          <ul>
            <li><a id="qq" class="qq"
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

import loginApi from '@/api/login'
import cookie from 'js-cookie'

export default {
  layout: 'default',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      userInfo: {},
      loginButton: 'disabled'
    }
  },
  created() {
  },
  methods: {
    login() {
      if (this.user.email && this.user.password) {
        loginApi.loginSubmit(this.user).then(response => {
          if (response.data.success) {
            //把token放入cookie
            cookie.set("token", response.data.data.token, {domain: 'localhost'});
            //获取用户信息,跳转界面
            loginApi.getUserInfo().then(response => {
              this.userInfo = response.data.data.item
              cookie.set("user", this.userInfo, {domain: 'localhost'})
              window.location.href = "/"
            });
          } else {
            this.$message.error("用户名或密码不正确!");
          }
        });
      } else {
        this.$message.info("请输入用户名与密码!")
      }
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

<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
