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
const {Content, Footer } = Layout;

//Css 
import '../src/CSS/App.css';

const headerStyle = {

};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
  height:12,
};

function App() {

  const escuela = "UTM"
  return (
    <>
        <Layout>
          <CollapsedProvider>
            <SiderNav/>
          </CollapsedProvider>
          <Layout>
            <HeaderLayout></HeaderLayout>
            <Content className='Content'>
                <Routes>
                  <Route path='/' element={<DivisionView/>}/>
                </Routes>
            </Content>
            <Footer style={footerStyle}>
              Hola Footer
            </Footer>
          </Layout>
        </Layout>
    </>
  )
}

export default App
