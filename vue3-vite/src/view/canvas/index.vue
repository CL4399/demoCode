<template>
  <div id="canvas">
    <Card title="电子签名">
      <eSignatureVue></eSignatureVue>
    </Card>
    <Card title="测试">
      <div :style="{ fontSize: fontSize('测试') }">测试</div>
      <div style="display: flex">
        <div style="width: 100px; height: 100px"><div class="dynamic-font-size" :style="{ fontSize: fontSize('测试') }">短文本</div></div>
        <div style="width: 100px; height: 100px">
          <div class="dynamic-font-size" :style="{ fontSize: fontSize('这是一个') }">这是一个中等长度的文本</div>
        </div>
        <div style="width: 100px; height: 100px">
          <div class="dynamic-font-size" :style="{ fontSize: fontSize('这是一个测试') }">这是一个较长的文本内容，它应该显示为较小的字体大小</div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Card } from 'ant-design-vue';
import eSignatureVue from './eSignature.vue';
export default defineComponent({
  components: { Button, Card, eSignatureVue },
  setup() {
    const fontSize = (str: string) => {
      switch (str.length) {
        case 2:
          return '20px';
        case 6:
          return '18px';
        case 10:
          return '16px';
        default:
          return '20px';
      }
    };
    onMounted(() => {});
    return { fontSize };
  },
});
</script>
<style lang="less" scoped>
#canvas {
  overflow: auto;
  height: 100%;
}

.dynamic-font-size {
}
</style>
