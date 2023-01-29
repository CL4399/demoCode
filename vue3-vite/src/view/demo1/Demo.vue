<template>
    <div>
        {{ obj.testNum }}---{{ obj.count }} --- {{ obj.counter }}
        <Button class="btn" @click="changeStore">赋值</Button>
        <Button class="btn" @click="allChangeStore">批量赋值</Button>
        <Button class="btn" @click="resetStore">重置</Button>
        <div class="div-com"></div>
        <SelectionArea class="container green" :options="{ selectables: '.selectable' }" :on-move="onMove" :on-start="onStart">
            <div v-for="id of range(20)" :key="id" :data-key="id" class="selectable" :class="{ selected: selected.has(id) }" />
        </SelectionArea>
        <div @click="check">check</div>

        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
                <div class="md:flex-shrink-0">
                    <img class="h-48 w-full object-cover md:h-full md:w-48" src="../../assets/logo.png" alt="Man looking at item at a store" />
                </div>
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">tailwindcss</div>
                    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"> Finding customers for your new business </a>
                    <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { reactive, ref, computed, getCurrentInstance, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useCounterStore } from "../../store/index"
import { Button } from "ant-design-vue"
import router from "../../router"
import dayjs from "dayjs"
import { getDates } from "../../static/index"
import { login } from "../../api/src/login"
// 鼠标拖拽选择 组件
import SelectionArea, { SelectionEvent } from "@viselect/vue"
export default defineComponent({
    components: { Button, SelectionArea },
    setup(props: any, { emit }: any) {
        const {
            appContext: {
                config: {
                    globalProperties: { $message },
                },
            },
        } = getCurrentInstance() as any
        // 获取路由器实例
        const { proxy }: any = getCurrentInstance()
        const info = getCurrentInstance()
        console.log(router, info, proxy, "routerrouterrouter?")
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
        store.$subscribe(
            (mutation, state) => {
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
            },
            { detached: true }
        )
        const loginData = async (param: any) => {
            const data = await login(param)
            console.log(data, "loginData")
        }
        loginData({})
        console.log(getDates(dayjs(dayjs().subtract(1, "week").unix() * 1000).format("YYYY-MM-DD HH:mm:ss"), dayjs(dayjs().unix() * 1000).format("YYYY-MM-DD HH:mm:ss")))
        console.log(getDates(dayjs().subtract(1, "week").unix() * 1000, dayjs().unix() * 1000))
        console.log(getDates(dayjs().subtract(1, "week").format("YYYY-MM-DD HH:mm:ss"), dayjs().format("YYYY-MM-DD HH:mm:ss")))

        // 鼠标拖拽相关代码
        const selected = ref(new Set())
        const check = () => {
            console.log(selected.value)
        }
        function extractIds(els: Element[]): number[] {
            return els
                .map((v) => v.getAttribute("data-key"))
                .filter(Boolean)
                .map(Number)
        }
        const onStart = ({ event, selection }: SelectionEvent) => {
            if (!event?.ctrlKey && !event?.metaKey) {
                selection.clearSelection()
                selected.value.clear()
            }
        }
        const onMove = ({
            store: {
                changed: { added, removed },
            },
        }: SelectionEvent) => {
            extractIds(added).forEach((id) => selected.value.add(id))
            extractIds(removed).forEach((id) => selected.value.delete(id))
        }
        const range = (to: number, offset = 0): number[] => {
            return new Array(to).fill(0).map((_, i) => offset + i)
        }
        return {
            obj,
            changeStore,
            resetStore,
            allChangeStore,
            color: ref("red"),
            selected,
            check,
            onStart,
            onMove,
            range,
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

.container {
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}

.selection-area {
    background: rgba(46, 115, 252, 0.11);
    border: 2px solid rgba(98, 155, 255, 0.81);
    border-radius: 0.1em;
}

.selectable {
    width: 100px;
    height: 100px;
    background-color: blanchedalmond;
    margin-right: 10px;
    margin-bottom: 10px;
}

.selected {
    border: 2px solid rgba(98, 155, 255, 0.81);
    background: #d1e5fb;
    box-sizing: border-box;
}
</style>
