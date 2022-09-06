<template>
    <!-- tailwindcss -->
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
            <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:h-full md:w-48" src="../../assets/logo.png"
                    alt="Man looking at item at a store">
            </div>
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                    Finding customers for your new business
                </a>
                <p class="mt-2 text-gray-500">
                    Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find
                    your first customers.
                </p>
            </div>
        </div>
    </div>
    <input class="focus:ring-2 focus:ring-blue-600 focus:border-4" />
    <div style="width:100px;height:100px;background-color: aqua;"></div>

</template>
<script lang='ts'>
import { unlink } from 'fs';
import { reactive, ref, toRefs, provide, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { number } from 'vue-types';

export default defineComponent({
    setup(props: any, { emit }: any) {

        interface Arr {
            length: number
        }
        function loggingIdentity<T extends Arr>(arg: T): T {
            console.log(arg.length);
            return arg;
        }
        loggingIdentity([1, 2, 3])

        interface SearchFunc {
            (source: string, subString: RegExp): boolean;
        }

        let mySearch: SearchFunc = (source, subString) => {
            return source.search(subString) !== -1;
        }
        let str = /2/
        console.log(mySearch("1,2,3,5", str), "boolean");

        // 泛型接口
        interface CreateArrayFunc {
            <T>(length: number, value: T): Array<T>;
        }
        let createArray: CreateArrayFunc = <T>(length: number, value: T): Array<T> => {
            let result: T[] = [];
            for (let i = 0; i < length; i++) {
                result[i] = value;
            }
            return result;
        }
        console.log(createArray(3, 'x'));// ['x', 'x', 'x']

        // 泛型参数的默认类型
        function createArrayT<T = string>(length: number, value: T): Array<T> {
            let result: T[] = [];
            for (let i = 0; i < length; i++) {
                result[i] = value;
            }
            return result;
        }
        console.log(createArrayT(9, 1));

        // 多个泛型参数
        function swap<T, U>(data: T, info: U): string {
            return data + "--" + info
        }
        console.log(swap(7, 'seven'));

        const fun: (num: number, num1: unknown) => number | string = (num: number, num1: unknown): number | string => {
            let numT: number | string = ""
            numT = <number>num + <number>num1;
            return numT
        }
        console.log(fun(1, NaN) + ":" + typeof fun(1, NaN));

        return {}

    },
})
</script>
<style lang='scss' scoped>
</style>