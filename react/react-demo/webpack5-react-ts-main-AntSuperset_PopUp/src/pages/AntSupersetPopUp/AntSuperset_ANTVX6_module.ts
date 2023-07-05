import { ReactNode } from 'react';

interface POPUPPROPS {
  //唯一标识符ID
  id: string;
  //弹窗名字
  title:string;
  //是否有灰背景 默认和false为无  true为有
  grayBack?:boolean
  //点击灰背景是否会隐藏 默认和false为会  true不隐藏
  grayBackClick?:boolean
  //嵌套ID  吧当前窗口嵌套至对应的ID标签下 当前ID的style属性必须为  position: relative; 否则无效
  nestId?:string
  //高度 px 或 %
  width?:string
  //高度 px 或 %
  height?:string
  //回传jsx
  ReactHteml?:()=>ReactNode
  //自定义确认按钮名字
  OkText?:string
  //自定义取消按钮名字
  NoText?:string
  //点击确认按钮回调
  onOk?:()=>void
  //点击取消按钮回调
  onNo?:()=>void
  //是否需要自定义底部按钮
  BottomHtml?:()=>boolean|ReactNode
  //是否取消头部按钮
  TopHtml?:()=>boolean|ReactNode
  //可以自定义拖拽标签 传入ID 此时默认头部拖拽将失效
  drag?:string
  //自定义动画时间
  animatioNTime?:number
  //自定义开始动画
  animatioStartClass?:string
  //自定义结束动画
  animatioEndClass?:string
  //初始坐标距离右侧
  top?:string,
  //初始坐标距离左侧
  left?:string,
}

interface STATE {
  width: string;
  height: string;
  top: string;
  left: string;
  transition:string;
  transform:string;
}

export type {
  POPUPPROPS,
  STATE,
};