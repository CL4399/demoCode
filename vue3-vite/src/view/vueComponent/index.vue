<template>
  <div id="vueComponent" style="display: flex; flex-wrap: wrap; justify-content: space-between; overflow: auto; height: 80vh">
    <Card :title="'时间选择器: ' + timeArr[0] + '-' + timeArr[1]" style="width: 49%; margin-bottom: 10px">
      <timePicker v-model:time="timeArr"></timePicker>
    </Card>
    <Card title="H函数" style="width: 49%; margin-bottom: 10px">
      <hFunctionVue></hFunctionVue>
    </Card>
    <Card title="受限制的时间选择器" style="width: 49%; margin-bottom: 10px">
      <limitTimePicker></limitTimePicker>
    </Card>
    <Card title="" style="width: 49%; margin-bottom: 10px"> </Card>
    <Card title="Table" style="width: 100%; margin-bottom: 10px">
      <tableCom></tableCom>
    </Card>
    <Card title="多组件滚动加载" style="width: 100%; margin-bottom: 10px">
      <defineAsyncCom></defineAsyncCom>
    </Card>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Card } from 'ant-design-vue';
import timePicker from './timePicker.vue';
import hFunctionVue from './hFunction.vue';
import tableCom from './tableCom.vue';
import defineAsyncCom from './defineAsyncCom.vue';
import limitTimePicker from './limitTimePicker.vue';
export default defineComponent({
  components: { Button, timePicker, Card, hFunctionVue, tableCom, defineAsyncCom, limitTimePicker },
  setup() {
    let dataInfo = reactive({
      timeArr: [],
    });
    const videoSrc = new URL('/public/video/121.mp4', import.meta.url).href;
    onMounted(() => {});
    return {
      ...toRefs(dataInfo),
      videoSrc,
    };
  },
});
</script>
<style lang="less" scoped></style>
