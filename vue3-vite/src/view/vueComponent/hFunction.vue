<script lang="ts">
import { h, reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    function increment() {
      state.count++;
    }
    // 返回render函数
    return () =>
      h('div', [
        h('div', { style: 'color:aqua' }, state.count),
        h(
          'button',
          {
            onClick: increment, //这里绑定事件
          },
          'clickMe'
        ),
      ]);
  },
};
</script>
<style lang="less" scoped></style>
