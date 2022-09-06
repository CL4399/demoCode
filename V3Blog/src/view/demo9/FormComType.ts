//引入组件所需类型
import type { Rule } from "ant-design-vue/es/form"
import type { DefaultOptionType } from "../../../node_modules/ant-design-vue/lib/vc-tree-select/TreeSelect"
import { RuleObject } from "ant-design-vue/lib/form"
import { UploadOutlined } from "@ant-design/icons-vue"
type Picker = import("../../../node_modules/ant-design-vue/lib/vc-picker/interface").PickerMode
type UploadRequestOption = import("../../../node_modules/ant-design-vue/lib/vc-upload/interface").UploadRequestOption
declare type RawValue = string | number
export declare type OptionType = typeof Option
export interface LabeledValue {
    key?: string
    value: RawValue
    label?: any
}
export declare type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined
interface FormOptions {
    /** input */
    field: string // 字段名称
    label: string // 字段描述
    prefix?: Boolean //是否 input 的 左插槽
    suffix?: Boolean //是否 input 的 右插槽
    prefixIcon?: Element // input 的 左插槽的DOM
    suffixIcon?: Element // input 的 右插槽的DOM
    placeholder?: string // input框默认提示文字
    type: string // formItem 类型
    rule?: RuleObject[] // 表单校验规则

    /** select */
    mode?: "multiple" | "tags" | "combobox" | undefined // select 组件的mode
    showSelectSearch?: boolean
    filterSelectOption: (input: string, option: any) => boolean

    /** treeSelect */
    treeData?: any[] // 树形select 组件数据
    SHOW_PARENT?: string // 定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点). TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点.
    filterTreeOption?: boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean) | undefined // 自定义树形选择组件的过滤方法
    searchValue?: string // 树形选择组件的搜索文字
    treeCheckble?: Boolean // 是否显示树形选择组件的checkBox

    /** time-picker */
    picker?: Picker // date | week | month | quarter | year 日期选择组件的类型

    /** upload */
    url: String // 文件上传路径
    customRequest?: (options: UploadRequestOption) => void // 文件自定义上传方法
    maxCount?: Number // 文件上传限制数量
    listType?: String // 文件上传类型限制
    multiple?: boolean // 是否支持多选 (按住ctrl)
    fileName: string // 发到后台的文件参数名

    /** switch */
    switchDisabled?: boolean
    switchSize?: "default" | "small" | undefined
    switchCheckedChildren?: Element | string | number
    switchUnCheckedChildren?: Element | string | number

    options?: { label: string; value: string | number; disabled?: boolean }[] // select/checkboxGroup 组件的数据
}
interface StrObj {
    [key: string]: any
}
type Layout = "horizontal" | "vertical" | "inline"
import type { RadioChangeEvent } from "../../../node_modules/ant-design-vue/lib/radio/interface"