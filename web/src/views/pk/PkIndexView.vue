<!-- 
    pk 页面中放一个游戏背景。
    游戏背景里放了游戏地图
    游戏地图中放了画布（canvas）
    画布（canvas)中绘制了游戏元素
 -->
<template>
    <PlayGround />
</template>

<script>
import PlayGround from "../../components/PlayGround.vue"
export default {
    components: {
        PlayGround,
    }
}
</script>

<style scoped>

</style>