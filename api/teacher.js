import request from '@/utils/request'
export default {
  getHotTeachers() {
    return request({
      url: `/eduservice/teacher/getHotTeachers`,
      method: 'get'
    })
  },
  //查询讲师
  getTeacherListPage(current, limit) {
    return request({
      url: `/eduservice/teacher/pageTeacher/${current}/${limit}`,
      method: 'get',
    })
  },

  getTeacherAndCoursesById(teacherId) {
    return request({
      url: `/eduservice/teacher/getTeacherAndCoursesById/${teacherId}`,
      method: 'get'
    })
  }
}
