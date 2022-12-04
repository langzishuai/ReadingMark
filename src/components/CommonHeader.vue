<template>
    <div class="header-container">
        <div class="l-content">

        </div>
        <div class="r-content">
            <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/spiderMan.png" alt="用户">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.header-container {
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 30px;
        }
    }
}
</style>