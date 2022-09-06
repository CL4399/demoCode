import { https } from "../../serve/https"
export function list(param: any) {
    return https({
        baseUrl: "/api/v1/search",
        method: "GET",
        data: param,
    }).then(res => {
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}