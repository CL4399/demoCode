import { defineComponent, render, renderSlot, PropType, ref, onMounted } from "vue"
import ComT from "./comT"
const ButtonCom = defineComponent({
    components: { ComT },
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit, slots }) {
        let comTRef = ref()
        onMounted(() => {
            comTRef.value.dataInfo.title = "asd"
            console.log(comTRef.value, "??????")
        })
        return () => (
            <div>
                <ComT ref={comTRef} value={"123asd"}></ComT>
            </div>
        )
    },
})
export default ButtonCom
