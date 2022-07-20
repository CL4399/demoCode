import { defineComponent, reactive, nextTick } from "vue"
// 按需引入组件
import { Form, FormItem, Input, Select, Radio, RadioGroup, Button, TreeSelect, Textarea, DatePicker, RangePicker, Upload, Switch, CheckboxGroup, Row, Col } from "ant-design-vue"
//引入组件所需类型
import type { Rule } from "ant-design-vue/es/form"
import type { DefaultOptionType } from "../../../node_modules/ant-design-vue/lib/vc-tree-select/TreeSelect"
import { RuleObject } from "ant-design-vue/lib/form"
import { UploadOutlined } from "@ant-design/icons-vue"
type Picker = import("../../../node_modules/ant-design-vue/lib/vc-picker/interface").PickerMode
type UploadRequestOption = import("../../../node_modules/ant-design-vue/lib/vc-upload/interface").UploadRequestOption
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
const FormCom = defineComponent({
    components: { Form, FormItem, Input, Radio, RadioGroup, TreeSelect, Textarea, DatePicker, RangePicker, Row, Col, Upload, Button, Switch, CheckboxGroup },
    props: {
        options: {
            type: Array,
            default: [],
        },
        rules: {
            type: Object,
            default: {},
        },
        id: {
            type: String,
            default: "",
        },
        footer: {
            type: Boolean,
            default: true,
        },
        formLayout: {
            type: String,
            default: "horizontal", // 'horizontal' | 'vertical' | 'inline';
        },
    },
    setup(props, { emit, slots }) {
        let formState: StrObj = reactive({})
        const option: FormOptions[] = props.options as FormOptions[]
        const rules: Record<string, Rule[]> = props.rules as Record<string, Rule[]>
        let dataInfo = reactive({}) as any
        const refFun = (e: any) => {
            dataInfo[`${props.id}`] = e
        }
        const changeInput = (e: Event, info: string) => {
            formState[info] = (e.target as HTMLInputElement).value
            console.log(formState, "formState")
        }
        const selectChange = (e: any, info: string) => {
            formState[info] = e
            console.log(e, formState, "selectChange")
        }
        const radioChange = (e: any, info: string) => {
            formState[info] = e.target.value
            console.log(e.target.vlaue, "radioChange")
        }
        const changeTreeSelect = (e: string, info: string) => {
            console.log(e, "form", formState)
            formState[info] = e
        }
        const searchChange = (e: string, info: string) => {
            console.log(e, "form", info)
            formState[info] = e
        }
        const panelChange = (e: any, info: string) => {
            formState[info] = e
        }
        const uploadChange = (e: any) => {
            console.log(e, "uploadChange")
            // e.fileList.forEach((item: any) => {
            // })
        }
        const switchChange = (e: any, info: string) => {
            formState[info] = e
            console.log(e, "switchChange")
        }
        const checkboxChange = (e: any, info: string) => {
            formState[info] = e
            console.log(e, "checkboxChange")
        }
        const filterTreeOption = (input: string, treeNode: StrObj) => {
            if (treeNode.value.includes(input)) return treeNode.value.includes(input)
            if (treeNode.title.includes(input)) return treeNode.title.includes(input)
        }
        const filterSelectOption = (input: string, option: any) => {
            return String(option.label).toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        const confirm = () => {
            nextTick(async () => {
                console.log(dataInfo[`${props.id}`].validateFields())
                await dataInfo[`${props.id}`]
                    .validate()
                    .then(() => {
                        console.log("success")
                        emit("confirm", formState)
                    })
                    .catch(() => {
                        console.log("error")
                    })
            })
        }
        const clickInputIcon = (e: any, type: string) => {
            emit("clickInputIcon", e, type)
        }
        const treeSelectItem = (title: string, i: string, fragment: string) => {
            if (typeof formState.searchValue == "string" && formState.searchValue !== "") {
                if (title.toLowerCase() == formState.searchValue.toLowerCase()) {
                    return <span style="color: aqua">{title}</span>
                } else {
                    return <div v-html={colorItem(title, formState.searchValue)}></div>
                }
            } else {
                return <span>{title}</span>
            }
        }
        const colorItem = (item: string, value: string) => {
            let reg = new RegExp(`${value}`, "gi")
            return item.replace(reg, `<span style="color:aqua">${value}</span>`)
        }
        const formElement = (item: FormOptions) => {
            if (item.type == "input") {
                return (
                    <Input
                        onChange={(e) => changeInput(e, item.field)}
                        placeholder={item.placeholder}
                        value={formState[item.field]}
                        v-slots={{
                            prefix: () => {
                                let PrefixIconItem = item.prefixIcon as any
                                let dom: JSX.Element[] | JSX.Element | Element | "" = item.prefix ? <PrefixIconItem onClick={(e: Event) => clickInputIcon(e, "prefix")} /> : ""
                                return dom
                            },
                            suffix: () => {
                                let SuffixIconItem = item.suffixIcon as any
                                let dom: JSX.Element[] | JSX.Element | "" = item.suffix ? <SuffixIconItem onClick={(e: Event) => clickInputIcon(e, "suffix")} /> : ""
                                return dom
                            },
                        }}
                    ></Input>
                )
            }
            if (item.type == "textarea") {
                return <Textarea onChange={(e) => changeInput(e, item.field)} placeholder={item.placeholder} value={formState[item.field]}></Textarea>
            }
            if (item.type == "select") {
                return (
                    <Select
                        value={formState[item.field]}
                        filterOption={(input: string, option: any) => {
                            return item.filterSelectOption ? item.filterSelectOption(input, option) : filterSelectOption(input, option)
                        }}
                        mode={item.mode as "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE" | undefined}
                        style="width: 100%"
                        placeholder={item.placeholder}
                        show-search={item.showSelectSearch}
                        options={item.options}
                        onChange={(e) => selectChange(e, item.field)}
                    ></Select>
                )
            }
            if (item.type == "radioGroup") {
                return <RadioGroup value={formState[item.field]} options={item.options} onChange={(e) => radioChange(e, item.field)}></RadioGroup>
            }
            if (item.type == "treeSelect") {
                return (
                    <TreeSelect
                        onChange={(e: string) => changeTreeSelect(e, item.field)}
                        onSearch={(e: string) => searchChange(e, item.searchValue || "")}
                        value={formState[item.field]}
                        searchValue={formState[item.searchValue || ""]}
                        show-search
                        tree-default-expand-all
                        style="width: 100%"
                        tree-data={item.treeData}
                        tree-checkable={item.treeCheckble}
                        allow-clear
                        show-checked-strategy={item.SHOW_PARENT}
                        placeholder={item.placeholder}
                        filterTreeNode={item.filterTreeOption ? item.filterTreeOption : filterTreeOption}
                        v-slots={{
                            title: (info: { value: string; title: string }) => {
                                let dom: JSX.Element[] | JSX.Element = []
                                info.title
                                    .toString()
                                    .split(new RegExp(`(?<=${formState[item.searchValue || ""]})|(?=${formState[item.searchValue || ""]})`, "i"))
                                    .forEach((fragment: string, i: number) => {
                                        dom = treeSelectItem(info.title, String(i), fragment)
                                    })
                                return dom
                            },
                        }}
                    ></TreeSelect>
                )
            }
            if (item.type == "datePicker") {
                return <DatePicker placeholder={item.placeholder} picker={item.picker} value={formState[item.field]} onChange={(e) => panelChange(e, item.field)}></DatePicker>
            }
            if (item.type == "rangePicker") {
                return <RangePicker picker={item.picker} value={formState[item.field]} onChange={(e) => panelChange(e, item.field)}></RangePicker>
            }
            if (item.type == "upload") {
                return (
                    <Upload file-list={formState[item.field]} name={item.fileName} multiple={item.multiple} max-count={item.maxCount} list-type={item.listType} action={item.url as string} onChange={uploadChange} customRequest={item.customRequest}>
                        <Button>
                            <UploadOutlined></UploadOutlined>上传
                        </Button>
                    </Upload>
                )
            }
            if (item.type == "switch") {
                return (
                    <Switch
                        checked={formState[item.field]}
                        disabled={item.switchDisabled}
                        size={item.switchSize}
                        onChange={(e) => switchChange(e, item.field)}
                        v-slots={{
                            checkedChildren: (info: { value: string; title: string }) => {
                                let SwitchCheckedChildren = item.switchCheckedChildren as any
                                let dom: JSX.Element[] | JSX.Element | Element | "" = typeof SwitchCheckedChildren == "function" ? <SwitchCheckedChildren /> : <span>{item.switchCheckedChildren}</span>
                                return dom
                            },
                            unCheckedChildren: (info: { value: string; title: string }) => {
                                let SwitchUnCheckedChildren = item.switchUnCheckedChildren as any
                                let dom: JSX.Element[] | JSX.Element | Element | "" = typeof SwitchUnCheckedChildren == "function" ? <SwitchUnCheckedChildren /> : <span>{item.switchUnCheckedChildren}</span>
                                return dom
                            },
                        }}
                    ></Switch>
                )
            }
            if (item.type == "checkboxGroup") {
                return <CheckboxGroup onChange={(e) => checkboxChange(e, item.field)} value={formState[item.field]} options={item.options} />
            }
        }
        const formItemFun = () => {
            let renderDom: JSX.Element[] = []
            option.forEach((item) => {
                renderDom.push(
                    <FormItem required={item.rule ? item.rule[0].required : false} name={item.field} label={item.label}>
                        {formElement(item)}
                    </FormItem>
                )
            })
            return (
                <Form ref={(e) => refFun(e)} label-col={{ span: 4 }} wrapper-col={{ span: 14 }} name={`custom-validation${props.id ? "-" + props.id : ""}`} model={formState} rules={rules} layout={props.formLayout as Layout}>
                    {renderDom}
                    <div style={"width:100%;display:flex;justify-content: flex-end;"}>
                        <FormItem>
                            <Button style={"margin-right:20px;"} type="primary" onClick={confirm}>
                                确认
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button type="default" onClick={confirm}>
                                取消
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            )
        }
        return () => formItemFun()
    },
})
export default FormCom
