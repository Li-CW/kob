<!-- 
    地图组件。
    地图与背景大小相等（背景是矩形，地图就是矩形，背景是正方形，地图就是正方形）。
    地图中方法canvas(画布)。canvas(画布)竖直水平居中
    画布大小、画布内容在 GameMap 对象中进行填充。
    GameMap 创建时传入：地图dom对选对象和画布dom对象。
-->
<template>
    <!-- 地图里放个画布 -->
    <!-- ref作用：与当前dom元素关联 -->
    <div ref="parent" class="gamemap">
        <!-- 画布 -->
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>

<script>
import { GameMap } from "../assets/scripts/GameMap";
import { ref, onMounted } from "vue";
export default {
    setup() {
        const parent = ref(null);
        let canvas = ref(null);
        // 创建页面时执行该函数
        onMounted(() => {
            // 创建游戏地图，将画布与地图dom传入地图对象
            new GameMap(canvas.value.getContext('2d'), parent.value);
        });

        return {
            parent,
            canvas,
        }
    }
}
</script>

<style scoped>
/* 地图的大小和位置 */
div.gamemap {
    width: 100%;
    height: 100%;
    /* 竖直水平居中 */
    display: flex;
    justify-content: center;
    text-align: center;
}
</style>