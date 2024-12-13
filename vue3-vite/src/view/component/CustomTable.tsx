import { PropType, defineComponent, nextTick, onMounted, reactive, ref, defineExpose, watchEffect } from 'vue';
import { Table as aTable, Tag as aTag, Divider as aDivider } from 'ant-design-vue';
import './CustomTableCss.css';
import axios from 'axios';
import { usePagination } from 'vue-request';
import { https } from '../../serve/https';
import { ColumnType } from 'ant-design-vue/lib/table';
import { watch } from 'fs';
//@ts-ignore
import { ResizeColumn } from './CustomTableType.ts';
type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};
const CustomTableVue = defineComponent({
  props: {
    nameId: String,
    idName: {
      type: String,
      default: 'gtable' + new Date().getTime() + Math.floor(Math.random()),
    },
    tipName: {
      type: String,
      default: 'list_tip_wrap',
    },
    dataType: {
      type: String,
      default: 'list',
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    size: {
      type: String,
      default: '',
    },
    rowSelection: {
      type: Object,
      default: () => {
        return {};
      },
    },
    expandedRowKeys: {
      type: Array,
    },
    rowClassName: {
      type: Function,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    url: {
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: 'get',
    },
    params: {
      type: Object,
      default: function () {
        return {};
      },
    },
    showPageSizeNum: {
      type: Number,
      default: 200,
    },
    pagination: {
      type: [Object, Boolean],
      default: () => {
        return {
          total: 0,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
          showTotal: (total: any) => {
            return '共 ' + total + ' 条数据';
          },
          current: 1,
          pageSize: 10,
        };
      },
    },
    isExpand: {
      type: Boolean,
      default: false,
    },
    isShowTableLoading: {
      type: Boolean,
      default: true,
    },
    scroll: {
      type: Object,
      default: () => {
        return { x: '100%', y: 'calc(100vh - 400px)' };
      },
    },
  },
  components: { aTable, aTag, aDivider },
  setup(props, _ref) {
    var slots = _ref.slots,
      expose = _ref.expose,
      emit = _ref.emit;
    let dataInfo = reactive({
      loading: true,
      dataSource: [] as any,
      defaultSize: 'default',
      pageProp: {
        page: 1,
        limit: 10,
      },
      self: null as any,
      ellipsis: [],
      components: {},
      param: { ...props.params },
    });
    dataInfo.dataSource = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];

    onMounted(() => {
      nextTick(() => {
        // this.setDragTable();
        dataInfo.self = document.getElementById(props.idName);
        //@ts-ignore
        dataInfo.ellipsis = dataInfo.self.getElementsByClassName(`ant-table-tbody`)[0].getElementsByClassName('ant-table-cell-ellipsis');
        init();
        console.log(Object.keys(slots), slots, 'slots');
      });
    });
    const handlePageChange = (pagination: any) => {
      // 翻页 或 改变条数
      dataInfo.pageProp.page = pagination.current;
      dataInfo.pageProp.limit = pagination.pageSize;
      reload();
    };
    const reload = () => {
      dataInfo.loading = true;
      return init();
    };
    expose({
      reload,
    });
    const setEllipsis = () => {
      destroyedTip();
      for (let i = 0, len = dataInfo.ellipsis.length; i < len; i++) {
        const col = dataInfo.ellipsis[i] as any;
        col.setAttribute('title', '');
        setDomTip(col);
      }
    };
    const destroyedTip = () => {
      let tips = document.querySelectorAll(`.${props.tipName}`);
      for (let len = tips.length, i = len - 1; i >= 0; i--) {
        document.body.removeChild(tips[i]);
      }
    };
    const setDomTip = (col: HTMLElement) => {
      if (!col) {
        throw new Error('Invalid DOM element');
      }

      const ARROW_OFFSET = 20;

      const range = document.createRange();
      range.setStart(col, 0);
      range.setEnd(col, col.childNodes.length);
      const rangeWidth = range.getBoundingClientRect().width;

      const computedStyle = window.getComputedStyle(col, null);
      const paddingRight = parseInt(computedStyle.paddingRight, 10);
      const paddingLeft = parseInt(computedStyle.paddingLeft, 10);
      //   const paddingTop = parseInt(computedStyle.paddingTop, 10);

      const totalPadding = paddingRight + paddingLeft;
      const totalWidth = rangeWidth + totalPadding;
      if (totalWidth > col.clientWidth || col.scrollWidth > col.clientWidth) {
        const tip = document.createElement('div') as HTMLElement;
        const arrow = document.createElement('div');
        const content = document.createElement('div');

        content.innerText = col.innerText || (col.textContent as string);
        arrow.classList.add('arrow');
        content.className = 'content';
        tip.className = `toolTip ${props.tipName}`;

        tip.appendChild(arrow);
        tip.appendChild(content);

        col.onmouseenter = () => {
          const colClientRect = col.getBoundingClientRect();
          tip.classList.remove('tipHide');

          if (!document.body.contains(tip)) {
            document.body.appendChild(tip);
          }
          let left = colClientRect.left - paddingLeft;
          const valueWidth = document.body.clientWidth - left - tip.offsetWidth;
          if (valueWidth < 0) {
            left += valueWidth;
          }
          if (left < 0) {
            left = 0;
          }

          if (left === 0) {
            arrow.style.left = `${colClientRect.left - paddingLeft + ARROW_OFFSET}px`;
          } else {
            const arrowLeft = valueWidth < 0 ? ARROW_OFFSET - valueWidth : ARROW_OFFSET;
            arrow.style.left = `${arrowLeft}px`;
          }
          tip.style.left = `${left}px`;
          tip.style.right = left === 0 && tip.offsetWidth > document.body.clientWidth ? '0' : '';
          tip.style.bottom = `${document.body.offsetHeight - colClientRect.top}px`;
        };

        col.onmouseleave = () => {
          tip.classList.add('tipHide');
        };
      }
    };
    const init = async () => {
      // 数据获取
      https({
        baseUrl: props.url,
        method: 'GET',
        data: { page: 1, results: 10, ...props.params },
      }).then(async (res) => {
        dataInfo.dataSource = JSON.parse(JSON.stringify(res.results));
        setTimeout(() => {
          setEllipsis();
          dataInfo.loading = false;
        });
      });
    };
    function handleResizeColumn(w: Number, col: ResizeColumn) {
      console.log(col, 'col');
      col.width = w;
    }
    const handleExpand = (expanded: any, record: any) => {
      emit('expand', expanded, record);
    };
    watchEffect(() => {
      dataInfo.param = { ...props.params };
    });
    return () => (
      <div id={props.idName} ref={props.idName} style="position: relative">
        <a-table
          id={'tableId' + props.nameId}
          class="custom_table"
          onChange={handlePageChange}
          onExpand={handleExpand}
          // 加载动画
          loading={dataInfo.loading}
          // 边框
          bordered={props.bordered}
          // 分页
          pagination={props.pagination}
          // 表头配置
          columns={props.columns}
          rowKey={(record: any) => record.id || JSON.stringify(record)}
          rowClassName={props.rowClassName}
          // 数据源
          data-source={dataInfo.dataSource}
          // 列表项是否可选择
          rowSelection={props.rowSelection}
          // 列表可滚动
          scroll={props.scroll}
          // 列表尺寸
          size={props.size ? props.size : dataInfo.defaultSize}
          // 展开行
          expandedRowKeys={props.expandedRowKeys}
          // 可伸缩列 是否可拖动调整宽度，此时 width 必须是 number 类型
          onResizeColumn={handleResizeColumn}
          expandColumnWidth={15}
          expandFixed="right"
        >
          {{
            ...slots,
          }}
        </a-table>
      </div>
    );
  },
});

export default CustomTableVue;
