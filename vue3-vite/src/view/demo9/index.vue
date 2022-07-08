<template>
    <div>
        <FormCom :options="options" :rules="rules"></FormCom>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import FormCom from "./FormCom"
import type { FormProps } from "ant-design-vue"
interface Key {
    [key: string]: string
}
export default defineComponent({
    components: { FormCom },
    setup(props: any, { emit }: any) {
        const filterTreeOption = (input: string, treeNode: Key) => {
            if (treeNode.value.includes(input)) return treeNode.value.includes(input)
            if (treeNode.title.includes(input)) return treeNode.title.includes(input)
        }
        let dataInfo = reactive({
            options: [
                {
                    field: "name",
                    label: "名称",
                    placeholder: "请输入名称",
                    type: "input",
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
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "change",
                    },
                ],
            }
        })
        return {
            ...toRefs(dataInfo)
        }
    },
})
</script>
<style lang='scss' scoped>
</style>