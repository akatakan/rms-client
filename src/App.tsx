import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { DashboardLayout } from './layouts/DashboardLayout'
import Tables from './pages/Tables'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login/>} />
      <Route element={<DashboardLayout/>}>
        <Route path='/tables' element={<Tables/>}/>
      </Route>
    </Routes>
  )
}

export default App
