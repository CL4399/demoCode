<template>
  <div id="ant-table">
    <Table :scroll="{ y: '160px' }" :columns="columns" :data-source="data"> </Table>
  </div>
</template>
<script>
import { ref, reactive, defineComponent, onMounted, computed, toRefs, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Table } from 'ant-design-vue';
export default defineComponent({
  components: { Button, Table },
  setup() {
    let dataInfo = reactive({
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ],
      data: [
        {
          key: '1',
          name: 'John Brown1',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green2',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black3',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '4',
          name: 'Joe Black4',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '5',
          name: 'Joe Black5',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '6',
          name: 'Joe Black6',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '7',
          name: 'Joe Black7',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '8',
          name: 'Joe Black8',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '9',
          name: 'Joe Black9',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ],
      active: 0,
      timer: null,
      tableHeight: 40,
      lineHeight: 4,
      isScroll: true,
      duration: 500,
      isAgain: true,
      isClear: false,
      rowTime: 1500,
    });

    const int = () => {
      let elwrapper = document.getElementsByClassName('ant-table-body')[0];
      elwrapper.style.height = dataInfo.lineHeight * dataInfo.tableHeight + 'px';
      elwrapper.style.width = '100%';
      let elBody = document.getElementsByClassName('ant-table-tbody')[0];
      let elRow = document.getElementsByClassName('ant-table-row');
      for (let node of elRow) {
        node.style.height = dataInfo.tableHeight + 'px';
      }
      let elCell = document.getElementsByClassName('ant-table-cell');
      for (let node of elCell) {
        node.style.width = '1000px';
      }

      elwrapper.style.position = 'relative';
      elBody.style.top = 0;
      elBody.style.position = 'absolute';
      elBody.style.transactionDuration = dataInfo.duration + 'ms';
      elBody.style.width = '100%';
      if (dataInfo.isScroll) {
        dataInfo.timer = setInterval(() => {
          if (dataInfo.active < dataInfo.data.length - dataInfo.lineHeight) {
            dataInfo.active += 1;
            elBody.style.top = parseInt(elBody.style.top) - dataInfo.tableHeight - 30 + 'px';
            // elBody.style.transform = `translate(0px, ${dataInfo.active * (parseInt(elBody.style.top) - dataInfo.tableHeight - 20)}px)`;
          } else {
            if (dataInfo.isClear) {
              clearInterval(dataInfo.timer);
            }
            if (dataInfo.isAgain) {
              dataInfo.active = 0;
              elBody.style.top = 0;
            } else {
              clearInterval(dataInfo.timer);
            }
          }
        }, dataInfo.rowTime);
      }
    };
    nextTick(() => {
      int();
    });
    return { ...toRefs(dataInfo) };
  },
});
</script>
<style lang="less" scoped></style>
