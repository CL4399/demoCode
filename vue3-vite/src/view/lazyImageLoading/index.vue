<template>
  <div id="lazy-image-loading">
    <template v-for="item of imgLength" :key="item">
      <img :style="{ width: '500px', height: '300px', margin: '10px' }" class="lazyload" />
    </template>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs } from 'vue';
import { Button } from 'ant-design-vue';
export default defineComponent({
  components: { Button },
  setup() {
    let dataInfo = reactive({
      imgLength: 100,
    });
    onMounted(() => {
      let intImg = () => {
        var lazyloadImages = document.querySelectorAll('.lazyload');
        const lazyLoad = () => {
          lazyloadImages.forEach((img: any, index: number) => {
            if (
              img.getBoundingClientRect().top <= window.innerHeight &&
              img.getBoundingClientRect().bottom >= 0 &&
              getComputedStyle(img).display !== 'none'
            ) {
              if (index <= 6) {
                img.src = new URL('../../assets/image/1.png', import.meta.url).href;
              } else {
                if (isInViewPort(img)) {
                  // 当滚动到可视区域的时候再给img的src属性赋值
                  img.src = new URL('../../assets/image/1.png', import.meta.url).href;
                  img.classList.remove('lazyload');
                } else {
                  img.src = '';
                }
              }
            }
          });
        };
        lazyLoad();
      };
      intImg();
      var element = document.getElementById('lazy-image-loading');
      element!.addEventListener('scroll', intImg);
      element!.addEventListener('resize', intImg);

      /** 判断元素是否滚动到底部 */
      //   element?.addEventListener('scroll', (el: any) => {
      //     let item = el.target;
      //     if (item.scrollTop + item.clientHeight >= item.scrollHeight) {
      //       dataInfo.imgLength += 10;
      //     }
      //   });
    });
    /** 判断元素是否在可视区域内 */
    const isInViewPort = (element: any) => {
      const viewWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const { top, right, bottom, left } = element.getBoundingClientRect();
      return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
    };

    return {
      ...toRefs(dataInfo),
    };
  },
});
</script>
<style lang="less" scoped>
#lazy-image-loading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  overflow: auto;
  width: 100%;
  height: 100%;
}
</style>
