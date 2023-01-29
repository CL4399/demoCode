import dayjs from "dayjs"

// 通过起始时间计算中间有多少天
function getDates(start: string | number, end: string | number): string[] {
    const startDate = dayjs(start)
    const endDate = dayjs(end)
    const days = endDate.diff(startDate, "day")
    const dates = []
    for (let i = 0; i < days; i++) {
        const date = startDate.add(i, "day")
        dates.push(date.format("YYYY-MM-DD"))
    }
    return dates
}

// 数字数组去重
function set(arr: number[]) {
    let newArr: number[] = []
    arr.forEach(item => {
        if (newArr.indexOf(item) == -1) {
            newArr.push(item)
        }
    })
    return newArr
}

// 判断值类型
function TypeOf(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export {
    getDates,
    set,
    TypeOf
}




