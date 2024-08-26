<template>
  <div id="timePicker" style="display: flex; flex-direction: column; align-items: center">
    <div style="width: 50%; margin-bottom: 10px; display: flex; justify-content: space-around">
      <Button size="small" class="margin5" @click="chooseTime(1)">近三天</Button>
      <Button size="small" class="margin5" @click="chooseTime(2)">近七天</Button>
      <Button size="small" class="margin5" @click="chooseTime(3)">近15天</Button>
      <Button size="small" class="margin5" @click="chooseTime(4)">近1月</Button>
      <Button size="small" class="margin5" @click="chooseTime(5)">近3月</Button>
      <Button size="small" class="margin5" @click="chooseTime(6)">近6月</Button>
    </div>
    <RangePicker style="width: 400px" format="YYYY/MM/DD HH:mm:ss" :value="time" @change="onRangeChange" show-time />
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs, watchEffect, watch } from 'vue';
import { Button, RangePicker, DatePicker } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
interface StrObj {
  [key: string]: any;
}
export default defineComponent({
  components: { Button, RangePicker, DatePicker },
  setup(props, { emit, slots }) {
    let dataInfo = reactive({
      time: [dayjs().second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)] as RangeValue,
      timeEnum: {
        1: [dayjs().subtract(3, 'day').second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)],
        2: [dayjs().subtract(7, 'day').second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)],
        3: [dayjs().subtract(15, 'day').second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)],
        4: [dayjs().subtract(1, 'month').second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)],
        5: [dayjs().subtract(3, 'month').second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)],
        6: [dayjs().subtract(6, 'month').second(0).minute(0).hour(0), dayjs().second(59).minute(59).hour(23)],
      } as StrObj,
    });
    const onRangeChange = (dates: any, dateStrings: string[]) => {
      if (dates) {
        emit('update:time', [
          dayjs(dataInfo.time[0]).second(0).minute(0).hour(0).format('YYYY-MM-DD HH:mm:ss'),
          dayjs(dataInfo.time[1]).second(59).minute(59).hour(23).format('YYYY-MM-DD HH:mm:ss'),
        ]);
      } else {
        console.log('Clear');
      }
    };
    const chooseTime = (type: number) => {
      dataInfo.time = dataInfo.timeEnum[type];
      emit('update:time', [
        dayjs(dataInfo.time[0]).second(0).minute(0).hour(0).format('YYYY-MM-DD HH:mm:ss'),
        dayjs(dataInfo.time[1]).second(59).minute(59).hour(23).format('YYYY-MM-DD HH:mm:ss'),
      ]);
    };
    onMounted(() => {
      emit('update:time', [
        dayjs(dataInfo.time[0]).second(0).minute(0).hour(0).format('YYYY-MM-DD HH:mm:ss'),
        dayjs(dataInfo.time[1]).second(59).minute(59).hour(23).format('YYYY-MM-DD HH:mm:ss'),
      ]);
    });
    return { ...toRefs(dataInfo), onRangeChange, chooseTime };
  },
});
</script>
<style lang="less" scoped></style>
