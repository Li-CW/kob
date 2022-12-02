<!-- 
    上方导航栏，主要参考bootstrap完成
 -->

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
       
        <div class="container">
            <!-- 换成这种形式，避免刷新 -->
            <router-link class="navbar-brand" :to="{name:'home'}">King of Bot</router-link>
                        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button> -->
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"> 
                        <!-- 根据路径添加active 属性，选中变色 -->
                        <router-link :class="route_name === 'pk_index' ? 'nav-link aa' : 'nav-link'" :to="{name:'pk_index'}">对战</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  :class="route_name === 'record_index' ? 'nav-link aa' : 'nav-link'" :to="{ name:'record_index'}">对局列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name === 'ranklist_index' ? 'nav-link aa' : 'nav-link'" :to="{ name:'ranklist_index'}">排行榜</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <!-- 个人中心 -->
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                           canwin
                        </a>
                        <!-- 下拉栏 -->
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link class="dropdown-item" :to="{ name:'user_bot_index'}">my bot</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><router-link class="dropdown-item" :to="{ name:'user_bot_index'}">退出</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
export default {
    setup() {
        // 记得带括号
        const route = useRoute();
        // 得到当前路径
        let route_name = computed(() => route.name);

        return {
            route_name,
        }

    }
}

</script>

<style>
.aa{
    color:wheat !important;
}
</style>