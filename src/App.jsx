//React
import { Routes, Route } from 'react-router-dom';
import { CollapsedProvider } from './Context/CollapseContext';
//Views
import HomeView from './Views/HomeView';

//Components
import SiderNav from './Layout/SiderNav';

//AntDesign
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

//Css 
import '../src/CSS/App.css';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

function App() {


  return (
    <>
      <Layout>
        <CollapsedProvider>
          <SiderNav/>
        </CollapsedProvider>
        <Layout>
          <Header style={headerStyle}>
            Hola Header
          </Header>  
          <Content className='Content'>
              <Routes>
                <Route path='/' element={<HomeView/>}/>
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
