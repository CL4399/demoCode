<template>
  <div id="canvas">
    <Card title="电子签名">
      <eSignatureVue></eSignatureVue>
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
    onMounted(() => {});
    return {};
  },
});
</script>
<style lang="less" scoped></style>
