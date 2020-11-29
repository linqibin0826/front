import request from '@/utils/request'

export default {
  getHotCourses() {
    return request({
      url: `/eduservice/course/getHotCourse`,
      method: 'get'
    })
  },
  getCourseInfo(current, limit, condition) {
    return request({
      url: `/eduservice/course/getCoursesByFrontCondition/${current}/${limit}`,
      method: 'post',
      data: condition
    })
  },
  getSubjectParent() {
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  },
  getFrontCourseInfoById(id) {
    return request({
      url: `/eduservice/course/getFrontCourseInfoById/${id}`,
      method: 'get'
    })
  }
}
