<template>
  <!-- <div>
        <button type="button" class="bg-indigo-500 animate-wiggle" disabled>
            <svg class="h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        </button>
    </div> -->
  <div id="btnWrapper" v-back="isVisible">
    <div class="btn active">开灯</div>
    <div class="btn">关灯</div>
  </div>
  <br />
  <!-- <div class="box-content">
        <div class="box">box</div>
        <ButtonCom style="width: 100px" @click="change">change</ButtonCom>
        <ButtonCom style="width: 100px" @click="changeNum">change</ButtonCom>
        <ComVue ref="comRef">123123</ComVue>
        <demo1Vue ref="demo1ref"></demo1Vue>
        <demoCom></demoCom>
    </div>
    <BUTTON></BUTTON>
    <div class="video-stage">
        <video id="video" src="./1.mp4"></video>
        <button @click="toggle">Toogle Fullscreen</button>
    </div>
    <div class="for-box">
        <template class="for-item" v-for="item of [1, 2, 3, 4, 5, 6, 7]" :key="item">
            <span>{{ item }}</span>
        </template>
    </div> -->
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent, onMounted, watch, defineAsyncComponent } from 'vue';
import cssVars from 'css-vars-ponyfill';
import { Button, Input } from 'ant-design-vue';
import { https } from '../../serve/https';
export default defineComponent({
  components: {
    Button,
    Input,
    ButtonCom: defineAsyncComponent(() => import('../customButton/Button/Button')),
    demo1Vue: defineAsyncComponent(() => import('./demo1.vue')),
    ComVue: defineAsyncComponent(() => import('./com.vue')),
    demoCom: defineAsyncComponent({
      // 加载函数
      loader: () => import('./demo1.vue'),

      // 加载异步组件时使用的组件
      // loadingComponent: Component,

      // 展示加载组件前的延迟时间，默认为 200ms
      delay: 200,

      // 加载失败后展示的组件
      // errorComponent: Component,

      // 如果提供了一个 timeout 时间限制，并超时了
      // 也会显示这里配置的报错组件，默认值是：Infinity
      timeout: 3000,
    }),
    BUTTON: defineAsyncComponent(() => import('./BUTTON')),
  },
  setup(props: any, { emit }: any) {
    let dataInfo = reactive({
      show: false,
      isVisible: true,
    });
    console.log(dataInfo, '//////////////////');

    let demo1ref = ref();
    onMounted(() => {
      console.log(demo1ref.value, 'demo1ref');
      let wrapper = document.getElementById('btnWrapper') as any;
      cssVars({
        onlyLegacy: true,
        variables: {
          '--groove-left': '12px',
          '--c-wrap-shadow1': ' #f5f9fd',
          '--c-wrap-shadow2': ' #d8dbe5',
          '--c-wrap-bg': ' #e2e6eb',
          '--c-btn-shadow1': ' #d9dbe6',
          '--c-btn-shadow2': ' #f5f9fd',
          '--c-txt1': '#aaa;',
          '--c-txt2': '#111;',
        },
      });
      let btns = document.getElementsByClassName('btn');
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (e) {
          dataInfo.isVisible = !dataInfo.isVisible;
          ThemeChange(i === 1);
          resetBtn(btns);
          cssVars({
            onlyLegacy: true,
            variables: {
              '--groove-left': `calc(12px + ${i * 50}%)`,
              '--wraper-origin': `${i === 0 ? '75% top' : '25% top'}`,
              '--wraper-rotate': `${i === 0 ? -8 : 8}deg`,
              '--c-wrap-shadow1': `${i === 0 ? '#f5f9fd' : '#292929'}`,
              '--c-wrap-shadow2': `${i === 0 ? '#ccc' : '#202020'}`,
              '--c-wrap-bg': `${i === 0 ? 'e2e6eb' : '#505050'}`,
              '--c-btn-shadow1': `${i === 0 ? '#d9dbe6' : '#323232'}`,
              '--c-btn-shadow2': `${i === 0 ? '#f5f9fd' : '#444'}`,
              '--c-txt1': `${i === 0 ? '#aaa' : '#888'}`,
              '--c-txt2': `${i === 0 ? '#111' : '#fff'}`,
            },
          });
          wrapper.className = 'rotateWrap';
          setTimeout(() => {
            btns[i].className = 'btn active';
          }, 500);
          setTimeout(() => {
            wrapper.className = '';
          }, 550);
        });
      }
      // 重置按钮类名
      function resetBtn(btns: any) {
        for (let i = 0; i < btns.length; i++) {
          setTimeout(() => {
            btns[i].className = 'btn';
          }, 100);
        }
      }
      // 改变主题
      function ThemeChange(bol: any) {
        let body = document.body;
        // body.className = bol ? 'dark' : ''
      }
    });
    cssVars({
      onlyLegacy: true,
      variables: {
        '--width': '40px',
        '--c-boxc': 'green',
      },
    });
    const comRef = ref();
    const change = () => {
      dataInfo.show = !dataInfo.show;
      cssVars({
        onlyLegacy: true,
        variables: {
          '--width': dataInfo.show ? '120px' : '40px',
          '--c-boxc': dataInfo.show ? '#fff' : '#000',
        },
      });
    };
    const changeNum = () => {
      console.log(comRef.value, 'comRef');
      dataInfo.show = !dataInfo.show;
      localStorage.setItem('text', JSON.stringify(dataInfo.show));
      comRef.value.getItem();
    };
    const toggle = () => {
      const videoStageEl = document.querySelector('.video-stage');
      if (videoStageEl?.requestFullscreen) {
        if (!document.fullscreenElement) {
          videoStageEl.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      } else {
        console.log('此设备不支持 Fullscreen API');
      }
    };

    return { ...toRefs(dataInfo), change, changeNum, comRef, demo1ref, toggle };
  },
});
</script>
<style lang="less" scoped>
.for-item:nth-child(-n + 3) {
  span {
    color: red;
  }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  --c-wrap-shadow1: #f5f9fd;
  --c-wrap-shadow2: #d8dbe5;
  --c-wrap-bg: #e2e6eb;
  --c-btn-shadow1: #d9dbe6;
  --c-btn-shadow2: #f5f9fd;
  --c-txt1: #aaa;
  --c-txt2: #111;
  background-color: #edf1f4;
  perspective: 500px;
  transition: background-color 0.4s linear;
}
.dark {
  --c-wrap-shadow1: #292929;
  --c-wrap-shadow2: #202020;
  --c-wrap-bg: #505050;
  --c-btn-shadow1: #323232;
  --c-btn-shadow2: #444;
  --c-txt1: #888;
  --c-txt2: #fff;
  background-color: #333;
}
.write {
  --c-wrap-shadow1: #f5f9fd;
  --c-wrap-shadow2: #d8dbe5;
  --c-wrap-bg: #e2e6eb;
  --c-btn-shadow1: #d9dbe6;
  --c-btn-shadow2: #f5f9fd;
  --c-txt1: #aaa;
  --c-txt2: #111;
}
#btnWrapper {
  overflow: hidden;
  position: relative;
  margin: 50px auto;
  padding: 12px 16px;
  border-radius: 12px;
  width: 380px;
  height: 80px;
  background-color: var(--c-wrap-bg);
  box-shadow: 5px 5px 10px var(--c-wrap-shadow1), 5px 5px 5px var(--c-wrap-shadow2);
  transform-origin: var(--wraper-origin);
  transition: transform 0.4s cubic-bezier(0, 0, 0.48, 1), box-shadow 0.4s linear, background-color 0.4s linear;
}
.rotateWrap {
  transform: rotateY(var(--wraper-rotate));
}
#btnWrapper::before {
  position: absolute;
  left: var(--groove-left);
  top: 12px;
  border-radius: 12px;
  width: calc(50% - 16px - 8px);
  height: calc(100% - 24px);
  box-shadow: inset 8px 8px 6px var(--c-btn-shadow1), inset -5px -5px 15px var(--c-btn-shadow2), inset -5px -5px 15px var(--c-btn-shadow2),
    inset 7px 7px 6px var(--c-btn-shadow1);
  content: '';
  transition: left 1s cubic-bezier(0.82, 0.12, 0.18, 0.88), box-shadow 0.4s linear;
}
.btn {
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  padding: inherit;
  width: 50%;
  height: 100%;
  cursor: pointer;
  color: var(--c-txt1);
  transition: color 0.4s linear;
  animation: txtOutScale 0.6s linear;
}
.active {
  color: var(--c-txt2);
  transform: scale(1.1);
  animation: txtEnterScale 0.4s linear;
}
@keyframes txtEnterScale {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1.1);
  }
}
@keyframes txtOutScale {
  0% {
    transform: scale(1.1);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
.box-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .box {
    width: var(--width);
    background-color: red;
    color: var(--c-boxc);
  }
}
</style>
