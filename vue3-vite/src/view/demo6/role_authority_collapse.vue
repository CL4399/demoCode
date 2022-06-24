<template>
  <div class="role_authority_collapse">
    <div
      v-for="(item, index) of data"
      :key="item.id"
      style="padding-left: 10px;"
    >
      <div
        v-if="!item.children || (item.children && !item?.children[0].isNav)"
        class="role_authority_collapse_item"
      >
        <div style="width: 200px; display: flex; align-items: center;">
          {{ item.name }}
        </div>
        <div style="flex: 1;">
          <template v-if="item.children">
            <Checkbox
              v-for="secitem of item.children"
              class="role_authority_collapse_subitem role_checkbox"
              :key="secitem.id"
              :value="secitem.id"
              :name="secitem.name"
              style="margin-left: 0;"
              v-model:checked="secitem.checked"
              @change="checkChange(secitem)"
            >
              {{ secitem.name }}
            </Checkbox>
          </template>
        </div>
        <div style="width: 100px; display: flex; align-items: center;">
          <!-- <input type="checkbox" /> -->
          <Checkbox
            class="role_checkbox"
            :key="item.id"
            :value="item.id"
            :name="item.name"
            v-model:checked="item.checked"
            :indeterminate="item.indeterminate"
            @change="checkChange(item)"
          ></Checkbox>
        </div>
      </div>
      <template v-if="item.children && item.children[0]?.isNav">
        <div class="role_authority_collapse_item">
          <div style="width: 200px; display: flex; align-items: center;">
            <template v-if="!data[index].isShow">
              <PlusOutlined
                @click="() => (item.isShow = !item.isShow)"
                style="padding-right: 5px;"
              />{{ item.name }}
            </template>
            <template v-if="data[index].isShow">
              <MinusOutlined
                @click="() => (item.isShow = !item.isShow)"
                style="padding-right: 5px;"
              />{{ item.name }}
            </template>
          </div>
          <div style="flex: 1;"></div>
          <div style="width: 100px; display: flex; align-items: center;">
            <Checkbox
              :key="item.id"
              :value="item.id"
              :name="item.name"
              v-model:checked="item.checked"
              :indeterminate="item.indeterminate"
              @change="checkChange(item)"
            ></Checkbox>
          </div>
        </div>
        <RoleAuthorityCollapse
          :class="item.isShow ? '' : 'height0'"
          :collapsedata="item.children"
          :originData="data"
          :treeObj="treeObj"
        ></RoleAuthorityCollapse>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Checkbox } from "ant-design-vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "RoleAuthorityCollapse",
  components: { Checkbox, PlusOutlined, MinusOutlined },
  props: {
    collapsedata: {
      type: Array,
      default: () => {
        return [];
      },
    },
    originData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    treeObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    activeKey: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props: any, { emit }: any) {
    let dataInfo = reactive({
      Status: {} as any,
      isShow: {},
      checked: {},
      data: props.collapsedata,
      dataObj: props.treeObj,
      indeterminate: {},
      childLength: {},
    });

    const checkChange = (data: any) => {
      if (data.indeterminate === true) {
        data.indeterminate = false;
      }
      setChild(data);
      setPid(data);
    };
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
    const setPid = (data: any) => {
      if (data.pid && dataInfo.dataObj[data.pid]) {
        let opid = dataInfo.dataObj[data.pid];
        let childrenChecked = 0;
        let childrenIndeterminate = 0;
        opid.children.forEach((item: any) => {
          item.checked && (childrenChecked += 1);
          item.indeterminate && (childrenIndeterminate += 1);
        });
        opid.checked = childrenChecked === opid.children.length;
        opid.indeterminate =
          childrenIndeterminate + childrenChecked > 0 &&
          childrenChecked < opid.children.length;
        // console.log(opid)
        setPid(opid);
      }
    };
    const change = (id: any) => {
      dataInfo.Status[id].isShow = !dataInfo.Status[id].isShow;
    };
    const isTrue = (el: number) => {
      return el == 1 ? false : true;
    };
    return {
      ...toRefs(dataInfo),
      checkChange,
      setChild,
      setPid,
      change,
      isTrue,
    };
  },
});
</script>
<style lang="less" scoped>
.role_authority_collapse {
  transition: all 0.5s;
  overflow: hidden;
  // max-height: 100vh;
  opacity: 1;

  &.height0 {
    max-height: 0;
    opacity: 0;
  }

  .role_authority_collapse_item {
    display: flex;
    padding: 10px 0;
    // text-indent: 2em;
    border-bottom: 1px solid #eee;
  }

  .role_authority_collapse_subitem {
    display: inline-block;
    min-width: 50%;
    line-height: 30px;
  }
}
</style>
