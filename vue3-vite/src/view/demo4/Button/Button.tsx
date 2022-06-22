import { defineComponent, render, renderSlot, PropType } from "vue"
import "./Button.css"
import Loading from "./Loading"
import { Size, StrObj } from "./ButtonTyps"
import { colorType, typeObj, sizeObj, shapeObj } from "./ButtonStyles"
const ButtonCom = defineComponent({
    components: { Loading },
    props: {
        color: {
            type: String,
            default: "#1890ff",
        },
        size: {
            type: String, // small | middle | large
            default: "middle",
        },
        type: {
            type: String,
            default: "default",
        },
        shape: {
            type: String, // circle | round
            default: "default",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        danger: {
            type: Boolean,
            default: false,
        },
        ghost: {
            type: Boolean,
            default: false,
        },
        loadingColor: String,
        // 用来代替默认click
        onClick: {
            type: MouseEvent,
            default: null,
        },
    },
    setup(props, { emit, slots }) {
        const handleClick = (e: any) => {
            if (props.loading || props.disabled) {
                e.preventDefault()
                return
            }
            emit("click", e)
        }
        const typeFun: () => string = (): string => {
            return props.disabled ? "disabled" : props.danger ? "danger" : props.ghost ? "ghost" : props.type
        }
        const classFun: () => string = (): string => {
            if (props.disabled) return "button-disabled"
            if (props.loading) return "button-loading"
            if (props.danger) return "button-danger"
            if (props.ghost) return "button-ghost"
            return ""
        }
        let style: StrObj = {
            "background-color": props.color,
            "box-shadow": `1px 1px 5px ${props.color}`,
            alignItems: "center",
            textAlign: "center" as "center",
            margin: "10px",
            color: `${colorType[typeFun()]}`,
        }
        style = Object.assign(style, sizeObj[props.size])
        return () => (
            <button class={["button-com", classFun(), shapeObj[props.shape], typeObj[props.type]]} style={[style]} onClick={handleClick}>
                <div class="button-content">
                    <Loading v-show={props.loading} style={[{ position: "absolute", color: props.loadingColor }]} />
                    {!props.loading ? (slots.iconLeft ? slots.iconLeft() : "") : ""}
                    <div class="button-text">{slots.default ? slots.default() : "button"}</div>
                    {!props.loading ? (slots.iconRight ? slots.iconRight() : "") : ""}
                </div>
            </button>
        )
    },
})
export default ButtonCom
