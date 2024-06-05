<template>
  <div>
    <ElTable :data="newData" border style="width: 100%" align="center" size="mini" id="dbM">
      <ElTableColumn label="序号" type="index" width="60"> </ElTableColumn>
      <ElTableColumn v-for="item in menuData" :label="item.name" :show-overflow-tooltip="true" :prop="item.prop" :key="item"> </ElTableColumn>
      <slot v-for="(index, name) in $slots" name="name">
        <slot :name="name" />
      </slot>
    </ElTable>
  </div>
</template>

<script>
import { ElTable, ElTableColumn } from 'element-plus';
export default {
  name: 'DtSrcoll',
  props: {
    newData: Array, //表格数据
    menuData: Array, //表格行内容
    lineHeight: {
      //页面需要显示的行数
      type: Number,
      default: 4,
    },
    rowTime: {
      //每一行滚动切换等待的时间（毫秒）
      type: Number,
      default: 1500,
    },
    duration: {
      //过渡时间
      type: Number,
      default: 500,
    },
    tableHeight: {
      //行高
      type: Number,
      default: 40,
    },
    isClear: {
      //数据滚动到最后一行是否停止滚动
      type: Boolean,
      default: false,
    },
    isAgain: {
      // 数据滚动到最后一行是否重新开始滚动
      type: Boolean,
      default: false,
    },
    isScroll: {
      //是否允许内容滚动
      type: Boolean,
      default: true,
    },
  },
  components: { ElTable, ElTableColumn },
  data() {
    return {
      active: 0,
      timer: '',
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      let elwrapper = document.getElementsByClassName('el-table__body-wrapper')[0];
      elwrapper.style.height = this.lineHeight * this.tableHeight + 'px';
      let elBody = document.getElementsByClassName('el-table__body')[0];
      let elRow = document.getElementsByClassName('el-table__row');
      for (let node of elRow) {
        node.style.height = this.tableHeight + 'px';
      }
      elBody.style.top = 0;
      elBody.style.transactionDuration = this.duration + 'ms';
      if (_this.isScroll) {
        _this.timer = setInterval(function () {
          if (_this.active < parseInt(_this.newData.length) - parseInt(_this.lineHeight)) {
            _this.active += 1;
            elBody.style.top = parseInt(elBody.style.top) - parseInt(_this.tableHeight) + 'px';
          } else {
            if (this.isClear) {
              clearInterval(this.timer);
            }
            if (_this.isAgain) {
              _this.active = 0;
              elBody.style.top = 0;
            } else {
              clearInterval(_this.timer);
            }
          }
        }, _this.rowTime);
      }
    });
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style>
.el-table__body {
  position: absolute;
  transition: all 500ms linear;
}
</style>
