//React
import { Routes, Route } from 'react-router-dom';

//Layout
import AdminLayout from './Layout/AdminLayout';

//Views
import HomeView from './Views/HomeView';
import Prueba from './Components/Prueba';
import DivisionView from './Views/DivisionView';
import Login from './Components/Auth/Login';

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
        
      </Routes>
    </>
  )
}

export default App
