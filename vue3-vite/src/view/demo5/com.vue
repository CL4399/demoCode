<template>
  <div v-show="showCom">
    组件
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, provide, defineComponent } from "vue";
import { useRouter } from "vue-router";
let showCom = ref(true);
defineExpose({
  showCom,
});
</script>
<style lang="scss" scoped></style>
