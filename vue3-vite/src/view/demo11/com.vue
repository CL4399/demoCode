<template>
    <div @click="routerPush">{{ text }}store中使用router</div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent, watch, computed } from "vue"
import { useCounterStore } from "../../store/index"
import { formattedData, timeGrouping, judgeDataType } from "../../static/index"
export default defineComponent({
    setup(props: any, { emit }: any) {
        const store = useCounterStore()
        let dataInfo = reactive({
            text: localStorage.getItem("text"),
        })
        let obj = computed(() => {
            return localStorage.getItem("text")
        })
        watch(
            () => obj,
            (newV) => {
                console.log(newV, "Watch")
            }
        )
        const getItem = () => {
            console.log(localStorage.getItem("text"), "getItem")
            dataInfo.text = localStorage.getItem("text")
        }

        console.log(judgeDataType("young")) // "string"
        console.log(judgeDataType(20190214)) // "number"
        console.log(judgeDataType(true)) // "boolean"
        console.log(judgeDataType([], "array")) // true
        console.log(judgeDataType({}, "array")) // false
        // 选项组数组，这是一个筛选组件的数据
        const optionsGroup = [
            {
                groupTitle: "资源类型",
                groupId: "current",
                mode: "multi",
                options: [
                    { text: "直流桩", value: [1, 3], active: true },
                    { text: "交流桩", value: [2, 4, 5], active: false },
                ],
            },
            {
                groupTitle: "通勤方式",
                groupId: "commute",
                mode: "multi", // 多选
                options: [
                    { text: "公交", value: 0, active: true },
                    { text: "地铁", value: 1, active: true },
                    { text: "驾车", value: 1, active: false },
                ],
            },
        ]
        let arr = [
            { time: 20220920144551, name: "1" },
            { time: 20220920144551, name: "2" },
            { time: 20220920144553, name: "3" },
            { time: 20220920144553, name: "4" },
            { time: 20220920144555, name: "5" },
        ]

        console.log(formattedData(optionsGroup), timeGrouping(arr, "time"), "格式化")

        const routerPush = () => {
            store.setRouter("/home")
        }

        return { ...toRefs(dataInfo), getItem, routerPush }
    },
})
</script>
<style lang="less" scoped></style>
