export interface Arr {
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