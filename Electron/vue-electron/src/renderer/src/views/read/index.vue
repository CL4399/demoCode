<template>
  <div id="read" class="read" style="display: flex; flex-direction: column">
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
      <div>
        <div @click="chapter_turning(1)">上一章</div>
        <div @click="chapter_turning(2)">下一章</div>
        <div @click="pageTurning(1)">上一页</div>
        <div @click="pageTurning(2)">下一页</div>
      </div>
    </div>
    <Upload
      v-model:file-list="fileList"
      name="file"
      :maxCount="1"
      @change="handleChange"
      accept=".txt"
    >
      <Button> 选择文件 </Button>
    </Upload>
    　<Button @click="showPath"> 确定 </Button>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, onMounted, toRefs } from 'vue'
import { Button, Upload } from 'ant-design-vue'
// import axios from 'axios'
let fs = require('fs')
interface StrObj {
  [key: string]: any
}
export default defineComponent({
  components: { Button, Upload },
  setup() {
    let dataInfo = reactive({
      fileContent: [] as StrObj[],
      content: '',
      contentIndex: 0,
      pageIndex: 1,
      fileList: []
    })
    let parseChapters = (text: string) => {
      const chapters = [] as any
      const regex = /(第\S+章)([\s\S]*?)(?=(第\S+章|$))/g
      let matches

      while ((matches = regex.exec(text)) !== null) {
        const name = matches[1].trim()
        const content = matches[2].trim()
        chapters.push({ name, content })
      }

      return chapters
    }
    let chooseItem = (item: StrObj, index: number) => {
      dataInfo.content = item.content
      dataInfo.contentIndex = index
      console.log(dataInfo.contentIndex, 'index')
    }
    let pageTurning = (num: number) => {
      let article = document.querySelector('article')
      switch (num) {
        case 1:
          dataInfo.pageIndex--
          if (dataInfo.pageIndex > dataInfo.content.length / 280 || dataInfo.pageIndex < 0)
            dataInfo.pageIndex = 0
          article!.style.transform = `translateX(${316 * dataInfo.pageIndex}px)`
          break
        case 2:
          dataInfo.pageIndex++
          if (dataInfo.pageIndex > dataInfo.content.length / 280 || dataInfo.pageIndex < 0)
            dataInfo.pageIndex = 0
          article!.style.transform = `translateX(-${316 * dataInfo.pageIndex}px)`
          break
      }
    }
    let chapter_turning = (num: number) => {
      dataInfo.pageIndex = 0
      let article = document.querySelector('article')
      article!.style.transform = `translateX(0px)`
      switch (num) {
        case 1:
          dataInfo.contentIndex < 1
            ? (dataInfo.contentIndex = 0)
            : (dataInfo.contentIndex = dataInfo.contentIndex - 1)
          break
        case 2:
          dataInfo.contentIndex = dataInfo.contentIndex + 1
          break
      }
      console.log(dataInfo.contentIndex, 'contentIndex')

      dataInfo.content = dataInfo.fileContent[dataInfo.contentIndex].content
    }
    let showPath = () => {
      dataInfo.pageIndex = 0
      dataInfo.contentIndex = 0
      if (dataInfo.fileContent.length > 0) dataInfo.fileContent = []
      //@ts-ignore
      let path = dataInfo.fileList[0].originFileObj.path
      console.log(path.replace(/\\/g, '/'), 'path')
      getFile(path.replace(/\\/g, '/'))
    }

    const getFile = (path: string) => {
      fs.readFile(path, (err: any, data: any) => {
        if (err) return console.error(err)
        let info = data.toString()
        const chapters: StrObj[] = parseChapters(info)
        console.log(chapters, 'chapters')
        dataInfo.fileContent = chapters
        dataInfo.content = chapters[0].content
      })
    }
    const handleChange = () => {
      console.log(dataInfo.fileList, 'file')
    }
    onMounted(() => {
      //   fs.readFile(
      //     'D:/workFile/demoCode/GitCode/Electron/vue-electron/src/renderer/src/assets/1.txt',
      //     (err: any, data: any) => {
      //       if (err) return console.error(err)
      //       let info = data.toString()
      //       const chapters: StrObj[] = parseChapters(info)
      //       dataInfo.fileContent = chapters
      //       dataInfo.content = chapters[0].content
      //     }
      //   )
      //   axios
      //     .get('../../assets/1.txt')
      //     .then((response) => {
      //       const chapters: StrObj[] = parseChapters(response.data)
      //       dataInfo.fileContent = chapters
      //       dataInfo.content = chapters[0].content
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
    })
    return {
      ...toRefs(dataInfo),
      chooseItem,
      pageTurning,
      chapter_turning,
      showPath,
      handleChange
    }
  }
})
</script>
<style lang="less" scoped>
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
.ant-upload-list-item-error,
.ant-upload-list-item-error .ant-upload-text-icon > .anticon,
.ant-upload-list-item-error .ant-upload-list-item-name {
  color: #000 !important;
}
/deep/.ant-upload-list-item-error .ant-upload-list-item-card-actions .anticon {
  color: #000 !important;
}
/deep/.ant-upload-list-item-name {
  color: #000 !important;
}
</style>
