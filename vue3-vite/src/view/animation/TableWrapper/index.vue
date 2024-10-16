<template>
  <div class="wrapper">
    <nav>
      <input type="radio" name="tab" id="home" checked />
      <input type="radio" name="tab" id="comment" />
      <input type="radio" name="tab" id="envelope" />
      <input type="radio" name="tab" id="heart" />
      <input type="radio" name="tab" id="user" />
      <label for="home" class="home" onclick="location.href='#';">
        <a><i class="fa fa-home" aria-hidden="true"></i>Home</a>
      </label>
      <label for="comment" class="comment" onclick="location.href='#';">
        <a><i class="fa fa-comment" aria-hidden="true"></i>Comment</a>
      </label>
      <label for="envelope" class="envelope" onclick="location.href='#';">
        <a><i class="fa fa-envelope" aria-hidden="true"></i>Envelope</a>
      </label>
      <label for="heart" class="heart" onclick="location.href='#';">
        <a><i class="fa fa-heart" aria-hidden="true"></i>Heart</a>
      </label>
      <label for="user" class="user" onclick="location.href='#';">
        <a><i class="fa fa-user" aria-hidden="true"></i>User</a>
      </label>
      <div class="tab"></div>
    </nav>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    onMounted(() => {});
    return {};
  },
});
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%; /* 设置宽度为视口宽度的60% */
  height: 60px; /* 设置高度为60px */
  line-height: 60px; /* 垂直居中 */
  background-color: #fff; /* 背景色为白色 */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25); /* 设置阴影效果 */
  border-radius: 50px; /* 设置圆角 */
}

.wrapper nav {
  display: flex; /* 使用flex布局 */
  position: relative; /* 相对定位 */
}

.wrapper nav label {
  flex: 1; /* 占满剩余空间 */
  width: 100%; /* 宽度100% */
  position: relative; /* 相对定位 */
  z-index: 1; /* 层级为1 */
  cursor: pointer; /* 鼠标样式为手型 */
}

.wrapper nav label a {
  position: relative; /* 相对定位 */
  z-index: -1; /* 层级为-1 */
  color: #333; /* 文本颜色 */
  font-size: 20px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  text-decoration: none; /* 文本无下划线 */
}

.wrapper nav label a i {
  font-size: 25px; /* 字体图标大小 */
  margin: 0px 7px; /* 外边距 */
}

.wrapper nav input {
  display: none; /* 隐藏输入框 */
}

.wrapper nav .tab {
  position: absolute; /* 绝对定位 */
  height: 100%; /* 高度100% */
  width: 20%; /* 宽度20% */
  left: 0px; /* 左侧位置为0 */
  bottom: 0px; /* 底部位置为0 */
  background: linear-gradient(to right, #ff5858, #ff5858); /* 背景渐变色 */
  border-radius: 50px; /* 设置圆角 */
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 过渡效果 */
}

.wrapper nav #home:checked ~ label.home a,
.wrapper nav #comment:checked ~ label.comment a,
.wrapper nav #envelope:checked ~ label.envelope a,
.wrapper nav #heart:checked ~ label.heart a,
.wrapper nav #user:checked ~ label.user a {
  color: #fff; /* 文本颜色为白色 */
  transition: 0.6s; /* 过渡效果 */
}

.wrapper nav #comment:checked ~ .tab {
  left: 20%; /* 左侧位置为20% */
}

.wrapper nav #envelope:checked ~ .tab {
  left: 40%; /* 左侧位置为40% */
}

.wrapper nav #heart:checked ~ .tab {
  left: 60%; /* 左侧位置为60% */
}

.wrapper nav #user:checked ~ .tab {
  left: 80%; /* 左侧位置为80% */
}
</style>
