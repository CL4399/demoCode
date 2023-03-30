<template>
    <div>
        <div class="divCom" @click="open">打开弹窗</div>
    </div>
</template>
<script lang="ts">
import { reactive, ref, h, toRefs, getCurrentInstance, ComponentInternalInstance, defineComponent } from "vue"
import { useRouter } from "vue-router"
import com from "./com.vue"
export default defineComponent({
    components: { com },
    setup(props: any, { emit }: any) {
        const {
            appContext: {
                config: {
                    globalProperties: { $message, $layer },
                },
            },
        } = getCurrentInstance() as ComponentInternalInstance

        const open = () => {
            $message.success("open")
            $layer.open({
                title: "标题",
                content: h(com, {
                    name: "123", //子组件参数传递
                    onAdd: handleAdd, // 子组件事件接收
                }),
                area: ["400px", "400px"],
            })
        }
        const handleAdd = (e: any) => {
            console.log(e, "handleAdd")
        }
        return {
            open,
            style: {
                color: "yellowgreen",
                width: "200px",
            },
        }
    },
})
</script>
<style lang="less" scoped>
.divCom {
    width: v-bind("style.width");
    height: 50px;
    background-color: v-bind("style.color");
    margin: 10px;
    text-align: center;
    line-height: 50px;
}
</style>
