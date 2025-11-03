//React
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

//Layout
import AdminLayout from './Layout/AdminLayout';

//Views
import UserHomeView from './Views/user/UserHomeView';
import HomeView from './Views/admin/HomeView';
import DivisionView from './Views/admin/DivisionView';
import Login from './Components/Auth/Login';

import CarrerasView from './Views/admin/CarrerasView';
import GruposView from './Views/admin/GruposView';
import DetalleGruposView from './Views/admin/DetalleGruposView';

//Utilidades
import { ConfigProvider, notification, App as AntApp } from 'antd';
import esES from 'antd/locale/es_ES';
import { useNotificationStore } from './stores/notificationStore';
import { UserHomeRoute } from './Js/Utilities/Routes';

//Test
import AuthView from './Views/public/AuthView';
import Registro from './Components/Auth/Registro';
import LandingPageEscolar from './Views/public/Pruebas';

import { BibliotecaView } from './Views/BibliotecaAlumno';
import BibliotecaAdminView from './Views/BibliotecaAdministracion';
import PlanEscolar from './Views/PlanEscolar';
import PanelMaestro from './Views/PanelMaestro';
// Nuevas vistas para el Panel de Maestros
{/*import PanelMaestro from './Views/PanelMaestro';
import AsistenciaMaestro from './Views/AsistenciaMaestro';
import ActividadesMaestro from './Views/ActividadesMaestro';
import JustificacionesMaestro from './Views/JustificacionesMaestro'*/}
import GruposMaestro from './Views/GruposMaestro';



function App() {

  const setNotificationApi = useNotificationStore( (state) => state.setNotificationApi );
  const [ notificationApi, contextHolder ] = notification.useNotification();

  useEffect(() => {
    setNotificationApi(notificationApi);
  }, [notificationApi, setNotificationApi]);

  const configProvider = {
      token: {
        fontFamily: "inherit",
        fontWeightStrong: 700,
        colorText: 'var(--text)'
      },
      components: { 
        Form: {
          labelFontSize: 14,
          itemLabelFontWeight: 400,
        },
        Input: {
          activeBorderColor: 'var(--primary-active)',
          hoverBorderColor: 'var(--accent-hover)',
          colorTextPlaceholder: 'var(--text-placeholder)',
        },
        Select: {
          activeBorderColor: 'var(--primary-active)',
          hoverBorderColor: 'var(--accent-hover)',
        }
      }
  }

  return (
    <>
    
      <ConfigProvider theme={configProvider} locale={esES}>
          {contextHolder}
          <AntApp>
            <Routes>
                {/* Rutas sin inicio de sesión */}
                <Route path='/Login' element={ <Login/> }/>
                <Route path='/test' element={<AuthView/>}></Route>
                <Route path='/registro-test' element={<Registro/>} />
                <Route path='/pruebas' element={<LandingPageEscolar/>}/>

                {/* Rutas con inicio de sesión */}
                <Route path={ UserHomeRoute } element={<UserHomeView/>}/>
                <Route path='/' element={<AdminLayout> <HomeView/> </AdminLayout>}/>
                <Route path='/Divisiones' element={<AdminLayout> <DivisionView/> </AdminLayout>}/>
                <Route path='/Carreras' element={<AdminLayout> <CarrerasView/> </AdminLayout>}></Route>
                <Route path='/Grupos' element={<AdminLayout> <GruposView/> </AdminLayout>}></Route>
                <Route path='/DetalleGrupo' element={<AdminLayout> <DetalleGruposView/> </AdminLayout>}></Route>


                <Route path='/Biblioteca' element={<BibliotecaView />}></Route>
                <Route path='/BibliotecaAdmin' element={<BibliotecaAdminView />}></Route>
                <Route path='/PlanEscolar' element={<PlanEscolar />}></Route>
                <Route path='/PanelMaestro' element={<PanelMaestro />}></Route>
                <Route path='/GruposMaestro' element={<GruposMaestro />}></Route>
                <Route path='/JustificacionesMaestro' element=''></Route>

                {
                  /* Nuevas Rutas para el Panel de Maestros 
                  <Route path='/maestros' element={<AdminLayout> <PanelMaestro /> </AdminLayout>} />
                  <Route path='/maestros/asistencia' element={<AdminLayout> <AsistenciaMaestro /> </AdminLayout>} />
                  <Route path='/maestros/actividades' element={<AdminLayout> <ActividadesMaestro /> </AdminLayout>} />
                  <Route path='/maestros/justificaciones' element={<AdminLayout> <JustificacionesMaestro /> </AdminLayout>} />
                  <Route path='/maestros/grupos' element={<AdminLayout> <GruposMaestro /> </AdminLayout>} />*/
                }
            </Routes>
          </AntApp>
        </ConfigProvider>
    </>
  )
}

export default App