<template>
    <div>
        <el-popover placement="bottom" title="Title" :width="200" trigger="click" style="z-index: 9999 !important;"
            @show="showPopover">
            <template #reference>
                <ElSelect slot="reference" ref="select" filterable :filter-method="filterable" :size="'small'"
                    v-model="returnDataKeys" :multiple="multiple" :clearable="clearable" :collapse-tags="collapseTags"
                    @click.native="selectClick" @remove-tag="removeTag" @clear="clean" :teleported="false"
                    class="tree-select">
                    <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </ElOption>
                </ElSelect>
            </template>
            <template #default>
                <ElTree class="common-tree" :width="width" ref="tree" :data="data" :props="obj"
                    :show-checkbox="multiple" :node-key="obj.id" :check-strictly="checkStrictly"
                    :default-expanded-keys="defaultKeys" :expand-on-click-node="multiple && expandClickNode"
                    :check-on-click-node="checkClickNode" :highlight-current="true" @check-change="nodeClick"
                    @node-click="nodeClick"></ElTree>
            </template>
        </el-popover>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, watch, defineComponent, computed, getCurrentInstance, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElPopover, ElTree, ElSelect, ElButton, ElOption, ElRow } from "element-plus"
interface Str {
    [key: string]: string
}
export default defineComponent({
    props: {
        // 树结构数据
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        obj: {
            type: Object,
            required: false,
            default: () => {
                return {
                    id: 'value',// ID
                    label: 'label',// 显示名称
                    children: 'children', //子级字段名
                    path: 'path',//路径
                    content: 'content',//描述
                    pid: 'pid',//父id
                }
            }
        },
        // 配置是否可多选
        multiple: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 配置是否可清空选择
        clearable: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 配置多选时是否将选中值按文字的形式展示
        collapseTags: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 显示复选框情况下，是否严格遵循父子不互相关联
        checkStrictly: {
            type: Boolean,
            default() {
                return false;
            }
        },
        //多选是设置点击节点是否可以选中
        checkClickNode: {
            type: Boolean,
            default() {
                return false;
            }
        },
        //多选时：点击节点展开还是点三角标
        expandClickNode: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 默认选中的节点key
        defaultKey: {
            type: [Number, String, Array, Object],
            default() {
                return [];
            }
        },
        size: {
            type: String,
            default() {
                return 'small';
            }
        },
        width: {
            type: String,
            default() {
                return '100%';
            }
        },
        height: {
            type: String,
            default() {
                return '300px';
            }
        }
    },
    components: { ElPopover, ElTree, ElSelect, ElButton, ElOption, ElRow },
    setup(props: any, { emit }: any) {
        let proxy = getCurrentInstance()
        let dataInfo = reactive({
            popoverWidth: "0px" as string | number,//下拉框大小
            isShowSelect: true, // 是否显示树状选择器
            options: [] as Str[],//select option选项
            returnDatas: [] as Str[] | null | Str,//返回给父组件数组对象
            returnDataKeys: [] as Str[] | string,//返回父组件数组主键值
            defaultKeys: []
        })
        let select = ref()
        let tree = ref()

        const init = () => {
            console.log("init");
            // eslint-disable-next-line no-undef,no-debugger
            // debugger
            if (props.defaultKey != undefined && props.defaultKey.length > 0) {
                if (props.multiple) {
                    // 多选
                    if (Object.prototype.toString.call(props.defaultKey).indexOf("Array") != -1) {
                        if (Object.prototype.toString.call(props.defaultKey[0]).indexOf("Object") != -1) {//对象
                            setDatas(props.defaultKey);
                        } else if (Object.prototype.toString.call(props.defaultKey[0]).indexOf("Number") != -1
                            || Object.prototype.toString.call(props.defaultKey[0]).indexOf("String") != -1) {
                            setKeys(props.defaultKey);
                        } else {
                            console.log("多选：传入参数类型不匹配");
                            return;
                        }
                    } else {
                        console.log("多选：传入参数类型不匹配");
                        return;
                    }

                } else {
                    // 单选
                    if (Object.prototype.toString.call(props.defaultKey).indexOf("Number") != -1
                        || Object.prototype.toString.call(props.defaultKey).indexOf("String") != -1
                        || Object.prototype.toString.call(props.defaultKey).indexOf("Object") != -1) {
                        setKey(props.defaultKey);
                    } else {
                        console.log("单选：传入参数类型不匹配");
                        return;
                    }

                }
            }
        }
        //下拉框select点击[入口]
        const selectClick = () => {
            dataInfo.popoverWidth = select.value.$el.clientWidth - 26;
            //显示下拉框
            dataInfo.isShowSelect = !dataInfo.isShowSelect
        }
        //单选: 树点击方法
        const nodeClick = (data?: any, node?: Str) => {
            if (!props.multiple) {//单选
                dataInfo.isShowSelect = false;
                setKey(node?.key);
            } else {//多选
                var checkedKeys = tree.value.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
                var t: any[] = [];
                dataInfo.options = checkedKeys.map((item: any) => {//设置option选项
                    var node = tree.value.getNode(item); // 所有被选中的节点对应的node
                    t.push(node.data);
                    return { label: node.label, value: node.key };
                });
                dataInfo.returnDataKeys = dataInfo.options.map((item: any) => {
                    return item.value;
                });
                dataInfo.returnDatas = t;
            }
        }
        //单选:清空选中
        const clean = () => {
            tree.value.setCurrentKey(null);//清除树选中key
            dataInfo.returnDatas = null;
            dataInfo.returnDataKeys = '';
            popoverHide();

        }
        //单选:设置、初始化值 key
        const setKey = (thisKey: string | undefined) => {
            tree.value.setCurrentKey(thisKey);
            var node = tree.value.getNode(thisKey);
            setData(node.data);
        }
        //单选：设置、初始化对象
        const setData = (data: Str) => {
            dataInfo.options = [];
            dataInfo.options.push({ label: data[props.obj.label], value: data[props.obj.id] });
            dataInfo.returnDatas = data;
            dataInfo.returnDataKeys = data[props.obj.id]

        }
        //多选:设置、初始化值 keys
        const setKeys = (thisKeys: any) => {
            tree.value.setCheckedKeys(thisKeys);
            dataInfo.returnDataKeys = thisKeys;
            var t: any[] = [];
            thisKeys.map((item: any) => {//设置option选项
                var node = tree.value.getNode(item); // 所有被选中的节点对应的node
                t.push(node.data);
                return { label: node.label, value: node.key };
            });
            dataInfo.returnDatas = t;
            popoverHide()
        }
        //多选:设置、初始化对象
        const setDatas = (data: any) => {
            tree.value.setCheckedNodes(data);
            dataInfo.returnDatas = data;
            var t: any[] = [];
            data.map((item: any) => {//设置option选项
                t.push(item[props.obj.id]);
            });
            dataInfo.returnDataKeys = t;
            popoverHide()
        }
        // 多选,删除任一select选项的回调
        const removeTag = (val: any) => {
            tree.value.setChecked(val, false);//设置为未选中
            var node = tree.value.getNode(val);//获取节点
            if (!props.checkStrictly && node.childNodes.length > 0) {
                treeToList(node).map(item => {
                    if (item.childNodes.length <= 0) {
                        tree.value.setChecked(item, false);
                    }
                });
            }
            nodeClick();
            popoverHide();

        }
        //下拉框关闭执行
        const popoverHide = () => {
            emit('getValue', dataInfo.returnDataKeys, dataInfo.returnDatas);
        }
        // 多选，清空所有勾选
        const clearSelectedNodes = () => {
            var checkedKeys = tree.value.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
            for (let i = 0; i < checkedKeys.length; i++) {
                tree.value.setChecked(checkedKeys[i], false);
            }
        }
        //树形转为集合
        const treeToList = (tree: any) => {
            var queen: any[] = [];
            var out = [];
            queen = queen.concat(tree);
            while (queen.length) {
                var first = queen.shift();
                if (first.childNodes) {
                    queen = queen.concat(first.childNodes);
                }
                out.push(first);
            }
            return out;
        }
        const switchTree = () => {
            return buildTree(props.data, "");
        }
        // 将一维的扁平数组转换为多层级对象
        const buildTree = (data: any, id: any) => {
            const fa = (id: any) => {
                const temp = [];
                for (let i = 0; i < data.length; i++) {
                    const n = data[i];
                    if (n[props.obj.pid] === id) {
                        n[props.obj.children] = fa(n[props.obj.id]);
                        temp.push(n);
                    }
                }
                return temp;
            };
            return fa(id);
        }
        const filterable = (el: any,): void => {
            console.log(el, props.data, "filterable");

        }
        const showPopover = (e: any) => {
            console.log(e, "showPopover");
            select.value.focus()
        }
        onMounted(() => {
            init();
        })
        watch(() => dataInfo.isShowSelect, (newV) => {
            console.log(newV, select.value, "????????????");
            select.value.focus()
        })
        return {
            ...toRefs(dataInfo), popoverHide, nodeClick, select, tree, selectClick, clean, removeTag, filterable
            , showPopover
        }
    },
})
</script>
<style lang="less"  scoped>
.mask {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 11;
}

.common-tree {
    overflow: auto;
}

.tree-select {
    z-index: 111;
}

.ok {
    float: right;
}

.el-row {
    padding-top: 0px !important;
}

/deep/.el-select__popper {
    display: none !important;
    z-index: -1 !important;
}
</style>