<template>
  <Layout id="layout-content">
    <LayoutHeader
      class="header"
      style="display: flex; align-items: center; justify-content: center"
      :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }"
    >
      <div style="margin-top: 30px">
        <Image :width="120" :src="img"></Image>
      </div>
      <Button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }" v-if="collapsed" />
        <MenuFoldOutlined :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }" v-else />
      </Button>
      <Menu
        :multiple="false"
        theme="light"
        mode="horizontal"
        :style="{
          lineHeight: '64px',
          backgroundColor: storeObj.primaryColor,
          marginLeft: '10px',
          color: storeObj.textColor,
        }"
        style="flex: 9; border-bottom: none"
      >
        <MenuItem :key="(item.id as string)" @click="chooseMenu(item)" v-for="item of routerInfo">{{ menusTitle(item) }}</MenuItem>
      </Menu>
      <div style="margin: 0px 15px 0 0">
        <Popover title="">
          <template #content>
            <Button type="text" style="display: block" @click="changeLanguage('zh')">中文</Button>
            <Button type="text" @click="changeLanguage('en')">English</Button>
          </template>
          <translation-outlined />
        </Popover>
      </div>
      <div style="margin: 5px 10px 0 0">
        <Dropdown>
          <div class="ant-dropdown-link" @click.prevent style="color: #000" :style="{ color: storeObj.textColor }">
            {{ userInfo.userName }}
            <DownOutlined />
          </div>
          <template #overlay>
            <Menu>
              <MenuItem>
                <Button type="link" @click="loginOut">登出</Button>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </div>
      <div>
        <div @click="fullscreen">
          <FullscreenOutlined v-if="!fullscreenis"></FullscreenOutlined>
          <FullscreenExitOutlined v-else></FullscreenExitOutlined>
        </div>
      </div>
    </LayoutHeader>
    <LayoutContent>
      <Layout style="height: 100%">
        <LayoutSider width="200" :collapsed="collapsed" :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }">
          <Menu :style="{ backgroundColor: storeObj.primaryColor }" v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline">
            <SubMenu
              :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }"
              :key="(item.id as string)"
              v-for="item of navItemInfo"
              @click="chooseSubMenu(item)"
            >
              <template #title>
                <span>
                  <component :is="item.icon ? item.icon : ''" :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }" />
                  <span v-if="!collapsed">{{ item.name }}</span>
                </span>
              </template>
              <MenuItem v-for="i of item.children" :key="(i.id as string)" @click="chooseItem(i)">
                <component :is="item.icon ? item.icon : ''" :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }" />
                {{ i.name }}
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
    <LayoutFooter style="text-align: center" :style="{ backgroundColor: storeObj.primaryColor, color: storeObj.textColor }">
      Ant Design ©2018 Created by Ant UED
    </LayoutFooter>
  </Layout>
</template>
<script lang="ts">
import Icon from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, toRefs, watch, computed } from 'vue';
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
  Image,
  Popover,
  Switch,
} from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';

interface Obj {
  name: string;
  id: string;
  path?: string;
}
interface RouterInfo {
  name: string;
  id: string;
  icon?: string;
  children?: Array<{
    name: string;
    id: string;
    children?: Array<Obj>;
    icon?: string;
  }>;
}
import { useCounterStore } from '../store/index';
import img from '../assets/logo.png';
import demoApi from '../router/routerApi/demoApi';
import { useI18n } from 'vue-i18n';
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
    Popover,
    Switch,
  },
  setup() {
    const I18n = useI18n();
    const router = useRouter(),
      route = useRoute();
    let dataInfo = reactive({
      navItemInfo: [] as RouterInfo[],
      breadcrumb: [] as string[],
      selectedKeys1: ref<string[]>(['2']),
      selectedKeys2: ref<string[]>(['1']),
      userInfo: { userName: '超级管理员' },
      img: img,
      fullscreenis: false,
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
      item: '',
      checked: false,
    });
    let routerInfo: Array<RouterInfo> = reactive(demoApi);
    const store = useCounterStore();
    let storeObj = computed(() => {
      return store;
    });
    dataInfo.navItemInfo = routerInfo[0].children as [];
    dataInfo.breadcrumb[0] = routerInfo[0].name;

    watch(
      () => dataInfo.item,
      (newV) => {
        console.log(newV, 'Watch');
      }
    );

    watch(dataInfo.openKeys, (newV) => {
      console.log(newV, 'Watch');
      dataInfo.preOpenKeys = newV;
    });

    const chooseMenu = (el: RouterInfo) => {
      dataInfo.navItemInfo = el.children as [];
      dataInfo.breadcrumb[0] = el.name;
      dataInfo.breadcrumb[1] = '';
      dataInfo.breadcrumb[2] = '';
      console.log(el, 'chooseMenu');
    };
    const chooseSubMenu = (el: RouterInfo) => {
      dataInfo.breadcrumb[1] = el.name;
      console.log(el, 'chooseSubMenu');
    };
    const chooseItem = (el: Obj) => {
      dataInfo.breadcrumb[3] = el.name;
      console.log(dataInfo.breadcrumb, 'chooseItem');
      router.push(el.path as string);
    };
    const fullscreen = () => {
      dataInfo.fullscreenis = !dataInfo.fullscreenis;
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };
    const toggleCollapsed = () => {
      dataInfo.collapsed = !dataInfo.collapsed;
      dataInfo.openKeys = dataInfo.collapsed ? [] : dataInfo.preOpenKeys;
    };
    const loginOut = () => {
      sessionStorage.setItem('authorize', '');
      store.setShowSettingOutlined(false);
      router.replace('/login');
    };
    const menusTitle = (item: any) => {
      if (item.text) {
        return I18n.t('menus.' + item.text);
      }
      return item.name;
    };
    const changeLanguage = (type: string) => {
      console.log(I18n, '????');
      I18n.locale.value = type;
    };
    return {
      routerInfo,
      ...toRefs(dataInfo),
      chooseMenu,
      chooseSubMenu,
      chooseItem,
      storeObj,
      fullscreen,
      toggleCollapsed,
      loginOut,
      menusTitle,
      changeLanguage,
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
