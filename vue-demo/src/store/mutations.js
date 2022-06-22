import * as types from './mutation_type'

const mutations = {
    [types.SET_ORIGINMENULIST](state,arr){
        state.originMenuList = arr
    },
    [types.SET_MENULIST](state,arr){
        state.menuList = arr
    },
    [types.SET_ISLOADING](state,boolean){
        state.isLoading = boolean
    },
    [types.SET_BREADCRUMBPATH](state,arr){
        state.breadcrumbPath = arr
    },
    [types.SET_DISPLAYNAME](state,str){
        console.log(str,"mutation.js")
        state.displayName = str
    },
    [types.SET_AUTHORIZE](state,str){
        state.authorize = str
    },
    [types.SET_AUTHINFO](state,obj){
        state.authInfo = obj
    },
    [types.SET_ISROOT](state,num){
        state.isRoot = num
    },
    [types.SET_ISTEST](state,num){
        state.isTest = num
    },
    [types.SET_ISNOOPERATION](state,boolean){
        state.isNoOperation = boolean
    },
    [types.SET_ERRTIPCODE](state,obj){
        state.errTipCode = obj
    }
}

export default mutations