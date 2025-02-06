<template>
  <div>
    <SelectionArea
      class="container green"
      :options="{
        selectables: '.selectable',
        container: '.container',
        selectionAreaClass: 'selection-area',
        selectionContainerClass: 'selection-container',
        document: document,
        boundaries: document?.body,
        preventDefault: true,
        stopPropagation: true
      }"
      :on-move="onMove"
      :on-start="onStart"
    >
      <div v-for="id of range(20)" :key="id" :data-key="id" class="selectable" :class="{ selected: selected.has(id) }" />
    </SelectionArea>
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
import SelectionArea, { SelectionEvent } from '@viselect/vue';
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

    const store = useCounterStore();
    let obj = computed(() => {
      return store;
    });

    const changeStore = () => {
      store.setNum({ name: 'jack' });
      store.setObj({ name: 'demo1' });
    };

    const resetStore = () => {
      store.$reset();
    };

    const allChangeStore = () => {
      store.$patch((state) => {
        state.count = 10;
        state.counter = 100;
      });
    };

    store.$subscribe(
      (mutation, state) => {
        console.log(mutation, state, '值变化的监听');
      },
      { detached: true }
    );

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