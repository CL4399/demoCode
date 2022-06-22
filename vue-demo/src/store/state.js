const state = {
    // 原始菜单
    originMenuList:[],
    // 加icon菜单
    menuList:[],
    // 是否加载
    isLoading:false,
    // 面包屑路径
    breadcrumbPath:[],
    // 显示名称
    displayName:"",
    // token
    authorize:"",
    //平台授权信息
    authInfo:{},
    // 是否是超管
    isRoot:0,
    // 是否是试用版 0正式版
    isTest:0,
    // 是否已经提示443 无操作权限
    isNoOperation:false,
    // 错误的code是否存在 防止重复弹出多个
    errTipCode:{}
}

export default state