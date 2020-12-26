<template>
  <div id="aTeacherList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">下载中心</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
        </section>
      </header>

      <section class="c-sort-box unBr">
        <div>

          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total < 1">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
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
export default {
  data() {
    return {
      limit: 8,
      page: 1,
      total: 0
    }
  },
  created() {
  },
  mounted() {
  },

  methods: {
    getList() {

    }
  }
}
</script>
