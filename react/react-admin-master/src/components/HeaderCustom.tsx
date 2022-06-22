/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import avater from '../style/imgs/b1.jpg';
import { Menu, Layout, Badge } from 'antd';
import { gitOauthToken, gitOauthInfo } from '../service';
import { parseQuery } from '../utils';
import { useHistory } from 'react-router-dom';
import { PwaInstaller } from './widget';
import umbrella from 'umbrella-storage';
import {
    ArrowsAltOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
};

const HeaderCustom = (props: HeaderCustomProps) => {
    const [user, setUser] = useState<any>();
    const history = useHistory();

    useEffect(() => {
        const query = parseQuery();
        let storageUser = umbrella.getLocalStorage('user');

        if (!storageUser && query.code) {
            gitOauthToken(query.code as string).then((res: any) => {
                gitOauthInfo(res.access_token).then((info: any) => {
                    setUser({
                        user: info,
                    });
                    umbrella.setLocalStorage('user', info);
                });
            });
        } else {
            setUser({
                user: storageUser,
            });
        }
    }, []);

    const screenFull = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };
    const menuClick = (e: any) => {
        e.key === 'logout' && logout();
    };
    const logout = () => {
        umbrella.removeLocalStorage('user');
        history.push('/login');
    };
    return (
        <Header className="custom-theme header">
            {props.collapsed ? (
                <MenuUnfoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            ) : (
                <MenuFoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            )}
            <Menu
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'right' }}
                onClick={menuClick}
            >
                <Menu.Item key="pwa">
                    <PwaInstaller />
                </Menu.Item>
                <Menu.Item key="full">
                    <ArrowsAltOutlined onClick={screenFull} />
                </Menu.Item>
                <Menu.Item key="1">
                    <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                        <NotificationOutlined />
                    </Badge>
                </Menu.Item>
                <SubMenu
                    title={
                        <span className="avatar">
                            <img src={avater} alt="头像" />
                            <i className="on bottom b-white" />
                        </span>
                    }
                >
                    <MenuItemGroup title="用户中心">
                        <Menu.Item key="setting:1">你好 - {user?.userName}</Menu.Item>
                        <Menu.Item key="setting:2">个人信息</Menu.Item>
                        <Menu.Item key="logout">
                            <span onClick={logout}>退出登录</span>
                        </Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="设置中心">
                        <Menu.Item key="setting:3">个人设置</Menu.Item>
                        <Menu.Item key="setting:4">系统设置</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        </Header>
    );
};

export default HeaderCustom;
