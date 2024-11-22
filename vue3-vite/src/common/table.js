import GTable from '../view/component/CustomTable.tsx';
export default function (
  ref,
  tableMinixParams = {
    tableSelectType: 'checkbox',
    module_key: '',
  }
) {
  return {
    data() {
      return {
        selectedRows: [],
        selectedRowKeys: [],
        modulesAuthMsg: '',
      };
    },
    components: {
      GTable,
    },
    computed: {
      rowSelection() {
        const { selectedRowKeys } = this;
        return {
          // fixed:true,
          type: tableMinixParams.tableSelectType || 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
          },
          onReset: (res) => {
            // 翻页过后 selectedRowKey会记住所有勾选的行
            // 但是selectedRows只记得change选框后，当前页面勾选的行
            // 当翻页过后 此页面selectedRowKey勾选了值 但selectedRows还记住的是
            // 上一次勾选的状态 所以这里要更新一下 更新为当前页面selectedRowKey的值对应的行
            // const list = res.data.list
            const list = res;
            this.selectedRows = [];
            selectedRowKeys.forEach((key) => {
              let row = list.find((item) => item.id === key);
              row && this.selectedRows.push(row);
            });
          },
        };
      },
    },
    created() {},
    methods: {
      reload() {
        this.$refs[ref].reload().then(() => {
          this.selectedRows = [];
          this.selectedRowKeys = [];
        });
      },
      search() {
        console.log('search');
        this.reload();
      },
    },
  };
}
