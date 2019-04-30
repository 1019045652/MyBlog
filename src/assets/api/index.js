import axios from 'axios'
export default {

    //注册用户
    registerUser(params) {
        return axios.post('http://localhost:8081/registerUser', params)
    },
    // 根据文章id查找文章
    getArticleById(params) {
        return axios.get('http://localhost:8081/findAllArticle', { params })
    },
    // 根据用户id查询用户信息
    getUserById(params) {
        return axios.get('http://localhost:8081/findUserById', { params })
    },
    //更新文章

    // 获取文章种类列表
    findAllArticleType() {
        return axios.get('http://localhost:8081/findAllArticleType')
    },
    // 增加留言
    addLy(params) {
        return axios.post('http://localhost:8081/addLy', params)
    },
    //查询指定文章下的留言
    findAllLy(params) {
        return axios.get('http://localhost:8081/findAllLy', { params })
    },
    //转发文章
    forwardArticle(params) {
        return axios.post('http://localhost:8081/forwardArticle', params)
    },
    // 判断是否转发过文章
    isForward(params) {
        return axios.post('http://localhost:8081/isForward', params)
    },
    //获取文章转发次数
    getZfCount(params) {
        return axios.get('http://localhost:8081/getZfCount', { params })
    },
    // 获取转发的文章列表
    findFdArticleList(params) {
        return axios.get('http://localhost:8081/findFdArticleList', { params })
    },
    //取消转发文章
    removeForward(params) {
        return axios.post('http://localhost:8081/removeForward', params)
    },
    //查询指定类型的文章列表
    findArticleByType(params) {
        return axios.get('http://localhost:8081/findArticleByType', { params })
    },
    //查询指定用户发布的文章
    findUserArticle(params) {
        return axios.get('http://localhost:8081/findUserArticle', { params })
    },
    //删除文章
    deleteArticle(params) {
        return axios.post('http://localhost:8081/deleteArticle', params)
    },
    //编辑用户信息
    editUser(params) {
        return axios.post('http://localhost:8081/editUser', params)
    },
    //关注用户
    followUser(params) {
        return axios.post('http://localhost:8081/followUser', params)
    },
    //取消关注
    removeFollow(params) {
        return axios.post('http://localhost:8081/removeFollow', params)
    },
    //是否关注过
    findFollow(params) {
        return axios.post('http://localhost:8081/findFollow', params)
    },
    // 关注列表
    findFollowList(params) {
        return axios.post('http://localhost:8081/findFollowList', params)
    },
    findFansList(params) {
        return axios.post('http://localhost:8081/findFansList', params)
    },
    // 查找所有用户
    findAllUser(params) {
        return axios.post('http://localhost:8081/findAllUser', params)
    },
    //删除用户
    deleteUser(params) {
        return axios.post('http://localhost:8081/deleteUser', params)
    },
    //addType
    addType(params) {
        return axios.post('http://localhost:8081/addType', params)

    },
    editType(params) {
        return axios.post('http://localhost:8081/editType', params)
    },
    findAnno() {
        return axios.post('http://localhost:8081/findAnno')
    },
    addAnno(params) {
        return axios.post('http://localhost:8081/addAnno', params)
    },
    deleteAnno(params) {
        return axios.post('http://localhost:8081/deleteAnno', params)
    }
}