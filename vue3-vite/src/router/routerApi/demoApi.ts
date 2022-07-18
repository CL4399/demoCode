const demoApi = [
    {
        name: "首页",
        id: "1",
        children: [
            {
                name: "SubNav 1-1",
                id: "1-1",
                icon: "area-chart-outlined",
                children: [
                    {
                        name: "option 1",
                        id: "1-1-1",
                        path: "/demo1",
                        icon: "stock-outlined"
                    },
                ],
            },
            {
                name: "SubNav 1-2",
                id: "1-2",
                icon:"box-plot-outlined",
                children: [
                    {
                        name: "option 1",
                        id: "1-2-1",
                        path: "/demo2",
                        icon:"rader-chart-outlined"
                    },
                ],
            },
            {
                name: "Canvas",
                id: "1-3",
                icon:"fall-outlined",
                children: [
                    {
                        name: "demo1",
                        id: "1-3-1",
                        path: "/canvas-demo1",
                        icon:"android-outlined"
                    },
                    {
                        name: "demo2",
                        id: "1-3-2",
                        path: "/canvas-demo2",
                        icon:"apple-outlined"
                    },
                    {
                        name: "demo3",
                        id: "1-3-3",
                        path: "/canvas-demo3",
                        icon:"windows-outlined"
                    },
                ],
            },
        ],
    },
    {
        name: "测试",
        id: "2",
        children: [
            {
                name: "SubNav 2-1",
                id: "2-1",
                icon:"ie-outlined",
                children: [
                    {
                        name: "Tailwindcss",
                        id: "2-1-1",
                        path: "/demo3",
                        icon:"chrome-outlined"
                    },
                ],
            },
            {
                name: "SubNav 2-2",
                id: "2-2",
                icon:"youtube-outlined",
                children: [
                    {
                        name: "Button",
                        id: "2-2-1",
                        path: "/demo4",
                        icon:"html5-outlined"
                    },
                    {
                        name: "Modal",
                        id: "2-2-2",
                        path: "/demo5",
                        icon:"html5-outlined"
                    },
                    {
                        name: "Role_Authority",
                        id: "2-2-3",
                        path: "/demo6",
                        icon:"html5-outlined"
                    }, {
                        name: "TreeSearch",
                        id: "2-2-4",
                        path: "/demo7",
                        icon:"html5-outlined"
                    },
                ],
            },
        ],
    },
    {
        name: "测试2",
        id: "3",
        children: [
            {
                name: "SubNav 3-1",
                id: "3-1",
                icon:"strikethrough-outlined",
                children: [
                    {
                        name: "Test",
                        id: "3-1-1",
                        path: "/demo8",
                        icon:"font-colors-outlined"
                    },
                    {
                        name: "FormCom",
                        id: "3-1-2",
                        path: "/demo9",
                        icon:"font-colors-outlined"
                    },
                ],
            },
        ],
    },
]
export default demoApi