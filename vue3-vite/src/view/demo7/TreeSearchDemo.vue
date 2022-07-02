<template>
    <InputSearch v-model:value="searchStr" style="margin-bottom: 8px" placeholder="Search" @search="onSearchT" />
    <div>
        <Tree :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :tree-data="treeData"
            @select="onSelect" @check="onCheck" @dragleave="rightClick" :replaceFields="myReplaceFieldsT"
            @expand="onExpand">
            <template #title="{ menuName }">
                <span v-if="menuName.indexOf(searchValue) > -1">
                    {{ menuName.substr(0, menuName.indexOf(searchValue)) }}
                    <span style="color: #f50">{{ searchValue }}</span>
                    {{ menuName.substr(menuName.indexOf(searchValue) + searchValue.length) }}
                </span>
                <span v-else>{{ menuName }}</span>
            </template>
        </Tree>
    </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, provide, unref, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { departmentList, powerList } from "./mock"
import { getkeyList, getParentKeyT } from "./method"
import { Tree, Input } from "ant-design-vue"
export default defineComponent({
    components: { Tree, InputSearch: Input.Search },
    setup(props: any) {
        const treeData = ref<any>([])
        const selectedKeys = ref()
        const handleData = (data: any[]) => {
            let result: any[] = []
            if (!Array.isArray(data)) {
                return result
            }
            let map: any = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            data.forEach((item) => {
                let parent = map[item.menuSuperId]
                if (parent) {
                    ; (parent.children || (parent.children = [])).push({ ...item, title: item.menuName, key: item.id, slots: { icon: "smile" } })
                } else {
                    result.push({ ...item, title: item.menuName, key: item.id, slots: { icon: "smile" } })
                }
            })
            return result
        }
        let arr = departmentList.menus
        let autoExpandParent = ref(true)
        let areaId = ref()
        let devInfoT = reactive({
            areaId: "",
            deviceLogicId: "",
            deviceType: "",
        })
        let gData = reactive({
            info: [],
            searchValue: "",
            expandedKeys: [] as string[],
            backupsExpandedKeys: [],
            searchStr: "",
        })
        let myReplaceFieldsT = {
            children: "children",
            title: "menuName",
            key: "id",
        }
        let arrA = handleData(arr)
        treeData.value = arrA
        const onSelect = (selectedKeys: string[], info: any) => {
            console.log(selectedKeys, "chooseNode")
            devInfoT.areaId = selectedKeys[selectedKeys.length - 1] as string
            areaId.value = selectedKeys[selectedKeys.length - 1] as string
            gData.expandedKeys = selectedKeys
            autoExpandParent.value = true
            setTimeout(() => {
                // thumbnail.value.getList(devInfoT.value)
            }, 200)
        }
        const onCheck = (checkedKeys: any, info: any) => {
            console.log(checkedKeys, info)
        }
        const onSearchT = () => {
            //添加这行代码是为了只点击搜索才触发
            gData.searchValue = gData.searchStr
            //如果搜索值为空，则不展开任何项，expandedKeys置为空
            //如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
            if (gData.searchValue === "") {
                // console.log("空")
                gData.expandedKeys = []
            } else {
                // console.log("不空")
                //首先将展开项与展开项副本置为空A
                gData.expandedKeys = []
                gData.backupsExpandedKeys = []
                //获取所有存在searchValue的节点
                let candidateKeysList = getkeyList(gData.searchValue, unref(treeData), [])
                //遍历满足条件的所有节点
                candidateKeysList.map((item: number) => {
                    //获取每个节点的母亲节点
                    var key = getParentKeyT(item, unref(treeData))
                    //当item是最高一级，父key为undefined，将不放入到数组中
                    //如果母亲已存在于数组中，也不放入到数组中
                    // console.log(key, "candidateKeysList>>>>>>>>>>>>>>>>>>>>>>")
                    // @ts-ignore
                    if (key && !gData.backupsExpandedKeys.some((item) => item === key)) gData.backupsExpandedKeys.push(key)
                })
                let length = gData.backupsExpandedKeys.length
                for (let i = 0; i < length; i++) {
                    // console.log(gData.backupsExpandedKeys[i], "gData.backupsExpandedKeys[i]")
                    getAllParentKeyT(gData.backupsExpandedKeys[i], treeData)
                }
                gData.expandedKeys = gData.backupsExpandedKeys.slice()
                // console.log(gData.expandedKeys, "expandedKeys>>>>>>>>>")
            }
        }
        //获取该节点的所有祖先节点
        const getAllParentKeyT = (key: number, tree: object[]) => {
            // console.log(key, "初始进入getAllParentKeyT>>>>>>>>>>>>>")
            var parentKey: number
            if (key) {
                //获得父亲节点
                parentKey = getParentKeyT(key, tree)
                if (parentKey) {
                    //如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
                    if (!gData.backupsExpandedKeys.some((item) => item === parentKey)) {
                        // @ts-ignore
                        gData.backupsExpandedKeys.push(parentKey)
                    }
                    //继续向上查找祖先节点
                    getAllParentKeyT(parentKey, tree)
                }
            }
        }
        const rightClick = (e: any) => {
            console.log(e, "rightClick")
        }
        const onExpand = (expandedKeys: string[]) => {
            console.log(expandedKeys, "onExpand")
            gData.expandedKeys = expandedKeys as string[]
            autoExpandParent.value = false
            setTimeout(() => {
                // thumbnail.value.getList(devInfoT.value)
            }, 200)
        }
        return { treeData, selectedKeys, onSelect, onCheck, ...toRefs(gData), onSearchT, myReplaceFieldsT, rightClick, autoExpandParent, onExpand }
    },
})
</script>
<style lang="scss" scoped>
</style>
