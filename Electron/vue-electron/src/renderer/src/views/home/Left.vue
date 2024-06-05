<template>
  <div class="left">
    <div class="left_top">
      <div class="left_top_left">
        <Image
          style="border-radius: 10px"
          width="100%"
          height="100%"
          src="https://api.vvhan.com/api/wallpaper/views"
        />
      </div>
      <!-- <div class="left_top_right"></div> -->
    </div>
    <div class="left_bottom">
      <div class="left_bottom_center">
        <Image
          style="border-radius: 10px"
          width="98%"
          height="98%"
          src=" https://api.vvhan.com/api/moyu"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Image } from 'ant-design-vue'
</script>
<style lang="less" scoped>
@import '../../assets/css/styles.less';
.left {
  width: 100%;
  opacity: 0.9;
  .left_top {
    margin: 0% 5% 0% 5%;
    height: 35%;
    display: flex;
    justify-content: space-between;
    .left_top_left {
      width: 100%;
      border-radius: 10px;
    }
    .left_top_right {
      width: 25%;
      background-color: #3ec7fd;
      border-radius: 50px 50px 50px 50px;
    }
  }
  .left_bottom {
    margin: 5% 5% 0 5%;
    height: 62.5%;
    background-color: #b3e6fa3a;
    border-radius: 60px 30px 60px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
    .left_bottom_center {
      width: 90%;
      height: 90%;
      border-radius: 50px 90px 50px 90px;
      // background-color: #ffffffe0;
    }
  }
  .left_top_left:hover {
    animation: move 0.5s linear forwards;
  }

  .left_top_right:hover {
    animation: move 0.5s linear forwards;
  }

  .left_bottom_center:hover {
    animation: move 0.5s linear forwards;
  }
}
</style>
