import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://202.120.40.86:14642/rmp-resource-service/project/6386fffe1c04bf0015eade91/resource',
        //设置请求超时时间
        timeout: 5000
    })

    // 2.axios的拦截器，用不到的可以忽略这节
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log('请求拦截err: ' + err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log('响应拦截err: ' + err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}