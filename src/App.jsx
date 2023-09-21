import React from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Gallery from './components/Gallery'
import {Routes, Route} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/gallery' element={
            <ProtectedRoute><Gallery /></ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>

    </div>
  )
}

export default App
