<template>
  <div class="login-wrap">
    <div class="container">
      <div class="form-box" ref="form_box">
        <div class="register-box hidden" ref="register_box">
          <h1>register</h1>
          <input type="text" placeholder="用户名" />
          <input type="email" placeholder="邮箱" />
          <input type="password" placeholder="密码" />
          <input type="password" placeholder="确认密码" />
          <button>注册</button>
        </div>
        <div class="login-box" ref="login_box">
          <h1>login</h1>
          <Input type="text" style="letter-spacing: 3px" v-model:value="userName" placeholder="用户名" />
          <Row align="middle" style="width: 86%">
            <Col :span="16">
              <InputPassword class="input" type="password" style="letter-spacing: 5px" v-model:value="userPassword" placeholder="密码" />
            </Col>
            <Col :span="8" class="Login-captcha">
              <img style="width: 100px; height: 40px" ref="Login_captcha" src="./images/code.png" alt="" />
            </Col>
          </Row>
          <button @click="login">登录</button>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到<span>Nos</span></h2>
        <img src="./images/1.png" alt="" />
        <p>已有账号</p>
        <button id="login" @click="loginTo">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>Nos</span></h2>
        <img src="./images/2.png" alt="" />
        <p>没有账号？</p>
        <button id="register" @click="register">去注册</button>
      </div>
      <div class="square">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="circle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Form, FormItem, Row, Col, Input } from 'ant-design-vue';
const InputPassword = Input.Password;
export default defineComponent({
  components: { Button, Form, FormItem, Row, Col, Input, InputPassword },
  setup() {
    const {
      appContext: {
        config: {
          globalProperties: { $message },
        },
      },
    } = getCurrentInstance() as ComponentInternalInstance;
    const route = useRouter();
    const store = useCounterStore();
    let form_box = ref();
    let register_box = ref();
    let login_box = ref();
    const login = () => {
      sessionStorage.setItem('authorize', '1235465465435145634');
      route.push('/other');
      store.setShowSettingOutlined(true);
      $message.success('Welcome back!');
    };
    let dataInfo = reactive({
      userName: 'admin',
      userPassword: '123456',
    });
    const register = () => {
      form_box.value.style.transform = 'translateX(80%)';
      login_box.value.classList.add('hidden');
      register_box.value.classList.remove('hidden');
    };
    const loginTo = () => {
      form_box.value.style.transform = 'translateX(0%)';
      register_box.value.classList.add('hidden');
      login_box.value.classList.remove('hidden');
    };
    onMounted(() => {});

    return { login, form_box, register_box, login_box, ...toRefs(dataInfo), register, loginTo };
  },
});
</script>
<style lang="less" scoped>
.login-wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #e3c5eb, #a9c1ed);
}

.container {
  background-color: #fff;
  width: 750px;
  height: 415px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.form-box {
  position: absolute;
  top: -10%;
  left: 5%;
  background: linear-gradient(200deg, #895b97, #869cc4);
  width: 420px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hidden {
  display: none;
  transition: 0.5s;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 5px;
}

input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

input::placeholder {
  color: #fff;
}

input:focus {
  color: #9f89a3;
  outline: none;
  border-bottom: 1px solid #a262ad80;
  transition: 0.5s;
}

input:focus::placeholder {
  opacity: 0;
}
/deep/.ant-input {
  letter-spacing: 5px;
  background-color: transparent;
  width: 70%;
  color: #fff;
  text-indent: 10px;
  margin: 8px 0;
}
.input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

.input::placeholder {
  color: transparent;
}

.input:focus {
  color: #9f89a3;
  outline: none;
  border-bottom: 1px solid #a262ad80;
  transition: 0.5s;
}

.input:focus::placeholder {
  opacity: 0;
}

.form-box button {
  width: 70%;
  margin-top: 35px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #a262ad;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}

.form-box button:hover {
  background-color: #a262ad;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}

.con-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.con-box.left {
  left: -2%;
}

.con-box.right {
  right: -2%;
}

.con-box h2 {
  color: #7f848f;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}

.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #16181b;
  text-align: center;
}

.con-box span {
  color: rgb(109, 91, 112);
}

.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}

.con-box button {
  margin-top: 3%;
  background-color: #fff;
  color: #39283b;
  border: 1px solid #434044;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}

.con-box button:hover {
  background-color: #d3b7d8;
  color: #fff;
}

ul li {
  position: absolute;
  border: 1px solid #fff;
  background-color: #fff;
  width: 30px;
  height: 30px;
  list-style: none;
  opacity: 0;
}

.square li {
  top: 40vh;
  left: 0vw;
  animation: square 10s linear infinite;
}

.square li:nth-child(2) {
  top: 80vh;
  left: -10vw;
  animation-delay: 2s;
}

.square li:nth-child(3) {
  top: 80vh;
  left: 5vw;
  animation-delay: 4s;
}

.square li:nth-child(4) {
  top: 10vh;
  left: -15vw;
  animation-delay: 6s;
}

.square li:nth-child(5) {
  top: 60vh;
  left: 10vw;
  animation-delay: 8s;
}

.circle li {
  bottom: 0;
  left: 55vw;
  animation: circle 10s linear infinite;
}

.circle li:nth-child(2) {
  left: 25vw;
  animation-delay: 2s;
}

.circle li:nth-child(3) {
  left: 15vw;
  animation-delay: 6s;
}

.circle li:nth-child(4) {
  left: 25vw;
  animation-delay: 4s;
}

.circle li:nth-child(5) {
  left: 40vw;
  animation-delay: 8s;
}

@keyframes square {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
  }

  100% {
    transform: scale(5) rotateY(1000deg);
    opacity: 0;
  }
}

@keyframes circle {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0;
  }

  100% {
    transform: scale(5) rotateY(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}
</style>
