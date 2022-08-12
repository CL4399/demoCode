import React, { useState, useEffect } from "react"
import { ConfigProvider, DatePicker, message } from "antd"
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
import FormPage from "./form/index"
import Squaer from "./Square/index"
import UseEffectDemo from "./UseEffectDemo/index"
moment.locale("zh-cn")
class Home extends React.Component {
    constructor(props: any) {
        super(props)
    }
    state = {
        value: moment(),
        name: moment().format("YYYY年MM月DD日 HH:mm:ss"),
        salary: 100,
        department: "Dev",
        tasks: ["dev", "test", "ship"],
        time: moment().format("YYYY年MM月DD日 HH:mm:ss"),
        date: moment(),
    }
    handleChange(value: any) {
        message.info(`您选择的日期是: ${this.state.value ? this.state.value.format("YYYY年MM月DD日") : "未选择"}`)
        this.setState({
            date: value,
        })
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: moment().format("YYYY年MM月DD日 HH:mm:ss"),
            })
        }, 1000)
    }
    render(): React.ReactNode {
        return (
            <>
                <ConfigProvider locale={zhCN}>
                    <div style={{ width: 400, margin: "100px auto" }}>
                        <DatePicker onChange={this.handleChange.bind(this)} />
                        {/*  @ts-ignore */}
                        <div style={{ marginTop: 16 }}>当前日期：{this.state.date ? this.state.date.format("YYYY年MM月DD日 HH:mm:ss") : "未选择"}</div>
                        <div style={{ marginTop: 16 }}>Now Time： {this.state.time}</div>
                    </div>
                </ConfigProvider>
                <FormPage></FormPage>
                <Squaer></Squaer>
                <UseEffectDemo></UseEffectDemo>
            </>
        )
    }
}
export default Home
