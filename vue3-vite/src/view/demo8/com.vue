<template>
    <div>
        123
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup(props: any, { emit }: any) {
        const comFun = (el: number) => {
            console.log(el, "comFun");

        }
        return { comFun }
    },
})
</script>
<style lang='less' scoped>
</style>