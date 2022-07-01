<template>
    <div>
        <TableComVue :url="url" :columns="columns" :rowSelection="rowSelection" :rowKey="'id'">
            <template v-slot:title>
                <Button>新增</Button>
                <Button @click="del">删除</Button>
            </template>
            <template v-slot:address="{ data, text }">
                {{ data?.address }}---{{ text }}
            </template>
            <template v-slot:action>
                <Button>删除</Button>
            </template>
        </TableComVue>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import TableComVue from './TableCom.vue'
import TreeSelectComVue from './TreeSelectCom.vue'
import { Button } from "ant-design-vue"
interface Str {
    [key: string]: string
}
import type { TableProps } from "ant-design-vue"
export default defineComponent({
    components: { TableComVue, TreeSelectComVue, Button },
    setup(props: any, proxy: any) {
        let dataInfo = reactive({
            url: "user/list",
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
                    isSlot: true
                }, {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    isSlot: true

                }
            ]
            ,
            data: [
                {
                    value: '1',
                    label: 'Level one 1',
                    children: [
                        {
                            value: '1-1',
                            label: 'Level two 1-1',
                            children: [
                                {
                                    value: '1-1-1',
                                    label: 'Level three 1-1-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: '2',
                    label: 'Level one 2',
                    children: [
                        {
                            value: '2-1',
                            label: 'Level two 2-1',
                            children: [
                                {
                                    value: '2-1-1',
                                    label: 'Level three 2-1-1',
                                },
                            ],
                        },
                        {
                            value: '2-2',
                            label: 'Level two 2-2',
                            children: [
                                {
                                    value: '2-2-1',
                                    label: 'Level three 2-2-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: '3',
                    label: 'Level one 3',
                    children: [
                        {
                            value: '3-1',
                            label: 'Level two 3-1',
                            children: [
                                {
                                    value: '3-1-1',
                                    label: 'Level three 3-1-1',
                                },
                            ],
                        },
                        {
                            value: '3-2',
                            label: 'Level two 3-2',
                            children: [
                                {
                                    value: '3-2-1',
                                    label: 'Level three 3-2-1',
                                },
                            ],
                        },
                    ],
                },
            ],
            selectedRowKeys: []
        })

        const rowSelection: TableProps['rowSelection'] = {
            onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                dataInfo.selectedRowKeys = selectedRowKeys as []
            },
        };
        const del = () => {
            console.log(dataInfo.selectedRowKeys, "del");

        }
        return { ...toRefs(dataInfo), del, rowSelection }
    },
})
</script>
<style lang='scss' scoped>
</style>