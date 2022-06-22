<template>
  <div class="demo">12354</div>
</template>

<script lang="ts">
import ThreeJs from "./index";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Demo01",
  props: {},
  setup() {
    onMounted(() => {
      new ThreeJs();
    });

    type Coord<T> = Record<'x' | 'y', T>;

 
    function c<T extends Coord<string>>(apis: T) {
      return apis
    }
    let d ={
      x:'xc',
      y:'d'
    } 
    c(d)
  },
});
</script>
<style scoped lang="scss">
</style>
