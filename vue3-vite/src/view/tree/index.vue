<template>
  <div style="padding: 0 10px 10px">
    背景色：<el-color-picker v-model="style.background" size="small"></el-color-picker>&nbsp; 文字颜色：<el-color-picker
      v-model="style.color"
      size="small"
    ></el-color-picker
    >&nbsp;
  </div>
  <div style="height: 85%; width: 100%; overflow: auto">
    <vue3-tree-org
      :data="data"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-style="style"
      :node-draggable="true"
      :only-one-node="onlyOneNode"
      :default-expand-level="1"
      @on-contextmenu="onMenus"
      @on-node-click="onNodeClick"
      :dt="{ info: [data.info] }"
    >
      <!-- 自定义节点内容 -->
      <template v-slot="{ node }">
        <div class="tree-org-node__text node-label">
          <div class="custom-content" @click="clickitem(node)" style="font-size: 16px; font-weight: 600; display: flex; align-items: center">
            <template v-if="node.$$data.info">
              <img :src="imgEnum[node.$$data.info.level]" alt="" style="width: 20px; height: 20px; margin-right: 10px" />
            </template>
            {{ node.label }}
          </div>
          <template v-if="node.$$data.info">
            <div>职位：{{ levelEnum[node.$$data.info.level] }}</div>
            <div>应得：{{ node.$$data.info.num }} 实得：{{ node.$$data.info.num1 }}</div>
          </template>
          <template v-if="node.$$data.infoText">
            <div>{{ node.$$data.infoText }}</div>
          </template>
        </div>
      </template>
      <!-- 自定义展开按钮 -->
      <!-- <template v-slot:expand="{ node }">
        <div>{{ node.children.length }}</div>
      </template> -->
    </vue3-tree-org>
  </div>
</template>
<script>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus';
import { ref, getCurrentInstance } from 'vue';
// import { url } from 'inspector';
export default {
  name: 'baseTree',
  components: {
    ElSwitch,
    ElColorPicker,
  },
  data() {
    return {
      data: {
        id: 1,
        label: '人员',
        children: [
          {
            id: 2,
            pid: 1,
            label: '周影',
            info: {
              level: 1,
              num: 324,
              num1: 127,
            },
            // style: { color: '#fff', background: '#108ffe' },
            children: [
              {
                id: 6,
                pid: 2,
                label: '余万卫',
                disabled: true,
                children: [
                  {
                    id: 7,
                    pid: 6,
                    label: '刘伟',
                    disabled: true,
                    info: {
                      level: 2,
                      num: 324,
                      num1: 127,
                    },
                    children: [
                      {
                        id: 8,
                        pid: 7,
                        label: '王勇',
                        disabled: true,
                        info: {
                          level: 3,
                          num: 324,
                          num1: 127,
                        },
                        children: [
                          {
                            id: 9,
                            pid: 8,
                            label: '王永芬',
                            disabled: true,
                            info: {
                              level: 3,
                              num: 324,
                              num1: 127,
                            },
                            children: [
                              {
                                id: 21,
                                pid: 9,
                                label: '王贵福',
                                disabled: true,
                                info: {
                                  level: 4,
                                  num: 324,
                                  num1: 127,
                                },
                              },
                              {
                                id: 22,
                                pid: 9,
                                label: '谭晓寅',
                                disabled: true,
                                children: [
                                  {
                                    id: 23,
                                    pid: 22,
                                    label: '刘中元',
                                    disabled: true,
                                    infoText: '于2019年11月11日购买了59000元',
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: 10,
                            pid: 8,
                            label: '夏敏',
                            disabled: true,
                          },
                          {
                            id: 11,
                            pid: 8,
                            label: '张磊磊',
                            disabled: true,
                          },
                        ],
                      },
                      {
                        id: 8,
                        pid: 7,
                        label: '黄鹤',
                        disabled: true,
                      },
                      {
                        id: 8,
                        pid: 7,
                        label: '周丽',
                        disabled: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      horizontal: true,
      collapsable: true,
      onlyOneNode: true,
      cloneNodeDrag: true,
      expandAll: true,
      style: {
        background: '#355260',
        color: '#fff',
      },
      levelEnum: {
        1: '特级总监',
        2: '高级总监',
        3: '总监',
        4: '合伙人',
      },
      imgEnum: {
        1: new URL('./user.svg', import.meta.url).href,
        2: new URL('./user1.svg', import.meta.url).href,
        3: new URL('./user2.svg', import.meta.url).href,
        4: new URL('./user3.svg', import.meta.url).href,
      },
    };
  },
  created() {
    this.toggleExpand(this.data, this.expandAll);
    var chnNumChar = {
      零: 0,
      壹: 1,
      贰: 2,
      叁: 3,
      肆: 4,
      伍: 5,
      陆: 6,
      柒: 7,
      捌: 8,
      玖: 9,
    };
    var chnNameValue = {
      拾: { value: 10, secUnit: false },
      佰: { value: 100, secUnit: false },
      仟: { value: 1000, secUnit: false },
      万: { value: 10000, secUnit: true },
      亿: { value: 100000000, secUnit: true },
    };
    function ChineseToNumber(chnStr) {
      var rtn = 0;
      var section = 0;
      var number = 0;
      var secUnit = false;
      var str = chnStr.split('');
      for (var i = 0; i < str.length; i++) {
        var num = chnNumChar[str[i]];
        if (typeof num !== 'undefined') {
          number = num;
          if (i === str.length * 1) {
            section += number;
          }
        } else {
          var unit = chnNameValue[str[i]].value;
          secUnit = chnNameValue[str[i]].secUnit;
          if (secUnit) {
            section = (section + number) * unit;
            rtn += section;
            section = 0;
          } else {
            section += number * unit;
          }
          number = 0;
        }
      }
      return rtn + section;
    }
    function formatDataNumber(num, rounddigit = 0) {
      var str = new Array('', '万', '亿', '兆');
      var item = 0;
      var resule = Number(num);
      while (resule >= 10000) {
        resule = resule / 10000;
        item = item + 1;
      }
      if (item === 0) {
        return num;
      } else {
        return resule.toFixed(rounddigit) + str[item];
      }
    }
    console.log(formatDataNumber(ChineseToNumber('陆拾柒亿零伍万'),5));
  },
  methods: {
    onMenus({ node, command }) {
      console.log(node, command);
    },
    onNodeClick(e, data) {
      console.log(data, 'onNodeClick');
      let str = data.info ? `${data.label} 职位：${this.levelEnum[data.info.level]} 应得：${data.info.num} 实得：${data.info.num1}` : `${data.label}`;
      ElMessage.info(str);
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item.expand = val;
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        data.expand = val;
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
    clickitem(item) {
      console.log(item, 'clickitem');
    },
  },
};
</script>
<style lang="less" scoped>
.tree-org-node__text {
  width: 200px;
  text-align: left;
  font-size: 14px;
  text-align: center;
  border: 1px dashed #fff;
  border-radius: 5px;

  .custom-content {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid currentColor;
  }
}
.zm-tree-org {
  background-color: #0d2f42 !important;
}
</style>
