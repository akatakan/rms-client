import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import { Outlet, useNavigate } from "react-router-dom"
import styles from "../styles/Dashboard.module.css"
import { useState } from "react"
import { BarsOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TableOutlined, SettingOutlined, UserOutlined, DownOutlined, LogoutOutlined, CreditCardOutlined } from "@ant-design/icons"
import { useTheme } from "../context/ThemeContext"
import { Header } from "antd/es/layout/layout"
import { useAuth } from "../context/AuthContext"
import { Role } from "../enums/role"




export const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {isDark,toggleTheme} = useTheme();
    const {token} = theme.useToken();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const userJson = localStorage.getItem('user') || null;
    if(userJson === null){
        navigate('/login')
        return;
    }

    const user = JSON.parse(userJson);

    const menuItems = [
        {
            key: "1",
            icon: <TableOutlined />,
            label: "Masalar",
            role: [Role.ADMIN,Role.WAITER,Role.CASHIER]
        },
        {
            key: "2",
            icon: <BarsOutlined />,
            label: "Siparişler",
            role: [Role.ADMIN,Role.WAITER,Role.KITCHEN]
        },
        {
            key: "3",
            icon: <CreditCardOutlined />,
            label: "Ödeme",
            role: [Role.ADMIN,Role.CASHIER]
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
                logout();
            }
        },
    ]

    const filteredMenuItems = menuItems.filter((item) =>  {
        return item.role.includes(user.role)
    })

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
                    className={styles.menuBtn}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={filteredMenuItems}
                />
            </Sider>
            <Layout style={{width:'100%'}}>
                <Header className={styles.header} style={{width:'100%',background:token.colorBgContainer}}>
                    <Button type="text" onClick={()=>setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                    <div className={styles.logout}>
                        <Button style={{backgroundColor: isDark ? '#ffffff': '#000000',color: isDark ? '#000': '#fff'}} onClick={toggleTheme}>{isDark ? '☀️ Light' : '🌙 Dark'}</Button>
                        <Dropdown menu={{items: dropdownItems }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()} style={{ color: 'inherit', cursor: 'pointer' }}>
                                <Space>
                                    <Avatar size={38} icon={<UserOutlined />} />
                                    <span>{user.username}</span>
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