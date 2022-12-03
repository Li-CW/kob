<!-- 
    地图背景
 -->
<template>
    <!-- 背景 -->
    <div class="playground">
        <!-- 地图 -->
        <GameMap />
    </div>
</template>

<script>
import GameMap from "./GameMap.vue"

export default ({
    components: {
        // 背景里放个地图
        GameMap,
    },
    setup() {

    },
})
</script>

<style scoped>
/* 背景的颜色和大小 */
.playground {
    width: 60vw;
    height: 70vh;
    background-color: bisque;
    margin: 40px auto;

}
</style>




