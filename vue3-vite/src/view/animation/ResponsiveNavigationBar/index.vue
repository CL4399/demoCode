<template>
  <div class="navbar">
    <input type="checkbox" />
    <span></span>
    <span></span>
    <ul>
      <li><a href="#">点赞</a></li>
      <li><a href="#">关注</a></li>
      <li><a href="#">收藏</a></li>
      <li><a href="#">评论</a></li>
      <li><a href="#">分享</a></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
export default defineComponent({
  setup() {
    onMounted(() => {});
    return {};
  },
});
</script>
<style lang="less" scoped>
* {
  margin: 0; /* 重置默认外边距 */
  padding: 0; /* 重置默认内边距 */
}

body,
.navbar,
.navbar ul {
  display: flex; /* 使用flex布局 */
  justify-content: start; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-left: 30px;
}

.navbar {
  position: relative; /* 相对定位 */
  padding: 20px; /* 设置内边距 */
  background-color: #fff; /* 设置背景颜色 */
  border-radius: 50px; /* 设置圆角 */
}

.navbar input {
  width: 40px; /* 设置宽度为40px */
  height: 40px; /* 设置高度为40px */
  opacity: 0; /* 设置透明度为0 */
  cursor: pointer; /* 设置鼠标样式为手型 */
  position: absolute;
  left: 25px;
}

.navbar ul {
  width: 0; /* 初始宽度为0 */
  overflow: hidden; /* 隐藏溢出内容 */
  transition: all 0.5s; /* 添加过渡效果 */
  white-space: nowrap; /* 不换行显示 */
}

.navbar ul li {
  list-style: none; /* 移除列表样式 */
  margin: 0px 15px; /* 设置外边距 */
}

.navbar ul li a {
  text-decoration: none; /* 移除下划线 */
  font-size: 20px; /* 设置字体大小 */
  font-weight: 700; /* 设置字体粗细 */
  color: #333; /* 设置文本颜色 */
}

.navbar ul li a:hover {
  color: #fb7299; /* 设置鼠标悬停时的文本颜色 */
}

.navbar span {
  position: absolute; /* 绝对定位 */
  left: 25px; /* 左侧位置 */
  width: 30px; /* 设置宽度为30px */
  height: 4px; /* 设置高度为4px */
  top: calc(50% - 10px); /* 设置顶部位置 */
  border-radius: 15px; /* 设置圆角 */
  background-color: #999; /* 设置背景颜色 */
  pointer-events: none; /* 禁止事件响应 */
  transition: transform 0.3s ease-in-out, top 0.3s ease-in-out 0.3s; /* 添加过渡效果 */
}

.navbar span:nth-child(3) {
  top: calc(50% + 6px); /* 设置顶部位置 */
}

.navbar input:checked ~ ul {
  width: 350px; /* 设置展开后的宽度 */
}

.navbar input:checked ~ span:nth-child(2) {
  top: calc(50% - 2px); /* 设置顶部位置 */
  transform: rotate(-45deg); /* 旋转45度 */
  background-color: #fb7299; /* 设置背景颜色 */
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s; /* 添加过渡效果 */
}

.navbar input:checked ~ span:nth-child(3) {
  top: calc(50% - 2px); /* 设置顶部位置 */
  transform: rotate(45deg); /* 旋转45度 */
  background-color: #fb7299; /* 设置背景颜色 */
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s; /* 添加过渡效果 */
}
</style>
