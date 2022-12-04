<template>
  <div>
    <!-- <el-header height="100px">
      <el-row class="banner-box">
        <el-col :span="2">
          <img class="logo" src="./assets/logo.png" alt="">
        </el-col>
        <el-col :span="20" style="text-align: center">
          <h2>在线批注阅读</h2>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-user-solid"></i>
          Sam
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router='true' active-text-color='#ffd04b'>
          <el-menu-item index="/helloWorld">
            <template slot='title'>
              <span>批注阅读</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
