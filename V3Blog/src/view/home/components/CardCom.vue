<template>
    <div :style="{ backgroundColor: '#fff', margin: '10px', borderRadius: '10px', minHeight: '15vh' }">
        <Card :bordered="false">
            <div>{{ info.title }}</div>
            <div>{{ info.content }}</div>
        </Card>
    </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { Card } from "ant-design-vue"
export default defineComponent({
    components: { Card },
    props: { info: { type: Object, default: {} } },
    setup(props: any, { emit }: any) {
        return {}
    },
})
</script>
<style lang="less" scoped></style>
