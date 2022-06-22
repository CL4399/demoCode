import React, { useState } from 'react';

function TestDemo() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click me {count}</button>
        </div>
    );
}

function FormattedDate(props: any) {
    return <h2>子组件 {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
    state: { date: Date; arr: number[] };
    timerID: any;
    constructor(props: any) {
        super(props);
        this.state = { date: new Date(), arr: [1, 23, 123, 1231, 5123] };
    }

    // componentDidMount 在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    // 组件更新时
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    // 组件卸载时
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date(),
        });
    }
    stopClick(event: Event) {
        event.preventDefault();
        console.log('stop');
    }
    render(): React.ReactNode {
        return (
            <div>
                <h1>Clock</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
                <a href="www.baidu.com" onClick={() => this.stopClick}>
                    百度
                </a>
                {this.state.arr.map((item, index) => (
                    <div style={{ color: index % 2 ? 'red' : 'aqua' }} key={index}>
                        {item}---{index}
                    </div>
                ))}
                <FormattedDate date={this.state.date}></FormattedDate>
                <TestDemo></TestDemo>
            </div>
        );
    }
}

export default Clock;
