<template>
    <div>{{ text }}</div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            text: localStorage.getItem("text")
        })
        let obj = computed(() => {
            return localStorage.getItem("text")
        })
        watch(() => obj, (newV) => {
            console.log(newV, "Watch");
        });
        const getItem = () => {
            console.log(localStorage.getItem("text"), "getItem");
            dataInfo.text = localStorage.getItem("text")
        }
        return { ...toRefs(dataInfo), getItem }
    },
})
</script>
<style lang='less' scoped>
</style>