import { defineComponent, onMounted } from "vue"
const ButtonCom = defineComponent({
    setup(props, { emit, slots }) {
        onMounted(() => {
            document?.getElementById("dmoe")?.addEventListener("dblclick", function () {
                console.log("目标元素被点击了")
            })
        })
        return () => (
            <div
                id="dmoe"
                class="button-content"
                onDblclick={() => {
                    console.log(123)
                }}
                onTouchend={() => {
                    console.log("onTouchend")
                }}
            >
                123123
            </div>
        )
    },
})
export default ButtonCom
