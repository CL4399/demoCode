//配置文件数据类型
import { ReactElement } from 'react';

type  COLUMNS = {
  columns: COLUMNSE
}

type COLUMNSE = ({
  //姓名
  title: string,
  //列数据在数据项中对应的路径
  dataIndex: string,
  //每条数据的key值
  key: string,
  //对齐方式 left right center 默认居中 center
  align?: 'left' | 'right' | 'center',
  //样式列名
  className?: string,
  //是否启用单列文字提示,默认为true,如果PROPS.tooltipShow为false则此代码无效
  tooltip?: boolean,
  //用于重写 页面展示数据 的方法 一般返回jsx
  render?: (_r: DATASOURCE | string, s: SOURCE, i: number) => ReactElement
  //当前行的某一条数据是否支持修改
  SupportModification?:boolean
  //是否显示当前列数据 默认显示
  showArrange?:boolean
})[]
//展示数据数据类型
type  DATASOURCE = {
  dataSource: (SOURCE)[]
}
type SOURCE = {
  [props: string]: string | number | boolean
}
//是否开启和是否是单选框:one是单选 many是多选
type selectionBox = 'one' | 'many'

type buttonConfig = [button, button, button] | []//数组对象格式 或 传入 空数组不展示数据
type buttonCustom = (buttons)[] //自定义按钮 所有参数为必传参数 传入空数组不展示数据
type buttons = {
  show?: boolean, //是否展示 true为展示
  text: string,//text展示名  默认值为  修改 删除 查看    可不传为默认展示文字
  color: string, //文字颜色
  background: string,//背景颜色
  Warning: boolean,//是否需要警示 如果需要警示则进行二次弹窗确认
  title: string,//默认警示内容
  yesButton: string,//默认警示内容 默认‘是’  可修改任意值
  noButton: string,//默认警示内容 默认‘否’  可修改任意值
  modifyRow?: boolean,//是否可对行进行修改
}
type button = {
  show: boolean, //是否展示 true为展示
  text?: string,//text展示名  默认值为  修改 删除 查看    可不传为默认展示文字
  color?: string, //文字颜色
  background?: string,//背景颜色
  Warning?: boolean,//是否需要警示 如果需要警示则进行二次弹窗确认
  title?: string,//默认警示内容
  yesButton?: string,//默认警示内容 默认‘是’  可修改任意值
  noButton?: string,//默认警示内容 默认‘否’  可修改任意值
  modifyRows?: boolean,//是否直接修改行数据
}
type STATEKEY ={
  selectedRowKeys:(string)[]
}

//props类型
type PROPS = {
  //必传，参考 type DATASOURCE
  data: (SOURCE)[],
  //必传，参考 type Columns
  dataType: COLUMNSE,
  //是否开启和是否是单选框:one是单选 many是多选
  selectionBox?: selectionBox,
  //是否显示文字提示,如果为true则显示文字提示,默认为true
  tooltipShow?: boolean,
  //必传，是否显示增删改查 四个按钮 详情看 type buttonConfig
  buttonConfig: buttonConfig,
  //按钮的点击事件 返回一个Promise异步验证
  buttonClick?: (res: { s: SOURCE, i: number, text: string }) => Promise<boolean>,
  //自定义拓展按钮
  buttonCustom?: buttonCustom,
  //单选多选 默认不启用
  typeSelection?: 'checkbox' | 'radio',
  // 分页点击事件下一页上一页 和跳页
  pagingClick?: (res: { current: number, pageSize: number, total: number, }) => Promise<boolean>,
  //当前页
  current?: number,
  //每页几个
  pageSize?: number,
  //共多少条数据
  total?: number,
  //是否需要重写Rewrite
  Rewrite?:(res:COLUMNSE)=>void,
  //更新行数据
  renew?:(s: SOURCE,i:number)=> Promise<boolean>,
  //每条数据的标识符为了启用多选和单选
  valueID:string
  //点击某一条的数据
  //text当前点击的数据
  //obj 当前行数据
  //i+1 第几行
  //key 当前列对应的key
  onValue?:(text:string,key:string,obj:OBJ,i:number|string)=>void
}
type OBJ =({[props:string]:string|boolean|number}|({[props:string]:string|boolean|number})[])[]
//各个按钮的加载动画
type STRAIN = {
  strain: ({
    [props: string]: boolean
  })[]

}

export type {
  OBJ,
  STATEKEY,
  buttonConfig,
  COLUMNSE,
  SOURCE,
  STRAIN,
  COLUMNS,
  DATASOURCE,
  PROPS,
};
