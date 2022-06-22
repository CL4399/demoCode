<template>
  <div>
    <router-view />
  </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide } from 'vue';
export default {
  name: "app",
  components: {},
  setup(props: any, { emit }: any) {
    return {};
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
