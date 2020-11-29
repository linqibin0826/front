import request from '@/utils/request'
export default {
  getBanners() {
    return request({
      url: `/cmsservice/index/getBanners`,
      method: 'get'
    })
  }
}
