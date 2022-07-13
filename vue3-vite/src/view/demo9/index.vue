<template>
    <div>
        <FormCom id="demoRef" :options="options" :rules="rules" @clickInputIcon="clickInputIcon" @confirm="confirm">
        </FormCom>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import FormCom from "./FormCom"
import type { FormProps } from "ant-design-vue"
import { UserAddOutlined, UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue"
import com from "./com.vue"
interface Key {
    [key: string]: string
}
export default defineComponent({
    components: { FormCom, InfoCircleOutlined, UserOutlined, com },
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
                    suffixIcon: InfoCircleOutlined
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
                }, {
                    field: "treeInfo",
                    label: "树选择",
                    placeholder: "请选择",
                    type: "treeSelect",
                    searchValue: "searchValue",
                    filterTreeOption: filterTreeOption,
                    treeCheckble: true,
                    treeData: [
                        {
                            title: 'Node1',
                            value: '0-0',
                            children: [
                                {
                                    title: 'Child Node1',
                                    value: '0-0-0',
                                },
                            ],
                        },
                        {
                            title: 'Node2',
                            value: '0-1',
                            children: [
                                {
                                    title: 'Child Node3',
                                    value: '0-1-0',
                                    disabled: true,
                                },
                                {
                                    title: 'Child Node4',
                                    value: '0-1-1',
                                },
                                {
                                    title: 'Child Node5',
                                    value: '0-1-2',
                                },
                            ],
                        },
                        {
                            title: 'tree',
                            value: '0-2',
                            children: [
                                {
                                    title: 'csgo',
                                    value: '0-2-1',
                                },
                            ],
                        },
                    ]
                },
                {
                    field: "time",
                    label: "日期",
                    placeholder: "请选择日期",
                    type: "datePicker",
                    picker: "date"
                },
                {
                    field: "timeAll",
                    label: "日期",
                    type: "rangePicker",
                    picker: "date"
                }, {
                    field: "picFile",
                    label: "图片",
                    type: "upload",
                    url: "localhost:2333"
                }, {
                    field: "switchValue",
                    label: "开关",
                    type: "switch",
                    switchCheckedChildren: 1,
                    switchUnCheckedChildren: 2,
                }
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "change",
                    },
                ],
            },
            demo: "com"
        })
        const clickInputIcon = (e: any, type: string) => {
            console.log(e, type, "clickInputIcon");
        }
        const confirm = (e: any) => {
            console.log(e, "confirm");

        }

        let router = useRouter()

        return {
            ...toRefs(dataInfo),
            clickInputIcon,
            confirm,
        }
    },
})
</script>
<style lang='less' scoped>
</style>