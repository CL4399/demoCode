<template>
    <div>
        <Carousel :slides="arrList" :autoplay="true" :duration="2000"></Carousel>
        <CommodityLinkage></CommodityLinkage>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import img1 from "../../assets/image/1.png"
import img2 from "../../assets/image/3.png"
import Carousel from './Carousel'
import CommodityLinkage from "./CommodityLinkage.vue"
export default defineComponent({
    components: { Carousel, CommodityLinkage },
    setup(props: any, { emit }: any) {


        const array = ["a", "b", "c"];
        // 迭代数组
        const arrayEntries = array.entries();
        for (const element of arrayEntries) {
            console.log(element, "element");
        }

        // 该every()方法测试数组中的所有元素是否通过提供的函数实现的测试。它返回一个布尔值。
        const isBelowThreshold = (currentValue: number) => currentValue < 40;
        const array1 = [1, 30, 39, 29, 10, 13];
        console.log(array1.every(isBelowThreshold), "every");

        let arrF = array1.filter(item => item < 20)
        console.log(arrF, "filter");





        return {
            arrList: [
                {
                    imgUrl: img1,
                    id: 1
                }, {
                    imgUrl: img2,
                    id: 2
                },
                {
                    imgUrl: img1,
                    id: 3
                }, {
                    imgUrl: img2,
                    id: 4
                },
            ]
        }
    },
})
</script>
<style lang='less' scoped>
</style>