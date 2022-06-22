import React, { Component } from "react"
// 导入路由管理工具
import { RouteConfig } from "react-router-config"
import loadable from "@loadable/component"
const Login = loadable(() => import("@pages/login/index"))
const NotFound404 = loadable(() => import("@pages/errorPages/404"))
const About = loadable(() => import("@pages/About/index"))
const routes: RouteConfig = [
    {
        path: "/",
        name: "Home",
        key: "1",
        exact: true,
        icon: "UserOutlined",
        component: Login,
    },
    {
        path: "/404",
        name: "404",
        exact: true,
        key: "2",
        icon: "LaptopOutlined",
        component: NotFound404,
    },
    {
        path: "/about",
        name: "About",
        exact: true,
        key: "3",
        icon: "NotificationOutlined",
        component: About,
    },
]

export default routes

