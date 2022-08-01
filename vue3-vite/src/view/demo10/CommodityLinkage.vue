<template>
    <div class="info-line" v-for="key in Object.keys(menuInfo)" :key="key">
        <div class="info-title"> {{ menuInfo[key].title }}</div>
        <div class="info-list">
            <div class="info-item" v-for="(item, idx) in menuInfo[key].arr" :key="item.value"
                @click="itemClick(item, key, idx)"
                :class="{ active: menuInfo[key].activeIdx === idx, disabled: item.disabled }">{{ item.value }}</div>
        </div>
    </div>
    <p>当前筛选条件</p>
    <div>{{ filterList }}</div>
    <p>当前结果数据</p>
    <div>{{ resList }}</div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            menuInfo: {
                size: {
                    activeIdx: -1,
                    title: "大小",
                    arr: [{
                        value: "XS",
                        disabled: false
                    }, {
                        value: "S",
                        disabled: false
                    }, {
                        value: "M",
                        disabled: false
                    }, {
                        value: "L",
                        disabled: false
                    }]
                },
                color: {
                    activeIdx: -1,
                    title: "颜色",
                    arr: [
                        {
                            value: "红色",
                            disabled: false
                        }, {
                            value: "绿色",
                            disabled: false
                        }, {
                            value: "蓝色",
                            disabled: false
                        }, {
                            value: "白色",
                            disabled: false
                        }
                    ]
                },
                material: {
                    activeIdx: -1,
                    title: "面料",
                    arr: [
                        {
                            value: "涤纶",
                            disabled: false
                        }, {
                            value: "纯棉",
                            disabled: false
                        }, {
                            value: "人造革",
                            disabled: false
                        },
                    ]
                }
            } as any,
            infoArr: [
                {
                    color: "红色",
                    size: "S",
                    material: "人造革",
                    num: 50,
                    price: 84
                },
                {
                    color: "黑色",
                    size: "M",
                    material: "涤纶",
                    num: 50,
                    price: 84
                },
                {
                    color: "白色",
                    size: "L",
                    material: "纯棉",
                    num: 50,
                    price: 124
                },
                {
                    color: "蓝色",
                    size: "S",
                    material: "人造革",
                    num: 50,
                    price: 84
                }
            ],
            filterList: [] as any,
            resList: [] as any
        })

        const itemClick = (item: any, key: any, idx: any) => {
            const filterIdx = dataInfo.filterList.findIndex((item: any) => item.key === key)
            if (dataInfo.menuInfo[key].activeIdx === idx) {
                dataInfo.menuInfo[key].activeIdx = -1
                if (filterIdx > -1) dataInfo.filterList.splice(filterIdx, 1)
            } else {
                if (!item.disabled) {
                    dataInfo.menuInfo[key].activeIdx = idx
                    if (filterIdx > -1) {
                        dataInfo.filterList.splice(filterIdx, 1, {
                            key,
                            value: item.value
                        })
                    } else {
                        dataInfo.filterList.push(
                            {
                                key,
                                value: item.value
                            }
                        )
                    }
                }
            }
            refReshDom()
        }
        const refReshDom = () => {
            dataInfo.resList = [...dataInfo.infoArr]
            for (let i = 0; i < dataInfo.filterList.length; i++) {
                const filterItem = dataInfo.filterList[i]
                dataInfo.resList = [...dataInfo.resList.filter((item: any) => item[filterItem.key] === filterItem.value)]
            }
            Object.keys(dataInfo.menuInfo).forEach(key => {
                dataInfo.menuInfo[key].arr.forEach((item: any) => {
                    const it = dataInfo.resList.find((subItem: any) => subItem[key] === item.value)
                    item.disabled = it ? false : true
                })
            })
        }
        onMounted(() => {
            refReshDom()
        })
        return {
            ...toRefs(dataInfo),
            itemClick
        }
    },
})
</script>
<style lang='less' scoped>
.info-line {
    padding-top: 20px;
}

.info-title {
    font-size: 14px;
    font-weight: bold;
}

.info-list {
    display: flex;
    column-gap: 20px;
    padding-top: 10px;
}

.info-item {
    padding: 4px 10px;
    border: 1px solid #000;
    display: inline-block;
    cursor: pointer;
    font-size: 12px;
}

.active {
    color: red;
    border-color: red;
}

.disabled {
    color: #999;
    border-color: #999;
    cursor: not-allowed;
}
</style>