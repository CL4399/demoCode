<template>
  <div class="demo4">
    <Button @click="clickMe">123</Button>
    <Button @click="clickMe" type="link" disabled>123</Button>
    <Button @click="clickMe" :shape="'circle'">
      <HeartFilled />
      <HeartFilled />
      <HeartFilled />
      <HeartFilled />
    </Button>
    <div style="margin: 10px;"></div>

    <div>
      默认
      <ButtonCom></ButtonCom>
    </div>
    <div>
      三种size
      <ButtonCom :size="'small'"></ButtonCom>
      <ButtonCom :size="'middle'"></ButtonCom>
      <ButtonCom :size="'large'"></ButtonCom>
    </div>
    <div>
      边角
      <ButtonCom :shape="'circle'"></ButtonCom>
      <ButtonCom :shape="'round'"></ButtonCom>

      <ButtonCom :shape="'circle'">
        <!-- <div style="width:10px;height:10px;">123</div> -->
        <HeartFilled />
      </ButtonCom>
    </div>
    <div>
      插槽
      <ButtonCom>
        <template #iconLeft>
          <DeleteOutlined @click.stop="clickIconLeft" />
        </template>
        <div>默认插槽</div>
        <template #iconRight>
          <HeartFilled />
        </template>
      </ButtonCom>
    </div>
    <div>
      Loading
      <ButtonCom :shape="'round'" loading></ButtonCom>
      loadingColor
      <ButtonCom :shape="'round'" loading loadingColor="red"></ButtonCom>
    </div>

    <div>
      disabled
      <ButtonCom disabled></ButtonCom>
    </div>
    <div>
      <div>type</div>
      <ButtonCom type="link">link</ButtonCom>
      <ButtonCom type="text" danger>text</ButtonCom>
      <ButtonCom type="dashed">dashed</ButtonCom>
      <ButtonCom type="dashed" danger>dashed-danger</ButtonCom>
      <div style="background-color: #ccc; height: 50px; display: flex;">
        <ButtonCom ghost>ghost</ButtonCom>
      </div>
      <ButtonCom danger>danger</ButtonCom>
    </div>
    <div>
      <div>color</div>
      <ButtonCom @click="clickIconLeft" color="red">color</ButtonCom>
    </div>

    <div style="margin: 10px;">
      <Input v-bind="$attrs"></Input>
      <IndexCom :name="'jack'" @fun="fun" v-bind="$attrs"></IndexCom>
      <div style="width: 30px; height: 30px; background-color: aqua;">
        <Loading></Loading>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, useAttrs, defineComponent } from "vue";
import { useRouter } from "vue-router";
import IndexCom from "./IndexCom.vue";
import { Button, Input } from "ant-design-vue";
import ButtonCom from "./Button/Button";
import {
  DeleteOutlined,
  AlertOutlined,
  LinkOutlined,
  HeartFilled,
} from "@ant-design/icons-vue";
import Loading from "./Button/Loading";
export default defineComponent({
  components: {
    IndexCom,
    Button,
    Input,
    ButtonCom,
    DeleteOutlined,
    AlertOutlined,
    LinkOutlined,
    HeartFilled,
    Loading,
  },
  setup(props: any, { emit }: any) {
    let attrs = useAttrs();
    const clickMe = () => {
      // console.log(attrs, "attrs");
      console.log(window.location.origin, "??????????");
    };
    const fun = (el: any) => {
      console.log(attrs, el, "父组件方法");
    };
    const buttonComClick = (e: MouseEvent): void => {
      console.log(e, "buttonComClick");
    };
    const clickIconLeft = () => {
      console.log("clickIconLeft");
    };
    const clickIconRight = () => {
      console.log("clickIconRight");
    };

    return {
      clickMe,
      inheritAttrs: true,
      fun,
      buttonComClick,
      clickIconLeft,
      clickIconRight,
    };
  },
});
</script>
<style scoped>
.demo4 {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
}

.a {
  align-items: center;
  text-align: center;
  line-height: normal;
  box-shadow: 1px 1px 1px #fff;
}
</style>
