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
import { ConfigProvider } from 'antd';

function App() {

  const configProvider = {
      token: {
        fontFamily: "inherit",
      },
      components: { 
        Input: {
          activeBorderColor: 'rgb(var(--base-300))',
          hoverBorderColor: 'rgba(var(--base-300), 0.8)',
        },
        Select: {
          activeBorderColor: 'rgb(var(--base-300))',
          hoverBorderColor: 'rgba(var(--base-300), 0.8)',
          optionSelectedFontWeight: 400,
          placeHolderFontWeight: 400
        }
      }
  }

  return (
    <>
    <ConfigProvider
      theme={configProvider}
    >

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
      </ConfigProvider>
    </>
  )
}

export default App
