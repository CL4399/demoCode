<template>
  <div class="main">
    <el-table
      :data="tableData"
      border
      :span-method="objectSpanMethod"
      style="width: 100%"
      @cell-mouse-enter="handleMouseEnter"
      :cell-style="{ background: '#fff' }"
      @cell-mouse-leave="handleMouseLeave"
    >
      <el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" min-width="180" />
      <el-table-column label="中文" prop="Chinese"></el-table-column>
      <el-table-column label="操作" prop="Index1" fixed="right">
        <ElButton>修改</ElButton>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reactive, ref, toRefs, provide, defineComponent, getCurrentInstance, computed } from 'vue';
import { ElTable, ElButton, ElTableColumn } from 'element-plus';
export default defineComponent({
  components: { ElTable, ElButton, ElTableColumn },
  setup(props, proxy) {
    let dataInfo = reactive({
      testArr1: [],
      testPosition1: 0,
      tableColumn: [
        { prop: 'Index', label: '索引' },
        { prop: 'School', label: '学校' },
        { prop: 'Grade', label: '年级' },
        { prop: 'Class', label: '班级' },
        { prop: 'Name', label: '姓名' },
        { prop: 'Math', label: '数学' },
        { prop: 'English', label: '英文' },
      ],
      tableData: [
        { School: '第三小学', Grade: '1年级', Class: '1班', Name: '张三', Chinese: '90', Math: '100', English: '80',op:1},
        { School: '第三小学', Grade: '1年级', Class: '1班', Name: '张三', Chinese: '90', Math: '100', English: '80',op:1},
        { School: '第一小学', Grade: '1年级', Class: '1班', Name: '张伟', Chinese: '90', Math: '99', English: '89',op:1},
        { School: '第一小学', Grade: '1年级', Class: '2班', Name: '李四', Chinese: '90', Math: '85', English: '80',op:1},
        { School: '第一小学', Grade: '1年级', Class: '3班', Name: '王五', Chinese: '79', Math: '100', English: '80',op:1},
        { School: '第一小学', Grade: '2年级', Class: '1班', Name: '赵六', Chinese: '95', Math: '100', English: '80',op:1},
        { School: '第一小学', Grade: '2年级', Class: '2班', Name: '钱八', Chinese: '98', Math: '85', English: '80',op:1},
        { School: '第一小学', Grade: '2年级', Class: '3班', Name: '陈九', Chinese: '79', Math: '100', English: '100',op:1},
        { School: '第一小学', Grade: '3年级', Class: '1班', Name: '黄十', Chinese: '91', Math: '88', English: '80',op:1},
        { School: '第一小学', Grade: '3年级', Class: '2班', Name: '魏一', Chinese: '90', Math: '86', English: '87',op:1},
        { School: '第一小学', Grade: '3年级', Class: '3班', Name: '杨二', Chinese: '79', Math: '99', English: '80',op:1},
        { School: '第二小学', Grade: '3年级', Class: '3班', Name: '袁零', Chinese: '79', Math: '99', English: '80',op:1},
      ],
      currentHoverId: 0,
    });
    let spanArr = computed(() => {
      if (!dataInfo.tableColumn.length) return [];
      const mergeCols = ['Index', 'School', 'Grade', 'Class']; // 需要合并的列（字段）
      return getMergeCells(dataInfo.tableData, dataInfo.tableColumn, mergeCols);
    });
    const schoolIndexMap = {};
    const rowspan = (spanArr, position, spanName) => {
      dataInfo.tableData.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (dataInfo.tableData[index][spanName] === dataInfo.tableData[index - 1][spanName]) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
    };
    dataInfo.tableData.forEach((record, index) => {
      const schoolName = record.School;

      // 如果学校已经有索引，则使用现有索引；否则，为该学校分配一个新的索引
      if (schoolIndexMap.hasOwnProperty(schoolName)) {  
        record.Index = schoolIndexMap[schoolName];
        record.Index1 = record.Index;
      } else {
        const newIndex = Object.keys(schoolIndexMap).length + 1;
        schoolIndexMap[schoolName] = newIndex;
        record.Index = newIndex;
        record.Index1 = record.Index;
      }
    });
    console.log(dataInfo.tableData);
    rowspan(dataInfo.testArr1, dataInfo.testPosition1, 'Index1');

    // 鼠标移入表格某个单号
    const handleMouseEnter = (row, column, cell, event) => {
      dataInfo.currentHoverId = row.rcptNo;
    };
    // 鼠标移出表格某个单号
    const handleMouseLeave = () => {
      dataInfo.currentHoverId = -1;
    };

    const getMergeCells = (tableData = [], tableColumn = [], mergeCols = []) => {
      const fields = tableColumn?.map((v) => v.prop);
      const array = [];

      if (!tableData?.length || !tableColumn?.length || !mergeCols?.length) return;

      // 倒叙遍历行（方便统计合并列单元格数至最上方，避免表格塌陷）
      for (let row = tableData.length - 1; row >= 0; row--) {
        array[row] = [];
        for (let col = 0; col < fields.length; col++) {
          // 1.最后一行单元格不合并（初始无可对比数据）
          // 2.不在指定列（mergeCols）的单元格不合并
          // 3.空值不合并
          if (row === tableData.length - 1 || !mergeCols.includes(fields[col]) || !tableData[row][fields[col]]) {
            array[row][col] = [1, 1];
            continue;
          }

          // 4.数据相同但所属父级不一致的单元格不合并
          const parentFields = mergeCols.slice(0, col); // 在指定合并列中找出所有父级
          if (mergeCols.includes(fields[col]) && parentFields?.includes(fields[col - 1])) {
            const currentParents = parentFields.map((field) => tableData[row][field]); // 当前单元格所有父级
            const nextRowParents = parentFields.map((field) => tableData[row + 1][field]); // 下一行单元格所有父级
            if (currentParents?.toString() !== nextRowParents?.toString()) {
              array[row][col] = [1, 1];
              continue;
            }
          }

          // 5.合并相同数据的单元格
          if (tableData[row][fields[col]] === tableData[row + 1][fields[col]]) {
            const beforeCell = array[row + 1][col];
            array[row][col] = [1 + beforeCell[0], 1];
            beforeCell[0] = 0;
            beforeCell[1] = 0;
          } else {
            array[row][col] = [1, 1]; // 否则不合并
          }
        }
      }
      // console.log(array, 'array')
      return array;
    };

    // 表数据合并
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (column.label == '操作') {
        // 合并操作项
        // const _row = dataInfo.testArr1[rowIndex];
        // const _col = _row > 0 ? 1 : 0;
        // return {
        //   rowspan: _row,
        //   colspan: _col,
        // };
        // 不合并操作项
        return spanArr.value[rowIndex][columnIndex];
      } else {
        return spanArr.value[rowIndex][columnIndex];
      }
    };

    return { ...toRefs(dataInfo), objectSpanMethod, handleMouseEnter, handleMouseLeave };
  },
});
</script>
