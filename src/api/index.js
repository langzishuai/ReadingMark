// 该文件主要是 根据 后端（或者RMP）提供的接口 来写对应的请求方法
import { request } from '../utils/request.js'

// 示例 get请求 根据 用户id 获取 用户信息
// 这里 是因为 RMP 给出的方式 就是路径拼接 
export function getUserInfo(userId, parameters) {
    return request({
        url: '/User/' + userId,
        method: 'get',
        // 可以 携带携带参数 具体 可能得根据 RMP 或者 后端
        // params: parameters
    })
}

// 示例 以 Post 方式发布一个文章
export function publicArticle(postdata) {
    return request({
        url: '/Article',
        // 以json的形式 放在请求体
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        data: postdata
    })
}