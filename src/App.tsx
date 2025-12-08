import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { DashboardLayout } from './layouts/DashboardLayout'
import Tables from './pages/Tables'
import { ConfigProvider, theme } from 'antd'
import { useTheme } from './context/ThemeContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  const { isDark } = useTheme()

  return (
    <ConfigProvider theme={{
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#ea580c',
        borderRadius: 8,
      },
      components:{
        Layout: {
          siderBg: isDark ? '#141414' : '#ffffff',
          triggerBg: isDark ? '#1f1f1f' : '#f0f0f0',
        },
        Menu:{
          itemBg: isDark ? '#141414' : '#ffffff',
          itemSelectedBg: isDark ? 'rgba(234, 88, 12, 0.2)' : '#fff7ed',
          itemSelectedColor: '#ea580c',
          itemColor: '#64748b',
          itemHoverBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        }
      }
    }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']}/>}>
          <Route element={<DashboardLayout/>}>
            <Route path='/tables' element={<Tables/>}/>
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
