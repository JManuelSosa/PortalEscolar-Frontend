//React
import { Routes, Route } from 'react-router-dom';

//Layout
import AdminLayout from './Layout/AdminLayout';

//Views
import HomeView from './Views/HomeView';
import DivisionView from './Views/DivisionView';
import Login from './Components/Auth/Login';
import CarrerasView from './Views/CarrerasView';
import GruposView from './Views/GruposView';
import DetalleGruposView from './Views/DetalleGruposView';

//Css 
import '../src/CSS/App.css';




function App() {

  return (
    <>
      <Routes>
        {/* Rutas sin inicio de sesión */}
        <Route path='/Login' element={ <Login/> }/>

        {/* Rutas con inicio de sesión */}
        
        <Route path='/' element={<AdminLayout> <HomeView/> </AdminLayout>}/>
        <Route path='/Divisiones' element={<AdminLayout> <DivisionView/> </AdminLayout>}/>
        <Route path='/Carreras' element={<AdminLayout> <CarrerasView/> </AdminLayout>}></Route>
        <Route path='/Grupos' element={<AdminLayout> <GruposView/> </AdminLayout>}></Route>
        <Route path='/DetalleGrupo' element={<AdminLayout> <DetalleGruposView/> </AdminLayout>}></Route>
      </Routes>
    </>
  )
}

export default App
