<!-- 
    每个页面的内容有用一个card包裹
 -->

<template>
    <!-- 每个页面都由一个card包裹，故创建了一个组件 -->
    <div class="container content-field">
        <div class="card">
            <div class="card-body">
                <!-- 这里面放页面的具体内容 -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContentField",
}
</script>

<style scoped>
.content-field {
    /* 上方留白 */
    margin-top: 20px;
}
</style>