import './App.css'
import { Router, Routes, Route } from 'react-router-dom'
import HomeView from './Views/HomeView'

function App() {


  return (
    <>
        <Routes>
          <Route path='/' element={<HomeView/>}/>
        </Routes>
    </>
  )
}

export default App
