<template>
  <button @click="clickButton">Click Me</button>
  <com ref="myComRef"></com>
  <ModalCom
    v-model:visible="isVisible"
    @cancel="cancel"
    @ok="ok"
    @close="close"
  >
    <template #title>
      <div>测试标题</div>
    </template>
    <template #content>
      内容
    </template>
  </ModalCom>
  <!-- <Modal :visible="isVisible" :footer="null"></Modal> -->
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { HeartFilled } from "@ant-design/icons-vue";
import com from "./com.vue";
import ModalCom from "./ModalCom";
export default defineComponent({
  components: { com, ModalCom, Modal, HeartFilled },
  setup(props: any, { emit }: any) {
    let myComRef = ref();
    let isVisible = ref(true);
    const clickButton = () => {
      console.log(myComRef.value.showCom, "myComRef");
      isVisible.value = !isVisible.value;
      // myComRef.value.showCom = !myComRef.value.showCom
    };
    const cancel = () => {
      console.log("cancel");
      isVisible.value = false;
    };
    const ok = () => {
      console.log("ok");
      isVisible.value = false;
    };
    const close = () => {
      console.log("close");
    };

    const deps = [
      [1, 2, 3, [11, 23, 123, 321, [21, 22, 23, 25]]],
      [5, 8, 12],
      [5, 14, 79],
      [3, 64, 105],
    ];
    let member = deps.flat(Infinity);
    console.log(member);

    let obj: { [key: string]: string } = {};
    let index = 1;
    obj[`topic${index}`] = "话题内容";

    return { clickButton, myComRef, isVisible, cancel, ok, close };
  },
});
</script>
<style lang="scss" scoped></style>
