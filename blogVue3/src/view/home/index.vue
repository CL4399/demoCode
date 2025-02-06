<template>
  <div id="home" class="fullPage" ref="fullPage">
    <div class="header" style="">
      <div>
        <Image :width="120" :src="img"></Image>
      </div>
      <Menu style="height: 40px; width: 11%" v-model:selectedKeys="current" mode="horizontal">
        <MenuItem :key="1"> <span>首页</span></MenuItem>
        <MenuItem :key="3"> <span>博客</span></MenuItem>
        <MenuItem :key="2"> <span>关于</span></MenuItem>
      </Menu>
    </div>
    <div>
      <div class="section section1">
        <Carousel autoplay effect="fade" :dots="dots">
          <div class="background background1"></div>
          <div class="background background2"></div>
          <div class="background background3"></div>
          <div class="background background4"></div>
        </Carousel>
        <div class="content-button"><DownOutlined style="color: #fff; font-size: 50px" /></div>
        <div class="section-waves">
          <div>
            <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="section section2">2</div>
      <div class="section section3">3</div>
      <div class="section section4">4</div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { MenuProps, Menu, Image, Carousel } from 'ant-design-vue';
const MenuItem = Menu.Item;
import img from './logo.png';
export default defineComponent({
  components: { Menu, MenuItem, Image, Carousel },
  setup() {
    const dataInfo = reactive({});
    let fullPage = ref();
    let fullPageContainer = ref();
    const current = ref<string[]>(['mail']);

    onMounted(() => {});
    return { fullPage, fullPageContainer, current, img, dots: false };
  },
});
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.fullPage {
  height: 100vh; //一定要设置，保证占满
  overflow: auto; //一定要设置，多余的先隐藏
}

.fullPage::-webkit-scrollbar {
  width: 8px; /* 设置滚动条的宽度 */
}

.fullPage::-webkit-scrollbar-thumb {
  background: #eee; /* 设置滚动条滑块的颜色 */
  border-radius: 5px;
}

.fullPage::-webkit-scrollbar-track {
  background: rgb(70, 68, 68); /* 设置滚动条轨道的颜色 */
}

/* 关键：将滚动条位置设置到左边 */
.fullPage::-webkit-scrollbar {
  left: 0; /* 强制滚动条出现在左边 */
}
.fullPageContainer {
  width: 100%;
  height: 100vh;
  transition: all linear 0.5s;
}

.section {
  width: 100%;
  height: 100vh;
  position: relative;
  .content-button {
    position: absolute;
    top: 80%;
    left: 50%;
    width: 50px;
    height: 50px;
    animation: bounce 1.5s infinite alternate;
    cursor: pointer;
    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-30px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
  .section-waves {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    color: white;
  }

  .logo {
    width: 50px;
    fill: white;
    padding-right: 15px;
    display: inline-block;
    vertical-align: middle;
  }

  .inner-header {
    height: 65vh;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .flex {
    /*Flexbox for containers*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    /*Fix for safari gap*/
    min-height: 100px;
    max-height: 150px;
  }

  .content {
    position: relative;
    height: 30vh;
    text-align: center;
    background-color: white;
  }

  /* Animation */

  .parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }

  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }

  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }

  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }

  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }

  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }

    100% {
      transform: translate3d(85px, 0, 0);
    }
  }

  /*Shrinking for mobile*/
  @media (max-width: 768px) {
    .waves {
      height: 40px;
      min-height: 40px;
    }

    .content {
      height: 30vh;
    }

    h1 {
      font-size: 24px;
    }
  }
}

.section1 {
  height: 94vh;
  .background {
    width: 100vw;
    height: 94vh;
    background-size: cover;
    background-position: center; /* 将图片居中显示 */
  }
  .background1 {
    background-image: url('./1.jpg');
  }
  .background2 {
    background-image: url('./2.jpg');
  }
  .background3 {
    background-image: url('./3.jpg');
  }
  .background4 {
    background-image: url('./4.jpg');
  }
}

.section2 {
  background-color: rgb(44, 48, 43);
}

.section3 {
  background-color: rgb(116, 104, 109);
}

.section4 {
  background-color: rgb(201, 202, 157);
}
</style>
