<template>
    <div class="page">
        <router-link to="/todothing">
            <i class="el-icon-edit">代办事项</i>
        </router-link>
        <router-link to="/upload">
            <i class="el-icon-upload">上传</i>
        </router-link>
        <router-link to="/imgwall">
            <i class="el-icon-picture">图片墙</i>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "navComponents"
    }
</script>

<style scoped lang="less">
    .page{
        padding-top: 0.2rem;
    }
    i{
        color: #fff;
        margin: 0 0.5rem;
    }
</style>