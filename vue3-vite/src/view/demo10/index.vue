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


      



        let person = {
            namep: ""
        }
        let personName = 'lihua'
        //在person对象上添加属性namep,值为personName
        Object.defineProperty(person, 'namep', {
            //但是默认是不可枚举的(for in打印打印不出来)，可：enumerable: true
            //默认不可以修改，可：wirtable：true
            //默认不可以删除，可：configurable：true
            get: function () {
                console.log('触发了get方法')
                return personName
            },
            set: function (val) {
                console.log('触发了set方法')
                personName = val
            }
        })
        //当读取person对象的namp属性时，触发get方法
        console.log(person.namep)
        //当修改personName时，重新访问person.namep发现修改成功
        personName = 'liming'
        console.log(person.namep)
        // 对person.namep进行修改，触发set方法
        person.namep = 'huahua'
        console.log(person.namep)
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