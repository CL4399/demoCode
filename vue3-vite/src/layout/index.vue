<template>
    <Layout id="layout-content">
        <LayoutHeader class="header" style="background-color: #fff;">
            <div class="logo" />
            <Menu :multiple="false" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
                <MenuItem :key="(item.id as string)" @click="chooseMenu(item)" v-for="item of routerInfo">{{ item.name
                }}</MenuItem>
            </Menu>
        </LayoutHeader>
        <LayoutContent>
            <Breadcrumb style="margin: 16px 0">
                <template v-for="item of breadcrumb">
                    <BreadcrumbItem v-show="item">{{ item }}</BreadcrumbItem>
                </template>

            </Breadcrumb>
            <Layout style="background: #fff; height:100%">
                <LayoutSider width="200" style="background: #fff">
                    <Menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline">
                        <SubMenu :key="(item.id as string)" v-for="item of navItemInfo" @click="chooseSubMenu(item)">
                            <template #title>
                                <span>
                                    <user-outlined />
                                    {{ item.name }}
                                </span>
                            </template>
                            <MenuItem v-for="i of item.children" :key="(i.id as string)" @click="chooseItem(i)">{{
                                    i.name
                            }}</MenuItem>
                        </SubMenu>
                    </Menu>
                </LayoutSider>
                <LayoutContent :style="{ padding: '24px', minHeight: '280px' }">
                    <router-view></router-view>
                </LayoutContent>
            </Layout>
        </LayoutContent>
        <LayoutFooter style="text-align: center">
            Ant Design ©2018 Created by Ant UED
        </LayoutFooter>
    </Layout>
</template>
<script lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { Layout, LayoutHeader, LayoutFooter, LayoutSider, LayoutContent, Menu, MenuItem, SubMenu, Breadcrumb, BreadcrumbItem } from "ant-design-vue"
import { useRouter, useRoute } from 'vue-router';
interface Obj {
    name: String,
    id: String,
    path?: String,
}
interface RouterInfo {
    name: string,
    id: String,
    children?: Array<{
        name: String,
        id: String,
        children?: Array<Obj>
    }>
}
export default defineComponent({
    components: {
        UserOutlined,
        LaptopOutlined,
        NotificationOutlined,
        Layout, LayoutHeader, LayoutFooter, LayoutSider, LayoutContent, Menu, MenuItem, SubMenu, Breadcrumb, BreadcrumbItem
    },
    setup() {
        const router = useRouter(), route = useRoute();
        let dataInfo = reactive({
            navItemInfo: [] as RouterInfo[],
            breadcrumb: [] as string[],
            selectedKeys1: ref<string[]>(['2']),
            selectedKeys2: ref<string[]>(['1']),
        })
        let routerInfo: Array<RouterInfo> = reactive([
            {
                name: "nav 1",
                id: "1",
                children: [
                    {
                        name: "SubNav 1-1",
                        id: "1-1",
                        children: [
                            {
                                name: "option 1",
                                id: "1-1-1",
                                path: "/demo1"
                            }
                        ]
                    },
                    {
                        name: "SubNav 1-2",
                        id: "1-2",
                        children: [
                            {
                                name: "option 1",
                                id: "1-2-1",
                                path: "/demo2"
                            }
                        ]
                    }, {
                        name: "Canvas",
                        id: "1-3",
                        children: [
                            {
                                name: "demo1",
                                id: "1-3-1",
                                path: "/canvas-demo1"
                            },
                            {
                                name: "demo2",
                                id: "1-3-2",
                                path: "/canvas-demo2"
                            },
                            {
                                name: "demo3",
                                id: "1-3-3",
                                path: "/canvas-demo3"
                            }
                        ]
                    }
                ]
            }, {
                name: "nav 2",
                id: "2",
                children: [
                    {
                        name: "SubNav 2-1",
                        id: "2-1",
                        children: [
                            {
                                name: "option 1",
                                id: "2-1-1",
                                path: "/demo3"
                            }
                        ]
                    },
                    {
                        name: "SubNav 2-2",
                        id: "2-2",
                        children: [
                            {
                                name: "option 1",
                                id: "2-2-1",
                                path: "/demo4"
                            }
                        ]
                    }
                ]
            }
        ])
        dataInfo.navItemInfo = routerInfo[0].children as []
        dataInfo.breadcrumb[0] = routerInfo[0].name
        //@ts-ignore
        watch(dataInfo.navItem, (newV) => {
            console.log(newV, "Watch")
        })
        const chooseMenu = (el: RouterInfo) => {
            console.log(el, "chooseMenu")
            dataInfo.navItemInfo = el.children as []
            dataInfo.breadcrumb[0] = el.name
            dataInfo.breadcrumb[1] = ""
            dataInfo.breadcrumb[2] = ""
        }
        const chooseSubMenu = (el: RouterInfo) => {
            console.log(el, "chooseMenu")
            dataInfo.breadcrumb[1] = el.name
            dataInfo.breadcrumb[2] = ""
        }

        const chooseItem = (el: Obj) => {
            //@ts-ignore
            dataInfo.breadcrumb[2] = el.name
            console.log(el, "chooseMenu")
            router.push(el.path as string);
        }

        return {

            openKeys: ref<string[]>(['sub1']),
            routerInfo,
            ...toRefs(dataInfo),
            chooseMenu,
            chooseSubMenu,
            chooseItem
        };
    },
});
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
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

.site-layout-background {
    background: #fff;
}
</style>