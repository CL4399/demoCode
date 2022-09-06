<template>
    <div style="position: relative">
        <Table :dataSource="arrData" :columns="(columns as [])"
            :rowKey="(record: any) => record[rowKey] || record.id" :pagination="pagination" :loading="loading"
            :rowSelection="rowSelection" @change="handlePageChange" :scroll="scroll">
            <template v-slot:title>
                <template v-for="(index, name) in slots" :slot="name">
                    <template v-if="String(name) == 'title'">
                        <slot :name="name" />
                    </template>
                </template>
            </template>
            <template v-slot:bodyCell="{ column, record, text }">
                <template v-if="column.isSlot">
                    <template v-for="(index, name) in slots" :slot="name">
                        <template v-if="name == column.dataIndex">
                            <slot :name="name" :data="record" :text="text" />
                        </template>
                    </template>
                </template>
            </template>

        </Table>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent, getCurrentInstance, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Table } from "ant-design-vue"
import { https } from "../../serve/https"
interface Str {
    [key: string]: string | number | undefined
}
import type { TablePaginationConfig } from "ant-design-vue"
export default defineComponent({
    components: { Table },
    props: {
        columns: {
            type: Array,
            default: () => {
                return [];
            },
        },
        rowKey: {
            type: String,
            default: "id"
        },
        rowSelection: {
            type: Object,
            default: () => {
                return {};
            },
        },
        url: {
            required: true,
            default: "",
        },
        params: {
            type: Object,
            default: function () {
                return {};
            },
        },
        showPageSizeNum: {
            type: Number,
            default: 200
        },
        pagination: {
            type: Object,
            default: () => {
                return {
                    total: 0,
                    showTotal: (total: number) => `共${total}条`,
                    current: 1,
                    pageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "25", "50", "100"],
                    // simple: true, // 简洁模式
                };
            },
        },
        isShowTableLoading: {
            type: Boolean,
            default: true,
        },
        scroll: {
            type: Object,
            default: () => {
                return { y: "calc(100vh - 400px)" };
            },
        },
        arrData: {
            type: Array,
            default: undefined
        }
    },
    setup(props: any, { emit, slots, attr, expose }: any) {
        const { appContext: { config: { globalProperties: { $message } } } } = getCurrentInstance() as any
        let dataInfo = reactive({
            loading: false,
            defaultSize: "default",
            pageProp: {
                page: 1,
                limit: 10,
            } as Str,
            self: null,
            ellipsis: [],
        })
        const init = () => {
            // if (props.url === "") {
            //     $message.warning("请添加请求的路径!", 5000);
            //     return;
            // }
            // dataInfo.loading = props.isShowTableLoading;
            // let data = Object.assign({}, props.params, dataInfo.pageProp);
            // return https({
            //     url: props.url,
            //     method: props.type,
            //     data: data,
            // })
            //     .then((res) => {
            //         let total = res.data.total
            //         let isLimitTotal = props.showPageSizeNum * dataInfo.pageProp.limit
            //         if (props.pagination && total > isLimitTotal) {
            //             props.pagination.showTotal = () => `共${total}条`
            //             props.pagination.total = isLimitTotal
            //         } else {
            //             props.pagination && (props.pagination.total = total || 0);
            //         }
            //         dataInfo.dataSource = res.data[props.dataType].map((item: any, index: any) => {
            //             item._index = index + 1;
            //             return item;
            //         });
            //         if (dataInfo.dataSource.length === 0 && dataInfo.pageProp.page !== 1) {
            //             dataInfo.pageProp.page -= 1;
            //             reload();
            //         }
            //         nextTick(() => {
            //             setTimeout(() => {
            //                 // 防止内容没有渲染完
            //                 setEllipsis();
            //             }, 200);
            //         });
            //         emit("resTableData", res);
            //         // table 选择框问题
            //         try {
            //             props.rowSelection.onReset(res);
            //         } catch (err) {
            //             console.log(err);
            //         }
            //         return Promise.resolve(res);
            //     })
            //     .catch((err) => {
            //         console.log(err, "err");
            //         dataInfo.dataSource = [
            //             {
            //                 key: '1',
            //                 name: '胡彦斌',
            //                 age: 32,
            //                 address: '西湖区湖底公园1号',
            //             },
            //             {
            //                 key: '2',
            //                 name: '胡彦祖',
            //                 age: 42,
            //                 address: '西湖区湖底公园1号',
            //             },
            //         ]
            //         return Promise.reject(err);
            //     })
            //     .finally(() => {
            //         if (props.pagination) {
            //             /* 如果有翻页 更新数据的时候把页面 和 条数 重新给翻页组件更新上 不然一刷新还是默认值 1 10 */
            //             props.pagination.current = props.pageProp.page;
            //             props.pagination.pageSize = props.pageProp.limit;
            //         }
            //         dataInfo.loading = false;
            //     });
        }
        const destroyedTip = () => {
            let tips = document.querySelectorAll(`.${props.tipName}`);
            for (let len = tips.length, i = len - 1; i >= 0; i--) {
                document.body.removeChild(tips[i]);
            }
        }
        const setDomTip = (col: any) => {
            const range = document.createRange();
            range.setStart(col, 0);
            range.setEnd(col, col.childNodes.length);
            let rangeWidth = range.getBoundingClientRect().width;
            const paddingRight = parseInt(
                window.getComputedStyle(col, null).paddingRight,
                10
            );
            const paddingLeft = parseInt(
                window.getComputedStyle(col, null).paddingLeft,
                10
            );
            rangeWidth = rangeWidth + paddingRight + paddingLeft;
            if (rangeWidth > col.clientWidth || col.scrollWidth > col.clientWidth) {
                let tip = document.createElement("div");
                let arrow = document.createElement("div");
                let content = document.createElement("div");
                const colpaddingTop = parseInt(
                    window.getComputedStyle(col, null).paddingTop,
                    10
                );
                const colpaddingLeft = parseInt(
                    window.getComputedStyle(col, null).paddingLeft,
                    10
                );
                content.innerHTML = col.innerText || col.textContent;
                arrow.classList.add("arrow");
                content.className = "content";
                tip.className = `toolTip ${props.tipName}`;
                tip.appendChild(arrow);
                tip.appendChild(content);
                col.onmouseenter = () => {
                    const colClientRect = range.getBoundingClientRect();
                    tip.classList.remove("tipHide");
                    document.body.contains(tip) || document.body.appendChild(tip);
                    let left = colClientRect.left - colpaddingLeft;
                    let valueWidth = document.body.clientWidth - left - tip.offsetWidth;
                    valueWidth < 0 && (left = left + valueWidth);
                    left < 0 && (left = 0);
                    if (left == 0) {
                        arrow.style.left =
                            colClientRect.left - colpaddingLeft + 20 + "px";
                    } else {
                        let arrowLeft = valueWidth < 0 ? 20 - valueWidth : 20;
                        arrow.style.left = arrowLeft + "px";
                    }
                    tip.style.left = left + "px";
                    //@ts-ignore
                    tip.style.right =
                        left === 0 && tip.offsetWidth > document.body.clientWidth
                            ? 0
                            : null;
                    tip.style.bottom =
                        document.body.offsetHeight -
                        colClientRect.top +
                        colpaddingTop +
                        "px";
                };
                col.onmouseleave = () => {
                    tip.classList.add("tipHide");
                };
            }
        }
        const setEllipsis = () => {
            destroyedTip();
            for (let i = 0, len = dataInfo.ellipsis.length; i < len; i++) {
                const col = dataInfo.ellipsis[i];
                // @ts-ignore
                col.setAttribute("title", "");
                setDomTip(col)
            }
        }
        const reload = () => {
            return init();
        }
        const handlePageChange = (pagination: TablePaginationConfig): void => {
            console.log(pagination, "pagination");
            // 翻页 或 改变条数
            dataInfo.pageProp.page = pagination.current;
            dataInfo.pageProp.limit = pagination.pageSize;
            reload();
        }
        // init()
        onMounted(() => {
            console.log(slots, "slot");
        })

        return { ...toRefs(dataInfo), slots, handlePageChange }
    },
})
</script>
<style lang='scss' scoped>
</style>