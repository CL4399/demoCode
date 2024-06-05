//引入全局组件
import antSuperset from '../../commonComponents/commonComponents';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
const PopUp = () => {
  const [state, setState] = useState({
    id: '',
  });
  useEffect(() => {
    setTimeout(() => {
      state.id = '111';
      setState({ ...state });
    }, 3000);
  }, []);
  const SHTML = ()=>(
    <div style={{ width: '100%', height: '100%', overflow: 'hidden',position:'relative' }}>
      <CloseOutlined style={{
        position:'absolute',
        right:'20px',
        top:'20px',
        zIndex:'10',
        color:'#fff',
        cursor:'pointer',
      }} onClick={()=>{
        antSuperset.PopUp.PopUpDelete('PopUp');
      }} />
      <img src={'../images/ss1.jpg'} style={{
        width:'100%',
        height:'auto',
        position:'relative',
        zIndex:'1',
      }} />
      <p style={{
        textAlign:'center',
        paddingTop:'5px',
        fontSize:'18px',
      }} >{'Let\'s'} learn about the web</p>
      <p style={{
        textAlign:'center',
        paddingTop:'5px',
        fontSize:'18px',
      }} >Join the waitlist to find out when the podcast launches and new videos.</p>
      <div style={{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      }} >
        <Button style={{
          marginTop:'20px',
          marginLeft:'80%',
        }} type={'primary'}  danger onClick={()=>{
          antSuperset.PopUp.PopUpDelete('PopUp');
        }} >close</Button>
        <Button style={{
          marginTop:'20px',
          marginLeft:'10px',
        }} id={'props_drag'} type={'primary'}>drag</Button>
      </div>
    </div>
  )
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Button onClick={() => {
        //启动弹窗
        antSuperset.PopUp.PopUp({
          //赋予唯一ID
          id: 'PopUp',
          //动画时长
          animatioNTime:1,
          //开始动画 @keyframes 名
          animatioStartClass:'Ok',
          //结束动画 @keyframes 名
          animatioendClass:'NO',
          //弹窗标题
          title: '测试窗口123456789123465789',
          width: '800px',
          height: '600px',
          drag:'props_drag',
          ReactHteml: () => {
            return (
             <>{SHTML()}</>
            );
          },
          BottomHtml: () => (<></>),
          TopHtml: () => (<></>),
          //挂载指定节点
          //  nestId: 'zuijia',
          //是否有遮罩
          grayBack: false,
        });

      }}>拟态弹出去掉头部底部自定义拖拽按钮关闭按钮 和全部样式</Button>
      <Button onClick={()=>{
        antSuperset.PopUp.PopUp({
          id: 'PopUp1s',
          title: '测试窗口2',
          ReactHteml: () => {
            return <>

            </>;
          },
        });
      }} >普通弹窗</Button>
      <Button onClick={() => {
        antSuperset.PopUp.PopUp({
          id: 'PopUp1',
          title: '测试窗口2',
          nestId: 'zuijia',
          ReactHteml: () => {
            return <>

            </>;
          },
        });
        antSuperset.PopUp.PopUp({
          id: 'PopUp13',
          title: '测试窗口25',
          nestId: 'zuijia',
        });
        antSuperset.PopUp.PopUp({
          id: 'PopUp14',
          title: '测试窗口24',
          nestId: 'zuijia',
        });
        antSuperset.PopUp.PopUp({
          id: 'PopUp15',
          title: '测试窗口23',
          nestId: 'zuijia',
        });
      }}>2</Button>
      <Button onClick={() => {
        antSuperset.PopUp.PopUpDelete('PopUp');
      }}>关闭</Button>
      <div style={{
        width: '80%',
        height: '70%',
        marginLeft: '10%',
        marginTop: '10%',
        background: '#000',
        position: 'relative',
      }} id={'zuijia'}>
        <Button>弹窗嵌入到当前div中</Button>
      </div>
      <div style={{ height: '1500%' }}>

      </div>
    </div>
  );

};

export default PopUp;