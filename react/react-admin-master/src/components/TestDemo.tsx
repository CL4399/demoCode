import React, { useState, useMemo, useCallback } from 'react';
import { Button } from 'antd';
import ButtonCom from './demoCom/Button';
import { FullscreenOutlined } from '@ant-design/icons';
import EchartsArea from './EchartsCom';

function TestDemo() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <Button onClick={() => setCount(count + 1)}>Click me {count}</Button>
        </div>
    );
}

function FormattedDate(props: any) {
    return <h2>子组件 {props.date.toLocaleTimeString()}</h2>;
}

class Clock extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { date: new Date(), arr: [1, 23, 123, 1231, 5123], num: 0 };
        // console.log('constructor');
    }
    /**
     * getDerivedStateFromProps 这个生命周期函数是类的静态方法，并不是原型中的方法，所以在其内部使用 this 访问到的不是组件实例。
     * 此生命周期钩子不常用，如果可以的话，我们也尽可能不会使用它。
     */
    static getDerivedStateFromProps(props: any, state: any) {
        // console.log(props, state, 'getDerivedStateFromProps');
        return null;
    }
    /**
     *这个生命周期方法通常用来做性能优化
        默认情况下，当组件的 props 或者 state 变化时，都会导致组件更新。它在 render 方法之前执行，如果它的返回值为 false，则不会更新组件，也不会执行后面的 render 方法。
        它接收两个参数，nextProps 和 nextState，即下一次更新的 props 和下一次更新的 state。
        我们可以将 this.props 和 nextProps 比较，以及将 this.state 与 nextState 比较，并返回 false，让组件跳过更新。不过注意：它并不会阻止子组件因为 state 改变而导致的更新。
     * @param nextprops
     * @param nextState
     * @returns
     */
    shouldComponentUpdate(nextprops: unknown, nextState: any) {
        // console.log(
        //     `
        //     ${this.state.date.toLocaleTimeString()}
        //     ${nextState.date.toLocaleTimeString()}
        //     ++++++shouldComponentUpdate+++++++++++++
        //     `
        // );
        return true;
    }
    state: { date: Date; arr: number[]; num: number };
    timerID: any;
    // componentDidMount 在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.setState({
            num: 1,
        });
    }

    // 组件更新时
    componentDidUpdate() {
        // console.log('componentDidUpdate');
    }

    // 组件卸载时
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date(),
        });
        console.log(this.state.num, '?????????????');
    }
    stopClick(event: Event) {
        event.preventDefault();
        // console.log('stop');
    }
    buttonClick(e: Event): any {
        console.log(e, 'buttonClick');
    }
    render(): React.ReactNode {
        // console.log('render');

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
                <ButtonCom
                    text={'按钮'}
                    color={''}
                    size={''}
                    type={''}
                    shape={'round'}
                    disabled={false}
                    loading={false}
                    danger={false}
                    ghost={false}
                    loadingColor={''}
                    onClick={this.buttonClick}
                    children={<FullscreenOutlined />}
                ></ButtonCom>

                <ButtonCom
                    text={<div style={{ color: 'aqua' }}>123</div>}
                    color={'aqua'}
                    size={''}
                    type={''}
                    shape={'round'}
                    disabled={false}
                    loading={false}
                    danger={true}
                    ghost={false}
                    loadingColor={''}
                    onClick={this.buttonClick}
                    children={<FullscreenOutlined />}
                ></ButtonCom>
                <MemoDemo></MemoDemo>
                {/* <EchartsArea></EchartsArea> */}
            </div>
        );
    }
}

export default Clock;

/**
 *用React.memo包裹的组件每次渲染时会和props会和旧的props进行浅比较，如果没有变化则组件不渲染
 */
const Childone = React.memo((props: any) => {
    console.log('子组件一被重新渲染', props);
    return <p>子组件一{props.num}</p>;
});
function MemoDemo() {
    let [count, setCount] = useState(0);
    let [render, setRender] = useState(false);
    let [num, setNum] = useState(2);
    const handleAdd = () => {
        setCount(count + 1);
    };

    const Childtwo = (props: any) => {
        return (
            <div>
                <p>子组件二</p>
                <p>count的值为：{props.count}</p>
            </div>
        );
    };
    const handleRender = useCallback(() => {
        setRender(true);
    }, [num]);
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
            }}
        >
            {/* {
                useMemo(() => {
                    return <Childone />
                }, [render])
            } */}
            <Childone num={num} onClick={handleRender} />
            <Childtwo count={count} />
            <button onClick={handleAdd}>增加</button>
            <br />
            <button onClick={handleRender}>子组件一渲染</button>
        </div>
    );
}
