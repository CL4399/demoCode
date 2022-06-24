import React from 'react';
import './Button.css';
// import Loading from './Loading';
import { StrObj } from './ButtonTyps';
import { colorType, typeObj, sizeObj, shapeObj } from './ButtonStyles';
function ButtonCom(props: {
    text: any;
    color?: string;
    size: string;
    type: string;
    shape: string;
    disabled: Boolean;
    loading: Boolean;
    danger: Boolean;
    ghost: Boolean;
    loadingColor?: string;
    // 用来代替默认click
    onClick: any;
    children: any;
}) {
    const handleClick = (e: any) => {
        if (props.loading || props.disabled) {
            e.preventDefault();
            return;
        }
    };
    const typeFun: () => string = (): string => {
        return props.disabled
            ? 'disabled'
            : props.danger
            ? 'danger'
            : props.ghost
            ? 'ghost'
            : props.type;
    };
    const classFun: () => string = (): string => {
        if (props.disabled) return 'button-disabled';
        if (props.loading) return 'button-loading';
        if (props.danger) return 'button-danger';
        if (props.ghost) return 'button-ghost';
        return '';
    };
    let style: StrObj = {
        backgroundColor: props.color as string,
        boxShadow: `1px 1px 5px ${props.color}`,
        alignItems: 'center',
        textAlign: 'center' as 'center',
        margin: '10px',
        color: `${colorType[typeFun()]}`,
    };
    style = Object.assign(style, sizeObj[props.size]);

    return (
        <button
            className={`button-com ${classFun()} ${shapeObj[props.shape]} ${typeObj[props.type]}`}
            style={style}
            onClick={handleClick}
        >
            <span style={{ paddingRight: '8px' }}>{props.text}</span>
            {props.children}
        </button>
    );
}
export default ButtonCom;
