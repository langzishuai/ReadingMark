import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Main from '@/views/Main'
import Articles from '@/views/Articles'
import Students from '@/views/Students'
import Teachers from '@/views/Teachers'
import PageOne from '@/views/PageOne'
import PageTwo from '@/views/PageTwo'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    // 使用嵌套路由
    {
      path: '/',
      component: Main,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'articles',
          name: 'Articles',
          component: Articles
        },
        {
          path: 'students',
          name: 'Students',
          component: Students
        },
        {
          path: 'teachers',
          name: 'Teachers',
          component: Teachers
        },
        {
          path: 'page1',
          name: 'PageOne',
          component: PageOne
        },
        {
          path: 'page2',
          name: 'PageTwo',
          component: PageTwo
        },
        {
          path: '/helloWorld',
          name: 'HelloWorld',
          component: HelloWorld
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
