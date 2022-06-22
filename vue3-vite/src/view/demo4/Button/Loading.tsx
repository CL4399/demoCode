import { defineComponent, render, renderSlot } from "vue"
import "./Loading.css"
const ButtonCom = defineComponent({
    setup(props, { emit, slots }) {
        return () => (
            <div class="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    },
})
export default ButtonCom
