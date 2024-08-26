<template>
  <div class="login-wrap">
    <div class="container right-panel-active">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <Form action="#" class="form" id="form1">
          <h2 class="form__title">Sign Up</h2>

          <FormItem label="" name="username" style="width: 350px" :rules="[{ required: true, message: 'Please input your username!' }]">
            <Input class="input" v-model:value="userName" />
          </FormItem>

          <FormItem label="" style="width: 350px" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <Row justify="space-around" align="middle">
              <Col :span="18"> <Input class="input" type="password" v-model:value="userPassword" /> </Col>
              <Col :span="6">
                <div class="body_captcha">
                  <p>Emilia</p>
                  <div class="card">
                    <div class="snow"></div>
                    <div class="snow"></div>
                    <div class="snow"></div>
                    <div class="snow"></div>
                  </div>
                </div>
              </Col>
            </Row>
          </FormItem>

          <span class="link">Please enter your account and password !</span>
          <button class="btn" @click="login">Sign Up</button>
        </Form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <Form action="#" class="form" id="form2">
          <h2 class="form__title">Sign In</h2>
          <FormItem label="" name="username" style="width: 350px" :rules="[{ required: true, message: 'Please input your username!' }]">
            <Input class="input" v-model:value="userName" />
          </FormItem>

          <FormItem label="" style="width: 350px" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <Row justify="space-around" align="middle">
              <Col :span="18"> <Input class="input" type="password" v-model:value="userPassword" /> </Col>
              <Col :span="6">
                <div class="body_captcha">
                  <p>Emilia</p>
                  <div class="card">
                    <div class="snow"></div>
                    <div class="snow"></div>
                    <div class="snow"></div>
                    <div class="snow"></div>
                  </div>
                </div>
              </Col>
            </Row>
          </FormItem>
          <a href="#" class="link">Forgot your password?</a>
          <button class="btn">Sign In</button>
        </Form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn">Sign In</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button, Form, FormItem, Row, Col } from 'ant-design-vue';

export default defineComponent({
  components: { Button, Form, FormItem, Row, Col },
  setup() {
    const route = useRouter();
    const store = useCounterStore();
    const login = () => {
      sessionStorage.setItem('authorize', '1235465465435145634');
      route.push('/other');
      store.setShowSettingOutlined(true);
    };
    let dataInfo = reactive({
      userName: 'admin',
      userPassword: '123456',
    });
    onMounted(() => {
      store.setShowSettingOutlined(false);
      const signInBtn = document.getElementById('signIn') as HTMLElement;
      const signUpBtn = document.getElementById('signUp');
      const fistForm = document.getElementById('form1');
      const secondForm = document.getElementById('form2');
      const container = document.querySelector('.container');

      signInBtn.addEventListener('click', () => {
        container?.classList.remove('right-panel-active');
      });

      signUpBtn?.addEventListener('click', () => {
        container?.classList.add('right-panel-active');
      });

      fistForm?.addEventListener('submit', (e) => e.preventDefault());
      secondForm?.addEventListener('submit', (e) => e.preventDefault());
    });

    return { login, ...toRefs(dataInfo) };
  },
});
</script>
<style lang="less" scoped>
// @import url(https://fonts.googleapis.com/css?family=Lato);
.login-wrap {
  align-items: center;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  place-items: center;
  width: 1000px;
  height: 500px;
  position: relative;
  top: 25%;
  left: 25%;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: #333;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: transparent;
  border-radius: 0.7rem;
  height: 758px;
  max-width: 420px;
  overflow: hidden;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: #008997;
  background: url('../../assets/image/3.png');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: #0367a6;
  background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
  border-radius: 20px;
  border: 1px solid #0367a6;
  color: #e9e9e9;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form > .btn {
  margin-top: 2rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: rgba(255, 255, 255, 0.3); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(10px); /* 兼容老版本 Safari */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
  box-shadow: 1px 1px 10px #ccc;
  border-radius: 0.7rem;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
@baseFontSize: 50px;
.body_captcha {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #eee;

  .card {
    width: @baseFontSize;
    height: @baseFontSize;
    display: flex;
    background: #000;
    filter: blur(10px) contrast(30);

    .snow {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }
    .snow::after {
      position: absolute;
      content: '';
      left: -100%;
      top: 0;
      width: inherit;
      height: inherit;
      background: #fff;
      transition: 30s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .snow:hover::after {
      transform: scale(0);
      transition-duration: 0.3s;
    }
  }

  p {
    position: absolute;
    top: 60%;
    left: 40%;
    z-index: 9999;
    color: white;
    font-family: Lato, sans-serif;
    line-height: 1em;
    letter-spacing: 0.1em;
    transform: translate(-20%, -80%);
    pointer-events: none;
  }
}
</style>
