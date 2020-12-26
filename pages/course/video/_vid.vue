<template>
  <div >
    <!--&lt;!&ndash; 阿里云视频播放器样式 &ndash;&gt;
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
    &lt;!&ndash; 阿里云视频播放器脚本 &ndash;&gt;
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />-->


    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css" >
    <!-- 阿里云视频播放器组件 -->
    <script charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"></script>
    <!-- 阿里云视频播放器样式 -->
    <script charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js"></script>
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>

</template>

<script>
import vod from '@/api/vod'
export default {

  layout: 'player',
  data() {
    return {
      vid: '',
      playAuth: ''
    }
  },
  created() {
    this.vid = this.$route.params.vid
    this.getPlayAuth()
  },
  methods: {
    getPlayAuth() {
      vod.getPlayAuth(this.vid).then(response => {
        this.playAuth = response.data.data.auth
        new Aliplayer({
          id: 'J_prismPlayer',
          vid: this.vid,
          playauth: this.playAuth,
          autoplay: false, // 自动播放
          encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
          width: '100%',
          controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
          useH5Prism: true,
          height: '500px',
          cover: 'https://edu-hugh.oss-cn-shenzhen.aliyuncs.com/bg0.jpg',
          components: [{
            name: 'BulletScreenComponent', // 跑马灯组件
            type: AliPlayerComponent.BulletScreenComponent,
            /** 跑马灯组件三个参数 text, style, bulletPosition
             * text: 跑马灯文字内容
             * style: 跑马灯样式
             * bulletPosition: 跑马灯位置, 可选的值为 'top' (顶部), 'bottom' (底部), 'random' (随机), 不传值默认为 'random'
             */
            args: ['莆田学院', { fontSize: '28px', color: '#ffaa00' }, 'random']
          },]
        },function(player) {
        })
      })
    }
  }
  /*asyncData({ params, error }) {
    return vod.getPlayAuth(params.vid).then(response => {
      return {
        vid: params.vid,
        playAuth: response.data.data.auth
      }
    })
  },

  mounted() {
    new Aliplayer({
      id: 'J_prismPlayer',
      vid: this.vid,
      playauth: this.playAuth,
      autoplay: true, // 自动播放
      encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
      width: '100%',
      height: '500px'
    }, function(player) {
      console.log('播放器创建成功')
    })
  }*/
}
</script>
