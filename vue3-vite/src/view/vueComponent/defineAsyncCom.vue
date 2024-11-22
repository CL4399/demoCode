<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

// 异步加载组件函数
const loadComponent = (name: string) =>
  defineAsyncComponent({
    loader: () => import(`./${name}.vue`),
  });

// 所有组件的名称
const componentNames = ['A', 'B', 'C', 'D'];
// 所有组件存的数组
const components = componentNames.map((name) => {
  return {
    name,
    component: loadComponent(name),
  };
});
// 需要动态加载的组件名称
const dynamicComponentName = ['C', 'D'];
// 默认加载的组件名称[], 划到底部后， 从组件名称里面拿出一个，添加到此数组里面
const displayComponents = ref(['A', 'B']);

/** ********************滚动***********************/
// 开始观察滚动触发元素
const contentRef = ref();

const handleScroll = () => {
  const container = contentRef.value;
  // 判断是否滚动到底部
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    console.log('滚到底部了， 开始加载');
    if (dynamicComponentName.length) {
      displayComponents.value.push(dynamicComponentName.shift()!);
    }
  }
};
</script>
<template>
  <div ref="contentRef" class="load-component" @scroll="handleScroll" style="width: 100%; height: 20vh">
    <template v-for="(i, index) in components" :key="index">
      <component :is="i.component" v-if="displayComponents.includes(i.name)" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.load-component {
  height: 100%;
  overflow-y: scroll;
  .fix-btn {
    position: fixed;
    top: 0;
  }
}
</style>
