<template>
  <div class="page">
    <div class="page-content" @click="toHome">Welcome to my Electron</div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
// @ts-ignore
import { useRouter } from 'vue-router'
export default defineComponent({
  setup(props: any, { emit }: any) {
    let router = useRouter()
    const toHome = () => {
      router.push('/home')
    }
    return { toHome }
  }
})
</script>
<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url('../../assets/image/4.jpg');
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .to-home {
    position: fixed;
    color: #fff;
    top: 0px;
    left: 0px;
  }
  .page-content {
    color: #fff;
    text-align: center;
    line-height: 100vh;
    font-size: 50px;
    font-weight: 800;
    cursor: pointer;
  }
}
</style>
