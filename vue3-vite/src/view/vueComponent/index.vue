<template>
  <div id="vueComponent">
    <Card :title="'时间选择器: ' + timeArr[0] + '-' + timeArr[1]" style="width: 49%">
      <timePicker v-model:time="timeArr"></timePicker>
    </Card>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Card } from 'ant-design-vue';
import timePicker from './timePicker.vue';
export default defineComponent({
  components: { Button, timePicker, Card },

  setup() {
    let dataInfo = reactive({
        timeArr: [],
    });
    onMounted(() => {});
    return {
      ...toRefs(dataInfo),
    };
  },
});
</script>
<style lang="less" scoped></style>
