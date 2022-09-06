import { defineComponent, render, renderSlot, PropType, reactive, defineExpose } from "vue"
const ComT = defineComponent({
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit, slots, expose }) {
        console.log(props.value, "ComT")
        let dataInfo = reactive({
            title: "123",
        })
        expose({
            dataInfo,
        })

        return () => <div>123------{dataInfo.title}</div>
    },
})
export default ComT
