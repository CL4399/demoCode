// stores/counter.js
import { defineStore } from 'pinia'
// import { useRouter } from "vue-router"
import router from "../router/index"
// the first argument is a unique id of the store across your application
export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            count: 0,
            testNum: null as Object | null,
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
            objInfo: {
                name: "1"
            } as object,
            primaryColor: "#dedede",
            textColor: "#fff",
            showSettingOutlined: false,
            // token
            authorize: null as string | null
        }
    },
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
        setNum(obj: Object) {
            this.testNum = obj
        },
        setObj(obj: object) {
            this.objInfo = obj
        },
        setPrimaryColor(str: string) {
            this.primaryColor = str
        },
        setTextColor(str: string) {
            this.textColor = str
        },
        setRouter(str: string) {
            // let router = useRouter()
            router.push(str)
        },
        setShowSettingOutlined(data: boolean) {
            this.showSettingOutlined = data
        },
        setAuthorize(str: string | null) {
            this.authorize = str
        }
    },
})





