<template>
  <!-- <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Delete</a>
        </span>
      </template>
    </template>
  </a-table> -->

  <CustomTableVue
    nameid="Modules_Table"
    :url="url"
    :params="params"
    ref="Modules_table"
    :columns="columns"
    :rowSelection="{}"
    tipName="Modules_table_tip"
    :scroll="{}"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'gender'">
        <span style="color: aqua">Name</span>
      </template>
    </template>
    <template #bodyCell="{ text, record, index, column }">
      <template v-if="column.key === 'gender'">
        <span style="color: red"> {{ record[column.key] }}</span>
      </template>
    </template>
    <!-- input搜索 -->
    <!-- <div v-for="item of inputSearch" :key="item" #slot="`${item}_filter`" style="padding: 8px">
      <a-input-search
        :allowClear="true"
        v-model="params[item]"
        :maxLength="200"
        @search="(value, e) => search(value, item, e)"
        :placeholder="$t('global.please_input')"
        enter-button
      />
    </div> -->
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="(e) => change(e.target.value, column.dataIndex)"
          @pressEnter="search(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px" @click="search(selectedKeys, confirm, column.dataIndex)">
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters, column.dataIndex)"> Reset </a-button>
      </div>
    </template>

    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#ccc' : '#000' }" />
    </template>

    <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.phone }}
      </p>
    </template>
    <template #expandColumnTitle>
      <span style="color: red">More</span>
    </template>
  </CustomTableVue>
</template>
<script lang="ts">
import { reactive, ref, toRefs, defineComponent, getCurrentInstance } from 'vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { Table as aTable, Tag as aTag, Divider as aDivider, Input as aInput, Button as aButton } from 'ant-design-vue';
import CustomTableVue from '../component/CustomTable.tsx';
import tableMixin from '../../common/table';
export default defineComponent({
  components: { CustomTableVue, aTable, aTag, aDivider, aInput, aButton },
  mixins: [tableMixin('Modules_table')],
  setup(props, { emit, slots }) {
    function handleResizeColumn(w: any, col: any) {
      col.width = w;
    }
    const change = (value: string, dataIndex: string) => {
      dataInfo.params[dataIndex] = value;
      console.log(dataInfo.params, value, 'handleSearch');
    };
    let dataInfo = reactive({
      params: {} as any,
      url: '/api?noinfo',
      columns: [
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 50,
          ellipsis: true,
          align: 'center',
          resizable: true,
        },
        {
          title: 'gender',
          dataIndex: 'gender',
          key: 'gender',
          width: 50,
          ellipsis: true,
          customFilterDropdown: true,
          align: 'center',
          resizable: true,
        },
        {
          title: 'phone',
          key: 'phone',
          width: 150,
          dataIndex: 'phone',
          customFilterDropdown: true,
          align: 'center',
        },
        { title: 'cell', dataIndex: 'cell', key: 'cell', resizable: true, width: 150, align: 'center' },
      ] as TableColumnsType,
    });
    const handleReset = (clearFilters: any, dataIndex: string) => {
      clearFilters({ confirm: true });
      dataInfo.params[dataIndex] = '';
    };
    const {
      appContext: {
        config: {
          globalProperties: { $message },
        },
      },
    } = getCurrentInstance() as any;
    $message.success('success');

    return { ...toRefs(dataInfo), handleReset, change, handleResizeColumn };
  },
});
</script>
