<template>
  <div>
    <a-switch :disabled="checked" @change="changeCheck" />
  </div>
</template>
<script>
export default {
  name: '',
  props: ['checked'],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    changeCheck(el) {
      console.log(el, 'changeCheck');
      this.$emit('changeCheck', el);
    },
  },
};
</script>
<style lang='less'></style>