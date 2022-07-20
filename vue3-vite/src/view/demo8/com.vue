<template>
    <div>
        123
    </div>
    <div :class="objColor[convertState]">{{
            obj[convertState]
    }}</div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
interface Key {
    [key: string]: string
}
export default defineComponent({
    setup(props: any, { emit }: any) {
        const comFun = (el: number) => {
            console.log(el, "comFun");
        }

        let obj: Key = {
            "auditing": "待处理",
            "failure": "审核失败",
            "passed": "审核通过",
            "waitSubmit": "待提交",
            "": ""
        }
        let objColor: Key = {
            "auditing": "text-black",
            "failure": "text-red",
            "passed": "text-green",
        }
        let convertState = "auditing"
        return { comFun, obj, objColor, convertState }
    },
})
</script>
<style lang='less' scoped>
</style>