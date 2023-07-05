//引入react文件
import React, { useEffect, useState } from 'react';
//引入antd组件
import { Button, Dropdown, Input, List, message, Popconfirm, Table, TablePaginationConfig, Tooltip } from 'antd';
//引入处理完的数据
import { modify } from './AntSuperset_Table.json';
//引入类型文件
import { COLUMNS, DATASOURCE, PROPS, STRAIN, SOURCE, COLUMNSE, STATEKEY, OBJ } from './AntSuperset_Table.module';
//引入ICON
import { WarningFilled } from '@ant-design/icons';
import { $exportExcel } from '../commonComponents_API';

const AntSuperset_Table = (props: PROPS) => {
  //初始化配置文件
  const [dataType, setDataType] = useState<COLUMNS>({
    columns: [],
  });
  //初始化动态请求的数据或静态数据

  const [data, setData] = useState<DATASOURCE>({
    dataSource: [],
  });
  //初始化动态请求的数据或静态数据
  const [tableKey] = useState(new Date().getTime() + '');
  //初始化 每个按钮的异步加载动画效果
  const [straining, setStraining] = useState<STRAIN>({
    strain: [],
  });
  //如果按钮进行异步加载则其他所有操作无效并提示正在进行其他操作
  const [buttonLoading, setButtonLoading] = useState<{ straining: boolean }>({
    straining: false,
  });
  //直接修改当前行数据
  const [modifyRows, SetModifyRows] = useState({
    modifyRows: -1,
    index: -1,
    modifyRowsShow: false,
  });
  const [pagination, setPagination] = useState({
    current: props.current ? props.current : 1,
    pageSize: props.pageSize ? props.pageSize : 10,
    total: props.total ? props.total : 50,
    loading: false,
  });
  const [UpdateRows, setUpdateRows] = useState({
    UpdateRowsShow: false,
  });
  useEffect(() => {
    //判断当前 data是否有数据
    if ((typeof (props.data) === 'object' && props.data.length === 0) || !props.data) {
      //如果无数据 代表正在请求或者请求中 进行加载操作
      pagination.loading = true;
      //定时器监听如果10秒后无数据返回自动取消加载 切换为默认无数据展示信息
      const setTime = setTimeout(() => {
        //判断是否无数据 取消加载  建议监听 data.dataSource因为可以动态获取到 props.data无法动态获取
        if ((typeof (data.dataSource) === 'object' && data.dataSource.length === 0) || !data.dataSource) {
          message.error('无数据');
          pagination.loading = false;
          setPagination({ ...pagination });
        }
        clearTimeout(setTime);
      }, 10000);
    } else {
      //如果有数据显示数据
      pagination.loading = false;
      lonang();
      data.dataSource = JSON.parse(JSON.stringify(props.data));
      setData({ ...data });
    }
  }, [props.data]);
  //初始化按钮加载
  const lonang = () => {
    straining.strain = [];
    props.data.forEach(() => {
      straining.strain.push({
        buttonLoading1: false,
        buttonLoading2: false,
        buttonLoading3: false,
      });
    });
    setStraining({ ...straining });
  };
  //对配置文件更新监听
  useEffect(() => {
    // 修改配置文件参数
    const dataType: COLUMNSE = [];
    //重写 dataType 为了配合 showArrange
    props.dataType.forEach(item => {
      if (item.showArrange || item.showArrange === undefined) {
        dataType.push(JSON.parse(JSON.stringify(item)));
      }
    });
    if (typeof (dataType) !== 'object') {
      message.error('类型错误 Table将停止运行');
    } else {
      resetting(dataType);
      //判断是否需要展示操作按钮 判断类型如果此类型不等于 布尔值 则代表有按钮否则的话判断是否是true展示按钮
      if (props.buttonConfig.length !== 0 || props.buttonCustom) {
        buttonConfig(dataType);
      }
      setDataType({ columns: dataType, ...dataType });
    }
  }, [props.dataType, props.buttonConfig]);
  //重写 dataType方法
  const resetting = (dataType: COLUMNSE) => {
    //判断是否需要手动重写如果需要抛出dataType并接受返回值
    if (props.Rewrite) {
      props.Rewrite(dataType); //重写显示值的方法
    } else {
      dataType.forEach(item => {
        //修改对齐方式
        item.align = 'center';
        //修改值显示方式
        item.render = (_r, s: SOURCE, i) => {
          return <>
            <Tooltip mouseEnterDelay={.25} mouseLeaveDelay={.25} title={s[item.dataIndex]}
                     trigger={props.tooltipShow ? ['hover'] : []}>
              <div className={'ReactTableDiv'}>
                {
                  modifyRows.modifyRowsShow && i === modifyRows.modifyRows && item.SupportModification ?
                    <Input type={'text'} defaultValue={`${s[item.dataIndex]}`} key={`${new Date().getTime()}`}
                           onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                             s[item.dataIndex] = e.target?.value;
                           }
                           } />
                    : <span className={'ReactTableSpan'} onClick={() => {
                      //_r当前点击的数据
                      //s 当前行数据
                      //i+1 第几行
                      if (props.onValue) {
                        const obj = s as unknown as OBJ;
                        props.onValue(`${_r}`, item.dataIndex, obj, i);
                      }
                      console.log(123213)
                    }
                    }>{s[item.dataIndex]}</span>
                }

              </div>
            </Tooltip>
          </>;
        };
      });
    }
  };
  const replacement = (res: boolean) => {
    //更新家在判断
    buttonLoading.straining = res;
    setButtonLoading({ ...buttonLoading });
    setStraining({ ...straining });
    //重置数据
    const dataType: COLUMNSE = [];
    //重写 dataType 为了配合 showArrange
    props.dataType.forEach(item => {
      if (item.showArrange || item.showArrange === undefined) {
        dataType.push(JSON.parse(JSON.stringify(item)));
      }
    });
    //重写所有行
    resetting(dataType);
    //从写操作按钮
    buttonConfig(dataType);
    setDataType({ columns: dataType, ...dataType });
  };
  //被调用添加操作按钮方法
  const buttonConfig = (dataType: COLUMNSE) => {

    const buttonConfigShow1 = props.buttonConfig[0]?.show;
    const buttonConfigShow2 = props.buttonConfig[1]?.show;
    const buttonConfigShow3 = props.buttonConfig[2]?.show;
    //判断当前 默认三个按钮是否都为false  和 自定义按钮是否是空 如果都为false和空则隐藏操作按钮
    if (buttonConfigShow1 && buttonConfigShow2 && buttonConfigShow3 || (typeof (props.buttonCustom) === 'object' && props.buttonCustom.length !== 0)) {
      if (typeof (props.buttonCustom) === 'object') {
        props.buttonCustom.forEach(item => {
          item.show = true;
        });
      } else {
        props.buttonCustom = [];
      }
      //合并默认按钮和自定义按钮
      const modifys = [...modify(props.buttonConfig), ...props.buttonCustom];
      dataType.push({
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        render: (_r, s: SOURCE, i) => {
          return (<div className={'ButtonVermilion'}>
            <div className={'ButtonModify'} style={{
              top: modifyRows.modifyRowsShow ? '0%' : '-100%',
            }}>
              {
                modifyRows.modifyRows === i ? <>
                    <Button type={'primary'} onClick={() => {
                      //更新数据data
                      data.dataSource = JSON.parse(JSON.stringify(props.data));
                      setData({ ...data });
                      //取消选择当前行
                      modifyRows.modifyRows = -1;
                      //取消当前行加载动画
                      modifyRows.modifyRowsShow = false;
                      SetModifyRows({ ...modifyRows });
                      //返回 需要重置按钮和数据等方法传入false
                      replacement(false);
                    }} loading={UpdateRows.UpdateRowsShow} danger>取消</Button>
                    <Button type={'primary'} style={{ background: '#faad14' }} onClick={() => {
                      //更新数据data 
                      data.dataSource = JSON.parse(JSON.stringify(props.data));
                      setData({ ...data });
                      //重置不进行任何操作仅仅更新dom 传入true
                      replacement(true);
                    }
                    } loading={UpdateRows.UpdateRowsShow}>重置</Button>
                    <Button type={'primary'} onClick={() => {
                      if (JSON.stringify(props.data[i]) === JSON.stringify(data.dataSource[i])) {
                        message.warning('该行数据未发现有变更的操作,请检查后重新点击更新按钮');
                      } else { //更新行数据

                        // 取消：，取消，重置，更新 三个按钮的加载动画
                        UpdateRows.UpdateRowsShow = true;
                        setUpdateRows({ ...UpdateRows });
                        //更新前不做任何操作仅仅更新视图
                        replacement(true);
                        //使用方法  renew() 异步加载  Promise resolve返回 true代表更新成功提示并且隐藏缩回三个按钮 反之更新失败
                        if (props.renew) {
                          props.renew(s, i).then((res) => {
                            if (res) {
                              message.info(`已完成更新！`);
                              modifyRows.modifyRowsShow = false;
                              SetModifyRows({ ...modifyRows });
                            } else {
                              message.error(`更新失败！`);
                            }
                            UpdateRows.UpdateRowsShow = false;
                            setUpdateRows({ ...UpdateRows });
                            replacement(false);
                          });
                        }
                        //console.log(s, i)
                      }
                    }
                    } loading={UpdateRows.UpdateRowsShow}>更新</Button></> :
                  <Button type={'primary'} style={{ background: '#faad14' }}>等待其他行更新操作</Button>
              }
            </div>
            <div className={'ButtonClick'}>
              {
                modifys.map((item, index) => {
                  if (item.show) {
                    const Confirm = () => {
                      //异步关闭弹窗
                      return new Promise(resolve => {
                        //当有当前行数据被点击时其他按钮将无法点击
                        if (buttonLoading.straining) {
                          message.warning('您当前有其他操作未完成！');
                          resolve(null);
                        } else { //否则进行点击事件操作
                          //如果为直接在table里修改行数据则进行判断
                          if (item.modifyRow) {
                            modifyRows.modifyRows = i;
                            modifyRows.index = index;
                            modifyRows.modifyRowsShow = true;
                            SetModifyRows({ ...modifyRows });
                            replacement(true);
                          } else {
                            straining.strain[i][`buttonLoading${index + 1}`] = true;
                            replacement(true);
                            if (props.buttonClick && !item.modifyRow) { //判断有无点击方法
                              //调用点击方法传入 res 行数据
                              props.buttonClick({ s, i, text: item.text }).then((res) => {
                                //返回res 为 true或false
                                if (res) {
                                  message.info(`当前操作'${item.text}'已完成！`);
                                } else {
                                  message.error(`当前操作'${item.text}'已失败！`);
                                }
                                straining.strain[i][`buttonLoading${index + 1}`] = false;
                                setStraining({ ...straining });
                                replacement(false);
                                //异步关闭
                                resolve(null);
                              });
                            }
                          }
                        }
                      });
                    };
                    return (
                      <Popconfirm
                        disabled={!item.Warning}
                        title={item.title}
                        placement={'left'}
                        okText={item.yesButton}
                        cancelText={item.noButton}
                        key={`${s.key}${index}`}
                        onConfirm={() => Confirm()}
                      >
                        <Button
                          style={{
                            background: item.background,
                            margin: '0 5px',
                            color: item.color,
                            transformStyle: 'preserve-3d',
                            transition: '.5s',
                            border: '0',
                            marginTop: '10px',
                          }}
                          loading={straining.strain[i] ? straining.strain[i][`buttonLoading${index + 1}`] : false}
                          disabled={straining.strain[i] ? straining.strain[i][`buttonLoading${index + 1}`] : false}
                          onClick={() => {
                            if (!item.Warning) {
                              Confirm();
                            }
                          }}>
                          {item.text}
                        </Button>
                      </Popconfirm>
                    );
                  } else {
                  }
                })
              }
            </div>
          </div>);
        },
      });
    }
  };
  //为多选单选ID服务
  const [stateKey, setStateKey] = useState<STATEKEY>({
    selectedRowKeys: [],
  });

  //提出多选单选
  const rowSelection = props.typeSelection ? {
    rowSelection: {
      type: props.typeSelection,
      fixed: true,
      selectedRowKeys: stateKey.selectedRowKeys,
      //初始化当前所有 多选或单选的 key 根据对应key选择数据而不是根据当前一整条
      getCheckboxProps: () => {
        return {
          name: props.valueID,
        };
      },
      onSelect: (newSelectedRowKeys: SOURCE) => {
        const key = `${newSelectedRowKeys[`${props.valueID}`]}`;//根据key 获取选中唯一标识的value
        if (props.typeSelection === 'checkbox') {//判断是否单选
          //多选是数组增加模式
          if (stateKey.selectedRowKeys.indexOf(key) === -1) {
            stateKey.selectedRowKeys.push(key);
          } else {
            stateKey.selectedRowKeys.splice(stateKey.selectedRowKeys.indexOf(key), 1);
          }
        } else {//单选直接覆盖
          stateKey.selectedRowKeys = [key];
        }
        stateKey.selectedRowKeys = [...stateKey.selectedRowKeys];
        setStateKey({ ...stateKey });
      },
      onSelectAll: () => {
        //循环当前页所有数据 判断是否都选中 如果多选中则 全部取消 否则补齐未选中
        const list: (string)[] = [];
        let show = true;
        data.dataSource.forEach(item => {
          const value = `${item[`${props.valueID}`]}`;
          if (stateKey.selectedRowKeys.indexOf(value) === -1) {
            show = false;
            list.push(value);
          }
        });
        if (show) { //如果为全选状态 则取消
          data.dataSource.forEach((item) => {
            const value = `${item[`${props.valueID}`]}`;
            stateKey.selectedRowKeys.splice(stateKey.selectedRowKeys.indexOf(value), 1);
          });
        } else { //不是全选状态
          stateKey.selectedRowKeys = [...stateKey.selectedRowKeys, ...list];
        }
        stateKey.selectedRowKeys = [...stateKey.selectedRowKeys];
        setStateKey({ ...stateKey });
      },
    },
  } : {};
  return (
    <div className={'AntSuperset_Table'}>
      {/* antd table引入 */}
      <div className={'AntSuperset_Top_Button'}>
        <Dropdown overlay={() => (<div className={'AntSuperset_Top_Table_Dropdown'}>
          <List
            className='demo-loadmore-list'
            itemLayout='horizontal'
          >
            <p><WarningFilled style={{ color: '#e5a135', marginRight: '5px' }} />导出为Excel</p>
            <List.Item>
              <div className={'AntSuperset_Top_Table_Button'}>
                <Button onClick={() => {
                  $exportExcel(data.dataSource, dataType.columns, 'test', 'sheet name');
                }} type={'primary'}><WarningFilled style={{ color: '#e5a135', marginRight: '5px' }} />导出当页数据</Button>
              </div>
            </List.Item>
            <List.Item>
              <div className={'AntSuperset_Top_Table_Button'}>
                <Button onClick={() => {
                  $exportExcel(data.dataSource, dataType.columns, 'test', 'sheet name');
                }} type={'primary'}><WarningFilled style={{ color: '#e5a135', marginRight: '5px' }} />导出选中数据</Button>
              </div>
            </List.Item>
            <List.Item>
              <div className={'AntSuperset_Top_Table_Button'}>
                <Button onClick={() => {
                  $exportExcel(data.dataSource, dataType.columns, 'test', 'sheet name');
                }} type={'primary'}><WarningFilled style={{ color: '#e5a135', marginRight: '5px' }} />导出全部数据</Button>
              </div>
            </List.Item>
          </List>
        </div>)}>
          <Button type={'primary'} style={{ marginRight: '10px' }}>导出为Excel</Button>
        </Dropdown>
        <Dropdown overlay={() => (<div className={'AntSuperset_Top_Table_Dropdown'}>
          <List
            className='demo-loadmore-list'
            itemLayout='horizontal'
          >
            <p><WarningFilled style={{ color: '#e5a135', marginRight: '5px' }} />显示隐藏当前列</p>
            {
              props.dataType.map(item => (
                <List.Item
                  key={item.title}
                  actions={[<Button key={new Date().getTime()} type={'primary'} onClick={() => {
                    item.showArrange = !item.showArrange;
                    replacement(false);
                  }}
                                    danger={item.showArrange || item.showArrange === undefined ? false : true}>{item.showArrange || item.showArrange === undefined ? '隐藏' : '显示'}</Button>,
                  ]}
                >
                  <List.Item.Meta title={item.title} />
                </List.Item>
              ))
            }
          </List>
        </div>)}>
          <Button type={'primary'}>显示隐藏列</Button>
        </Dropdown>
      </div>
      <Table
        //启用单选多选
        {...rowSelection}
        //请求加载数据
        loading={pagination.loading}
        //分页
        pagination={(typeof (props.data) === 'object' && props.data.length === 0) || !props.data ? {} : {
          showTotal: () => `共${pagination.total}条`,
          ...pagination,
          showQuickJumper: true,
          size: 'small',
          position: ['bottomRight'],
          showSizeChanger: true,
          hideOnSinglePage: false,
          pageSizeOptions: [1, 5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        }}
        onChange={(paginations: TablePaginationConfig) => {//下一页按钮
          if (modifyRows.modifyRowsShow) {
            return message.warning('您正在修改行数据 无法切换页面');
          }
          if (buttonLoading.straining) {
            return message.warning('您正在进行其他操作无法切换页面');
          }
          const loading = () => {//全局更新
            pagination.pageSize = paginations.pageSize as number;
            pagination.current = paginations.current as number;
            pagination.total = paginations.total as number;
            setPagination({ ...pagination });
          };
          //判断是否有下一页方法如果有则代表为动态加载数据 如果没有则为静态
          if (props.pagingClick) {
            //下一页知道进入table加载
            pagination.loading = true;
            setPagination({ ...pagination });
            //回传 current pageSize total
            props.pagingClick({
              current: paginations.current as number,
              pageSize: paginations.pageSize as number,
              total: paginations.total as number,
            }).then(res => {
              //取消加载
              pagination.loading = false;
              if (res) {
                loading();
              } else {
                setPagination({ ...pagination });
                message.error('数据获取失败请重试');
              }
            });
          } else {
            loading();
          }
        }}
        scroll={{ x: '', y: 99999999 }}
        //全局key引入
        key={tableKey}
        //初始化或更新配置文件
        columns={dataType.columns as []}
        //初始化或更新（动态请求的数据或静态数据）
        dataSource={data.dataSource}
      />
    </div>

  );
};

export default React.memo(AntSuperset_Table);
