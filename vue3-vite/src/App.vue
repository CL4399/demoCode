<template>
  <div>
    <div class="color-item" @click="changeColor">
      <SettingOutlined style="font-size: 20px;"></SettingOutlined>
    </div>
    <ConfigProvider :locale="locale">
      <router-view />
    </ConfigProvider>
  </div>
  <Drawer :visible="visible" class="custom-class" title="主题颜色" placement="right" @close="close">
    <color-picker v-model:pureColor="pureColor" :isWidget="visible" format="hex6" shape="circle" useType="pure"
      v-model:gradientColor="gradientColor" />
    <Button style="margin-top: 20px;" type="primary" @click="confirm">确认</Button>
  </Drawer>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, computed } from 'vue';
import { ConfigProvider, Drawer, Button } from 'ant-design-vue';
import { SettingOutlined } from "@ant-design/icons-vue"
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { useCounterStore } from './store/index'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default {
  name: "app",
  components: { SettingOutlined, ColorPicker, Drawer, Button, ConfigProvider },
  setup(props: any, { emit }: any) {
    let dataInfo = reactive({
      pureColor: "aqua",
      gradientColor: "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)",
      visible: false,
      locale: zhCN
    })
    const store = useCounterStore()
    ConfigProvider.config({
      theme: {
        primaryColor: dataInfo.pureColor,// 全局主色
      },
    });
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
      });
      const IsWhiteFooter = decideTxtColor(dataInfo.pureColor);
      console.log(IsWhiteFooter, 'IsWhiteFooter');

      store.setTextColor(IsWhiteFooter ? "#fff" : "#000")
    }
    // 根据色彩值判断，深色true 浅色false
    let decideTxtColor = (colorHexdecimal: any) => {
      const hexToRgb = (hexColor: string) => {
        return parseInt(hexColor, 16).toString();
      }
      let brightnessOfColor = (colorHexdecimalValue: string) => {
        let useColorValue = colorHexdecimalValue.slice(1);
        let rColor = useColorValue.slice(0, 2);
        let gColor = useColorValue.slice(2, 4);
        let bColor = useColorValue.slice(4);
        let rColorValue: any = hexToRgb(rColor);
        let gColorValue: any = hexToRgb(gColor);
        let bColorValue: any = hexToRgb(bColor);
        let lightness = rColorValue * 0.299 + gColorValue * 0.587 + bColorValue * 0.114;
        return lightness;
      }
      return brightnessOfColor(colorHexdecimal) < 128;
    }
    // 颜色翻转
    const colorReverse = (oldColor: string) => {
      oldColor = '0x' + oldColor.replace(/#/g, '');
      //@ts-ignore
      let str = '000000' + (0xFFFFFF - oldColor).toString(16);
      return '#' + str.substring(str.length - 6, str.length);
    }
    return { ...toRefs(dataInfo), changeColor, close, confirm };
  },
};
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
