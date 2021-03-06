import React from 'react';
import ReactEcharts from 'echarts-for-react';
let nodeEle: any = null;
const bgColor = '#2E2733';
let option = {
    backgroundColor: '',
    color: [] as string[],
    series: [
        {
            type: 'sunburst',
            center: ['50%', '48%'],
            data: [] as any[],
            sort: (a: any, b: any) => {
                if (a.depth === 1) {
                    return b.getValue() - a.getValue();
                } else {
                    return a.dataIndex - b.dataIndex;
                }
            },
            label: {
                rotate: 'radial',
                color: '',
            },
            itemStyle: {
                borderColor: '',
                borderWidth: 2,
            },
            levels: [
                {},
                {
                    r0: 0,
                    r: 40,
                    label: {
                        rotate: 0,
                    },
                },
                {
                    r0: 40,
                    r: 105,
                },
                {
                    r0: 115,
                    r: 140,
                    itemStyle: {
                        shadowBlur: 2,
                        shadowColor: '',
                        color: 'transparent',
                    },
                    label: {
                        rotate: 'tangential',
                        fontSize: 10,
                        color: '',
                    },
                },
                {
                    r0: 140,
                    r: 145,
                    itemStyle: {
                        shadowBlur: 80,
                        shadowColor: '',
                    },
                    label: {
                        position: 'outside',
                        textShadowBlur: 5,
                        textShadowColor: '#333',
                    },
                    downplay: {
                        label: {
                            opacity: 0.5,
                        },
                    },
                },
            ],
        },
    ],
};
function randomColor() {
    let random = '#';
    for (let i = 0; i < 6; i++) {
        random += parseInt(String(Math.random() * 15)).toString(16); //??????????????????????????????16??????
    }
    return random; //???????????????
}
const randomColorArr = () => {
    let arr: string[] = [];
    [1, 2, 3, 4, 5].forEach((item) => {
        arr.push(randomColor());
    });
    return arr;
};
const init = () => {
    let colors: string[] = [];
    colors = randomColorArr();
    let data: any[] = [
        {
            name: '??????',
            itemStyle: {
                color: colors[1],
            },
            children: [
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '???',
                                },
                                {
                                    name: '??????',
                                },
                                {
                                    name: '???????????????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '??????????????????',
                                },
                                {
                                    name: '????????????',
                                },
                                {
                                    name: '???????????????',
                                },
                            ],
                        },
                        {
                            name: '3???',
                            children: [
                                {
                                    name: '??????????????????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '??????????????????????????????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '?????????',
                                },
                                {
                                    name: '???????????????',
                                },
                            ],
                        },
                        {
                            name: '3???',
                            children: [
                                {
                                    name: '??????????????????????????????',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: '?????????',
            itemStyle: {
                color: colors[2],
            },
            children: [
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '???????????????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '????????????????????????????????????',
                                },
                                {
                                    name: '?????????????????????',
                                },
                            ],
                        },
                        {
                            name: '3???',
                            children: [
                                {
                                    name: '??????????????????\n&RPG??????????????????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '??????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '????????????????????????',
                                },
                                {
                                    name: '??????',
                                },
                                {
                                    name: '????????????????????????',
                                },
                            ],
                        },
                        {
                            name: '3???',
                            children: [
                                {
                                    name: '???????????????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '??????????????????????????????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '?????????????????????',
                                },
                                {
                                    name: '????????????',
                                },
                            ],
                        },
                        {
                            name: '3???',
                        },
                        {
                            name: '2???',
                            children: [
                                {
                                    name: '??????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '??????????????????',
                                },
                                {
                                    name: '??????????????????',
                                },
                                {
                                    name: '??????????????????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '?????????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '????????????????????????',
                                },
                                {
                                    name: '?????????????????????????????????',
                                },
                            ],
                        },
                        {
                            name: '3???',
                            children: [
                                {
                                    name: '??????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '4???',
                            children: [
                                {
                                    name: '???????????????',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '??????',
                    children: [
                        {
                            name: '5???',
                            children: [
                                {
                                    name: '??????????????????',
                                },
                            ],
                        },
                        {
                            name: '4???',
                            children: [
                                {
                                    name: 'Three.js ????????????',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    const itemStyle = {
        star5: {
            color: colors[0],
        },
        star4: {
            color: colors[1],
        },
        star3: {
            color: colors[2],
        },
        star2: {
            color: colors[3],
        },
    };
    const instance = nodeEle.getEchartsInstance();
    option.color = colors;
    for (let j = 0; j < data.length; ++j) {
        let level1 = data[j].children;
        for (let i = 0; i < level1.length; ++i) {
            let block = level1[i].children;
            let bookScore: any[] = [];
            let bookScoreId: any;
            for (let star = 0; star < block.length; ++star) {
                let style = ((name) => {
                    switch (name) {
                        case '5???':
                            bookScoreId = 0;
                            return itemStyle.star5;
                        case '4???':
                            bookScoreId = 1;
                            return itemStyle.star4;
                        case '3???':
                            bookScoreId = 2;
                            return itemStyle.star3;
                        case '2???':
                            bookScoreId = 3;
                            return itemStyle.star2;
                    }
                })(block[star].name);
                block[star].label = {
                    color: style?.color,
                    downplay: {
                        opacity: 0.5,
                    },
                };
                if (block[star].children) {
                    style = {
                        //@ts-ignore
                        opacity: 1,
                        color: style?.color as string,
                    };
                    block[star].children.forEach((book: any) => {
                        book.value = 1;
                        book.itemStyle = style;
                        book.label = {
                            color: style?.color,
                        };
                        let value = 1;
                        if (bookScoreId === 0 || bookScoreId === 3) {
                            value = 5;
                        }
                        if (bookScore[bookScoreId]) {
                            bookScore[bookScoreId].value += value;
                        } else {
                            bookScore[bookScoreId] = {
                                color: colors[bookScoreId],
                                value: value,
                            };
                        }
                    });
                }
            }
            level1[i].itemStyle = {
                color: data[j].itemStyle.color,
            };
        }
    }
    option = {
        backgroundColor: bgColor,
        color: colors,
        series: [
            {
                type: 'sunburst',
                center: ['50%', '48%'],
                data: data,
                sort: function (a, b) {
                    if (a.depth === 1) {
                        return b.getValue() - a.getValue();
                    } else {
                        return a.dataIndex - b.dataIndex;
                    }
                },
                label: {
                    rotate: 'radial',
                    color: bgColor,
                },
                itemStyle: {
                    borderColor: bgColor,
                    borderWidth: 2,
                },
                levels: [
                    {},
                    {
                        r0: 0,
                        r: 40,
                        label: {
                            rotate: 0,
                        },
                    },
                    {
                        r0: 40,
                        r: 105,
                    },
                    {
                        r0: 115,
                        r: 140,
                        itemStyle: {
                            shadowBlur: 2,
                            shadowColor: colors[2],
                            color: 'transparent',
                        },
                        label: {
                            rotate: 'tangential',
                            fontSize: 10,
                            color: colors[0],
                        },
                    },
                    {
                        r0: 140,
                        r: 145,
                        itemStyle: {
                            shadowBlur: 80,
                            shadowColor: colors[0],
                        },
                        label: {
                            position: 'outside',
                            textShadowBlur: 5,
                            textShadowColor: '#333',
                        },
                        downplay: {
                            label: {
                                opacity: 0.5,
                            },
                        },
                    },
                ],
            },
        ],
    };
    instance.setOption(option);
};
class EchartsArea extends React.Component {
    componentDidMount() {
        setInterval(() => {
            init();
        }, 2 * 1000);
    }
    render() {
        return (
            <ReactEcharts
                option={option}
                notMerge={true}
                lazyUpdate={false}
                style={{ height: '600px', width: '100%' }}
                className={'react_for_echarts'}
                theme="my_theme"
                ref={(el) => (nodeEle = el)}
            />
        );
    }
}

export default EchartsArea;
