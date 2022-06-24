<template>
  <div class="role_authority">
    <div class="role_authority_item" v-for="item of dataInfo" :key="item.id">
      <h3
        class="title"
        style="height: 40px; line-height: 40px; font-size: 18px;"
      >
        <Checkbox
          class="role_checkbox"
          :key="item.id"
          :value="item.id"
          :checked="isTrue(item.checked)"
          :indeterminate="item.indeterminate"
          :name="item.name"
          @change="selectchange(item)"
          >{{ item.name }}
        </Checkbox>
      </h3>
      <div style="width: 100%;" border="1">
        <div style="background: #fafafa; padding: 10px 0; display: flex;">
          <div style="width: 250px;">操作对象</div>
          <div style="flex: 1;">权限</div>
          <div style="width: 100px;">选择</div>
        </div>
        <roleAuthorityCollapse
          :collapsedata="item.children"
          :originData="dataInfo"
          :treeObj="treeObj"
        >
        </roleAuthorityCollapse>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import roleAuthorityCollapse from "./role_authority_collapse.vue";
import { reactive, ref, toRefs, provide, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Checkbox } from "ant-design-vue";
export default defineComponent({
  components: { roleAuthorityCollapse, Checkbox },
  props: {
    data: {
      type: Array,
      default: [],
    },
    treeObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    checkedKeys: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props: any, { emit }: any) {
    let activeKey = ref(props.checkedKeys);
    let dataInfo = ref(props.data);

    const setChild = (data: any) => {
      if (data.children) {
        let list = data.children;
        list.forEach((item: any) => {
          item.checked = data.checked;
          item.indeterminate = false;
          setChild(item);
        });
      }
    };
    const selectchange = (data: any) => {
      if (data.indeterminate === true) {
        data.indeterminate = false;
      }
      setChild(data);
    };

    const isTrue = (el: number) => {
      return el == 1 ? false : true;
    };

    return { activeKey, setChild, selectchange, dataInfo, isTrue };
  },
});
</script>
<style scoped></style>
