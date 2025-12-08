//React
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

//Layout
import AdminLayout from './Layout/AdminLayout';
import UserLayout from './Layout/UserLayout';

//Views
import UserHomeView from './Views/user/UserHomeView';
import HomeView from './Views/admin/HomeView';
import PeriodTemplateView from './Views/admin/PeriodTemplateView';


import DivisionView from './Views/admin/DivisionView';
import CarrerasView from './Views/admin/CarrerasView';
import GruposView from './Views/admin/GruposView';
import DetalleGruposView from './Views/admin/DetalleGruposView';
// nuevas vistas
import AsentarCalificaciones from './Views/teacher/Calificacines';
import GestorTareasGrupal from './Views/teacher/Actividades';
import GestionGrupos from './Views/admin/GestionGrupos';
import GestionAulas from './Views/admin/AulasView';
import ClassroomManager from './Views/teacher/MateriaView';
import MaestroHome from './Views/teacher/MaestroHome';
import ListaMaestros from './Views/admin/MaestrosView';
import SubscriptionPlans from './Views/public/Suscripcion';
//Utilidades
import { ConfigProvider, notification, App as AntApp } from 'antd';
import esES from 'antd/locale/es_ES';
import { useNotificationStore } from './stores/notificationStore';
import { routes } from './Js/Utilities/Routes';

//Test
import PaseDeListaView from './Views/teacher/Asistencia';
import AuthView from './Views/public/AuthView';
import LandingPageEscolar from './Views/public/LandingPageEscolar';
import EmpleadosView from './Views/admin/EmpleadosView';

import { BibliotecaView } from './Views/student/BibliotecaAlumno';
import ActividadesAlumno from './Views/student/ListaTarea';

import BibliotecaAdminView from './Views/admin/BibliotecaAdministracion';
import PlanEscolar from './Views/public/PlanEscolar';
import PanelMaestro from './Views/teacher/PanelMaestro';
import ActividadesMaestro from './Views/teacher/ActividadesMaestro';
import GruposMaestro from './Views/teacher/GruposMaestro';
import JustificacionesAlumno from './Views/teacher/JustificacionesMaestro';

import ProtectedRoute from './Router/ProtectedRoute';
import RoleGuard from './Router/RoleGuard';
import UnauthorizedView from './Views/utilities/UnauthorizedView';
import AsistenciaMaestro from './Views/teacher/AsistenciaMaestro';
import PanelAlumno from './Views/student/PanelEstudiante';


function App() {

  const setNotificationApi = useNotificationStore((state) => state.setNotificationApi);
  const [notificationApi, contextHolder] = notification.useNotification();

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
          colorTextPlaceholder: 'rgba(200, 200, 200, 1)',
        },
        Select: {
          activeBorderColor: 'var(--primary-active)',
          hoverBorderColor: 'var(--accent-hover)',
          colorTextPlaceholder: 'rgba(200, 200, 200, 1)',
        },
        Drawer: {
          footerPaddingBlock: 0
        },
        Button: {
          // Para botones primarios
          colorPrimary: 'var(--primary)',
          colorPrimaryHover: 'var(--primary-hover)',
          colorPrimaryActive: 'var(--primary-active)',
          colorPrimaryBorder: 'var(--primary)',
        },
        Tabs: {
          colorText: 'rgb(var(--geekblue-700))',
          itemSelectedColor: 'rgb(var(--geekblue-800))',
          itemHoverColor: 'rgb(var(--geekblue-600))',  
          inkBarColor: 'rgb(var(--geekblue-800))', 
          fontSize: 18    
        },
    }
  }

  return (
    <>

      <ConfigProvider theme={configProvider} locale={esES}>
        {contextHolder}
        <AntApp>

          <Routes>

            {/* Rutas sin inicio de sesión */}
            <Route path={routes.landing} element={<LandingPageEscolar />} />
            <Route path={routes.login} element={<AuthView />}></Route>
            <Route path={routes.pricing} element={<PlanEscolar />} />
            <Route path='suscripcion' element={<SubscriptionPlans />} />

            {/* Zona para testear rutas */}
            <Route element={<UserLayout />}>
              <Route path={routes.userHome} element={<UserHomeView />} />
            </Route>


            {/* Rutas que requieren inicio de sesión */}
            <Route element={<ProtectedRoute />}>
              <Route path={routes.unauthorized} element={<UnauthorizedView />} />

              {/* Rutas que ademas del inicio de sesión requieren que tengas el rol de Administrador */}
              <Route element={<RoleGuard allowedRoles={['Administrador']}/>}>
                <Route element={<AdminLayout/>}>
                  <Route path={ routes.adminHome.path } element={ <HomeView/> }/>
                  <Route path={ routes.empleados.path } element={<EmpleadosView/>}/>
                  <Route path={ routes.periodosEscolares.path } element={<PeriodTemplateView/>} />

                  <Route path={ routes.divisiones.path } element={<DivisionView/>}/>
                  <Route path={ routes.carreras.path } element={<CarrerasView/>}></Route>
                  <Route path={ routes.grupos.path } element={<GruposView/>}></Route>
                  <Route path={ routes.detalleGrupo.path } element={<DetalleGruposView/>}/>

                  <Route path={ routes.gruposGlobal.path } element={<GestionGrupos />} />

                </Route>
              </Route>
            </Route>
            {/*  nuevas rutas */}
            <Route path='calificaciones' element={< AsentarCalificaciones />} />
            <Route path='tareas' element={<GestorTareasGrupal />} />
            
            {/* Administrador*/}
            <Route path='/Maestros' element={<ListaMaestros />} />
            <Route path='/aulas' element={<GestionAulas />} />
            <Route path='/materias' element={<ClassroomManager />} />

            {/* Alumnos*/}
            <Route path='/biblioteca' element={<BibliotecaView />}></Route>
            <Route path='/bibliotecaAdmin' element={<BibliotecaAdminView />}></Route>
            <Route path='/PanelAlumno' element={< PanelAlumno />}></Route>
            <Route path='/ActividadesAlumno' element={<ActividadesAlumno />}></Route>

            {/* Maestros */}
            <Route path='maestrohome' element={<MaestroHome />} />
            <Route path='/asistencia' element={<PaseDeListaView />} />
            <Route path='/panelMaestro' element={<PanelMaestro />}></Route>
            <Route path='/gruposMaestro' element={<GruposMaestro />}></Route>
            <Route path='/JustificacionesAlumno' element={<JustificacionesAlumno />}></Route>
            <Route path={routes.asistenciaMaestro} element={<AsistenciaMaestro />} />
            <Route path='/ActividadesMaestro' element={<ActividadesMaestro />}></Route>

            {
              /* Nuevas Rutas para el Panel de Maestros  __eliminar de las  rutas.
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