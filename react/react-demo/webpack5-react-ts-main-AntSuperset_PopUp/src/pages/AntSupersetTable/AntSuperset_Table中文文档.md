> #### 作者：李恩伟 <lew3025961302@gmail.com>
---
> #### 根据antd4.21.5版本对Table二次封装
---
> 1.引入方式 请移步commonComponents中文文档.md
---

```typescript jsx
  <antSuperset.Table
  //后端返回的数据
  data={data}
  //配置文件数据
  dataType={dataType}
  //传入默认 删除 修改 查看 按钮文件
  buttonConfig={buttonConfig}
  //此方法为buttonClick或buttonCustom点击回传事件 请务必使用Promise
  buttonClick={buttonClick}
  //是否启用单选和多选  默认无单选多选按钮
  typeSelection={typeSelection}
  //是否启用文字提示
  tooltipShow={tooltipShow}
  //当前第几页
  current={current}
  //每页几条
  pageSize={pageSize}
  //共多少条
  total={total}
  //点击 分页回传
  pagingClick={pagingClick}
  //重写配置文件 针对 table内容重写
  Rewrite={Rewrite}
  //更新行数据
  renew={renew}
  /*
  * 数组唯一ID标识符 数组里每天数据都有自己的唯一标识符 比如ID 作为单选多选指定参数 
  * 填入对应的key  自动找value定位 如果启用单选或多选此条为必填项
  * */
  valueId={valueId}
  //点击某一条的数据
  onValue={onValue}
/>
```

---

```javascript
     //   onValue 点击某一条数据获取点击的值 获取对应key获
     //text当前点击的数据
     //key 当前列对应的key
     //obj 当前行数据
     //i+1 第几行
/* 示例：*/
const onValue = (text, key, obj, i) => {

}
```

---

```javascript
     //   data 传入静态 或动态数据 一般为数组对象
/* 示例：*/
const data = data = [
  {
    key: '1',
    name: '李恩伟1',
    age: 32,
    address: '西湖区湖底公园1号',
    ad: '你好',
  }, /*...无限多对象*/]
```

---

```javascript
            //dataType 传入配置文件 为帮助data组织显示到页面上 数组对象格式
/*示例：*/
const dataType = [
  {
    //title头显示的中文名
    title: '姓名',
    //data数组对应的 key 
    dataIndex: 'name',
    //data数组对应的 key
    key: 'name',
    //是否启用单列文字提示,默认为true,如果PROPS.tooltipShow为false则此代码无效 可加可不加
    tooltip: boolean,
    //当前行的某一条数据是否支持点击按钮可切换为修改框修改  true为支持 不传或默认为不支持
    SupportModification: boolean
  }, /*...无限多对象*/
]  
```

---

```javascript
          //  buttonConfig 传入默认 删除 修改 查看 按钮文件
/*示例：*/
const buttonConfig = [
  {
    show: false, //是否显示删除按钮 true或false 默认显示
    text: '删除', //可重命名删除按钮 默认删除
    color: '#fff', //可修改按钮文字颜色 默认#fff
    background: #ff4d4f, //可修改按钮背景颜色  默认'#ff4d4f'
    Warning: true, //点击按钮时是否需要弹窗警告二次确认当前操作 默认只有删除有警告
    title: '是否要删除该项', //弹窗警告的提示内容 默认为当现实内容
    yesButton: '是',  //弹窗警告 为确认的按钮名 默认为是
    noButton: '否', //弹窗警告为取消的按钮名  默认为否
    modifyRows: true,//是否直接给当前行切换为输入框可修改数据 默认为不可修改 不可跟自定义dataTyple一起使用
  },
  {
    show: false, //是否显示删除按钮 true或false 默认显示
    text: '修改', //可重命名删除按钮 默认删除
    color: '#fff', //可修改按钮文字颜色 默认#fff
    background: #ff4d4f, //可修改按钮背景颜色  默认'#ff4d4f'
    Warning: true, //点击按钮时是否需要弹窗警告二次确认当前操作 默认只有删除有警告
    title: '是否要删除该项', //弹窗警告的提示内容 默认为当现实内容
    yesButton: '是',  //弹窗警告 为确认的按钮名 默认为是
    noButton: '否', //弹窗警告为取消的按钮名  默认为否
    modifyRows: true,//是否直接给当前行切换为输入框可修改数据 默认为不可修改 
  },
  {
    show: false, //是否显示删除按钮 true或false 默认显示
    text: '查看', //可重命名删除按钮 默认删除
    color: '#fff',  //可修改按钮文字颜色 默认#fff
    background: #ff4d4f, //可修改按钮背景颜色  默认'#ff4d4f'
    Warning: true, //点击按钮时是否需要弹窗警告二次确认当前操作 默认只有删除有警告
    title: '是否要删除该项', //弹窗警告的提示内容 默认为当现实内容
    yesButton: '是', // 弹窗警告 为确认的按钮名 默认为是
    noButton: '否', //弹窗警告为取消的按钮名  默认为否
    modifyRows: true,//是否直接给当前行切换为输入框可修改数据 默认为不可修改 不可跟自定义dataTyple一起使用
  },
];
//可简写为以下代码 
const buttonConfig = [{//默认按钮重写 或展示隐藏
  show: true,
}, {
  show: true,
}, {
  show: true,
}];

```

---

```javascript
      //buttonConfig 此方法为buttonClick或buttonCustom点击回传事件 请务必使用Promise
/*示例：*/
const buttonClick = (res) => new Promise(resolve => { //点击按钮事件 为Promise格式监听数据返回 成功或失败执行代码
  const res = {  //按钮返回数据为对象 详情如下
    i: '第几行数据',
    s: '当前行数据',
    text: '按钮名'
  }
  setTimeout(() => { //模拟线上请求请求成功失败 3秒后返回结果

    resolve(false); //请求成功请返回true 失败请返回false
  }, 3000);
});
```

---

```javascript
    //typeSelection是否启用单选和多选  默认无单选多选按钮
const typeSelection = 'checkbox' // 单选： 'radio'  多选：'checkbox'

```

---

```javascript
    //tooltipShow是否启用鼠标移入小窗显示文字功能  默认为显示
const tooltipShow = true // 单选： true  多选：false
```

---

```javascript
    //current当前第几页
const current = true //当前第几页 传number类型
```

---

```javascript
    //pageSize每页几条
const pageSize = true //每页几条 传number类型
```

---

```javascript
    //total共多少条
const total = true //共多少条 传number类型
```

---

```javascript
    //pagingClick下一页上一页和跳页事件
const pagingClick = (res) => new Promise(resolve => {//下一页上一页和跳页事件 为Promise格式监听数据返回 成功或失败执行代码
  const res = {  //按钮返回数据为对象 详情如下
    current: '要跳转到那页',
    pageSize: '每页几条数据 ',
    total: '共多少条数据'
  }
  setTimeout(() => { //模拟线上请求请求成功失败 3秒后返回结果

    resolve(false); //请求成功请返回true 失败请返回false
  }, 3000);
})
```

---

```javascript
    //Rewrite重写dataType配置文件
const Rewrite = (dataType) => {//重写 页面展示的数据
  dataType.forEach(item => { //循环配置文件
    item.render = (_r, s, i) => {
      //_r 无用
      //s 代表回传当前行的每条数据
      //i 第几行
      //return 返回一个jsx  并且自定义HTML样式不同操作等
      return (<>{s[item.dataIndex]}{i}</>);
    };
  });
}
```

---

```javascript
    //renew此方法需要配合  buttonClick或buttonCustom的modifyRows参数为true来使用
    // 注意: 当dataType不被重写时 modifyRows可以正常启动 renew方法可以正常返回数据否则无法使用
//此方法为 所有行切换为输入框可更新重置取消   重置和取消为默认方法  更新调用renew
const renew = (res, i) => new Promise(resolve => { // 为Promise格式监听数据返回 成功或失败执行代码
                                                   //res 当前行所有数据  i为第几行
                                                   //以下为墨迹更新 data数据的第i行数据
                                                   // state.data[i] = JSON.parse(JSON.stringify(res))
                                                   // setState({ ...state })
  setTimeout(() => {//模拟线上请求请求成功失败 3秒后返回结果
    // state.data = state.data.filter((_, i) => i !== 0); //删除数据
    // setState({ ...state });//更新数据
    resolve(true); //false 更新完毕 返回更新成功或失败
  }, 1000);
})
```


