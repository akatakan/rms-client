import { Button, Layout, Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { Outlet } from "react-router-dom"
import styles from "../styles/Dashboard.module.css"
import { useState } from "react"
import { BarsOutlined, DollarOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TableOutlined } from "@ant-design/icons"



export const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

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
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onBreakpoint={(broken) =>{
                    if (broken) setCollapsed(true)
                }}
                style={{boxShadow:"2px 0 8px rgba(0,0,0,0.15)"}}
            >   
                <Button type="text" className={styles.sideBtn} onClick={()=>setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Sider>
            <Outlet />
        </Layout>
    )
}