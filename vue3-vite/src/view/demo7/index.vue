<template>
    <div style="overflow: auto;height: 100%;">
        <TableComVue :url="url" :columns="columns" :rowSelection="rowSelection" :rowKey="'id'" :arrData="dataSource">
            <template v-slot:title>
                <Button @click="addNew">新增</Button>
                <Button @click="del">删除</Button>
                <Button @click="handleExport">导出</Button>
            </template>
            <template v-slot:address="{ data, text }">
                {{ data?.address }}---{{ text }}
            </template>
            <template v-slot:action>
                <Button>删除</Button>
            </template>
        </TableComVue>
        <TreeSearchDemo></TreeSearchDemo>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import TableComVue from './TableCom.vue'
import TreeSelectComVue from './TreeSelectCom.vue'
import TreeSearchDemo from "./TreeSearchDemo.vue"
import { Button } from "ant-design-vue"
import { exportXLS } from "../../utils"
import dayjs from 'dayjs';
interface Str {
    [key: string]: string
}
import type { TableProps } from "ant-design-vue"
export default defineComponent({
    components: { TableComVue, TreeSelectComVue, TreeSearchDemo, Button },
    setup(props: any, proxy: any) {
        const { appContext: { config: { globalProperties: { $message } } } } = getCurrentInstance() as any

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
            selectedRowKeys: [],
            selectedRows: [] as any[],
            dataSource: [] as any[]
        })
        for (let i = 0; i < 3; i++) {
            dataInfo.dataSource.push({
                key: i,
                name: '胡彦祖' + i,
                age: 42,
                address: '西湖区湖底公园1号',
                id: i,
                time: dayjs()
            })
        }
        const rowSelection: TableProps['rowSelection'] = {
            onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                dataInfo.selectedRowKeys = selectedRowKeys as []
                dataInfo.selectedRows = selectedRows as []
            },
        };
        const del = () => {
            console.log(dataInfo.selectedRowKeys, "del");

        }
        const addNew = () => {
            dataInfo.dataSource.push({
                key: dataInfo.dataSource.length + 1,
                name: '胡彦祖' + dataInfo.dataSource.length + 1,
                age: 42,
                address: '西湖区湖底公园1号',
                id: dataInfo.dataSource.length + 1
            })
        }

        const handleExport = () => {
            if (dataInfo.selectedRows.length == 0) return $message.warn("请选择！")

            let array = JSON.parse(JSON.stringify(dataInfo.selectedRows))
            let columns = [
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
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                    key: 'time',
                    isSlot: true
                },
            ]
            let tableBody = array.map((item: any) => {
                let body = JSON.parse(JSON.stringify(item))
                body.time = dayjs(item.time).format("YYYY-MM-DD HH:mm:ss");
                return body
            })
            console.log(tableBody);

            exportXLS(tableBody, columns, `日志`);
        }
        return { ...toRefs(dataInfo), del, rowSelection, addNew, handleExport }
    },
})
</script>
<style lang='scss' scoped>
</style>