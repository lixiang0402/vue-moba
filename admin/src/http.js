import Vue from 'vue';
import axios from 'axios'
import router from './router'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt-token")
    // 如果token存在 本次每次请求带上token供后台判断本次请求是否合法
    if (token) {
        config.headers.Authorization = "Bearer " + token
    }
    return config
}, function(error) {
    return Promise.reject(error);
});

http.interceptors.response.use((res) => {
    return res
}, function(err) {
    // 拦截后台的报错 并将send回来的message提示用户
    if (err.response.data.message) Vue.prototype.$message.error(err.response.data.message)
    // 拦截特定状态码 401  如果是401 代表用户登录token状态出错 跳转回login页面
    if (err.response.status == 401) {
        return router.push("/login")
    }
    return Promise.reject(err)
});
export default http