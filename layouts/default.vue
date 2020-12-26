<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
            <img src="../assets/img/LOGO3.png" style="max-width:330px">
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>教师</a>
            </router-link>
            <router-link to="/exam" tag="li" active-class="current">
              <a>考试</a>
            </router-link>
            <router-link to="/community" tag="li" active-class="current">
              <a>社区</a>
            </router-link>
            <router-link to="/download" tag="li" active-class="current">
              <a>资源</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!userInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="userInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="userInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img
                  :src="userInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="vam disIb">{{ userInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="搜索课程" name="queryCourse.courseName">
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="https://www.ptu.edu.cn/" title="莆田学院" target="_blank">莆田学院</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="https://github.com/linqibin0826" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：18039086707(福建)</span>
                <span>Email：linqibin0826@gmail.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©版权归LY所有 京ICP备123456号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>

<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import loginApi from "@/api/login";

export default {
  data() {
    return {
      showLogin: false,
      token: '',
      userInfo: {
        id: '',
        avatar: '',
        nickname: '',
        email: '',
        age: 0,
        sign: '',
        mobile: ''
      }
    }
  },
  created() {
    this.token = this.$route.query.token
    if (this.token) { //判断是否为Oauth2重定向回来的连接
      this.githubLogin()
    }
    this.showInfo();
  },
  methods: {
    /**
     * github 登录后获取用户信息
     */
    githubLogin() {
      cookie.set("token", this.token, {damain: 'localhost'})
      cookie.set("user", '', {domain: 'localhost'})
      //获取用户信息,跳转界面
      loginApi.getUserInfo().then(response => {
        this.userInfo = response.data.data.item
        cookie.set("user", this.userInfo, {domain: 'localhost'})
        window.location.href = "/"
      })
    },
    showInfo() {
      var user = cookie.get('user')
      //讲json字符串转化为Json对象
      if(user) {
        this.userInfo = JSON.parse(user)
      }
    },
    logout() {
      cookie.set('token', '', {domain: 'localhost'})
      cookie.set('user', '', {domain: 'localhost'})
      window.location.href = "/login"
    }
  }

};
</script>





