<template>
    <div style="width:100%;height:100%">
        <!-- <div class="text-violet-500 pl-48 hover:bg-purple-600">adsasdasdasd</div> -->
        <SelectionArea class="container green" :options="{ selectables: '.selectable' }" :on-move="onMove"
            :on-start="onStart">
            <div v-for="id of range(20)" :key="id" :data-key="id" class="selectable"
                :class="{ selected: selected.has(id) }" />
        </SelectionArea>
        <!-- <div @click="check">check</div> -->
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import SelectionArea, { SelectionEvent } from '@viselect/vue';
import { useCounterStore } from '../../store/index'
export default defineComponent({
    components: { SelectionArea },
    setup(props: any, { emit }: any) {
        // let arr = [1, 1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 6, 7]
        // let set = (arr: number[]) => {
        //     let newArr: number[] = []
        //     arr.forEach(item => {
        //         if (newArr.indexOf(item) == -1) {
        //             newArr.push(item)
        //         }
        //     })
        //     return newArr
        // }
        // let a = set(arr)
        // console.log(a, "????????????????????????")
        // function typeOf(obj: any) {
        //     return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
        // }
        // console.log(typeOf(null), typeOf([]), typeOf({}), typeOf(true), typeOf(""), typeOf(undefined), typeOf(() => { }),)
        const selected = ref(new Set())
        const check = () => {
            console.log(selected.value)
        }
        function extractIds(els: Element[]): number[] {
            return els.map(v => v.getAttribute('data-key'))
                .filter(Boolean)
                .map(Number);
        }
        const onStart = ({ event, selection }: SelectionEvent) => {
            if (!event?.ctrlKey && !event?.metaKey) {
                selection.clearSelection();
                selected.value.clear()
            }
        }
        const onMove = ({ store: { changed: { added, removed } } }: SelectionEvent) => {
            extractIds(added).forEach(id => selected.value.add(id));
            extractIds(removed).forEach(id => selected.value.delete(id));
        }
        const range = (to: number, offset = 0): number[] => {
            return new Array(to).fill(0).map((_, i) => offset + i);
        }

        const store = useCounterStore()
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
        console.log(store.$state, "useCounterStore-demo2")

        let a = new Proxy({ i: 1 }, {
            get(target) {
                return () => target.i++
            }
        })
        // @ts-ignore
        console.log(a == 1 && a == 2 && a == 3, "?????????????????")

        console.log(store.$state.objInfo, "demo1");



        interface F {
            name: string
            job: string
            sex: string
        }

        interface C extends Omit<F, "name" | "job"> {
            name: number
            job: number
        }


        let obj: C = {
            name: 1,
            job: 1,
            sex: "1"
        }

        return {
            selected,
            check,
            onStart,
            onMove,
            range
        }
    },
})
</script>
<style scoped>
.asd {
    /* @apply px-4 py-2 rounded font-semibold bg-gray-200 text-black; */
}

.container {
    user-select: none;
    width: 100%;
    height: 100vh;
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