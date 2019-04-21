import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/ui/header'
import ArticleList from '@/components/blog/blogArticle/articleList.vue'
import WriteArticle from '@/components/blog/blogWrite/writeArticle.vue'
import Regist from "@/components/blog/blogUser/regist.vue"
import ArticleRead from "@/components/blog/blogRead/readArticle.vue"
import hotArticle from "@/components/blog/sideMenu/hotArticle.vue"
import forwardArticleList from "@/components/blog/forwardArticleList/forwardArticleList.vue"
import userMessage from "@/components/blog/blogUser/userMessage.vue"
import myArticle from "@/components/blog/blogUser/myArticle.vue"
import editArticle from "@/components/blog/blogWrite/editArticle.vue"
import editUser from "@/components/blog/blogUser/editUser.vue"


Vue.use(Router)

export default new Router({

    routes: [{
            path: '/',
            component: Header,
            redirect: '/blogArticle/articleList'
        },
        {
            // 整个导航界面
            path: '/header',
            component: Header,
            children: [
                // 文章首页
                {
                    name: 'articleList',
                    path: '/blogArticle/articleList',
                    component: ArticleList,
                    children: [{
                        name: 'hotArticle',
                        path: '/blogArticle/articleList/hotArticle',
                        component: hotArticle,
                    }]
                },
                {
                    name: 'writeArticle',
                    path: '/blogWrite/writeArticle',
                    component: WriteArticle
                },
                {
                    name: 'regist',
                    path: '/blogRegist/regist',
                    component: Regist
                },
                {
                    name: 'readArticle',
                    path: '/blogRead/readArticle',
                    component: ArticleRead
                },
                {
                    name: 'forwardArticleList',
                    path: '/blogForward/forwardArticleList',
                    component: forwardArticleList
                },
                {
                    name: 'userMessage',
                    path: '/blogUser/userMessage',
                    component: userMessage
                },
                {
                    name: 'myAticle',
                    path: '/blogUser/myArticle',
                    component: myArticle
                },
                {
                    name: 'editArticle',
                    path: '/blogWrite/editArticle',
                    component: editArticle
                },
                {
                    name: 'editUser',
                    path: '/blogUser/editUser',
                    component: editUser
                }
            ],
        }
    ],

})