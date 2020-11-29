import request from '@/utils/request'


export default {
  createOrder(courseId) {
    return request({
      url: `/ordservice/order/createOrder/${courseId}`,
      method: 'get'
    })
  },
  getOrderInfo(orderNo) {
    return request({
      url: `/ordservice/order/getOrderInfoByOrderNo/${orderNo}`,
      method: 'get'
    })
  }
}
