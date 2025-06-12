import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Homepage'
import CandidatePage from './pages/CandidatePage'
import RecruiterPage from './pages/RecruiterPage'

const App = () => {
  //const [count, setCount] = useState(0)

  return (
      <div>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/CandidatePage' element={<CandidatePage />}/>
          <Route path='/RecruiterPage' element={<RecruiterPage />}/>
        </Routes>
      
      </div>
  )
}

export default App
