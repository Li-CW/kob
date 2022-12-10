<template>
  <!-- 导航栏 -->
  <NavBar/>
  <!-- 控制页面 -->
  <router-view></router-view>
</template>

<script>
// 导入boostrap
// 会报错，在脚手架里依赖导入：@popperjs/core
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from "./components/NavBar.vue"

export default {
  components: {
    NavBar
    },
    setup() {


        // const options3 = {
        //     method: "post",
        //     url: "http://127.0.0.1:3000/user/account/register/",
        //     data: {
        //         username: "a",
        //         password: "pa",
        //         confirmedPassword: "pa",
        //     }
        // }
        // axios(options3).then((response) => {
        //     console.log(response.data);
        // })
    }
}


</script>
<!-- 不要加 scoped -->
<style>
body{
  background-image: url("./assets/images/background.png");
  /* 背景图片百分百覆盖窗口 */
  background-size: 100vw 100vh;
}
</style>

