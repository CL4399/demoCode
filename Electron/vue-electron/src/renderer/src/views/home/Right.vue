<template>
  <div class="right">
    <div class="right_top">
      <Select
        ref="select"
        v-model:value="type"
        style="width: 100%"
        @change="handleChange"
        :bordered="false"
        :showArrow="false"
      >
        <SelectOption v-for="item of selectData" :value="item.value">
          <span class="right_top_text"> {{ item.label }}</span>
        </SelectOption>
      </Select>
    </div>
    <div class="right-content">
      <!-- <span v-for="item of info.data" :key="item.index">{{ item.title }}</span> -->
      <List item-layout="horizontal" :data-source="info.data">
        <template #renderItem="{ item }">
          <ListItem @click="clickItem(item)" style="color: #fff; cursor: pointer">
            {{ item.title }}
          </ListItem>
        </template>
      </List>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import { List, ListItem, ListItemMeta, Select, SelectOption } from 'ant-design-vue'
//@ts-ignore
import axios from 'axios'
interface InfoType {
  success: boolean
  title: string
  subtitle: string
  update_time: string
  data: DataType[]
}

interface DataType {
  index: number
  mobilUrl: string
  title: string
  url: string
}

export default defineComponent({
  components: { List, ListItem, ListItemMeta, Select, SelectOption },
  setup() {
    let dataInfo = reactive({
      info: {
        success: true,
        title: '',
        subtitle: '',
        update_time: '',
        data: []
      } as InfoType,
      type: 'itInfo',
      selectData: [
        {
          value: 'itInfo',
          label: 'IT资讯热榜'
        },
        {
          value: 'zhihuHot',
          label: '知乎热榜'
        },
        {
          value: 'baiduRD',
          label: '百度热点'
        },
        {
          value: 'bili',
          label: '哔哩哔哩'
        },
        {
          value: 'wbHot',
          label: '微博热搜'
        },
        {
          value: 'douyinHot',
          label: '抖音热点'
        }
      ]
    })
    onMounted(() => {
      getInfo()
    })
    const getInfo = () => {
      axios
        .get(`https://api.vvhan.com/api/hotlist?type=${dataInfo.type}`)
        .then((response) => {
          // 处理成功情况
          // console.log(response.data, 'response')
          dataInfo.info = {
            success: response.data.success,
            title: response.data.title,
            subtitle: response.data.subtitle,
            update_time: response.data.update_time,
            data: response.data.data.slice(0, 20)
          }
        })
        .catch((error) => {
          // 处理错误情况
          console.log(error, 'error')
        })
        .then(() => {
          // 总是会执行
        })
    }
    const handleChange = () => {
      getInfo()
    }
    const clickItem = (item: DataType) => {
      window.open(item.url)
    }
    return {
      ...toRefs(dataInfo),
      handleChange,
      clickItem
    }
  }
})
</script>
<style lang="less" scoped>
@import '../../assets/css/styles.less';
.right {
  margin-right: 14px;
  width: 90%;
  height: 84vh;
  background-color: #ffffff50;
  border-radius: 20px;
  opacity: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  .right_top {
    position: fixed;
    top: 5%;
    right: 3%;
    height: 6%;
    width: 20%;
    background-color: #464e5c;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    z-index: 99;
    .right_top_text {
      font-size: 22px;
      color: #ffffff;
      font-weight: 700;
      letter-spacing: 5px;
    }
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      background-color: transparent;
      border: none !important;
    }
  }
  .right-content {
    width: 90%;
    height: 100%;
    padding-top: 40px;
  }

  .right_top:hover {
    animation: move 0.5s linear forwards;
  }
}
.right::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  display: none;
}
</style>
