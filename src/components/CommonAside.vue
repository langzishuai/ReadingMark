<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <!-- 标题 -->
            <h3>批注阅读系统</h3>
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                    <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>


            </el-submenu>

        </el-menu>
    </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 36px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            menuData: [
                {
                    path: '/',
                    name: 'home',
                    label: '个人主页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/articles',
                    name: 'articles',
                    label: '文档管理',
                    icon: 's-home',
                    url: 'Articles/Articles'
                },
                {
                    path: '/students',
                    name: 'students',
                    label: '学生管理',
                    icon: 's-home',
                    url: 'Students/Students'
                },
                {
                    path: '/teachers',
                    name: 'teachers',
                    label: '教师管理',
                    icon: 's-home',
                    url: 'Teachers/Teachers'
                },
                {
                    label: '其他',
                    icon: 's-home',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 's-home',
                            url: 'Other/PageOne'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 's-home',
                            url: 'Other/PageTwo'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击菜单（导航）跳转
        clickMenu(item) {
            // 当前路径和目标路由不一致就跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push(item.path)
            }

        }
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu {
    border-right: none;
}
</style>