import request from '@/utils/request'

export default {
  loginSubmit(user) {
    return request({
      url: `/user/login`,
      method: 'post',
      data: user
    })
  },
  getUserInfo() {
    return request({
      url: `/user/getLoginInfo`,
      method: 'get'
    })
  }
}
