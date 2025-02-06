import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class HttpRequest {
    private readonly baseUrl: string;
    constructor() {
        this.baseUrl = 'http://localhost:3000'
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {

            }
        }
        return config
    }

    // 请求拦截
    interceptors(instance: AxiosInstance, url: string | number | undefined) {
        instance.interceptors.request.use(config => {
            // 添加全局的loading..
            // 请求头携带token
            return config
        }, (error: any) => {
            return Promise.reject(error)
        })
        //响应拦截
        instance.interceptors.response.use(res => {
            //返回数据
            const { data } = res
            console.log('返回数据处理', res)
            return data
        }, (error: any) => {
            console.log('error==>', error)
            return Promise.reject(error)
        })
    }

    request(options: AxiosRequestConfig) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

const http = new HttpRequest()
export default http