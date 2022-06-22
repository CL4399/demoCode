import {
    https
} from '../serve/https'
// get请求带参数
export const getUserList = (data: Object) =>
    https({
        url: 'user/list',
        data,
    })
export const editUser = (data: Object) =>
    https({
        url: 'user/edit',
        method: "POST",
        data,
        baseUrl: "http://localhost:3389/api"
    })