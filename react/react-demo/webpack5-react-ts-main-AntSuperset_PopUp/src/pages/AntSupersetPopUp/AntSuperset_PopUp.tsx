import React, { useEffect, useState } from 'react';
import { POPUPPROPS, STATE } from './AntSuperset_ANTVX6_module';
import { LaptopOutlined, MinusOutlined, CloseOutlined, BorderOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactDom = require('react-dom');
const AntSuperset_PopUp = (props: POPUPPROPS) => {
  const [stateT, setStateT] = useState({
    disX: 0,
    disY: 0,
    oDrtop: '5%',
    oDrleft: '5%',
    style: {
      width: '',
      height: '',
      top: '',
      left: '',
    },
    amplify: false,
    show: false,
  });
  const [state, setState] = useState<STATE>({
    width: props.width ? props.width : '50%',
    height: props.height ? props.height : '65%',
    top: `${props.top? props.top:`calc(50% - ${props.height ? props.height : '60%'} / 2)`}`,
    left: `${props.left?props.left:`calc(50% - ${props.width ? props.width : '50%'} / 2)`}`,
    transition: '.2s',
    transform: '0',
  });

  useEffect(() => {
    Zindexon(`${props.id}`);
  }, []);
  const [Scale, setScale] = useState({
    show: false,
    width: '',
    height: '',
    left: '',
    top: '',
  });
  //头部菜单
  const ContentMenuHtml = () => (
    <div className={'AntSuperset_contentMenu'} style={{
      height: '56px',
      paddingTop: '0px',
      paddingBottom: '0px',
    }}>
      <div
        className={'AntSuperset_ContentMenu_Title'}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'move',
        }}
        id={`${props.id}_AntSuperset_ContentMenu_Title`}
        //onmouseout
        onMouseOut={() => {
          if (props.nestId) {
            restore();
          }
        }}
        onMouseDown={(e) => {
          if (!props.drag) {
            DreaId(e as unknown as MouseEvent);
          }
        }}>
        <div className={'AntSuperset_ContentMenu_IconDiv_Title'}
             style={{
               width: Scale.show ? '160px' : 'calc(100% - 100px)',
             }}>
            <span className={'AntSuperset_ContentMenu_IconDiv'}>
              <LaptopOutlined className={'AntSuperset_ContentMenu_Icon'} />
            </span>
          <span>{props.title}</span>
        </div>
      </div>
      <div className={'AntSuperset_ContentMenu_Html AntSuperset_PopUp_ContentMenu_Html'}>
        {/*最小化*/}
        <div className={'AntSuperset_PopUp_circular'} onClick={() => {
          if (props.grayBack) {
            message.warn('此组件无法最小化');
          } else {
            const oDrag: HTMLElement = document.getElementById(`${props.id}_PopUp`) as HTMLElement;
            Scale.show = !Scale.show;
            if (Scale.show) { //缩小
              Scale.width = state.width;
              Scale.height = state.height;
              Scale.left = state.left;
              Scale.top = state.top;
              state.width = '240px';
              state.height = '56px';
              oDrag.style.borderRadius = '0px';
            } else {//还原
              state.width = Scale.width;
              state.height = Scale.height;
              state.left = Scale.left;
              state.top = Scale.top;
              if (state.width === '100%' && state.height === '100%') {
                oDrag.style.borderRadius = '0px';
              } else {
                oDrag.style.borderRadius = '8px';
              }
            }
            setState({ ...state });
            setScale({ ...Scale });
            Zindexon(`${props.id}`);
          }
        }}><MinusOutlined className={'AntSuperset_PopUp_circular_Icon'} />
        </div>
        {/*放大缩小*/}
        <div className={'AntSuperset_PopUp_circular'} onClick={() => {
          const oDrag: HTMLElement = document.getElementById(`${props.id}_PopUp`) as HTMLElement;
          oDrag.style.borderRadius = stateT.amplify ? '8px' : '0px';
          if (Scale.show) {
            Scale.show = false;
            state.width = Scale.width;
            state.height = Scale.height;
            state.left = Scale.left;
            state.top = Scale.top;
            oDrag.style.borderRadius = '8px';
          } else {
            if (stateT.amplify) { //如果为true则是放大状态需要缩小
              stateT.amplify = !stateT.amplify;
              state.width = stateT.style.width;
              state.height = stateT.style.height;
              state.top = stateT.style.top;
              state.left = stateT.style.left;
              stateT.style.width = '';
              stateT.style.top = '';
              stateT.style.left = '';
              stateT.style.height = '';
            } else {//否则正常状态 需要放大
              stateT.amplify = !stateT.amplify;
              stateT.style.width = state.width;
              stateT.style.height = state.height;
              stateT.style.top = state.top;
              stateT.style.left = state.left;
              state.width = '100%';
              state.height = '100%';
              state.top = '0';
              state.left = '0';
            }
          }
          setStateT({ ...stateT });
          setState({ ...state });
          Zindexon(`${props.id}`);
        }}><BorderOutlined className={'AntSuperset_PopUp_circular_Icon'} />
        </div>
        {/*关闭*/}
        <div className={'AntSuperset_PopUp_circular'} onClick={() => {
          Zindexon(`${props.id}`);
          deletePopu();
        }}><CloseOutlined className={'AntSuperset_PopUp_circular_Icon'} /></div>
      </div>
    </div>

  );
  const deletePopu = () => {//删除
    try {
      const css = document.getElementById(`${props.id}_AntSuperset_PopUpHtml_css`) as HTMLElement;
      css.className += ' AntSuperset_PopUp_Dong_CSS';
      const IDS = document.getElementById(`${props.id}_PopUp`) as HTMLElement;
      IDS.className += ' AntSuperset_PopUp_Dong';
      IDS.style.animation = ` ${props.animatioEndClass ? props.animatioEndClass : 'AntSuperset_PopUp_Dongs'} ${props.animatioNTime ? props.animatioNTime : .5}s  forwards`;
      const timerPopUp = setTimeout(() => {
        state.transform = '0';
        setState({ ...state });
        clearTimeout(timerPopUp);
        document.getElementById(`${props.id}AntSuperset_PopUpHtml`)?.remove();
      }, props.animatioNTime ? (props.animatioNTime - props.animatioNTime / 4) * 1000 : 450);
    } catch (e) {
    }
  };
  //底部菜单
  const BottomMenu = () => (
    <div
      className={'AntSuperset_PopUp_BottomMenu'}>
      <Button type={'primary'} danger onClick={() => {
        deletePopu();
        if (props.onNo) {
          props.onNo();
        }
      }}>{props.NoText?props.NoText:'取消'}</Button>
      <Button type={'primary'} onClick={() => {
        if (props.onOk) {
          props.onOk();
        }
      }}>{props.OkText?props.OkText:'确定'}</Button>
    </div>
  );

  const contentHtml = () => (
    <div
      className={'AntSuperset_PopUp_contentHtml'}
      style={{
        width: '100%',
        height: `calc(100% - ${props.TopHtml ? '0px' : '56px'} - ${props.BottomHtml ? '0px' : '45px'})`,
      }}
    >
      {props.ReactHteml ? props.ReactHteml() : ''}
    </div>
  );

  const restore = () => {
    if (props.nestId && document.getElementById(`${props.nestId}`)) {
      const AntSuperset_PopUp = document.getElementById(`${props.nestId}`) as unknown as HTMLElement;
      AntSuperset_PopUp.onmousemove = null;
      AntSuperset_PopUp.onmouseup = null;
    }
  };
  useEffect(() => {
    try {
      const Div = document.getElementById(`${props.id}_PopUp`) as HTMLElement;
      const time = props.animatioNTime ? props.animatioNTime - props.animatioNTime / 4 : '';
      Div.style.animation = `${props.animatioStartClass ? props.animatioStartClass : 'AntSuperset_PopUp_Dongsd'} ${time ? time : .5}s  forwards`;
    } catch (e) {

    }
    const timerPopUp = setTimeout(() => {
      clearTimeout(timerPopUp);
      state.transform = '1';
      setState({ ...state });
    }, 10);
    if (props.drag) {
      try {
        const Drag = document.getElementById(props.drag) as HTMLElement;

        Drag.onmousedown = (e) => {
          DreaId(e);
        };
        Drag.onmouseout = () => {
          stateT.show = false;
          setStateT({ ...stateT });
        };
        //onMouseOut
        Drag.onmouseout = () => {
          if (props.nestId) {
            restore();
          }
        };
      } catch (e) {
      }
    }
  }, [props.id]);
  const DreaId = (e: MouseEvent) => {
    if (!stateT.show) {

      Zindexon(`${props.id}`);
      state.transition = '0s';
      setState({ ...state });
      stateT.show = true;
      setStateT({ ...stateT });
    }
    let AntSuperset_PopUp = document as unknown as HTMLElement;
    let AntSuperset_PopUpS = document.documentElement as unknown as HTMLElement;
    if (props.nestId) {
      AntSuperset_PopUp = document.getElementById(`${props.nestId}`) as unknown as HTMLElement;
      AntSuperset_PopUpS = document.getElementById(`${props.nestId}`) as unknown as HTMLElement;
    }
    if (stateT.show) {
      const event = e || window.event;
      const oDrag: HTMLElement = document.getElementById(`${props.id}_PopUp`) as HTMLElement;
      stateT.disX = event.clientX - oDrag.offsetLeft;
      stateT.disY = event.clientY - oDrag.offsetTop;
      AntSuperset_PopUp.onmousemove = (evn) => {
        const event = evn || window.event;
        let iL = event.clientX - stateT.disX;
        let iT = event.clientY - stateT.disY;
        const maxL = AntSuperset_PopUpS.clientWidth - oDrag.offsetWidth;
        const maxT = AntSuperset_PopUpS.clientHeight - oDrag.offsetHeight;
        iL <= 0 && (iL = 0);
        iT <= 0 && (iT = 0);
        iL >= maxL && (iL = maxL);
        iT >= maxT && (iT = maxT);
        oDrag.style.left = `${iL}px`;
        oDrag.style.top = `${iT}px`;
        return false;
      };

    }
    AntSuperset_PopUp.ondragstart = (ev) => {
      ev.preventDefault();
    };
    AntSuperset_PopUp.ondragend = (ev) => {
      ev.preventDefault();
    };
    AntSuperset_PopUp.onmouseup = () => {
      AntSuperset_PopUp.onmousemove = null;
      AntSuperset_PopUp.onmouseup = null;
      cancellation();
      restore();
    };
  };
  const cancellation = () => {
    const oDrag: HTMLElement = document.getElementById(`${props.id}_PopUp`) as HTMLElement;
    state.left = oDrag.style.left;
    state.top = oDrag.style.top;
    state.transition = '.2s';
    stateT.show = false;
    setState({ ...state });
    setStateT({ ...stateT });
  };
  return (
    <div
      className={'AntSuperset_PopUp AntSuperset_PopUpHtml_Zindex'}
      id={`${props.id}_PopUp`}
      //外层窗口
      style={{
        position: Scale.show ? 'static' : props.nestId ? 'absolute' : 'fixed',
        // transform: `scale(${state.transform})`,
        transition: Scale.show ? '0s' : state.transition,
        zIndex: '500',
        width: state.width,
        height: state.height,
        left: state.left,
        top: state.top,
      }}
      onMouseOut={() => {
        //   restore();
      }}
      onMouseUp={() => {
        //   restore();
        cancellation();
      }}
    >
      <div className={'AntSuperset_PopUp_Content'}>

        {/* 头部菜单按钮 onmousemove*/}
        {props.TopHtml ? props.TopHtml() : ContentMenuHtml()}
        {contentHtml()}
        {props.BottomHtml ? props.BottomHtml() : BottomMenu()}
      </div>
    </div>
  );
};

const Zindexon = (id: string) => {
  try {
    //初始化数据
    const div = document.getElementById(`${id}_PopUp`) as HTMLElement;
    const divOBJ: (number)[] = [];
    const HTML_OBJ = document.getElementsByClassName('AntSuperset_PopUpHtml_Zindex') as unknown as (HTMLElement)[];
    if (HTML_OBJ.length === 1) {
      div.style.zIndex = '100000';
    } else {
      [...HTML_OBJ].forEach(item => {
        divOBJ.push(parseInt(item.style.zIndex));
      });
      div.style.zIndex = `${Math.max(...divOBJ) + 2}`;
      const tim = setTimeout(() => {
        clearTimeout(tim);

      }, 100);
    }
  } catch (e) {

  }
};

const PopUp = (res: POPUPPROPS) => { //追加元素
                                     //判断是否有当前id的div如果有阻止弹窗
  if (document.getElementById(`${res.id}AntSuperset_PopUpHtml`)) {
    return message.warning(`已经打开(${res.title})窗口`);
  }
  //创建div
  const div = document.createElement('div') as HTMLElement;
  //赋予ID
  div.id = `${res.id}AntSuperset_PopUpHtml`;
  div.style.pointerEvents = 'auto';
  div.dataset.animatioNTime = res.animatioNTime ? `${res.animatioNTime}` : '';
  div.dataset.animatioStartClass = res.animatioStartClass ? res.animatioStartClass : '';
  div.dataset.animatioEndClass = res.animatioEndClass ? res.animatioEndClass : '';
  //如果需要插入body下 则调用document.body.appendChild 插入

  //判断如果已经添加了这个div则不需要添加
  if (!document.getElementById(`${res.nestId ? res.nestId : ''}AntSuperset_PopUpHtml_A`)) {
    //使用缩小方法 此方法 多层嵌套创建公共弹窗
    //创建div 此div的style为position: absolute;
    const div1 = document.createElement('div');
    div1.id = `${res.nestId ? res.nestId : ''}AntSuperset_PopUpHtml_A`;
    div1.style.zIndex = '100000';
    div1.className = `AntSuperset_PopUpHtml_A`;
    if (document.getElementById(`${res.nestId}`)) {
      const nestId = document.getElementById(`${res.nestId}`) as HTMLElement;
      nestId.appendChild(div1);
    } else {
      document.body.appendChild(div1);
      0;
    }
  }

  //创建第二个div 此div的style为position: relative; 为了接收 AntSuperset_PopUp缩小后的放置
  if (!document.getElementById(`${res.nestId ? res.nestId : ''}AntSuperset_PopUpHtml_R`)) {
    //获取到第一个div
    const div1 = document.getElementById(`${res.nestId ? res.nestId : ''}AntSuperset_PopUpHtml_A`) as HTMLElement;
    //生成第二个div
    const div2 = document.createElement('div');
    div2.id = `${res.nestId ? res.nestId : ''}AntSuperset_PopUpHtml_R`;
    div2.style.position = 'absolute';
    div2.style.height = '56px';
    div2.style.width = '100%';
    div2.style.height = '100%';
    //div2.style.height='56px';
    div2.style.display = 'flex';
    div2.style.pointerEvents = 'none';
    //pointer-events: none;
    div2.style.bottom = '0';
    div2.style.left = '0';
    div2.style.overflow = 'auto';
    div2.style.alignItems = 'flex-end';
    div2.style.justifyContent = 'flex-start';
    div2.className = `AntSuperset_PopUpHtml_R`;
    div1.appendChild(div2);
  }
  if (!document.getElementById(`${res.nestId}`)) {

    const div2 = document.getElementById(`AntSuperset_PopUpHtml_R`) as HTMLElement;
    //添加
    div2.appendChild(div);
  } else {//如果是需要插入到对应div下 调用 nestId.appendChild插入
    //保存ID
    const div2 = document.getElementById(`${res.nestId}AntSuperset_PopUpHtml_R`) as HTMLElement;
    //添加
    div2.appendChild(div);
  }
  //返回此div
  return ReactDom.render(<div>
    <AntSuperset_PopUp {...res} />
    {/* 是否展示背景遮罩层 */}
    <div
      className={`${res.grayBack ? ' AntSuperset_PopUpHtml_css' : ''}`}
      onClick={() => {
        //判断是否点击背景关闭
        if (!res.grayBackClick) {
          PopUpDelete(res.id);
        }
      }}
      id={`${res.id}_AntSuperset_PopUpHtml_css`}
      style={{
        position: res.nestId ? 'absolute' : 'fixed',
      }}
    ></div>
  </div>, div);
};
const PopUpDelete = (id: string) => {
  if (document.getElementById(`${id}AntSuperset_PopUpHtml`)) {
    try {
      const Div = document.getElementById(`${id}AntSuperset_PopUpHtml`) as HTMLElement;
      const tims = Div.dataset.animatioNTime as unknown as number;
      const time = Div.dataset.animatioNTime ? tims - tims / 4 : '';
      const IDS = document.getElementById(`${id}_PopUp`) as HTMLElement;
      IDS.className += ' AntSuperset_PopUp_Dong';
      IDS.style.animation = ` ${Div.dataset.animatioEndClass ? Div.dataset.animatioEndClass : 'AntSuperset_PopUp_Dongs'} ${tims ? tims : .5}s forwards`;
      const css = document.getElementById(`${id}_AntSuperset_PopUpHtml_css`) as HTMLElement;
      css.className += ' AntSuperset_PopUp_Dong_CSS';
      const timerPopUp = setTimeout(() => {
        clearTimeout(timerPopUp);
        document.getElementById(`${id}AntSuperset_PopUpHtml`)?.remove();
      }, time ? time * 1000 : 450);
    } catch (e) {
    }
  }
};

export default {
  PopUp,
  PopUpDelete,
};