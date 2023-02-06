<template>
    <FormCom id="demoRef" :options="options" :rules="rules" @clickInputIcon="clickInputIcon" @confirm="confirm"> </FormCom>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue"
import { useRouter } from "vue-router"
import FormCom from "./FormCom"
import type { FormProps } from "ant-design-vue"
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue"
interface Key {
    [key: string]: string
}
export default defineComponent({
    components: { FormCom, InfoCircleOutlined, UserOutlined },
    setup(props: any, { emit }: any) {
        const filterTreeOption = (input: string, treeNode: Key) => {
            if (treeNode.value.includes(input)) return treeNode.value.includes(input)
            if (treeNode.title.includes(input)) return treeNode.title.includes(input)
        }
        const filterSelectOption = (input: string, option: any) => {
            return String(option.label).toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        let dataInfo = reactive({
            options: [
                {
                    field: "name",
                    label: "名称",
                    placeholder: "请输入名称",
                    type: "input",
                    prefix: true,
                    suffix: true,
                    prefixIcon: UserOutlined,
                    suffixIcon: InfoCircleOutlined,
                },
                {
                    field: "text",
                    label: "备注",
                    placeholder: "请输入备注",
                    type: "textarea",
                },
                {
                    field: "age",
                    label: "年龄",
                    placeholder: "请输入年龄",
                    type: "input",
                },
                {
                    field: "sex",
                    label: "性别",
                    placeholder: "请选择性别",
                    type: "select",
                    showSelectSearch: true,
                    filterSelectOption: filterSelectOption,
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ],
                    // mode:"multiple"
                },
                {
                    field: "job",
                    label: "工作",
                    placeholder: "请选择工作",
                    type: "radioGroup",
                    options: [
                        { label: "IT", value: 1 },
                        { label: "work", value: 2 },
                    ],
                },
                {
                    field: "treeInfo",
                    label: "树选择",
                    placeholder: "请选择",
                    type: "treeSelect",
                    searchValue: "searchValue",
                    filterTreeOption: filterTreeOption,
                    treeCheckble: true,
                    treeData: [
                        {
                            title: "Node1",
                            value: "0-0",
                            children: [
                                {
                                    title: "Child Node1",
                                    value: "0-0-0",
                                },
                            ],
                        },
                        {
                            title: "Node2",
                            value: "0-1",
                            children: [
                                {
                                    title: "Child Node3",
                                    value: "0-1-0",
                                    disabled: true,
                                },
                                {
                                    title: "Child Node4",
                                    value: "0-1-1",
                                },
                                {
                                    title: "Child Node5",
                                    value: "0-1-2",
                                },
                            ],
                        },
                        {
                            title: "tree",
                            value: "0-2",
                            children: [
                                {
                                    title: "csgo",
                                    value: "0-2-1",
                                },
                            ],
                        },
                    ],
                },
                {
                    field: "time",
                    label: "日期",
                    placeholder: "请选择日期",
                    type: "datePicker",
                    picker: "date",
                },
                {
                    field: "timeAll",
                    label: "日期",
                    type: "rangePicker",
                    picker: "date",
                },
                {
                    field: "picFile",
                    label: "图片",
                    type: "upload",
                    url: "localhost:2333",
                },
                {
                    field: "switchValue",
                    label: "开关",
                    type: "switch",
                    switchCheckedChildren: "开",
                    switchUnCheckedChildren: "关",
                },
                {
                    field: "check",
                    label: "多选",
                    type: "checkboxGroup",
                    options: [
                        { label: "IT", value: 1 },
                        { label: "work", value: 2 },
                        { label: "order", value: 3, disabled: true },
                    ],
                },
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur", // change|blur
                    },
                ],
            },
            demo: "com",
        })
        const clickInputIcon = (e: any, type: string) => {
            console.log(e, type, "clickInputIcon")
        }
        const confirm = (e: any) => {
            console.log(e, "confirm")
        }
        const parseArea = async () => {
            let result: any[] = []
            await myAmapFun().then((res) => {
                console.log(res, "res111")
                result.push(res)
            })
            console.log(result, "res222")
        }
        const myAmapFun = () => {
            return new Promise((resolve, reject) => {
                resolve("123")
            })
        }
        parseArea()
        let router = useRouter()

        const isObject = (target: any) => (typeof target === "object" || typeof target === "function") && target !== null
        // 深克隆
        function deepClone(target: any, map = new WeakMap()) {
            if (map.get(target)) {
                return target
            }
            // 获取当前值的构造函数：获取它的类型
            let constructor = target.constructor
            // 检测当前对象target是否与正则、日期格式对象匹配
            if (/^(RegExp|Date)$/i.test(constructor.name)) {
                // 创建一个新的特殊对象(正则类/日期类)的实例
                return new constructor(target)
            }
            if (isObject(target)) {
                map.set(target, true) // 为循环引用的对象做标记
                const cloneTarget: any = Array.isArray(target) ? [] : {}
                for (let prop in target) {
                    if (target.hasOwnProperty(prop)) {
                        cloneTarget[prop] = deepClone(target[prop], map)
                    }
                }
                return cloneTarget
            } else {
                return target
            }
        }

        let obj = {
            name: "123",
            fun: () => {
                return 123
            },
            time: new Date(),
        }

        let obj2 = deepClone(obj)
        console.log(obj, obj2, "deepClone")

        return {
            ...toRefs(dataInfo),
            clickInputIcon,
            confirm,
        }
    },
})
</script>
<style lang="less" scoped></style>
