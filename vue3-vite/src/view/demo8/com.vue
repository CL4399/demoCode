<template>
    <div :class="objColor[convertState]">{{ obj[convertState] }}</div>
    <Input @change="changeInput"></Input>
    <div style="width: 200px; height: 200px; background-color: aqua" @mousemove="mousemove"></div>
    <Button @click="clickButton">123</Button>
    <br />
    <Checkbox v-model:checked="checked" :disabled="false">123</Checkbox>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { Input, Button, Checkbox } from "ant-design-vue"
import FileSaver from "./FileSaver.js"
interface Key {
    [key: string]: string
}
import _ from "lodash"
export default defineComponent({
    components: { Input, Button, Checkbox },
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            name: "123",
            type: "123",
            checked: false,
        })
        const comFun = (el: number) => {
            console.log(el, "comFun")
        }

        let obj: Key = {
            auditing: "待处理",
            failure: "审核失败",
            passed: "审核通过",
            waitSubmit: "待提交",
            "": "",
        }
        let objColor: Key = {
            auditing: "text-black",
            failure: "text-red",
            passed: "text-green",
        }
        let convertState = "auditing"
        const changeInput = _.debounce((e: any) => {
            console.log(e, "changeInput")
        }, 1000)
        const mousemove = _.debounce((e: any) => {
            console.log(e, "mousemove")
        }, 1000)
        const clickButton = _.throttle(
            (e: any) => {
                console.log(e, "clickButton")
            },
            2000,
            { leading: false, trailing: true }
        )
        return { ...toRefs(dataInfo), comFun, obj, objColor, convertState, changeInput, mousemove, clickButton }
    },
})
</script>
<style lang="less" scoped>

</style>
