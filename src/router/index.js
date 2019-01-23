import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/ui/header'
import ArticleList from '@/components/blog/blogArticle/articleList.vue'
import WriteArticle from '@/components/blog/blogWrite/writeArticle.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Header
        },
        {
            // 整个导航界面
            path: '/header',
            component: Header,
            children: [
                // 文章首页
                {
                    path: '/blogArticle/articleList',
                    component: ArticleList
                },
                {
                    path: '/blogWrite/writeArticle',
                    component: WriteArticle
                },

            ]
        }
    ]
})