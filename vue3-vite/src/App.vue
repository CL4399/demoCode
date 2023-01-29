<template>
    <div class="app">
        <div class="color-item" v-if="showSettingOutlined" @click="changeColor">
            <SettingOutlined style="font-size: 20px"></SettingOutlined>
        </div>
        <ConfigProvider :locale="locale">
            <router-view v-slot="{ Component }">
                <transition :name="transitionName">
                    <component :is="Component" />
                </transition>
            </router-view>
        </ConfigProvider>
    </div>

    <Drawer :visible="visible" class="custom-class" title="主题颜色" placement="right" @close="close">
        <color-picker v-model:pureColor="pureColor" :isWidget="visible" format="hex6" shape="circle" useType="pure" v-model:gradientColor="gradientColor" />
        <Button style="margin-top: 20px" type="primary" @click="confirm">确认</Button>
    </Drawer>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, computed, onMounted, onBeforeMount, watch } from "vue"
import { ConfigProvider, Drawer, Button } from "ant-design-vue"
import { ColorPicker } from "vue3-colorpicker"
import "vue3-colorpicker/style.css"
import { useCounterStore } from "./store/index"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { useRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router"

export default {
    name: "app",
    components: { ColorPicker, Drawer, Button, ConfigProvider },
    setup(props: any, { emit }: any) {
        const store = useCounterStore()
        let dataInfo = reactive({
            pureColor: "#dedede",
            gradientColor: "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)",
            visible: false,
            locale: zhCN,
            showSettingOutlined: false,
        })
        ConfigProvider.config({
            theme: {
                primaryColor: dataInfo.pureColor, // 全局主色
            },
        })
        const changeColor = () => {
            dataInfo.visible = true
        }
        const close = () => {
            dataInfo.visible = false
        }
        const confirm = () => {
            store.setPrimaryColor(dataInfo.pureColor)
            ConfigProvider.config({
                theme: {
                    primaryColor: dataInfo.pureColor,
                },
            })
            const IsWhiteFooter = decideTxtColor(dataInfo.pureColor)
            console.log(IsWhiteFooter, "IsWhiteFooter")
            store.setTextColor(IsWhiteFooter ? "#fff" : "#000")
            sessionStorage.setItem("pureColor", dataInfo.pureColor)
        }
        // 根据色彩值判断，深色true 浅色false
        let decideTxtColor = (colorHexdecimal: any) => {
            const hexToRgb = (hexColor: string) => {
                return parseInt(hexColor, 16).toString()
            }
            let brightnessOfColor = (colorHexdecimalValue: string) => {
                let useColorValue = colorHexdecimalValue.slice(1)
                let rColor = useColorValue.slice(0, 2)
                let gColor = useColorValue.slice(2, 4)
                let bColor = useColorValue.slice(4)
                let rColorValue: any = hexToRgb(rColor)
                let gColorValue: any = hexToRgb(gColor)
                let bColorValue: any = hexToRgb(bColor)
                let lightness = rColorValue * 0.299 + gColorValue * 0.587 + bColorValue * 0.114
                return lightness
            }
            return brightnessOfColor(colorHexdecimal) < 128
        }
        // 颜色翻转
        const colorReverse = (oldColor: string) => {
            oldColor = "0x" + oldColor.replace(/#/g, "")
            //@ts-ignore
            let str = "000000" + (0xffffff - oldColor).toString(16)
            return "#" + str.substring(str.length - 6, str.length)
        }
        const route = useRouter()
        const transitionName = ref("slide-left")
        let router = useRoute()
        watch(
            () => store.showSettingOutlined,
            (newv) => {
                console.log(newv, "watch-showSettingOutlined")
                dataInfo.showSettingOutlined = newv
            }
        )
        onMounted(() => {
            console.log("test-git", store.showSettingOutlined)
            store.setPrimaryColor(dataInfo.pureColor)
            window.addEventListener("load", (e) => {
                dataInfo.pureColor = sessionStorage.getItem("pureColor") ? (sessionStorage.getItem("pureColor") as string) : "#dedede"
                confirm()
                console.log(sessionStorage.getItem("pureColor"), "页面刷新之后")
                // router.replace({ path: sessionStorage.getItem("nowPath") as string })
            })

            // window.addEventListener("beforeunload", () => {
            //   sessionStorage.setItem("nowPath", router.currentRoute.value.path)
            //   console.log(router.currentRoute.value, "router");
            // })

            console.log(router, route, "useRoute")
        })

        onBeforeRouteUpdate((to) => {
            console.log(to, "onBeforeRouteUpdate")
            // const { index: toIndex } = to.meta
            // const { index: fromIndex } = from.meta
            // console.log(toIndex, fromIndex, toIndex < fromIndex)
            // transitionName.value = toIndex < fromIndex ? 'slide-right' : 'slide-left'
            // console.log(transitionName.value)
            // isname.value = to.name
        })

        onBeforeRouteLeave((to) => {
            console.log(to, "onBeforeRouteLeave")
        })

        return { ...toRefs(dataInfo), changeColor, close, confirm, transitionName }
    },
}
</script>
<style lang="less" scoped>
.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.color-item {
    position: fixed;
    top: 8%;
    right: 0px;
    width: 30px;
    height: 30px;
    padding: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    // position: absolute;
}

.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
