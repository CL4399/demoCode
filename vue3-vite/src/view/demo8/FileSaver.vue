<template>
    <div>
        <Button :loading="loading" @click="save">123</Button>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from "ant-design-vue"
//@ts-ignore
import fileSaver from "./FileSaver.js"
export default defineComponent({
    components: { Button },
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            loading: false
        })
        const save = () => {
            dataInfo.loading = true
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
                    fileSaver.saveAs(blob, "hello world.txt");
                    resolve("over")
                }, 3000)
            }).then(() => {
                dataInfo.loading = false
                console.log('over');
            })
        }
        return {
            save,
            ...toRefs(dataInfo)
        }
    },
})
</script>
<style lang='less' scoped>
</style>