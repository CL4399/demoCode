import React, { useState, useEffect } from "react"
import { ConfigProvider, DatePicker, message, Button, Checkbox, Form, Input } from "antd"
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn")
class FormPage extends React.Component {
    constructor(props: any) {
        super(props)
    }
    state = {
        dataInfo: {},
    }
    onFinish(values: any) {
        console.log("Success:", values)
    }

    onFinishFailed(errorInfo: any) {
        console.log("Failed:", errorInfo)
    }
    componentDidMount() {}
    render(): React.ReactNode {
        return (
            <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} autoComplete="off">
                <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default FormPage
