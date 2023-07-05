import React, { useState, useEffect } from "react"
import { ConfigProvider, DatePicker, Divider, message } from "antd"
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
import FormPage from "./form/index"
import Squaer from "./Square/index"
import UseEffectDemo from "./UseEffectDemo/index"
import AntSuperset_PopUp from "./AntSupersetPopUp/AntSuperset_PopUp"
import "./AntSupersetPopUp/AntSuperset_PopUp.less"
import "./AntSupersetPopUp/AntSuperset_ContentMenu.less"

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
                        <div
                            onClick={() => {
                                AntSuperset_PopUp.PopUp({
                                    id: "id",
                                    title: "标题",
                                    width: "700px",
                                    height: "550px",
                                    top:'100%',
                                    left:"calc(100% - 700px)",
                                    ReactHteml: () => (
                                        <div
                                            onClick={() => {
                                                AntSuperset_PopUp.PopUp({
                                                    id: "id2",
                                                    title: "标题2",
                                                    width: "50%",
                                                    height: "50%",
                                                    ReactHteml: () => (
                                                        <div id="ant_popup_test" style={{ height: "100%", overflow: "auto" }}>
                                                            <img
                                                                src={"https://bkimg.cdn.bcebos.com/pic/cdbf6c81800a19d80b6956183dfa828ba61e4641"}
                                                                style={{
                                                                    width: "100%",
                                                                    height: "700px",
                                                                    position: "relative",
                                                                    zIndex: "1",
                                                                }}
                                                            />
                                                            <p
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "5px",
                                                                    fontSize: "18px",
                                                                }}
                                                            >
                                                                {"Let's"} learn about the web
                                                            </p>
                                                            <p
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "5px",
                                                                    fontSize: "18px",
                                                                }}
                                                            >
                                                                Join the waitlist to find out when the podcast launches and new videos.
                                                            </p>
                                                        </div>
                                                    ),
                                                    BottomHtml: () => <></>,
                                                    TopHtml: () => <></>,
                                                    grayBack: true,
                                                })
                                            }}
                                            style={{ marginTop: 16 }}
                                        >
                                            <div style={{ padding: "12px" }}> Now Time： {this.state.time}</div>
                                        </div>
                                    ),
                                    //动画时长
                                    animatioNTime: 2,
                                    //开始动画 @keyframes 名
                                    animatioStartClass: "Ok",
                                    //结束动画 @keyframes 名
                                    animatioEndClass: "NO",
                                    grayBack: false,
                                })
                            }}
                            style={{ marginTop: 16 }}
                        >
                            <div>Now Time： {this.state.time}234</div>
                        </div>
                    </div>
                </ConfigProvider>
                <FormPage></FormPage>
                <Squaer></Squaer>
                {/* <UseEffectDemo></UseEffectDemo> */}
            </>
        )
    }
}
export default Home
