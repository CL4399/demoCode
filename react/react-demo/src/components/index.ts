import loadable from "@loadable/component"
const Login = loadable(() => import("../pages/login/index"))
const NotFound404 = loadable(() => import("../pages/errorPages/404"))
const About = loadable(() => import("../pages/About"))
export default {
    Login,
    NotFound404,
    About,
}