<template>
    <div @click="routerPush">{{ text }}store中使用router</div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent, watch, computed } from "vue"
import { useCounterStore } from "../../store/index"
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

        function judgeDataType(val: any, type?: any) {
            const dataType = Object.prototype.toString
                .call(val)
                .replace(/\[object (\w+)\]/, "$1")
                .toLowerCase()
            return type ? dataType === type : dataType
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

        // 3行代码搞定
        // 先在options里面添加上groupId
        // flatMap会将options数组即[ [{ text: '公交', value: 0, active: true, groupId: 'commute' }], ...]变成[{ text: '公交', value: 0, active: true, groupId: 'commute' }, ...]
        const activated = optionsGroup.flatMap((item) => item.options.map((option) => ({ ...option, groupId: item.groupId }))).filter((item) => item.active)
        console.log(activated, "activated")

        let arr = [
            { time: 20220920144551, name: "1" },
            { time: 20220920144551, name: "2" },
            { time: 20220920144553, name: "3" },
            { time: 20220920144553, name: "4" },
            { time: 20220920144555, name: "5" },
        ]

        let fun = (arr: any) => {
            let obj: any = {},
                result: any = []
            arr.forEach((item: any) => {
                if (!obj[item.time]) {
                    obj[item.time] = { value: [] }
                }
                obj[item.time].value.push(item)
            })
            for (let key in obj) {
                result.push({ [key]: obj[key] })
            }
            return result
        }

        console.log(fun(arr), "???????????????????????")
        const routerPush = () => {
            store.setRouter("/home")
        }

        return { ...toRefs(dataInfo), getItem, routerPush }
    },
})
</script>
<style lang="less" scoped></style>
