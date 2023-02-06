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
// 判断单个数据类型或者指定对比数据类型
function judgeDataType(val: any, type?: string) {
    const dataType = Object.prototype.toString
        .call(val)
        .replace(/\[object (\w+)\]/, "$1")
        .toLowerCase()
    return type ? dataType === type : dataType
}

// 3行代码搞定
// 先在options里面添加上groupId
// flatMap会将options数组即[ [{ text: '公交', value: 0, active: true, groupId: 'commute' }], ...]变成[{ text: '公交', value: 0, active: true, groupId: 'commute' }, ...]

function formattedData(
    arr: {
        groupTitle: string
        groupId: string
        mode: string
        options: {
            text: string
            value: number[] | number
            active: boolean
        }[]
    }[]
) {
    return arr.flatMap((item) => item.options.map((option) => ({ ...option, groupId: item.groupId }))).filter((item) => item.active)
}


//  根据时间分组
function timeGrouping(arr: { [key: string]: string | number }[], key: string) {
    let obj: any = {},
        result: any = []
    arr.forEach((item: any) => {
        if (!obj[item[key]]) {
            obj[item[key]] = { value: [] }
        }
        obj[item[key]].value.push(item)
    })
    for (let key in obj) {
        result.push({ [key]: obj[key] })
    }
    return result
}

export {
    getDates,
    set,
    TypeOf,
    formattedData,
    timeGrouping,
    judgeDataType
}




