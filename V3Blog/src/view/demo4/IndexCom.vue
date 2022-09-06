<template>
    <div>
        <Button @click="clickMe">321</Button>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, useAttrs, getCurrentInstance, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from "ant-design-vue"
export default defineComponent({
    components: { Button },
    setup(props: any, { emit }: any) {
        const attrs = useAttrs()
        console.log(attrs, "attts");
        const clickMe = (e: MouseEvent) => {
            const { onFun } = attrs as any
            let target = e.target as HTMLButtonElement
            onFun(target.innerText)
            console.log(target.innerText, "ClickMe");
        }
        const proxy = getCurrentInstance()
        // @ts-ignore
        proxy?.parent?.ctx.fun(2222)
        // @ts-ignore
        console.log(proxy?.parent?.ctx, 'proxy');

        return { attrs, clickMe }
    },
})
</script>
<style lang='scss' scoped>
</style>