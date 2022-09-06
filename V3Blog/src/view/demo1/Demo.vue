<template>
    <div>
        {{  obj.testNum  }}---{{  obj.count  }} --- {{  obj.counter  }}
        <Button class="btn" @click="changeStore">赋值</Button>
        <Button class="btn" @click="allChangeStore">批量赋值</Button>
        <Button class="btn" @click="resetStore">重置</Button>
        <div class="div-com"></div>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, computed, getCurrentInstance, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../../store/index'
import { getUserList, editUser } from "../../api"
import { Button } from "ant-design-vue"
import router from '../../router'
export default defineComponent({
    components: { Button },
    setup(props: any, { emit }: any) {
        const { appContext: { config: { globalProperties: { $message } } } } = getCurrentInstance() as any
        // 获取路由器实例
        const { proxy }: any = getCurrentInstance()
        const info = getCurrentInstance()
        console.log(router, "routerrouterrouter?");


        $message.success("asd")

        const store = useCounterStore()
        let obj = computed(() => {
            return store
        })
        // // 原型继承
        // let colors: string[] = []
        // function Animal() {
        //     colors = ["yellowgreen", "aqua"]
        // }
        // Animal.prototype.getColor = () => { return colors }
        // function Dog() { }
        // // @ts-ignore
        // Dog.prototype = new Animal()
        // // @ts-ignore
        // let dog = new Dog()
        // console.log(dog.getColor(), "????")
        // // 问题1：原型中包含的引用类型属性将被所有实例共享；
        // // 问题2：子类在实例化的时候不能给父类构造函数传参；
        // class AnimalC {
        //     area: number
        //     name: string
        //     public age = 18  // 公有属性
        //     private job = "it" //私有属性

        //     constructor(h: number, w: number, name: string) {
        //         this.area = h * w
        //         this.name = name
        //     }
        //     run() {
        //         return this.name
        //     }
        //     clName() {
        //         return "Animal：" + this.name
        //     }
        // }
        // class DogC extends AnimalC {
        //     bark() {
        //         return this.name + "-" + this.age
        //     }
        //     getName() {
        //         console.log(this.name, "DogC")
        //         return super.clName()
        //     }
        //     readonly sex = this.name
        // }

        // const a = new DogC(2, 3, "123")
        // console.log(a.bark(), a.area, ">?>?>?>")
        // a.name = "000"
        // a.age = 123123123
        // console.log(a.getName(), a.sex, ">?>?>?")
        const changeStore = () => {
            store.setNum({ name: "jack" })
            store.setObj({ name: "demo1" })
        }
        const resetStore = () => {
            store.$reset()
        }
        const allChangeStore = () => {
            // store.$patch({
            //     count: 10,
            //     counter: 10
            // })
            store.$patch((state) => {
                state.count = 10
                state.counter = 100
            })
        }
        store.$subscribe((mutation, state) => {
            /*
                * mutation主要包含三个属性值：
                *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
                *   storeId：是当前store的id
                *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
                *       "direct" ：通过 action 变化的
                        "patch object" ：通过 $patch 传递对象的方式改变的
                        "patch function" ：通过 $patch 传递函数的方式改变的
                * detached 监听器会在组件卸载时移除,默认会  true 会     false 不会
            */
            // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
            console.log(mutation, state, "值变化的监听")
        }, { detached: true })
        // getUserList({ jacl: "123" })
        // editUser({ name: "123" })
        // console.log(store.testNum, "useCounterStore")
        // const ENV = import.meta.env
        // console.log(ENV, "ENV")
        return {
            obj,
            changeStore,
            resetStore,
            allChangeStore,
            color: ref("red")
        }
    },
})
</script>
<style scoped>
.btn {
    width: 100px;
    margin: 20px;

}

.div-com {
    width: 100px;
    height: 100px;
    /* background-color: v-bind('color') */
}
</style>