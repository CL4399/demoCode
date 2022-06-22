import { Size, StrObj, } from "./ButtonTyps"
export const colorType: StrObj = {
    link: "#1890ff",
    default: "#fff",
    disabled: "rgba(0, 0, 0, 0.25)",
    text: "#000",
    danger: "red",
    ghost: "#fff",
    dashed: "#000",
}
export const typeObj: StrObj = {
    link: "button-link",
    text: "button-link",
    dashed: "button-dashed",
}

export const sizeObj: Size = {
    large: { height: "40px", padding: "6.4px 15px", fontSize: "16px", borderRadius: "2px" },
    middle: { height: "32px", padding: "3.2px 10px", fontSize: "15px", borderRadius: "2px" },
    small: { height: "24px", padding: "0 7px", fontSize: "14px", borderRadius: "2px" },
}
export const shapeObj: StrObj = {
    round: "button-round",
    circle: "button-circle",
}