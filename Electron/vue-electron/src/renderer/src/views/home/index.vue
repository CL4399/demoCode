<template>
  <div class="home">
    <Layout class="layout">
      <LayoutHeader class="header" style="padding: 0 15px">{{ dataInfo.time }}</LayoutHeader>
      <LayoutContent class="content">
        <LeftVue style="width: 25%"></LeftVue>
        <CenterVue style="width: 50%"></CenterVue>
        <RightVue style="width: 25%"></RightVue>
      </LayoutContent>
      <LayoutFooter class="footer" style="padding: 0 15px" @click="clickPage">凡是过往 皆是序章</LayoutFooter>
    </Layout>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import {  Layout, LayoutContent, LayoutHeader, LayoutFooter } from 'ant-design-vue'
import LeftVue from './Left.vue'
import CenterVue from './Center.vue'
import RightVue from './Right.vue'
import moment from 'moment'
// @ts-ignore
import { useRouter } from 'vue-router'
let router = useRouter()
let dataInfo = reactive({
  timer: null as NodeJS.Timeout | null,
  time: moment().format('YYYY-MM-DD HH:mm:ss')
})
let clickPage = ()=>{
    router.push('/read')
}
onMounted(() => {
  dataInfo.timer = setInterval(() => {
    dataInfo.time = moment().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
// import message from './common/static'
// const {
//   appContext: {
//     config: {
//       globalProperties: { $message }
//     }
//   }
// } = getCurrentInstance() as ComponentInternalInstance
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  .layout {
    display: flex;
    flex-direction: column;
    background-image: url('../../assets/image/4.jpg');
    background-size: 100% 100%;

    .header {
      height: 8vh;
      background-color: transparent;
      color: #61c9f1;
      font-weight: 800;
      font-size: 20px;
      z-index: 99;
    }
    .content {
      height: 84vh;
      display: flex;
      text-align: center;
      background-color: transparent;
    }
    .footer {
      height: 8vh;
      background-color: transparent;
      color: #ebf0f1;
      font-weight: 800;
      font-size: 22px;
      padding-top: 1% !important;
      text-align: right;
      z-index: 99;
    }
  }
  .layout::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(221, 213, 213, 0.582);
    filter: blur(1px);
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>
