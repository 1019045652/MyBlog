import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/ui/header'
import login from '@/components/ui/login'
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
import followUserList from "@/components/blog/blogUser/followUserList.vue"
import fansList from "@/components/blog/blogUser/fansList.vue"
import managerArticle from "@/components/blog/blogManage/managerArticle.vue"
import managerUser from "@/components/blog/blogManage/managerUser.vue"
import managerType from "@/components/blog/blogManage/managerType.vue"
import managerAnno from "@/components/blog/blogManage/anno.vue"
import otherArticle from "@/components/blog/blogUser/otherArticle.vue"


Vue.use(Router)

export default new Router({

    routes: [{
            path: '/',
            component: Header,
            redirect: '/blogArticle/articleList'
        },
        {
            path: '/login',
            component: login,
        },
        {
            name: 'regist',
            path: '/blogRegist/regist',
            component: Regist
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
                    redirect: "/blogArticle/articleList/hotArticle",
                    children: [{
                        name: 'hotArticle',
                        path: '/blogArticle/articleList/hotArticle',
                        component: hotArticle,
                    }]
                },
                {
                    name: 'writeArticle',
                    path: '/blogWrite/writeArticle',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: WriteArticle
                },

                {
                    name: 'readArticle',
                    path: '/blogRead/readArticle',
                    component: ArticleRead,
                    children: [{
                        name: 'hotArticle',
                        path: '/blogArticle/readArticle/hotArticle',
                        component: hotArticle,
                    }]
                },
                {
                    name: 'forwardArticleList',
                    path: '/blogForward/forwardArticleList',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
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
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: myArticle
                },
                {
                    name: 'editArticle',
                    path: '/blogWrite/editArticle',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: editArticle
                },
                {
                    name: 'editUser',
                    path: '/blogUser/editUser',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: editUser
                },
                {
                    name: 'followUserList',
                    path: '/blogUser/followUserList',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: followUserList
                },
                {
                    name: 'fansList',
                    path: '/blogUser/fansList',
                    meta: {
                        title: '',
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: fansList
                },
                {
                    name: 'managerArticle',
                    path: '/blogManager/managerArticle',
                    component: managerArticle
                },
                {
                    name: 'managerUser',
                    path: '/blogManager/managerUser',
                    component: managerUser
                },
                {
                    name: 'managerType',
                    path: '/blogManager/managerType',
                    component: managerType
                },
                {
                    name: 'anno',
                    path: '/blogManager/managerAnno',
                    component: managerAnno
                },
                {
                    name: 'otherArticle',
                    path: '/blogUser/otherArticle',
                    component: otherArticle
                },

            ],
        }
    ],

})