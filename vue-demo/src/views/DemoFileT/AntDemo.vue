<template>
  <div>
    <antDemoFile :checked="checked"></antDemoFile>
    <div style="width: 50%;height:40vh;overflow: auto;">
      <a-table :columns="columns" :data-source="dataInfo" :pagination="pagination" @change="handleTableChange"
        :row-selection="rowSelection">

      </a-table>
    </div>
  </div>
</template>
<script>
import antDemoFile from './AntDemoCom.vue';
export default {
  name: '',
  components: {
    antDemoFile,
  },
  props: {},
  data() {
    return {
      checked: false,
      columns: [
        {
          name: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
        },
        {
          title: 'Action',
          key: 'action',
        },
      ],
      dataInfo: [],
      pagination: {
        current: 1, //当前页码
        pageSize: 10, // 每页数据条数
        total: 1000, // 总条数
        hideOnSinglePage: false,
        showSizeChanger: true,
        pageSizeOptions: ["10", "25", "50", "100"],
      },
      selectedRowKeys: [],

    };
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: 'all-data',
            text: '选中所有',
            onSelect: () => {
              console.log(this.dataInfo);
              let arr = this.dataInfo.map(item => { return item.key })
              this.selectedRowKeys = arr; // 0...45
            },
          },

        ],
      }
    },
  },
  mounted() {
    for (let i = 1; i < 1000; i++) {
      this.dataInfo.push({
        key: i,
        name: i + ':' + 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      })
    }
  },
  methods: {
    handleTableChange(pagination) {
      console.log(pagination, 'handleTableChange');
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    }
  },
};
</script>
<style lang='less'>
</style>