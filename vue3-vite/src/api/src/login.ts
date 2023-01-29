import loadingAjax from '../http'

export function login(params: any) {
    return loadingAjax({
        url: '/admin/login',
        type: 'post',
        data: params
    })
        ?.then(res => res).catch(err => {
            return Promise.reject(err)
        })
}

export function loginOut(params?: any) {
    return loadingAjax({
        url: '/admin/logout',
        type: 'post',
        data: params
    })
        ?.then(res => res).catch(err => {
            return Promise.reject(err)
        })
}

export function getCode() {
    return loadingAjax({
        url: '/getCode'
    })
        ?.then(res => res).catch(err => {
            return Promise.reject(err)
        })
}