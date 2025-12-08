import { Button, Layout, Menu, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import { Outlet } from "react-router-dom"
import styles from "../styles/Dashboard.module.css"
import { useState } from "react"
import { BarsOutlined, DollarOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TableOutlined } from "@ant-design/icons"
import { Header } from "antd/es/layout/layout"
import { useTheme } from "../context/ThemeContext"



export const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {isDark,toggleTheme} = useTheme();
    const {token} = theme.useToken();

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
            <Layout style={{minWidth:'100vw'}}>
                <Header className={styles.header} style={{minWidth:'100vw',background:token.colorBgContainer}}>
                    <Button type="text" onClick={()=>setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                    <div className={styles.logout}>
                        <Button onClick={toggleTheme}>{isDark ? '☀️ Light' : '🌙 Dark'}</Button>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    )
}