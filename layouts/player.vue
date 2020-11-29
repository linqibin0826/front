<template>
  <div>
    <!--<div class="head">
      <a href="#" title="莆院学堂">
        <img class="logo" src="~/assets/img/LOGO3.png" alt="莆院学堂">
      </a></div>-->
    <div class="body">
      <div class="content">
        <nuxt/>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>

<style>
html,body{
  height:100%;
}
</style>

<style scoped>
.head {
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.head .logo{
  height: 50px;
  margin-left: 10px;
}

.body {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
