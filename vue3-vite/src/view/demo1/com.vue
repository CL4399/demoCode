<template>
    <div style="padding: 20px">
        <Input v-model:value="value" placeholder="2"></Input>
        <Button @click="click">保存</Button>
        <div @click="clickStr">点击复制文本</div>
    </div>
</template>
<script lang="ts">
import { Button, Input } from "ant-design-vue"
import { reactive, ref, toRefs, provide, getCurrentInstance, ComponentInternalInstance, defineComponent } from "vue"
import { useRouter } from "vue-router"
export default defineComponent({
    components: { Button, Input },
    props: {
        name: {
            type: String,
            default: "",
        },
    },
    setup(props: any, { emit }: any) {
        console.log(props.name, "props")

        const {
            appContext: {
                config: {
                    globalProperties: { $message, $layer },
                },
            },
        } = getCurrentInstance() as ComponentInternalInstance

        let dataInfo = reactive({
            value: "",
        })
        const click = () => {
            emit("add", dataInfo.value)
        }

        const copyToClipboard = (text: string) => {
            // 复制文本到剪切板
            navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text)
        }

        const clickStr = (e: any) => {
            copyToClipboard(e.target.outerText)
        }
        return { ...toRefs(dataInfo), click, clickStr }
    },
})
</script>
<style lang="less" scoped></style>
