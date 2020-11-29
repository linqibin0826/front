<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="邮箱" v-model="user.email"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="login()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
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
  layout: 'sign',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      userInfo: {

      }
    }
  },

  created() {

  },

  methods: {
    login() {
      loginApi.loginSubmit(this.user).then(response => {
        console.log(response)
        if(response.data.success) {
          //把token放入cookie
          cookie.set("token", response.data.data.token, { domain: 'localhost'})
          //获取用户信息,跳转界面
          loginApi.getUserInfo().then(response => {
            console.log(response)
            this.userInfo = response.data.data.item
            cookie.set("user", this.userInfo, {domain: 'localhost'})
            window.location.href = "/"
          })
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

<style>
.el-form-item__error{
  z-index: 9999999;
}
</style>
