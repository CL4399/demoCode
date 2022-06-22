const demoApi = {
    name: "testDemo",
    id: "1",
    children: [
        {
            path: "/demo1",
            name: "demo1",
            component: () => import('../view/demo1/Demo.vue')
        },
        {
            path: "/demo2",
            name: "demo2",
            component: () => import('../view/demo2/Demo.vue')
        }
    ]
}
export default demoApi