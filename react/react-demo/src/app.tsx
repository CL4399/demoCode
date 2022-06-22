//导入路由组件
import { HashRouter as Router, Route } from "react-router-dom"
import routes from "./router"
import React, { useState } from "react"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons"
import { Breadcrumb, Layout, Menu } from "antd"
const { Header, Content, Sider } = Layout
const items1 = [
    {
        label: "Home",
        key: 1,
        link: "/",
    },
    { label: "404", key: 2, link: "/#/404" },
    { label: "About", key: 3, link: "/#/about" },
].map((item) => ({
    key: item.key,
    label: item.label,
    link: item.link,
}))
console.log(routes, "routesroutesroutesroutesroutesroutesroutesroutes")

const items2 = routes.map((item: any) => {
    return {
        key: item.key,
        // icon: React.createElement(icon),
        label: item.name,
        com: item.component,
    }
})
import loadable from "@loadable/component"
let str = "Login"
const com: { [key: string]: any } = {
    Login: loadable(() => import("@pages/login/index")),
    404: loadable(() => import("@pages/errorPages/404")),
    Home: loadable(() => import("@pages/About")),
    About: loadable(() => import("@pages/About")),
}
let SpecificStory = com[str]

const App = () => (
    <Layout style={{ width: "100%", height: "100%" }}>
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                items={items1}
                onClick={(e) => {
                    console.log(e, "clcik")
                }}
            />
        </Header>
        <Layout style={{ height: "92vh" }}>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{
                        height: "100%",
                        borderRight: 0,
                    }}
                    items={items2}
                    onClick={(e) => {
                        console.log(items2[Number(e.key) - 1], "click2")
                        str = items2[Number(e.key) - 1].label
                    }}
                ></Menu>
            </Sider>
            <Layout
                style={{
                    padding: "0 24px 24px",
                }}
            >
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <SpecificStory></SpecificStory>
                </Content>
            </Layout>
        </Layout>
    </Layout>
)

export default App
