<template>
  <div class="container">
    <ul>
      <li>
        <a href=""><i class="fa fa-qq" aria-hidden="true"></i></a>
      </li>
      <li>
        <a href=""><i class="fa fa-weixin" aria-hidden="true"></i></a>
      </li>
      <li>
        <a href=""><i class="fa fa-weibo" aria-hidden="true"></i></a>
      </li>
      <li>
        <a href=""><i class="fa fa-tencent-weibo" aria-hidden="true"></i></a>
      </li>
      <li>
        <a href=""><i class="fa fa-telegram" aria-hidden="true"></i></a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {});
    return {};
  },
});
</script>
<style lang="less" scoped>
.container {
  width: 100%; /* 宽度100% */
  height: auto; /* 高度100%视口高度 */
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

ul {
  position: relative; /* 相对定位 */
  display: flex; /* 使用flex布局 */
  z-index: 2; /* 层级为2 */
}

ul li {
  position: relative; /* 相对定位 */
  list-style: none; /* 移除列表样式 */
  margin: 10px; /* 外边距 */
}

ul li a {
  position: relative; /* 相对定位 */
  width: 80px; /* 宽度80px */
  height: 80px; /* 高度80px */
  display: inline-block; /* 行内块级元素 */
  border-radius: 10px; /* 设置圆角 */
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-decoration: none; /* 移除文本装饰 */
  color: #fff; /* 文本颜色 */
  font-size: 32px; /* 字体大小 */
  border: 1px solid rgba(255, 255, 255, 0.4); /* 边框 */
  border-right: 1px solid rgba(255, 255, 255, 0.2); /* 右侧边框 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* 底部边框 */
  box-shadow: 0px 5px 45px rgba(0, 0, 0, 0.1); /* 设置阴影效果 */
  backdrop-filter: blur(2px); /* 模糊背景 */
  transition: all 0.5s; /* 添加过渡效果 */
  overflow: hidden; /* 隐藏溢出内容 */
}

ul li a:hover {
  transform: translateY(-20px); /* 鼠标悬停时向上移动 */
}

ul li a::before {
  content: ''; /* 伪元素内容为空 */
  position: absolute; /* 绝对定位 */
  top: 0px; /* 顶部位置为0px */
  left: 0px; /* 左侧位置为0px */
  width: 50px; /* 宽度50px */
  height: 100%; /* 高度100% */
  background-color: #fff; /* 背景颜色 */
  transform: skewX(45deg) translateX(150px); /* 斜切和平移 */
  transition: all 0.5s; /* 添加过渡效果 */
}

ul li a:hover::before {
  transform: skewX(45deg) translateX(-150px); /* 鼠标悬停时斜切和平移 */
}
</style>
