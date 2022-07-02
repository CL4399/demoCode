//获取节点中含有value的所有key集合
export function getkeyList(value: string, tree: any, keyList: any) {
    // console.log(tree, "初始进入getkeyList方法")
    //遍历所有同一级的树
    for (let i = 0; i < tree.length; i++) {
        let node = tree[i]
        // console.log(node, "进入getkeyList循环")
        //如果该节点存在value值则push
        if (node.menuName.indexOf(value) > -1) {
            keyList.push(node.id)
            // console.log(keyList, "进入getkeyList循环判断")
        }
        //如果拥有孩子继续遍历
        if (node.children) {
            getkeyList(value, node.children, keyList)
        }
    }
    //因为是引用类型，所有每次递归操作的都是同一个数组
    // console.log(keyList, "getkeyList方法结束")
    return keyList
}
//该递归主要用于获取key的父亲节点的key值
export function getParentKeyT(key: number, tree: any): number {
    // console.log(key,"getParentKeyT>>>>>>>>>>>>>>>>>");
    let parentKey, temp
    //遍历同级节点
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
            //如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
            //如果不存在，继续遍历其子节点
            // @ts-ignore
            if (node.children.some((item) => item.id === key)) {
                parentKey = node.id
            } else if ((temp = getParentKeyT(key, node.children))) {
                //parentKey = this.getParentKey(key,node.children)
                //改进，避免二次遍历
                parentKey = temp
            }
        }
    }
    return parentKey
}
