import { Layout, theme, Dropdown, Menu, Button, Avatar } from "antd";
import type React from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons'


const { Header, Content ,Sider } = Layout;

export const DashboardLayout: React.FC = () => {
    const [collapsed,setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key:'/tables',
            icon:'',
            label:'Masalar',
        },
        {
            key:'/orders',
            icon:'',
            label:'Siparişler',
        },
        {
            key:'/settings',
            icon:'',
            label:'Ayarlar',
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };
    
    const userMenu = {
        items: [
        {
            key: '1',
            label: <span onClick={handleLogout}>Çıkış Yap</span>,
            icon: <LogoutOutlined />,
            danger: true,
        },
        ],
    };

    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg" 
        onBreakpoint={(broken) => {
            if(broken) setCollapsed(true);
        }}
      >
        <div style={{ 
            height: 32, 
            margin: 16, 
            background: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            overflow: 'hidden',
            padding:10,
        }}>
          {collapsed ? 'RMS' : 'RMS APPPPPPPPPPPPPPPPPP'}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          // Şu anki URL ile menüdeki seçili elemanı eşleştir
          selectedKeys={[location.pathname]} 
          items={menuItems}
          // Tıklanınca sayfaya git
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

      {/* --- SAĞ TARAF (HEADER + CONTENT) --- */}
      <Layout>
        {/* ÜST BAR (HEADER) */}
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
          {/* Menü Aç/Kapa Butonu */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          {/* Sağ Üst Kullanıcı Bilgisi */}
          <Dropdown menu={userMenu}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <span>Garson Ali</span>
            </div>
          </Dropdown>
        </Header>

        {/* İÇERİK ALANI (CONTENT) */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto' // İçerik taşarsa scroll çıksın
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};