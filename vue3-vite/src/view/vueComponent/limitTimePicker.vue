<template>
  <div id="limitTimePicker">
    <a-space direction="vertical">
      <a-date-picker
        v-model:value="timeValue"
        format="YYYY-MM-DD HH:mm:ss"
        :disabled-date="disabledDate"
        :disabled-time="disabledDateTime"
        :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
      />
    </a-space>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed, toRefs } from 'vue';
import { Button } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker as aDatePicker, RangePicker as aRangePicker, Space as aSpace } from 'ant-design-vue';
export default defineComponent({
  components: { Button, aDatePicker, aRangePicker, aSpace },
  setup() {
    const disabledDate = (current: Dayjs) => {
      let time = dayjs(current).valueOf();
      return time < new Date().getTime() - 1 * 60 * 60 * 1000;
    };

    const disabledDateTime: any = (date: Dayjs) => {
      const current = dayjs();
      const selected = dayjs(date);
      const disabledHours = [] as Array<number>;
      if (selected.date() === current.date()) {
        for (let i = 0; i < 24; i++) {
          if (i < current.hour()) {
            disabledHours.push(i);
          }
        }
      }
      const disabledMinutes = [] as Array<number>;
      for (let i = 0; i < 60; i++) {
        if (selected.date() !== current.date()) return '';
        if (selected.hour() === current.hour()) {
          if (i < current.minute()) disabledMinutes.push(i);
        }
      }

      const disabledSeconds = [] as Array<number>;
      for (let i = 0; i < 60; i++) {
        if (selected.date() !== current.date()) return;
        if (selected.hour() === current.hour()) {
          if (selected.minute() === current.minute()) {
            if (i < selected.second()) {
              disabledSeconds.push(i);
            }
          } else if (selected.minute() < current.minute()) {
            disabledSeconds.push(i);
          }
        }
      }
      return {
        disabledHours: () => disabledHours,
        disabledMinutes: () => disabledMinutes,
        disabledSeconds: () => disabledSeconds,
      };
    };

    const dataInfo = reactive({
      timeValue: '',
    });
    onMounted(() => {});
    return {
      dayjs,
      disabledDate,
      disabledDateTime,
      ...toRefs(dataInfo),
    };
  },
});
</script>
<style lang="less" scoped></style>
