<template>
  <div class="center">
    <div class="center_top">
      <Select
        ref="select"
        v-model:value="type"
        style="width: 20%; font-size: 22px; letter-spacing: 5px"
        @change="handleChange"
        :bordered="false"
        :showArrow="false"
      >
        <SelectOption v-for="item of selectData" :value="item.value">
          <span class="center_top_title_text"> {{ item.label }}</span>
        </SelectOption>
      </Select>
      <div class="center_top_content">
        <Descriptions
          :content-style="{ color: '#fff', fontSize: '17px', fontWeight: '600' }"
          :labelStyle="{ color: '#fff', fontSize: '17px', fontWeight: '600' }"
          :column="2"
        >
          <DescriptionsItem label="幸运色"
            ><span>{{ info.luckycolor }}</span>
          </DescriptionsItem>
          <DescriptionsItem label="幸运数字"
            ><span>{{ info.luckynumber }}</span></DescriptionsItem
          >
          <DescriptionsItem label="幸运星座"
            ><span>{{ info.luckyconstellation }}</span></DescriptionsItem
          >
          <DescriptionsItem label="时间"
            ><span>{{ info.time }}</span></DescriptionsItem
          >
        </Descriptions>
        <div class="container">
          <p>
            <a> {{ info.fortunetext.all }} </a>
          </p>
          <p>
            <a> {{ info.fortunetext.work }} </a>
          </p>
        </div>
      </div>
    </div>
    <div class="center_bottom">
      <!-- <div class="center_bottom_left">
        <div calss="container">
          <p><a href="#" @click="clickOpen"> RED </a></p>
        </div>
      </div> -->
      <div class="center_bottom_right" :style="{ 'background-image': `url(${msgInfo.pic})` }">
        <Carousel :autoplay="true" :autoplaySpeed="1000 * 30" :beforeChange="beforeChange">
          <div class="center_bottom_right_content">
            <div>{{ msgInfo.en }}</div>
            <div>{{ msgInfo.zh }}</div>
          </div>
          <div class="center_bottom_right_content">
            <div>{{ msgInfo.en }}</div>
            <div>{{ msgInfo.zh }}</div>
          </div>
        </Carousel>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import axios from 'axios'
import { Descriptions, DescriptionsItem, Select, SelectOption, Carousel } from 'ant-design-vue'
// @ts-ignore
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Descriptions,
    DescriptionsItem,
    Select,
    SelectOption,
    Carousel
  },
  setup() {
    let dataInfo = reactive({
      info: {
        title: '',
        type: '',
        time: '',
        todo: {
          yi: '',
          ji: ''
        },
        fortune: {
          all: 2,
          love: 3,
          work: 2,
          money: 3,
          health: 3
        },
        index: {
          all: '55%',
          love: '62%',
          work: '54%',
          money: '58%',
          health: '68%'
        },
        shortcomment: '',
        fortunetext: {
          all: '',
          love: '',
          work: '',
          money: '',
          health: ''
        },
        luckynumber: '',
        luckycolor: '',
        luckyconstellation: ''
      } as any,
      type: 'capricorn',
      selectData: [
        { value: 'aries', label: '白羊座' },
        { value: 'taurus', label: '金牛座' },
        { value: 'gemini', label: '双子座' },
        { value: 'cancer', label: '巨蟹座' },
        { value: 'leo', label: '狮子座' },
        { value: 'virgo', label: '处女座' },
        { value: 'libra', label: '天秤座' },
        { value: 'scorpio', label: '天蝎座' },
        { value: 'sagittarius', label: '射手座' },
        { value: 'capricorn', label: '摩羯座' },
        { value: 'aquarius', label: '水瓶座' },
        { value: 'pisces', label: '双鱼座' }
      ],
      msgInfo: {
        month: '7',
        day: '13',
        zh: '无数人走进和走出你的生活，但只有真正的朋友会在你的心里留下足迹。',
        en: 'Many people will walk in and out of your life, but only true friends will leave footprints in your heart.',
        pic: 'https://staticedu-wps.cache.iciba.com/image/7eec7cadfcc61cbebc851e1d4ef748ad.jpg'
      }
    })
    let router = useRouter()
    const getInfo = () => {
      axios
        .get(`https://api.vvhan.com/api/horoscope?type=${dataInfo.type}&time=today`)
        .then((response) => {
          dataInfo.info = response.data.data
        })
        .catch((error) => {
          // 处理错误情况
          console.log(error, 'error')
        })
        .then(() => {
          // 总是会执行
        })
    }
  
    const getMsg = () => {
      axios
        .get('https://api.vvhan.com/api/en?type=sj')
        .then((response) => {
          dataInfo.msgInfo = response.data.data
        })
        .catch((error) => {
          // 处理错误情况
          console.log(error, 'error')
        })
        .then(() => {
          // 总是会执行
        })
    }
    onMounted(() => {
      getInfo()
      getMsg()
    })
    const handleChange = () => {
      getInfo()
    }
    const clickOpen = () => {
      router.push('/page')
    }
    const beforeChange = () => {
      getMsg()
    }
    return {
      ...toRefs(dataInfo),
      handleChange,
      clickOpen,
      beforeChange
    }
  }
})
</script>
<style lang="less" scoped>
@import '../../assets/css/styles.less';
.center {
  width: 100%;
  opacity: 0.9;
  .center_top {
    margin: 0% 5% 0% 5%;
    height: 60%;
    color: #fff;
    background-color: #fff;
    border-radius: 30px;
    background-image: url('../../assets/image/4.jpg');
    background-size: 100% 100%;
    padding: 10px;
    .center_top_title_text {
      font-size: 22px;
      color: #ffffff;
      font-weight: 700;
      letter-spacing: 5px;
    }
    .center_top_content {
      overflow: auto;
      height: 90%;
    }
    .center_top_content::-webkit-scrollbar {
      display: none;
    }
  }
  .center_bottom {
    margin: 5% 5% 0 5%;
    height: 35%;
    display: flex;
    justify-content: space-between;
    .center_bottom_left {
      width: 40%;
      background-color: #ceeaf57c;
      border-radius: 20px;
    }
    .center_bottom_right {
      width: 100%;
      background-color: #ceeaf554;
      background-size: 100% 100%;
      border-radius: 20px;
      padding: 10px;

      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      .center_bottom_right_content {
        height: 200px;
        font-size: 20px;
        color: #fff;
        font-weight: 1000;
        padding-top: 6%;
        text-shadow: 0 0 100px #fff, 0 0 500px #fff, 0 0 1000px #fff, 0 0 10px #11ffcb,
          0 0 10px #11ffcb, 0 0 10px #11ffcb, 0 0 10px #11ffcb, 0 0 10px #11ffcb;
      }
    }
  }
  .center_top:hover {
    // animation: move 0.5s linear forwards;
  }
  .center_top_center:hover {
    // animation: move 0.5s linear forwards;
  }

  .center_top_right:hover {
    // animation: move 0.5s linear forwards;
  }

  .center_bottom_left:hover {
    animation: move 1s linear forwards;
  }
  .center_bottom_right:hover {
    animation: move 1s linear forwards;
  }
}
</style>
