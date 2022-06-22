<template>
  <div id="container"></div>
</template>
<script>
import { Graph } from '@antv/x6';
export default {
  name: '',
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {
    const data = {
      // 节点
      nodes: [
        {
          id: 'node1', // String，可选，节点的唯一标识
          x: 40, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'hello', // String，节点标签
          attrs: {
            body: {
              filter: {
                name: 'dropShadow',
                args: {
                  dx: 2,
                  dy: 2,
                  blur: 3,
                },
              },
            },
          },
        },
        {
          id: 'node2', // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'world', // String，节点标签
        },
        {
          id: 'node3',
          shape: 'rect', // 使用 rect 渲染
          x: 100,
          y: 300,
          width: 80,
          height: 40,
          label: 'hello',
        },
        {
          id: 'node4',
          shape: 'ellipse', // 使用 ellipse 渲染
          x: 300,
          y: 400,
          width: 80,
          height: 40,
          // 自定义节点样式
          attrs: {
            body: {
              fill: '#fff',
              stroke: '#999',
              strokeDasharray: '10,2',
            },
            label: {
              text: 'Hello',
              fill: '#999',
              fontSize: 13,
            },
          },
        },
      ],
      // 边
      edges: [
        {
          source: 'node1', // String，必须，起始节点 id
          target: 'node2', // String，必须，目标节点 id
        },
        {
          source: 'node2', // String，必须，起始节点 id
          target: 'node3', // String，必须，目标节点 id
          shape: 'double-edge',
          // 自定义边样式
          attrs: {
            line: {
              stroke: 'orange',
            },
          },
        },
        {
          source: 'node3', // String，必须，起始节点 id
          target: 'node4', // String，必须，目标节点 id
          shape: 'double-edge',
          router: {
            /*
            地铁路由 'metro' 是曼哈顿路由 manhattan 的一个变种，它由水平或垂直的正交线段和斜角线段组成，
            类似地铁轨道图，并自动避开路径上的其他节点（障碍）。
            其选项与 manhattan 路由一样，但 maxDirectionChange 的默认值为 45，表示路由线段的最大倾斜角度为 45 度。
            */
            name: 'metro',
            args: {
              startDirections: ['top'],
              endDirections: ['bottom'],
            },
          },
        },
      ],
    };
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 1000,
      height: 800,
      background: {
        color: '#ccc', // 设置画布背景颜色
      },
      highlighting: {
        // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              'stroke-width': 2,
              stroke: 'red',
            },
          },
        },
      },
      keyboard: true,
    });
    graph.fromJSON(data);

    graph.zoom(0); // 缩放画布
    graph.translate(80, 40); // 平移画布
  },
  methods: {},
};
</script>
<style lang='less'></style>