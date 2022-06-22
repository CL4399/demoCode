<template>
  <div>
    <a-input @change="changeInput" v-model="text"></a-input>
    <div :style="{ color: '#000', fontSize: '20px' }">
      <div @click="charClick">iframe</div>
      <div @click="alert">alert</div>
      <div @click="confirm">confirm</div>
      <div @click="loading">loading</div>
      <div>
        <comT :title.sync="title" :isShow="true">
          <div slot="button" @click="clickBtn">123123</div>
        </comT>
      </div>
      <div>
        <div style="height: 500px; width: 500px; border: 1px solid yellowgreen; position: relative">
          <vdrg :w="100" :h="100" @dragging="onDrag" @resizing="onResize" @dragstop="onDragStop" :parent="true">
            <!--   :parent="true" 用来限制元素只能在父元素之内进行拖动-->
            <p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
          </vdrg>
        </div>
      </div>
    </div>
    <div>
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :expandRowByClick="false"
        :expandIconAsCell="false"
        :expandIconColumnIndex="columns.length"
        :expandIcon="expandIcon"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template v-slot:expandedRowRender="record">
          <div style="line-height: 30px">
            <p>
              <span class="expandRowTitle">名称：</span>
              {{ record.name || '暂无' }}
            </p>
            <p>
              <span class="expandRowTitle">地址：</span>
              {{ record.address || '暂无' }}
            </p>
          </div>
        </template>
      </a-table>
    </div>
    <DemoT @hook:mounted="comMounted"></DemoT>
    <div @click="someBotton">????????????????????</div>
    <!-- <dialog id="dialog">hello world!</dialog> -->
    <label>
      Start data &amp; time:
      <input type="datetime-local" />
    </label>
  </div>
</template>
<script>
import com from '../../components/com.vue';
import comT from './Com.vue';
import DemoT from './DemoT.vue';
import vdrg from 'vue-draggable-resizable-gorkys';
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import * as types from 'store/mutation_type';
export default {
  name: 'demo1',
  props: {},
  components: { comT, vdrg, DemoT },
  data() {
    return {
      text: '',
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      title: '',
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],

      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '...',
          width: 60,
          dataIndex: 'expandedRowRender',
          scopedSlots: {
            customRender: 'expand',
          },
        },
      ],
      selectedRowKeys: [],
    };
  },
  watch: {
    title: (val) => {
      console.log(val, 'watch----title');
    },
  },
  computed: {},
  mounted() {},
  provide() {
    return {
      name: '123',
    };
  },
  methods: {
    someBotton() {
      const dialog = document.getElementById('dialog');
      dialog.showModal();
    },
    comMounted(el) {
      console.log(el, 'comMounted');
    },
    expandIcon(props) {
      if (props.expandable) {
        if (props.expanded) {
          return (
            <a
              onClick={(e) => {
                props.onExpand(props.record, e);
              }}
            >
              <a-icon type="down" />{' '}
            </a>
          );
        } else {
          return (
            <a
              onClick={(e) => {
                props.onExpand(props.record, e);
              }}
            >
              <a-icon type="right" />
            </a>
          );
        }
      }
    },
    onSelectChange(el) {
      this.selectedRowKeys = el;
      console.log(el, 'onSelectChange');
    },
    changeInput(el) {
      console.log(el.target.value, 'changeInput');
      this.text = el.target.value;
      this.set_displayname(this.text);
    },
    onResize(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag(x, y) {
      this.x = x;
      this.y = y;
    },
    onDragStop(x, y) {
      console.log(x, y, 'onDragStop');
    },
    clickBtn() {
      console.log('clickBtn1');
    },
    charClick() {
      this.$layer.iframe({
        content: {
          content: com,
          parent: this,
          data: {
            text: this.text,
          },
        },
        title: `测试`,
        area: ['1200px', 'auto'],
        cancel: () => {
          console.log('关闭');
        },
      });
    },
    loading() {
      this.$layer.loading({
        time: 3,
        content: '请等待',
      });
    },
    alert(obj) {
      this.$layer.alert('这是个演示', { title: obj.str || '演示' }, (layerid) => {
        this.$layer.close(layerid);
      });
    },
    confirm() {
      this.$layer.confirm(
        '确定要<br/>删除吗？',
        { title: 'confirm', btn: ['确定', '取消'], icon: 3 },
        (layerid) => {
          this.$layer.msg('执行了删除');
          this.$layer.close(layerid);
        },
        (layerid) => {
          this.$layer.msg('执行取消');
          this.$layer.close(layerid);
        }
      );
    },
    ...mapMutations({
      set_displayname: types.SET_DISPLAYNAME,
    }),
  },
};
</script>
<style lang='less'></style>