<template>
  <div id="articleList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部考试</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">开课学院</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="addCondition(null)" >全部</a>
                </li>
                <li v-for="subject in subjectParent" :key="subject.id" :class="{active:condition.subjectParentId == subject.id}">
                  <a :title="subject.title" href="#" @click="addCondition(subject.id)">{{ subject.title }}</a>
                </li>

              </ul>
            </dd>
          </dl>
        </section>

        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="this.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "@/api/course";

export default {
  data() {
    return {
      subjectParent: [],
      page: 1,
      limit: 8,
      courseInfo: [],
      condition: {
        subjectParentId: ''
      },
      total: 0
    }
  },
  created() {
    this.getAllSubject()
  },
  methods: {
    getAllSubject() {
      course.getSubjectParent().then(response => {
        this.subjectParent = response.data.data.allSubject
      })
    },
    addCondition(id) {
      this.condition.subjectParentId = id
      this.getCourseInfo(1)
    }
  }
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
