import request from '@/utils/request'


export default {
  getPlayAuth(id) {
    return request({
      url: `/eduvod/video/getPlayAuthById/${id}`,
      method: 'get'
    })
  }
}
