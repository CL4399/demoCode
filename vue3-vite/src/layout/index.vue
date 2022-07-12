<template>
  <Layout id="layout-content">
    <LayoutHeader class="header" style="display: flex;"
      :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }">
      <div>
        <Image :width="120" :src="img"></Image>
      </div>
      <Menu :multiple="false" theme="light" mode="horizontal" :style="{
        lineHeight: '64px', backgroundColor: storeObj.primaryColor, marginLeft: '10px', color: storeObj.textColor
      }" style="flex:9;border-bottom:none">
        <MenuItem :key="(item.id as string)" @click="chooseMenu(item)" v-for="item of routerInfo">{{ item.name }}
        </MenuItem>
      </Menu>
      <div>
        <Dropdown>
          <div class="ant-dropdown-link" @click.prevent style="color:#000" :style="{ color: storeObj.textColor }">
            {{ userInfo.userName }}
            <DownOutlined />
          </div>
          <template #overlay>
            <Menu>
              <MenuItem>
              <Button type="link">登出</Button>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </div>
    </LayoutHeader>
    <LayoutContent>
      <Layout style="height: 100%;">
        <LayoutSider width="200" :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }">
          <Menu :style="{ backgroundColor: storeObj.primaryColor }" v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys" mode="inline">
            <SubMenu :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }"
              :key="(item.id as string)" v-for="item of navItemInfo" @click="chooseSubMenu(item)">
              <template #title>
                <span>
                  <user-outlined />
                  {{ item.name }}
                </span>
              </template>
              <MenuItem v-for="i of item.children" :key="(i.id as string)" @click="chooseItem(i)">{{ i.name }}
              </MenuItem>
            </SubMenu>
          </Menu>
        </LayoutSider>
        <LayoutContent :style="{ padding: '24px', minHeight: '280px' }">
          <Breadcrumb>
            <template v-for="item of breadcrumb">
              <BreadcrumbItem v-show="item">{{ item }}</BreadcrumbItem>
            </template>
          </Breadcrumb>
          <router-view></router-view>
        </LayoutContent>
      </Layout>
    </LayoutContent>
    <LayoutFooter style="text-align: center;">
      Ant Design ©2018 Created by Ant UED
    </LayoutFooter>
  </Layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DownOutlined
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs, watch, computed } from "vue";
import {
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
  Image
} from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
interface Obj {
  name: String;
  id: String;
  path?: String;
}
interface RouterInfo {
  name: string;
  id: String;
  children?: Array<{
    name: String;
    id: String;
    children?: Array<Obj>;
  }>;
}
import { useCounterStore } from '../store/index'
import img from "../assets/logo.png"
import demoApi from "../router/routerApi/demoApi"
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
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
    DownOutlined,
    Button,
    Image
  },
  setup() {
    const router = useRouter(),
      route = useRoute();
    let dataInfo = reactive({
      navItemInfo: [] as RouterInfo[],
      breadcrumb: [] as string[],
      selectedKeys1: ref<string[]>(["2"]),
      selectedKeys2: ref<string[]>(["1"]),
      userInfo: { userName: "超级管理员" },
      img: img
    });
    let routerInfo: Array<RouterInfo> = reactive(demoApi);
    const store = useCounterStore()
    let storeObj = computed(() => {
      return store
    })
    dataInfo.navItemInfo = routerInfo[0].children as [];
    dataInfo.breadcrumb[0] = routerInfo[0].name;
    //@ts-ignore
    watch(dataInfo.navItem, (newV) => {
      console.log(newV, "Watch");
    });
    const chooseMenu = (el: RouterInfo) => {
      console.log(el, "chooseMenu");
      dataInfo.navItemInfo = el.children as [];
      dataInfo.breadcrumb[0] = el.name;
      dataInfo.breadcrumb[1] = "";
      dataInfo.breadcrumb[2] = "";
    };
    const chooseSubMenu = (el: RouterInfo) => {
      console.log(el, "chooseMenu");
      dataInfo.breadcrumb[1] = el.name;
      dataInfo.breadcrumb[2] = "";
    };
    const chooseItem = (el: Obj) => {
      //@ts-ignore
      dataInfo.breadcrumb[2] = el.name;
      console.log(el, "chooseMenu");
      router.push(el.path as string);
    };
    return {
      openKeys: ref<string[]>(["sub1"]),
      routerInfo,
      ...toRefs(dataInfo),
      chooseMenu,
      chooseSubMenu,
      chooseItem,
      storeObj
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
