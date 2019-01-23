import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/ui/header'
import ArticleList from '@/components/views/articleList'
import WriteArticle from '@/components/views/writeArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Header
    },
    {
      // 整个导航界面
      path: '/header',
      component: Header, 
      redirect:'/views/articleList',
      children:[
        // 文章首页
        {
          path:'/views/articleList',
          component:ArticleList
        },
        {
          path:'/views/writeArticle',
          component:WriteArticle
        },
      
      ]
    }
  ]
})
