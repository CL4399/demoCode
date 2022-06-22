<template>
  <div>
    <a-list item-layout="horizontal" :data-source="info">
      <template #renderItem="record">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              {{ record.content }}
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      info: [],
    };
  },
  computed: {},
  mounted() {
    let arr = 10;
    for (let i = 0; i < arr; i++) {
      this.info.push({
        id: i,
        content: `第${i+1}条数据！`,
      });
    }
    console.log(this.info, '????');
  },
  methods: {},
};
</script>
<style lang='less'></style>