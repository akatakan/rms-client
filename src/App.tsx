import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { DashboardLayout } from './layouts/DashboardLayout'
import Tables from './pages/Tables'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import { AuthLayout } from './layouts/AuthLayout'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AuthLayout/>}>
        <Route path='/login' element={<Login/>}/>
      </Route>
      <Route element={<DashboardLayout/>}>
        <Route path='/tables' element={<Tables/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Route>
    </Routes>
  )
}

export default App
