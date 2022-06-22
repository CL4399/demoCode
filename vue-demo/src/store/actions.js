import * as types from "store/mutation_type.js";
import {
  Modal
} from 'ant-design-vue'
import router from '@/router'

// actions 只能穿两个参数 一个是他的默认参数 另一个可以自己定义
export function loginOutAction(store, {
  status
} = {
  status: ""
}) {
  router.push({
    path: "/login"
  }).then(() => {
    // 是超时 提示
    if (status === 'timeout') {
      isShowTimeoutTip()
    }
  });
}

function isShowTimeoutTip() {
  Modal.info({
    title: "请重新登录",
    content: "平台长时间未操作，已自动退出",
    okText: "确定",
    onOk() {},
  });
}

export function resetState({
  commit
}) {
  commit(types.SET_ORIGINMENULIST, [])
  commit(types.SET_MENULIST, []);
  commit(types.SET_ISLOADING, false);
  commit(types.SET_BREADCRUMBPATH, []);
  commit(types.SET_DISPLAYNAME, '');
  commit(types.SET_AUTHORIZE, "");
  commit(types.SET_AUTHINFO, {});
  commit(types.SET_ISROOT, 0)
  commit(types.SET_ISTEST, 0)
  commit(types.SET_ISNOOPERATION, false)
  commit(types.SET_ERRTIPCODE, [])
}
