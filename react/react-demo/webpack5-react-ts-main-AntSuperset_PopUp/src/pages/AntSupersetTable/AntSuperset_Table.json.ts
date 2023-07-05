import { buttonConfig } from './AntSuperset_Table.module';

const modify = (buttonConfig: buttonConfig) => {
  return [
    {
      show: buttonConfig[0]?.show ? buttonConfig[0].show : false,
      text: buttonConfig[0]?.text ? buttonConfig[0].text : '删除',
      color: buttonConfig[0]?.color ? buttonConfig[0].color : '#fff',
      background: buttonConfig[0]?.background ? buttonConfig[0].background : '#ff4d4f',
      Warning: buttonConfig[0]?.Warning ? buttonConfig[0].Warning : true,
      title: buttonConfig[0]?.title ? buttonConfig[0].title : '是否要删除该项',
      yesButton: buttonConfig[0]?.yesButton ? buttonConfig[0].yesButton : '是',
      noButton: buttonConfig[0]?.noButton ? buttonConfig[0].noButton : '否',
      modifyRow:buttonConfig[0]?.modifyRows ? buttonConfig[0].modifyRows : false,
    },
    {
      show: buttonConfig[1]?.show ? buttonConfig[1].show : false,
      text: buttonConfig[1]?.text ? buttonConfig[1].text : '修改',
      color: buttonConfig[1]?.color ? buttonConfig[1].color : '#fff',
      background: buttonConfig[1]?.background ? buttonConfig[1].background : '#1677ff',
      Warning: buttonConfig[1]?.Warning ? buttonConfig[1].Warning : false,
      title: buttonConfig[1]?.title ? buttonConfig[1].title : '是否要修改该项',
      yesButton: buttonConfig[1]?.yesButton ? buttonConfig[1].yesButton : '是',
      noButton: buttonConfig[1]?.noButton ? buttonConfig[1].noButton : '否',
      modifyRow:buttonConfig[1]?.modifyRows ? buttonConfig[1].modifyRows : false,
    },
    {
      show: buttonConfig[2]?.show ? buttonConfig[2].show : false,
      text: buttonConfig[2]?.text ? buttonConfig[2].text : '查看',
      color: buttonConfig[2]?.color ? buttonConfig[2].color : '#fff',
      background: buttonConfig[2]?.background ? buttonConfig[2].background : '#1677ff',
      Warning: buttonConfig[2]?.Warning ? buttonConfig[2].Warning : false,
      title: buttonConfig[2]?.title ? buttonConfig[2].title : '是否要查看该项',
      yesButton: buttonConfig[2]?.yesButton ? buttonConfig[2].yesButton : '是',
      noButton: buttonConfig[2]?.noButton ? buttonConfig[2].noButton : '否',
      modifyRow:buttonConfig[2]?.modifyRows ? buttonConfig[2].modifyRows : false,
    },
  ];
};

export {
  modify,
};
