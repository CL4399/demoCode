<template>
    asdasdasd
    <div v-if="active">{{ active }}</div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue"
import { useRouter } from "vue-router"
export default defineComponent({
    setup(props: any, { emit }: any) {
        return {
            active: false,
        }
    },
})
</script>
<style lang="less" scoped></style>
