<template>
  <div class="test">
    <div @click="toHome" class="to-home">123</div>
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
      router.push('/test')
    }
    return { toHome }
  }
})
</script>
<style lang="less" scoped>
.test {
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
    top: 0;
    left: 0;
  }
}
</style>
