<template>
    <div>123</div>
    <div>321</div>

</template>
<script lang='ts'>
import { type } from 'os'
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup(props: any, { emit }: any) {
        interface A {
            title?: string
            name?: string
        }
        interface B {
            title: string
            name?: string
        }
        type C = Required<Pick<A, 'title'>> & Omit<A, "title">

        function test(option: C[]) {
            let arr: B[] = option.filter(i => i.title)
            return arr
        }


        return {}
    },
})
</script>
<style lang='less' scoped>
</style>