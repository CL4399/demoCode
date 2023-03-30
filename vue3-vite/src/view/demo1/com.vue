<template>
    <div style="padding: 20px">
        <Input v-model:value="value" placeholder="2"></Input>
        <Button @click="click">保存</Button>
    </div>
</template>
<script lang="ts">
import { Button, Input } from "ant-design-vue"
import { reactive, ref, toRefs, provide, defineComponent } from "vue"
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
        let dataInfo = reactive({
            value: "",
        })
        const click = () => {
            emit("add", dataInfo.value)
        }
        return { ...toRefs(dataInfo), click }
    },
})
</script>
<style lang="less" scoped></style>
