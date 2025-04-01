//React
import { Routes, Route } from 'react-router-dom';
import { CollapsedProvider } from './Context/CollapseContext';
//Views
import HomeView from './Views/HomeView';

import Prueba from './Components/Prueba';
import DivisionView from './Views/DivisionView';

//Components
import SiderNav from './Layout/SiderNav';
import HeaderLayout from './Layout/HeaderLayout';

//AntDesign
import { Layout } from 'antd';
const { Content, Footer } = Layout;

//Css 
import '../src/CSS/App.css';


import { AuthProvider } from "./Context/AuthContext";
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';



const headerStyle = {

};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
  height: 12,
};

function App() {

  const escuela = "UTM"
  return (
    <>
      <Layout>
        <CollapsedProvider>
          <SiderNav />
        </CollapsedProvider>
        <Layout>
        <AuthProvider>
          <HeaderLayout></HeaderLayout>
          <Content className='Content'>
            
              <Routes>
                <Route path='/' element={<HomeView />} />
                <Route path='/login' element={<Login />} />
                <Route path="/sing-up" element={<SignUp/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
           
          </Content>
          </AuthProvider>
          <Footer style={footerStyle}>
            Hola Footer
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default App
