import axios from 'axios'
import qs from 'qs'
// @ts-ignore
import { debounce } from './debounce'
import { message } from "ant-design-vue"

type OptionParams = {
    url?: string,
    baseUrl?: String,
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
    data?: object,
    contentType?: 'json' | 'urlencoded' | 'multipart',
    prefixUrl?: string,
    options?: any,
}

const contentTypes = {
    json: 'application/json; charset=utf-8',
    urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
    multipart: 'multipart/form-data',
}

function toastMsg() {
    Object.keys(errorMsgObj).map((item) => {
        // Message.error(item)
        // @ts-ignore
        delete errorMsgObj[item]
    })
}

let errorMsgObj: { [key: string]: String } = {}

const defaultOptions = {
    withCredentials: true, // 允许把cookie传递到后台
    headers: {
        Accept: 'application/json',
        'Content-Type': contentTypes.json,
    },
    timeout: 15000,
}

export const https = ({
    url,
    data = {},
    method = 'GET',
    options = {},
    contentType = 'json', // json || urlencoded || multipart
    prefixUrl = process.env.VUE_APP_API_URL,
    baseUrl,
}: OptionParams) => {
    if (!url && !baseUrl) {
        const error = new Error('请传入url')
        return Promise.reject(error)
    }
    const fullUrl = `${baseUrl ? baseUrl : `${prefixUrl}${url}`}`
    const newOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            'Content-Type':
                (options.headers && options.headers['Content-Type']) ||
                contentTypes[contentType],
        },
        method,
    }
    console.log(newOptions.headers, "headers");

    if (method === 'GET') {
        newOptions.params = data
    }
    axios.interceptors.request.use((request) => {
        // 移除起始部分 / 所有请求url走相对路径
        request.url = request.url?.replace(/^\//, '')
        return request
    })

    return axios({
        url: fullUrl,
        baseURL: "/api",
        ...newOptions,
    })
        .then((response) => {
            console.log(response, "response");
            const { data } = response
            if (response.status === 200) {
                return Promise.resolve(data)
            } else {
                const { message } = data
                if (!errorMsgObj[message]) {
                    errorMsgObj[message] = message
                }
                setTimeout(debounce(toastMsg, 1000, true), 1000)
                return Promise.reject(data)
            }
        })
        .catch((error) => {
            console.log(error, "error");
            if (error.response) {
                const { data, status } = error.response
                console.log(error, "error");
                const resMsg = data ? data.message : '服务异常'
                // if (resCode === 401) { // 与服务端约定
                //     // 登录校验失败
                // } else if (data.code === 403) { // 与服务端约定
                //     // 无权限
                //     router.replace({ path: '/403' })
                // }
                // if (!errorMsgObj[resMsg]) {
                //     //@ts-ignore
                //     errorMsgObj[resMsg] = resMsg
                // }
                // setTimeout(debounce(toastMsg, 1000, true), 1000)
                // const err = { code: resCode, respMsg: resMsg }
                message.error(resMsg)
                return Promise.reject(resMsg)
            } else {
                const err = { type: 'canceled', respMsg: '数据请求超时' }
                return Promise.reject(err)
            }
        })
}