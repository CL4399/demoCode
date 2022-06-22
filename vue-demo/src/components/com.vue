<template>
  <div @click="alert">{{ text || 123 }}</div>
</template>
<script>
export default {
  name: "",
  props: {
    text: {
      type: String,
      default: "",
    },
    layerid:String,
    lydata:Object
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    console.log(this.text, "this.text",this.layerid);
    console.log(this.$parent,"this.$parent")
    console.log(this.lydata,"lydata")// 整个data对象

    // setTimeout(()=>{
    //     this.$layer.close(this.layerid)
    // },2000)
  },
  mounted() {},
  methods: {
      alert(){
          // this.$parent 拿到的是父组件的实例 
          this.$parent.alert({
              str:"子组件返回标题"
          })
      }
  },
};
</script>
<style lang='less'></style>