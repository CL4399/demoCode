<template>
  <div>
    <div class="md:w-auto max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full">
      <div class="md:flex">
        <div class="md:flex-shrink">
          <img class="w-full object-scale-down md:h-full md:w-48 mr" src="../../assets/logo.png" alt="Man looking at item at a store" />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">tailwindcss</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"> Finding customers for your new business </a>
          <p class="mt-2 text-gray-500">
            Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.
          </p>
        </div>
      </div>
    </div>
    <bindStyle></bindStyle>
    <SelectionArea class="container green" :options="{ selectables: '.selectable' }" :on-move="onMove" :on-start="onStart">
      <div v-for="id of range(20)" :key="id" :data-key="id" class="selectable" :class="{ selected: selected.has(id) }" />
    </SelectionArea>
    <div @click="check">check</div>
    <Button style="width: 200px" :loading="loading" @click="axiosClick"> axios </Button>
    <!-- 文件下载  -->
    <Button style="width: 200px" :loading="loading" @click="save">
      {{ menusTitle('demo1.downloadTheFile') }}
    </Button>

    <div>{{ obj.testNum }}---{{ obj.count }} --- {{ obj.counter }}</div>
    <Button style="width: 200px" class="btn" @click="changeStore">
      {{ menusTitle('demo1.assignment') }}
    </Button>
    <Button style="width: 200px" class="btn" @click="allChangeStore">
      {{ menusTitle('demo1.batchAssignment') }}
    </Button>
    <Button style="width: 200px" class="btn" @click="resetStore">
      {{ menusTitle('demo1.reset') }}
    </Button>
    <Button style="width: 200px" class="btn" @click="drawer = true"> drawer1111111 </Button>
    <el-drawer v-model="drawer" title="I am the title" :direction="'ltr'" :before-close="handleClose">
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { reactive, ref, computed, getCurrentInstance, ComponentInternalInstance, defineComponent, toRefs } from 'vue';
import { ElDrawer } from 'element-plus';
import { useCounterStore } from '../../store/index';
import { Button, Radio } from 'ant-design-vue';
import router from '../../router';
import dayjs from 'dayjs';
import { getDates } from '../../static/index';
import { login, loginT } from '../../api/src/login';
// 鼠标拖拽选择 组件
import SelectionArea, { SelectionEvent } from '@viselect/vue';
//@ts-ignore
import fileSaver from '../../static/FileSaver.js';
import bindStyle from './bindStyle.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  components: { Button, Radio, SelectionArea, bindStyle, ElDrawer },
  setup(props: any, { emit }: any) {
    const I18n = useI18n();
    const {
      appContext: {
        config: {
          globalProperties: { $message },
        },
      },
    } = getCurrentInstance() as ComponentInternalInstance;
    // 获取路由器实例
    const { proxy }: any = getCurrentInstance();
    const info = getCurrentInstance();
    console.log(router, info, proxy, 'routerrouterrouter?');
    const store = useCounterStore();
    let obj = computed(() => {
      return store;
    });
    // // 原型继承
    // let colors: string[] = []
    // function Animal() {
    //     colors = ["yellowgreen", "aqua"]
    // }
    // Animal.prototype.getColor = () => { return colors }
    // function Dog() { }
    // // @ts-ignore
    // Dog.prototype = new Animal()
    // // @ts-ignore
    // let dog = new Dog()
    // console.log(dog.getColor(), "????")
    // // 问题1：原型中包含的引用类型属性将被所有实例共享；
    // // 问题2：子类在实例化的时候不能给父类构造函数传参；
    // class AnimalC {
    //     area: number
    //     name: string
    //     public age = 18  // 公有属性
    //     private job = "it" //私有属性

    //     constructor(h: number, w: number, name: string) {
    //         this.area = h * w
    //         this.name = name
    //     }
    //     run() {
    //         return this.name
    //     }
    //     clName() {
    //         return "Animal：" + this.name
    //     }
    // }
    // class DogC extends AnimalC {
    //     bark() {
    //         return this.name + "-" + this.age
    //     }
    //     getName() {
    //         console.log(this.name, "DogC")
    //         return super.clName()
    //     }
    //     readonly sex = this.name
    // }

    // const a = new DogC(2, 3, "123")
    // console.log(a.bark(), a.area, ">?>?>?>")
    // a.name = "000"
    // a.age = 123123123
    // console.log(a.getName(), a.sex, ">?>?>?")
    const changeStore = () => {
      store.setNum({ name: 'jack' });
      store.setObj({ name: 'demo1' });
    };
    const resetStore = () => {
      store.$reset();
    };
    const allChangeStore = () => {
      // store.$patch({
      //     count: 10,
      //     counter: 10
      // })
      store.$patch((state) => {
        state.count = 10;
        state.counter = 100;
      });
    };
    store.$subscribe(
      (mutation, state) => {
        /*
                * mutation主要包含三个属性值：
                *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
                *   storeId：是当前store的id
                *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
                *       "direct" ：通过 action 变化的
                        "patch object" ：通过 $patch 传递对象的方式改变的
                        "patch function" ：通过 $patch 传递函数的方式改变的
                * detached 监听器会在组件卸载时移除,默认会  true 会     false 不会
            */
        // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
        console.log(mutation, state, '值变化的监听');
      },
      { detached: true }
    );
    // const loginData = async (param: any) => {
    //     const data = await login(param)
    //     console.log(data, "loginData")
    // }
    // loginData({})
    console.log(
      getDates(
        dayjs(dayjs().subtract(1, 'week').unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
        dayjs(dayjs().unix() * 1000).format('YYYY-MM-DD HH:mm:ss')
      ),
      'getDates'
    );
    console.log(getDates(dayjs().subtract(1, 'week').unix() * 1000, dayjs().unix() * 1000), 'getDates');
    console.log(getDates(dayjs().subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss')), 'getDates');

    // 鼠标拖拽相关代码
    const selected = ref(new Set());
    const check = () => {
      console.log(selected.value);
    };
    function extractIds(els: Element[]): number[] {
      return els
        .map((v) => v.getAttribute('data-key'))
        .filter(Boolean)
        .map(Number);
    }
    const onStart = ({ event, selection }: SelectionEvent) => {
      if (!event?.ctrlKey && !event?.metaKey) {
        selection.clearSelection();
        selected.value.clear();
      }
    };
    const onMove = ({
      store: {
        changed: { added, removed },
      },
    }: SelectionEvent) => {
      extractIds(added).forEach((id) => selected.value.add(id));
      extractIds(removed).forEach((id) => selected.value.delete(id));
    };
    const range = (to: number, offset = 0): number[] => {
      return new Array(to).fill(0).map((_, i) => offset + i);
    };

    let dataInfo = reactive({
      loading: false,
      drawer: false,
      direction: 'rtl',
    });
    const save = () => {
      dataInfo.loading = true;
      new Promise((resolve, reject) => {
        setTimeout(() => {
          var blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
          fileSaver.saveAs(blob, 'hello world.txt');
          resolve('over');

          let blob2 = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
          let reader = new FileReader();
          reader.readAsDataURL(blob2);
          reader.onload = (e) => {
            let a = document.createElement('a');
            a.download = '文件名称';
            a.href = e.target!.result as string;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }, 3000);
      }).then(() => {
        dataInfo.loading = false;
        console.log('over');
      });
    };
    const menusTitle = (item: any) => {
      return I18n.t(item);
    };

    let a1 = reactive({ a: 1 });
    console.log(a1, 'a1');

    //@ts-ignore
    a1 = { b: 1 };
    console.log(a1, 'a2');

    let a2 = ref({ a: 1 });
    console.log(a2, 'a3');

    //@ts-ignore
    a2 = { b: 1 };
    console.log(a2, 'a4');
    const handleClose = () => {
      dataInfo.drawer = false;
    };
    let arr: any[] = [];
    console.log();

    if (Array.isArray(arr) && arr.length !== 0) {
      console.log('true');
    } else {
      console.log('false');
    }
    const axiosClick = () => {
      console.log('1');
      login({})?.then((res) => {
        console.log(res);
      });
      loginT({})?.then((res) => {
        console.log(res);
      });
    };
    return {
      obj,
      changeStore,
      resetStore,
      allChangeStore,
      selected,
      check,
      onStart,
      onMove,
      range,
      save,
      menusTitle,
      ...toRefs(dataInfo),
      handleClose,
      axiosClick,
    };
  },
});
</script>
<style lang="less" scoped>
/deep/.el-drawer__header {
  background-color: red;
  padding: 10px;
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  color: aqua;
}
.btn {
  width: 100px;
  margin: 20px;
}

.container {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.selection-area {
  background: rgba(46, 115, 252, 0.11);
  border: 2px solid rgba(98, 155, 255, 0.81);
  border-radius: 0.1em;
}

.selectable {
  width: 100px;
  height: 100px;
  background-color: blanchedalmond;
  margin-right: 10px;
  margin-bottom: 10px;
}

.selected {
  border: 2px solid rgba(98, 155, 255, 0.81);
  background: #d1e5fb;
  box-sizing: border-box;
}
</style>
