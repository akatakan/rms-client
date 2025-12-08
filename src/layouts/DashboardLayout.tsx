import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import { Outlet, useNavigate } from "react-router-dom"
import styles from "../styles/Dashboard.module.css"
import { useState } from "react"
import { BarsOutlined, DollarOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TableOutlined, SettingOutlined, UserOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons"
import { useTheme } from "../context/ThemeContext"
import { Header } from "antd/es/layout/layout"
import { authService } from "../services/authService"



export const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {isDark,toggleTheme} = useTheme();
    const {token} = theme.useToken();
    const navigate = useNavigate();

    const menuItems = [
        {
            key: "1",
            icon: <TableOutlined />,
            label: "Masalar"
        },
        {
            key: "2",
            icon: <BarsOutlined />,
            label: "Siparişler"
        },
        {
            key: "3",
            icon: <DollarOutlined />,
            label: "Ödeme"
        },
    ];

    const dropdownItems = [
        {
            key: 'settings',
            label: 'Ayarlar',
            icon:<SettingOutlined/>,
            onClick: () => navigate("/settings")
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'logout',
            label: 'Çıkış Yap',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: () => {
                authService.logout();
            }
        },
    ]

    return (
        <Layout className={styles.layout}>
            <Sider
                trigger={null}
                theme="light"
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onBreakpoint={(broken) =>{
                    if (broken) setCollapsed(true)
                }}
                style={{boxShadow:"2px 0 8px rgba(0,0,0,0.15)"}}
            >   
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Sider>
            <Layout style={{width:'100%'}}>
                <Header className={styles.header} style={{width:'100%',background:token.colorBgContainer}}>
                    <Button type="text" onClick={()=>setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                    <div className={styles.logout}>
                        <Button onClick={toggleTheme}>{isDark ? '☀️ Light' : '🌙 Dark'}</Button>
                        <Dropdown menu={{items: dropdownItems }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()} style={{ color: 'inherit', cursor: 'pointer' }}>
                                <Space>
                                    <Avatar size="small" icon={<UserOutlined />} />
                                    <span>{localStorage.getItem('username')}</span>
                                    <DownOutlined style={{ fontSize: '12px' }} />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    )
}