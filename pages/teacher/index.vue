<template>
  <div id="aTeacherList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部教师</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div>

          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total < 1">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->


          <article v-if="total > 0" class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in teacherList" :key="teacher.id" >
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="/teacher/ + teacher.id" :title=teacher.name>
                      <img :src="teacher.avatar" :alt="teacher.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="/teacher/ + teacher.id" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ teacher.career }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.intro }}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>


        <!-- 分页 -->
        <el-pagination
          :current-page="page"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getList"
        />

      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>

</template>


<script>
import teacher from "@/api/teacher";
export default {
  data() {
    return {
      limit: 8,
      page: 1,
      teacherList: {},
      total: 0
    }
  },
  created() {

  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(page=1) {
      this.page = page
      teacher.getTeacherListPage(this.page, this.limit)
        .then(response => {
          this.teacherList = response.data.data.rows
          this.total = response.data.data.total
      })
    }
  }
};
</script>
