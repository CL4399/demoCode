<template>
    <div class="login-wrap">
        <div class="ms-login">
            <Button class="ms-title" @click="login">Login</Button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useCounterStore } from "../../store/index"
import { Button } from "ant-design-vue"
export default defineComponent({
    components: { Button },
    setup() {
        const route = useRouter()
        const store = useCounterStore()
        const login = () => {
            sessionStorage.setItem('authorize',"1235465465435145634")
            route.push("/demo1")
            store.setShowSettingOutlined(true)
        }
        onMounted(() => {
            store.setShowSettingOutlined(false)
        })

        return { login }
    },
})
</script>
<style lang="less" scoped>
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
</style>
