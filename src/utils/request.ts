import { Message } from '@arco-design/web-vue'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
    code: number
    message: string
    data: T
}

const service: AxiosInstance = axios.create({
    baseURL: 'http://172.22.56.12:9632/serve',
    timeout: 10000,
})

// 添加请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在发送请求之前做些什么
        NProgress.configure({ showSpinner: false })
        NProgress.start()

        return Promise.resolve(config)
    },
    (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        NProgress.configure({ showSpinner: false })
        NProgress.done()
        Message.success({
            id: 'myInfo',
            content: `状态码${response.status},请求成功！`,
            duration: 2000,
        })

        console.log(response.data)

        return Promise.resolve(response.data)
    },
    (error) => {
        // 对响应错误做点什么
        NProgress.configure({ showSpinner: false })
        NProgress.done()
        Message.error({
            id: 'myInfo',
            content: `${error}，请重试`,
            duration: 2000,
        })
        return Promise.reject(error)
    }
)

/* 导出封装的请求方法 */
export const http = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.get(url, config)
    },

    post<T = any>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return service.post(url, data, config)
    },

    put<T = any>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return service.put(url, data, config)
    },

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.delete(url, config)
    },
}
