import request from '@/utils/request'

export default {
    //验证码获取
    sendCode(email) {
      return request({
        url: `/user/getCode/${email}`,
        method: 'get'
      })
    },

    //注册
  register(registerDTO) {
      return request({
        url: `/user/register`,
        method: 'post',
        data: registerDTO
      })
  }
}
