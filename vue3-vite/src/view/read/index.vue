<template>
  <div id="read" style="display: flex; flex-wrap: wrap; justify-content: space-between; overflow: auto; height: 82vh">
    <Card title="阅读器" style="width: 49%">
      <div style="display: flex; flex-direction: column">
        <div style="display: flex">
          <div style="width: 200px; height: 300px; background-color: #fff; overflow: auto">
            <ul v-for="(item, index) of fileContent" :key="item.name" @click="chooseItem(item, index)">
              {{
                item.name
              }}
            </ul>
          </div>
          <div class="wrapper" style="width: 300px; height: 300px; background-color: #fff">
            <article id="article">
              {{ content }}
            </article>
          </div>
        </div>

        <div style="display: flex; margin-top: 30px">
          <div style="flex: 1" @click="chapter_turning(1)">上一章</div>
          <div style="flex: 1" @click="chapter_turning(2)">下一章</div>
          <div style="flex: 1" @click="pageTurning(1)">上一页</div>
          <div style="flex: 1" @click="pageTurning(2)">下一页</div>
        </div>
      </div>
      <Upload v-model:file-list="fileList" name="file" :maxCount="1" @change="handleChange" accept=".txt">
        <Button> 选择文件 </Button>
      </Upload>
    </Card>
    <Card title="CSS变量" style="width: 49%">
      <div>
        <button style="color: #000" class="button_content" @click="handleButton">测试</button>
      </div>
    </Card>
    <Card title="原生滚动列表" style="width: 100%; height: 300px; margin-top: 20px">
      <scrollTable />
    </Card>
    <Card title="ELement滚动列表" style="width: 100%; height: auto; margin-top: 20px">
      <dt-srcoll :newData="dutyRateData" :menuData="menuData" :lineHeight="3" :tableHeight="50" :isAgain="true">
        <template v-slot:footerTable>
          <ElTableColumn label="操作">
            <ElButton type="text" size="small">详情</ElButton>
          </ElTableColumn>
        </template>
      </dt-srcoll>
    </Card>
    <Card title="AntDesign滚动列表" style="width: 100%; height: auto; margin-top: 20px">
      <antTable></antTable>
    </Card>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Upload, Card } from 'ant-design-vue';
// import axios from 'axios';
import scrollTable from '../component/scrollTable.vue';
import dtSrcoll from './table.vue';
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import antTable from './antTable.vue';
interface StrObj {
  [key: string]: any;
}
export default defineComponent({
  components: { Button, Upload, Card, scrollTable, dtSrcoll, ElTable, ElTableColumn, ElButton, antTable },
  setup() {
    let dataInfo = reactive({
      fileContent: [] as StrObj[],
      content: '',
      contentIndex: 0,
      pageIndex: 1,
      fileList: [],
      fileText: '' as any,
      datas: [
        {
          title: 'Vue3.0 无缝滚动组件展示数据第1条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第2条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第3条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第4条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第5条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第6条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第7条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第8条',
          date: Date.now(),
        },
        {
          title: 'Vue3.0 无缝滚动组件展示数据第9条',
          date: Date.now(),
        },
      ],
      menuData: [
        //表格内容
        {
          name: '班级',
          prop: 'group',
        },
        {
          name: '书本数量',
          prop: 'bookNum',
        },
        {
          name: '数量',
          prop: 'sceneNum',
        },
        {
          name: '进度',
          prop: 'dutyRate',
        },
      ],
      dutyRateData: [
        //表格数据（也可以通过实时推送更新数据）
        { group: '电工班1', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班2', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班3', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班4', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班5', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班6', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班7', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班8', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班9', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班10', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
        { group: '电工班11', bookNum: 3, sceneNum: 0, dutyRate: '88%' },
      ],
    });
    // 根据 第 N 章 进行章节拆分
    let parseChapters = (text: string) => {
      const chapters = [];
      const regex = /(第\S+章)([\s\S]*?)(?=(第\S+章|$))/g;
      let matches;

      while ((matches = regex.exec(text)) !== null) {
        const name = matches[1].trim();
        const content = matches[2].trim();
        chapters.push({ name, content });
      }

      return chapters;
    };
    // 选择 章节
    let chooseItem = (item: StrObj, index: number) => {
      dataInfo.content = item.content;
      dataInfo.contentIndex = index;
      console.log(dataInfo.contentIndex, 'index');
    };
    // 处理 翻页
    let pageTurning = (num: number) => {
      let article = document.querySelector('article');
      switch (num) {
        case 1:
          dataInfo.pageIndex--;
          if (dataInfo.pageIndex > dataInfo.content.length / 280 || dataInfo.pageIndex < 0) dataInfo.pageIndex = 0;
          article!.style.transform = `translateX(${316 * dataInfo.pageIndex}px)`;
          break;
        case 2:
          dataInfo.pageIndex++;
          if (dataInfo.pageIndex > dataInfo.content.length / 280 || dataInfo.pageIndex < 0) dataInfo.pageIndex = 0;
          article!.style.transform = `translateX(-${316 * dataInfo.pageIndex}px)`;
          break;
      }
    };
    // 处理 上一章 下一章
    let chapter_turning = (num: number) => {
      dataInfo.pageIndex = 0;
      let article = document.querySelector('article');
      article!.style.transform = `translateX(0px)`;
      switch (num) {
        case 1:
          dataInfo.contentIndex < 1 ? (dataInfo.contentIndex = 0) : (dataInfo.contentIndex = dataInfo.contentIndex - 1);
          break;
        case 2:
          dataInfo.contentIndex = dataInfo.contentIndex + 1;
          break;
      }
      console.log(dataInfo.contentIndex, 'contentIndex');

      dataInfo.content = dataInfo.fileContent[dataInfo.contentIndex].content;
    };

    const handleChange = (file: any) => {
      let fileInfo = file.file.originFileObj;
      if (fileInfo) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const chapters: StrObj[] = parseChapters(e.target.result);
          dataInfo.fileContent = chapters;
          dataInfo.content = chapters[0].content;
          dataInfo.contentIndex = 0;
          dataInfo.pageIndex = 0;
        };
        reader.readAsText(fileInfo);
      } else {
        console.error('No file selected.');
      }
    };
    let marginPx = ref(10);
    const handleButton = () => {
      marginPx.value = marginPx.value == 10 ? 20 : 10;
      console.log(marginPx.value, 'marginPx');
    };
    onMounted(() => {
      // axios
      //   .get('/public/1.txt')
      //   .then((response) => {
      //     const chapters: StrObj[] = parseChapters(response.data);
      //     dataInfo.fileContent = chapters;
      //     dataInfo.content = chapters[0].content;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      function round(number: number, precision: number) {
        //@ts-ignore
        return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
      }
      console.log(round(1.05, 2), 'round');

      // 关于form和fill的区别
      let source = new Array();
      let arr = new Array(10).fill(source);
      //   console.log(arr, source, '1');
      source.push(1);
      //   console.log(arr, source, '2');
      // 通过fill创建的数组是引用类型，所以arr里面数组都是指向同一个数组source
      // 通过form创建的数组是值类型，所以arrT里面数组都是指向不同的数组
      let arrT: any = Array.from({ length: 10 }, () => []);
      arrT[0].push(1);
      //   console.log(arrT, 'arrT');

      let arrS: any = new Array(10).fill(null).map(() => []);
      arrS[0].push(1);
      //   console.log(arrS, 'arrS');
    });
    return {
      ...toRefs(dataInfo),
      chooseItem,
      pageTurning,
      chapter_turning,
      handleChange,
      handleButton,
      marginPx,
    };
  },
});
</script>
<style lang="less" scoped>
.scroll {
  height: 170px;
  width: 500px;
  margin: 100px auto;
  overflow: hidden;
  background-color: aqua;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
  }
}
.button_content {
  width: 100px;
  height: 40px;
  margin: 0 auto;
  border: 1px solid yellowgreen;
  padding-top: v-bind("marginPx + 'px'");
  //   background-color: v-bind('false?"red": "white"');
}
.wrapper {
  height: 100vh;
  overflow: hidden;
  margin: 0 16px;
}

article {
  columns: calc(100vw - 32px) 1;
  column-gap: 16px;
  height: 100%;
  transition: 0.4s;
}
/deep/.ant-upload-list-item-error .ant-upload-text-icon > .anticon {
  color: #000 !important;
}
/deep/.ant-upload-list-item-error .ant-upload-list-item-card-actions .anticon {
  color: #000 !important;
}
/deep/.ant-upload-list-item-name {
  color: #000 !important;
}
</style>
