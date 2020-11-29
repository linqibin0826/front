<template>
  <div >
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
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
          autoplay: true, // 自动播放
          encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
          width: '100%',
          height: '500px'
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
