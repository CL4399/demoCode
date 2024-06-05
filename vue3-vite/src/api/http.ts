import axios from 'axios'
import qs from 'qs'
import { ElLoading } from 'element-plus'
import { message, notification } from 'ant-design-vue';
import router from '../router'
export const BaseUrl_TEST = 'http://localhost:3000'
const ERR_OK = 0
const requestAxios = axios.create({
    // baseURL: 'http://mcs.snssdk.com',
    // baseURL: '/api'
})

interface errorCodeType {
    [key: string]: number
}

const loadingWrap = () => {
    let count = 0;
    let loading: any = null
    return {
        loadingOpen: () => {
            if (count === 0) {
                loading = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(255, 255, 255, 0.3)',
                })
            }
            count += 1
        },
        loadingClose: () => {
            count -= 1
            if (count === 0) {
                loading.close()
            }
        }
    }
}

const { loadingOpen, loadingClose } = loadingWrap()

const errorMessageWrap = () => {
    let obj: errorCodeType = {}
    return (code: number, msg: string) => {
        if (!obj[code]) {
            obj[code] = 1
            message.error(
                {
                    content: msg,
                    onClose: () => {
                        obj[code] = 0
                    }
                }
            );
        }
    }
}

const errorMessage = errorMessageWrap()

requestAxios.interceptors.request.use(
    config => config,
    error => {
        errorMessage(500, `错误:请求接口失败[${error}]`)
        return Promise.reject(error)
    }
)

requestAxios.interceptors.response.use(
    res => res.data,
    error => {
        if (error.message == "Request failed with status code 500") {
            error.message = "请求失败";
        }
        if (error.message == "Network Error") {
            error.message = "网络错误";
        }
        if (error.message == "Request aborted") {
            error.message = "请求失败";
        }
        if (
            error.code === "ECONNABORTED" &&
            error.message.indexOf("timeout") !== -1
        ) {
            error.message = "请求超时";
        }
        errorMessage(500, error.message)
        return Promise.reject(error)
    }
)

function clearEmptyParam(data: any) {
    data = data || {}
    Object.keys(data).forEach(key => {
        if (data[key] === '') {
            delete data[key]
        } else {
            let index = key.indexOf("_encode")
            if (index > -1) {
                let newkey = key.substring(0, index)
                let newVal = data[key]
                delete data[key]
                data[newkey] = encodeURIComponent(newVal)
            }
        }
        // 使用axios, qs序列化之后，当传递的参数为空数组时，该参数会被过滤掉
        if (Array.isArray(data[key])) {
            if (data[key].length === 0) { delete data[key] }
            // data[key].length === 0 && (data[key] = null)
        }
        if (Object.prototype.toString.call(data[key]) === '[object Object]') {
            clearEmptyParam(data[key])
        }
    })
}

/**
 * ajax
 * @param {String} type
 * @param {String} url
 * @param {String} time
 * @param {Object} data
 * @param {String} dataType
 * @param {Object} headers
 * @param {Boolean} contentType
 * @param {Boolean} processData
 * @param return
 * */

interface objData {
    url: string,
    data?: any,
    headers?: object,
    contentType?: boolean,
    processData?: boolean,
    isShowLoading?: boolean,
    type?: string,
    dataType?: string,
    time?: number
}
function loadingAjax() {
    let loadingCount = 0
    return function (opt: any) {
        let options: any = opt || {}

        if (!options.url) {
            message.warning('请添加请求的路径!')
            return
        }

        // 是否显示loading
        options.isShowLoading = options.isShowLoading === undefined ? true : options.isShowLoading
        if (options.isShowLoading) {
            loadingOpen()
        }

        options.type = options.type || 'get'

        options.headers = options.headers || {};

        options.contentType = typeof options.contentType === 'boolean' ? options.contentType : true;
        options.processData = typeof options.processData === 'boolean' ? options.processData : true;

        if (Object.prototype.toString.call(options.data).indexOf("FormData") == -1) {
            clearEmptyParam(options.data)
        }

        return requestAxios({
            url: options.url,
            method: options.type,
            headers: Object.assign({}, options.headers, {
                "Content-Type": options.contentType
                    ? "application/x-www-form-urlencoded"
                    : "multipart/form-data",
                Authorization: sessionStorage.getItem("authorize") || ""
            }),
            // 处理上传进度事件
            onUploadProgress: function (progressEvent) {
                options.onUploadProgress && options.onUploadProgress(progressEvent);
            },
            // 处理下载进度事件
            onDownloadProgress: function (progressEvent) {
                options.onDownloadProgress && options.onDownloadProgress(progressEvent);
            },
            params: options.type.toLowerCase() === 'get' ? options.data || {} : {},
            data:
                options.type.toLowerCase() == "post"
                    ? (options.processData ? qs.stringify(options.data) : options.data) || {}
                    : {},
            responseType: options.dataType || 'json',
            timeout: options.time || 60 * 1000
        }).then((res: any) => {
            if (res.code == ERR_OK) {
                return res
            } else if (res.code == 302) {
                router.push('/login')
                notification.open({
                    message: '提示！',
                    description: res.msg,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                return Promise.reject(res)
            }
            else {
                errorMessage(res.code ? res.code : '未知错误来自接口——' + options.url, res.msg ? res.msg : '未知错误来自接口——' + options.url)
                return Promise.reject(res)
            }

        }).finally(() => {
            // 是否关闭loading
            if (options.isShowLoading) {
                loadingClose()
            }
        })

    }
}

export default loadingAjax()
