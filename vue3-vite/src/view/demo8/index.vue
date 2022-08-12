<template>
    <div ref="demo1">111</div>
    <!-- <button data-warden-container value="xxxxxx" ref="bun">222</button> -->
    <ComVue></ComVue>
    <FileSaver></FileSaver>
</template>
<script lang='ts' setup>
import { reactive, ref, toRefs, provide, defineComponent, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ComVue from './com.vue';
import FileSaver from './FileSaver.vue';
// const internalInstance = getCurrentInstance()
// const trace = internalInstance?.appContext.config.globalProperties.$trace
// interface Str {
//     [key: string]: null | HTMLElement
// }
// let arr: string[] = ["demo1", "demo2", "demo3"]
// let dataInfo: Str = reactive({
//     demo1: null,
//     demo2: null,
//     demo3: null,
// })

// const { demo1, demo2, demo3 } = toRefs(dataInfo)
// const demo4 = ref()
// const demo5 = ref()
// const demo6 = ref()
// onMounted(() => {
//     for (let i of arr) {
//         console.log(dataInfo[i], "???????");
//     }
//     // [4, 5, 6].map(item => {
//     //     console.log(`demo${item}`);
//     // })
// })
// const obj = Object.create({});
// obj.name = "xl";
// console.log(obj.hasOwnProperty("name")); // true

// const obj1 = Object.create(null);
// obj1.name = "xl";
// try {
//     console.log(obj1.hasOwnProperty("name"));
// } catch (error) {
//     console.log(error); // error: obj1.hasOwnProperty is not a function
// }
// const obj2 = Object.create(null);
// obj2.name = "xl";
// console.log(Object.hasOwn(obj2, "name")); // true



const PORT_REG_MORE = /^(0|([1-9][0-9]{0,3})|([1-6][0-5][0-5][0-3][0-5]))(-(([1-9][0-9]{0,3})|([1-6][0-5][0-5][0-3][0-5])))?$/;
const PORT_REG_MORET = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
const CheckMorePortT = (value: string,) => {
    let str = ""
    if (value) {
        value.split(',').forEach(port => {
            if (port.includes('-')) {
                let portArr = port.split('-')
                if (portArr[0] >= portArr[1]) {
                    str = '请输入正确的端口号格式,如20,21-30'
                } else {
                    port.split('-').forEach(item => {
                        if (!PORT_REG_MORET.test(item)) {
                            str = '请输入正确的端口号格式,如20,21-30'
                        } else {
                            str = "正确"
                        }
                    })
                }

            } else {
                if (!PORT_REG_MORET.test(port)) {
                    str = '请输入正确的端口号格式,如20,21-30'
                } else {
                    str = '正确'
                }
            }
        })
    }
    return str
};
const CheckMorePort = (value: string) => {
    let str = ""
    if (value) {
        value.split(',').forEach(port => {
            if (!PORT_REG_MORE.test(port)) {
                str = '请输入正确的端口号格式,如20,21-30'
            } else {
                if (port.includes('-')) {
                    let portArr = port.split('-')
                    if (portArr[0] >= portArr[1]) {
                        str = '请输入正确的端口号格式,如20,21-30'
                    } else {
                        str = "正确"
                    }
                } else {
                    str = "正确"
                }
            }
        })
    }
    return str
};
let str = CheckMorePort("57852,57855,57857-57859,57864,57866,57868-57869,57872-57876,57881-57882,57884,57888,57891,57894-57895,57898,57901-57904,57907")
let strT = CheckMorePortT("57852,57855,57857-57859,57864,57866,57868-57869,57872-57876,57881-57882,57884,57888,57891,57894-57895,57898,57901-57904,57907")
console.log(CheckMorePort('23451-23452'), "---", CheckMorePortT('23451-23452'));
console.log(str, "---", strT);
console.log(CheckMorePort('12,23451-23452'), "---", CheckMorePortT('12,23451-23452'));
console.log(CheckMorePort('1-12345'), "---", CheckMorePortT('1-12345'));
console.log(CheckMorePort('123-12345'), "---", CheckMorePortT('123-12345'));

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
type T5 = TypeName<1>;  // "number"
type T6 = TypeName<undefined>;  // "undefined"

let arr = [["name", "jack"], ["age", "12"]]
// Object.fromEntries() 方法把键值对列表转换为一个对象
console.log(Object.fromEntries(arr), "???????????????????");

</script>
<style lang='scss' scoped>
</style>