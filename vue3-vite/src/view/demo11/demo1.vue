<template>
    <div>
        <div id="fbox" style="display: block">
            <Input ref="boxRef" id="boxRef" placeholder="1"></Input>
        </div>
        <Input ref="boxRef2" id="boxRef2" placeholder="2"></Input>
        <Button @click="change">123</Button>
        <Button @click="change2">123</Button>
    </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import { Button, Input } from "ant-design-vue"
export default defineComponent({
    components: { Button, Input },
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            isShow: false,
        })
        let boxRef = ref()
        onMounted(() => {
            document.getElementById("boxRef")?.addEventListener("focus", () => {
                dataInfo.isShow = true
            }) //等内容加载完毕，img标签输入内容，img图片不属于内容的一部分
            const proxy = getCurrentInstance()
            const {
                appContext: {
                    config: {
                        globalProperties: { $message },
                    },
                },
            } = getCurrentInstance() as any
            console.log(proxy?.appContext.config.globalProperties)
        })
        const change = () => {
            document.getElementById("boxRef")?.focus()
            if (document.getElementById("boxRef") == document.activeElement) {
                // 聚焦状态
                console.log("聚焦了")
                return
            }
            document.getElementById("boxRef2")?.focus()
            console.log("没聚焦")
        }

        const change2 = () => {
            let dom = document.getElementById("boxRef") as HTMLElement
            console.log(dom.style.display, "dom.style.display")
            if (dom.style.display == "" || dom.style.display == "block") {
                dom.style.display = "none"
            } else {
                dom.style.display = "block"
            }
        }
        const fun = (a = dataInfo.isShow) => {}
        return { ...toRefs(dataInfo), boxRef, change, change2 }
    },
})
</script>
<style lang="less" scoped></style>
