<template>
    <Layout id="layout-content" style="background: none">
        <LayoutHeader class="header" style="display: flex; align-items: center; background: none" :style="{ color: storeObj.textColor }">
            <div style="margin-top: 30px; flex: 1">
                <Image :width="120" :src="img"></Image>
            </div>
            <div style="flex: 8"></div>
            <Menu
                :multiple="false"
                theme="light"
                mode="horizontal"
                :style="{
                    lineHeight: '64px',
                    marginLeft: '10px',
                    color: storeObj.textColor,
                }"
                style="flex: 2; border-bottom: none; background: none"
            >
                <MenuItem :key="(item.id as string)" @click="chooseMenu(item)" v-for="item of routerInfo">
                    <Dropdown>
                        <div class="ant-dropdown-link" @click.prevent :style="{ color: storeObj.textColor }">
                            {{ item.name }}
                        </div>
                        <template #overlay>
                            <Menu style="background: none">
                                <template v-for="i of item.children" :key="i.id">
                                    <MenuItem v-if="i.children?.length == 0">
                                        <Button :style="{ color: storeObj.textColor }" type="link" @click="chooseItem(i)">{{ i.name }}</Button>
                                    </MenuItem>
                                    <SubMenu style="background: none">
                                        <template #title>
                                            <span :style="{ color: storeObj.textColor }">{{ i.name }}</span>
                                        </template>
                                        <MenuItem style="opacity: 1;" v-for="t of i.children" :key="t.id" @click="chooseItem(t)"> {{ t.name }}</MenuItem>
                                    </SubMenu>
                                </template>
                            </Menu>
                        </template>
                    </Dropdown>
                </MenuItem>
            </Menu>
            <div style="margin: 0px 10px 0 0; display: flex">
                <Dropdown>
                    <div class="ant-dropdown-link" @click.prevent :style="{ color: storeObj.textColor }">
                        {{ userInfo.userName }}
                        <DownOutlined />
                    </div>
                    <template #overlay>
                        <Menu style="background: none">
                            <MenuItem>
                                <Button type="link" :style="{ color: storeObj.textColor }">登出</Button>
                            </MenuItem>
                        </Menu>
                    </template>
                </Dropdown>
            </div>
            <div @click="fullscreen" style="margin: 0px 10px 5px 10px">
                <FullscreenOutlined v-if="!fullscreenis"></FullscreenOutlined>
                <FullscreenExitOutlined v-else></FullscreenExitOutlined>
            </div>
        </LayoutHeader>

        <LayoutContent :style="{ padding: '24px', minHeight: '280px' }">
            <Breadcrumb>
                <template v-for="item of breadcrumb">
                    <BreadcrumbItem v-show="item">{{ item }}</BreadcrumbItem>
                </template>
            </Breadcrumb>
            <router-view></router-view>
        </LayoutContent>

        <LayoutFooter style="text-align: center; background: none; opacity: 1" :style="{ color: storeObj.textColor }"> Wellcome To My Blog ©2022 </LayoutFooter>
    </Layout>
</template>
<script lang="ts">
import Icon from "@ant-design/icons-vue"
import { defineComponent, reactive, ref, toRefs, watch, computed } from "vue"
import { Layout, LayoutHeader, LayoutFooter, LayoutSider, LayoutContent, Menu, MenuItem, SubMenu, Breadcrumb, BreadcrumbItem, Dropdown, Button, Image } from "ant-design-vue"
import { useRouter, useRoute } from "vue-router"
interface Obj {
    name: string
    id: string
    path?: string
}
interface RouterInfo {
    name: string
    id: string
    icon?: string
    children?: Array<{
        name: string
        id: string
        children?: Array<Obj>
        icon?: string
    }>
}
import { useCounterStore } from "../store/index"
import img from "../assets/logo.png"
import demoApi from "../router/routerApi/demoApi"
export default defineComponent({
    components: {
        Layout,
        LayoutHeader,
        LayoutFooter,
        LayoutSider,
        LayoutContent,
        Menu,
        MenuItem,
        SubMenu,
        Breadcrumb,
        BreadcrumbItem,
        Dropdown,
        Button,
        Image,
        Icon,
    },
    setup() {
        const router = useRouter(),
            route = useRoute()
        let dataInfo = reactive({
            navItemInfo: [] as RouterInfo[],
            breadcrumb: [] as string[],
            selectedKeys1: ref<string[]>(["2"]),
            selectedKeys2: ref<string[]>(["1"]),
            userInfo: { userName: "超级管理员" },
            img: img,
            fullscreenis: false,
            collapsed: false,
            selectedKeys: ["1"],
            openKeys: ["sub1"],
            preOpenKeys: ["sub1"],
            item: "",
        })
        let routerInfo: Array<RouterInfo> = reactive(demoApi)
        const store = useCounterStore()
        let storeObj = computed(() => {
            return store
        })
        dataInfo.navItemInfo = routerInfo[0].children as []
        dataInfo.breadcrumb[0] = routerInfo[0].name

        watch(
            () => dataInfo.item,
            (newV) => {
                console.log(newV, "Watch")
            }
        )

        watch(dataInfo.openKeys, (newV) => {
            console.log(newV, "Watch")
            dataInfo.preOpenKeys = newV
        })

        watch(
            () => storeObj.value.textColor,
            (newV) => {
                console.log(newV, "textColor")
            }
        )

        const chooseMenu = (el: RouterInfo) => {
            dataInfo.navItemInfo = el.children as []
            dataInfo.breadcrumb[0] = el.name
            dataInfo.breadcrumb[1] = ""
            dataInfo.breadcrumb[2] = ""
            console.log(el, "chooseMenu")
        }
        const chooseSubMenu = (el: RouterInfo) => {
            dataInfo.breadcrumb[1] = el.name
            console.log(el, "chooseSubMenu")
        }
        const chooseItem = (el: Obj) => {
            console.log(el, "??????????")

            dataInfo.breadcrumb[3] = el.name
            console.log(dataInfo.breadcrumb, "chooseItem")
            router.push(el.path as string)
        }
        const fullscreen = () => {
            dataInfo.fullscreenis = !dataInfo.fullscreenis
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
            }
        }
        const toggleCollapsed = () => {
            dataInfo.collapsed = !dataInfo.collapsed
            dataInfo.openKeys = dataInfo.collapsed ? [] : dataInfo.preOpenKeys
        }

        return {
            routerInfo,
            ...toRefs(dataInfo),
            chooseMenu,
            chooseSubMenu,
            chooseItem,
            storeObj,
            fullscreen,
            toggleCollapsed,
        }
    },
})
</script>
<style>
#layout-content {
    height: 100vh;
    /* background-color: #000; */
}

#components-layout-demo-top-side .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    /* background: rgba(255, 255, 255, 0.3); */
}

.ant-row-rtl #components-layout-demo-top-side .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

.site-layout-background {
    /* background: #fff; */
}
</style>
