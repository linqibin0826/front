<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">

            <a href="javascript: void(0)" title="基本资料" class="current">
              基本资料
            </a>
          </section>
        </div>

        <!-- 表格 -->
        <el-form label-width="120px">
          <el-form-item label="昵称">
            <el-input v-model="userInfo.nickname" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="userInfo.sex" clearable placeholder="请选择">
              <!--
                数据类型一定要和取出的json中的一致，否则没法回填
                value使用动态绑定的值，性别由1 2代替
              -->
              <el-option :value="1" label="女" />
              <el-option :value="2" label="男" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfo.mobile" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="userInfo.age" :min="0" controls-position="right" />
          </el-form-item>
          <!-- 头像 -->
          <el-form-item label="头像">
            <el-upload
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="http://localhost:8888/eduoss/fileoss/uploadAvatar">
              <img v-if="userInfo.avatar" :src="userInfo.avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="userInfo.sign" :rows="3" type="textarea" />
          </el-form-item>

          <el-form-item>
            <el-button :disabled="saveBtnDisabled"  type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </article>
</template>
<script>
//引入调用login.js文件
//引入调用js-cookie
import cookie from 'js-cookie'
import loginApi from "@/api/login";
export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      },
      userInfo:{
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: '',
        sign:'',
      },
      saveBtnDisabled: false, //保存按钮是否禁用

    }
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token
    if (this.token) { //判断是否为Oauth2重定向回来的连接
      this.githubLogin()
    }
    this.showInfo();
  },

  methods: {
    save(){
      loginApi.updateUserInfo(this.userInfo)
        .then(response => { //修改成功
          //提示成功
          this.$message({
            type: 'success',
            message: '修改成功！ 🧙‍♂️'
          });
          this.userInfo = response.data.data.item
          cookie.set("user", this.userInfo, {domain: 'localhost'})
          this.showInfo()
        })
    },

    //头像
    // 文件上传成功
    handleAvatarSuccess(response) {
      if (response.success) {
        this.userInfo.avatar = response.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败! ')
      }
    },

    // 文件上传失败（http）
    handleAvatarError() {
      this.$message.error('上传失败! （http失败）')
    },

    // 上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt3M
    },

    githubLogin() {
      cookie.set("token", this.token, {damain: 'localhost'})
      cookie.set("user", '', {domain: 'localhost'})
      //获取用户信息,跳转界面
      loginApi.getUserInfo().then(response => {
        this.userInfo = response.data.data.item
        cookie.set("user", this.userInfo, {domain: 'localhost'})
      })
    },
    showInfo() {
      var user = cookie.get('user')
      //讲json字符串转化为Json对象
      if(user) {
        this.userInfo = JSON.parse(user)
      }
    },
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
