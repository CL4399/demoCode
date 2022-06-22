<template>
  <div>
    <slot name="button"></slot>
    <div @click="clickDiv">{{ name || '默认值' }}???</div>
    <a-button @click="change">change</a-button>
    <div>{{ displayName }}</div>
    <Com v-if="isShow"></Com>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Com',
  props: ["isShow"],
  data() {
    return {};
  },
  inject: ['name'],
  computed: {
    ...mapGetters(['displayName']),
  },
  mounted() {},
  methods: {
    change() {
      this.$emit('update:title', Math.ceil(Math.random() * 10000));
    },
    clickDiv(){
        console.log("clickDiv",this.$parent)
    }
  },
};
</script>
<style lang='less'></style>