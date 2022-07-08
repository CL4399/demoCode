<template>
  <button @click="clickButton">Click Me</button>
  <com ref="myComRef"></com>
  <Input v-focus />
  <ModalCom v-model:visible="isVisible" @cancel="cancel" @ok="ok" @close="close">
    <template #title>
      <div>测试标题</div>
    </template>
    <template #content>
      内容
    </template>
  </ModalCom>
  <TreeSelect v-model:value="value" v-model:searchValue="searchValue" show-search tree-default-expand-all
    style="width: 100%" :tree-data="treeData" tree-checkable allow-clear :show-checked-strategy="SHOW_PARENT"
    placeholder="Please select" :filterTreeNode="filterTreeOption">
    <template #title="{ value: val, title }">
      <template v-for="(fragment, i) in title
      .toString()
      .split(new RegExp(`(?<=${searchValue})|(?=${searchValue})`, 'i'))">
        <span v-if="fragment.toLowerCase() === searchValue.toLowerCase()" :key="i" style="color: aqua">
          {{ fragment }}
        </span>
        <template style="color: aqua" v-else>{{ fragment }}</template>
      </template>
      一
      <template v-for="(fragment, i) in val
      .toString()
      .split(new RegExp(`(?<=${searchValue})|(?=${searchValue})`, 'i'))">
        <span v-if="fragment.toLowerCase() === searchValue.toLowerCase()" :key="i" style="color: aqua">
          {{ fragment }}
        </span>
        <template style="color: aqua" v-else>{{ fragment }}</template>
      </template>
    </template>
  </TreeSelect>
  <div>
    <InputSearch v-model:value="searchValueT" style="margin-bottom: 8px" placeholder="Search" />
    <Tree :expanded-keys="expandedKeys" checkable :auto-expand-parent="autoExpandParent" :tree-data="gData"
      @expand="onExpand" @check="check">
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValueT) > -1">
          {{ title.substr(0, title.indexOf(searchValueT)) }}
          <span style="color: #f50">{{ searchValueT }}</span>
          {{ title.substr(title.indexOf(searchValueT) + searchValueT.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </Tree>
  </div>
  <!-- <TreeSelect v-model="selected" :multiple="true" :allow-clear="true" :allow-search="true" :data="treeData"
    placeholder="Please select ..." style="width: 300px" :filter-tree-node="filtertreenode"></TreeSelect> -->
</template>
<script lang="ts">
import { reactive, ref, toRefs, defineComponent, watch } from "vue";
import { Modal, Input, InputSearch, TreeSelect, Tree } from "ant-design-vue";
import { HeartFilled } from "@ant-design/icons-vue";
import com from "./com.vue";
import ModalCom from "./ModalCom";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
// import { TreeSelect } from "@arco-design/web-vue"
const defineDir = {
  focus: {
    mounted(el: HTMLElement) {
      el.focus()
    },

  },
}
import type { TreeProps } from 'ant-design-vue';
interface Key {
  [key: string]: string
}
export default defineComponent({
  components: { com, ModalCom, Modal, HeartFilled, Input, TreeSelect, Tree, InputSearch, },
  directives: defineDir,
  setup(props: any, { emit }: any) {
    let myComRef = ref();
    let isVisible = ref(false);

    let dataInfo = reactive({
      searchValue: "",
      value: [],
      treeData: [{
        title: 'Node1',
        value: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',

        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            disabled: true,
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
          },
        ],
      },],
      expandedKeys: [] as string[],
      searchValueT: "" as string,
      autoExpandParent: true,
      // treeData: [
      //   {
      //     key: '1',
      //     title: 'node1',
      //     children: [
      //       {
      //         key: '1-1',
      //         title: 'node2',
      //       },
      //     ],
      //   },
      //   {
      //     key: '2',
      //     title: 'node3',
      //     children: [
      //       {
      //         key: '2-1',
      //         title: 'node4',
      //       },
      //       {
      //         key: '2-2',
      //         title: 'node5',
      //       },
      //     ],
      //   },
      // ]
      replaceFields: { children: 'children', label: 'title', key: 'title', value: 'title' },
      selected: [],
    })
    const clickButton = () => {
      // console.log(myComRef.value.showCom, "myComRef");
      // isVisible.value = !isVisible.value;
      // myComRef.value.showCom = !myComRef.value.showCom
      console.log(dataInfo.value,"??????");
      
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

    const filterTreeOption = (input: string, treeNode: Key) => {
      console.log(input, treeNode, "?????", treeNode.value.includes(input), treeNode.title.includes(input));
      if (treeNode.value.includes(input)) return treeNode.value.includes(input)
      if (treeNode.title.includes(input)) return treeNode.title.includes(input)
    }
    const filtertreenode = (searchKey: string, nodeData: Key) => {
      if (nodeData.key.includes(searchKey) || nodeData.title.includes(searchKey)) {
        return true
      }
      return false
    }





    const genData: TreeProps['treeData'] = [{
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { title: 'leaf1', key: '0-0-0-1' },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', title: 'sss' }],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [{ key: '0-0-2-0', title: 'sss2' }],
        },
      ],
    },];

    const dataList: TreeProps['treeData'] = [];

    const generateList = (data: TreeProps['treeData']) => {
      for (let i = 0; i < (data as []).length; i++) {
        if (!data) return
        const node = data[i];
        const key = node.key;
        const title = node.title
        dataList.push({ key, title });
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(genData);
    const getParentKey = (
      key: string | number,
      tree: any,
    ): string | number | undefined => {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some((item: Key) => item.key === key)) {
            parentKey = node.key;
          } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    };
    const gData = ref<TreeProps['treeData']>(genData);
    const onExpand = (keys: any): void => {
      dataInfo.expandedKeys = keys;
      dataInfo.autoExpandParent = false;
    };
    const check = (keys: any) => {
      console.log(keys, "check");
    }
    watch(() => dataInfo.searchValueT, (newV) => {
      const expanded: string[] = dataList
        .map((item: Key) => {
          if (item.title.indexOf(newV) > -1) {
            return getParentKey(item.key, gData.value);
          }
          return [];
        })
        .filter((item, i, self) => item && self.indexOf(item) === i) as string[];
      dataInfo.expandedKeys = expanded;
      dataInfo.searchValueT = newV;
      dataInfo.autoExpandParent = true;
    })

    return {
      clickButton, myComRef, isVisible, cancel, ok, close, ...toRefs(dataInfo), filterTreeOption, filtertreenode, SHOW_PARENT,
      gData,
      onExpand,
      check,
    };
  },
});
</script>
<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 20vh;
  background-color: aqua;
}
</style>
