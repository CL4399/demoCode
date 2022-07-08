import { defineComponent, render, renderSlot, PropType, ref, reactive } from "vue"
import { Form, FormItem, Input, Select, Radio, RadioGroup, Button, TreeSelect } from "ant-design-vue"
import type { Rule } from "ant-design-vue/es/form"
import type { ChangeEventExtra, DefaultOptionType } from "../../../node_modules/ant-design-vue/lib/vc-tree-select/TreeSelect"
import { RuleObject } from "ant-design-vue/lib/form"
type SelectTree = PropType<(value: any, labelList: any[], extra: import("../../../node_modules/ant-design-vue/lib/vc-tree-select/TreeSelect").ChangeEventExtra) => void>
interface FormOptions {
    field: string
    label: string
    placeholder?: string
    type: string
    rule?: RuleObject[]
    mode?: "multiple" | "tags" | "combobox" | undefined
    options?: { label: string; value: string | number; disabled?: boolean }[]
    treeData: any[]
    SHOW_PARENT: string
    filterTreeOption: boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean) | undefined
    searchValue: string
}
interface StrObj {
    [key: string]: any
}
const FormCom = defineComponent({
    components: { Form, FormItem, Input, Radio, RadioGroup, TreeSelect },
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
    },
    setup(props, { emit, slots }) {
        let formState: StrObj = reactive({})
        const option: FormOptions[] = props.options as FormOptions[]
        const rules: Record<string, Rule[]> = props.rules as Record<string, Rule[]>
        const changeInput = (e: any, info: string) => {
            formState[info] = e.target.value
            console.log(formState, "formState")
        }
        const selectChange = (e: any, info: string) => {
            formState[info] = e
            console.log(e, formState, "selectChange")
        }
        const radioChange = (e: any, info: string) => {
            formState[info] = e.target.value
            console.log(e.target.value, "radioChange")
        }
        const changeTreeSelect = (e: any, info: string) => {
            console.log(e, "form", formState)
            formState[info] = e
        }
        const searchChange = (e: any, info: string) => {
            console.log(e, "form", info)
            formState[info] = e
        }

        const comfirm = () => {
            console.log(formState, "comfirm")
        }
        const treeSelectItem = (title: string, i: string, fragment: string) => {
            if (typeof formState.searchValue == "string" && formState.searchValue !== "") {
                if (title.toLowerCase() == formState.searchValue.toLowerCase()) {
                    return <span style="color: aqua">{title}</span>
                } else {
                    return <div v-html={test(title, formState.searchValue)}></div>
                }
            } else {
                return <span>{title}</span>
            }
        }
        const test = (item: string, value: string) => {
            let reg = new RegExp(`${value}`, "gi")
            return item.replace(reg, `<span style="color:aqua">${value}</span>`)
        }


        const formElement = (item: FormOptions) => {
            if (item.type == "input") {
                return <Input onChange={(e) => changeInput(e, item.field)} placeholder={item.placeholder} value={formState[item.field]}></Input>
            }
            if (item.type == "select") {
                return <Select value={formState[item.field]} mode={item.mode as "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE" | undefined} style="width: 100%" placeholder={item.placeholder} options={item.options} onChange={(e) => selectChange(e, item.field)}></Select>
            }
            if (item.type == "radioGroup") {
                return <RadioGroup value={formState[item.field]} options={item.options} onChange={(e) => radioChange(e, item.field)}></RadioGroup>
            }
            if (item.type == "treeSelect") {
                return (
                    <TreeSelect
                        onChange={(e: any) => changeTreeSelect(e, item.field)}
                        onSearch={(e: any) => searchChange(e, item.searchValue)}
                        value={formState[item.field]}
                        searchValue={formState[item.searchValue]}
                        show-search
                        tree-default-expand-all
                        style="width: 100%"
                        tree-data={item.treeData}
                        tree-checkable
                        allow-clear
                        show-checked-strategy={item.SHOW_PARENT}
                        placeholder={item.placeholder}
                        filterTreeNode={item.filterTreeOption}
                        v-slots={{
                            title: (info: { value: string; title: string }) => {
                                let dom: JSX.Element[] | JSX.Element = []
                                info.title
                                    .toString()
                                    .split(new RegExp(`(?<=${formState[item.searchValue]})|(?=${formState[item.searchValue]})`, "i"))
                                    .forEach((fragment: any, i: any) => {
                                        dom = treeSelectItem(info.title, i, fragment)
                                    })
                                return dom
                            },
                        }}
                    ></TreeSelect>
                )
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
                <Form ref={"formRef" + props.id} name={`custom-validation${props.id ? "-" + props.id : ""}`} model={formState} rules={rules}>
                    {renderDom}
                    <FormItem>
                        <Button onClick={comfirm}>确认</Button>
                    </FormItem>
                </Form>
            )
        }
        return () => formItemFun()
    },
})
export default FormCom
