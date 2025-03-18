//React
import { Routes, Route } from 'react-router-dom';
import { CollapsedProvider } from './Context/CollapseContext';
//Views
import HomeView from './Views/HomeView';

//Components
import SiderNav from './Layout/SiderNav';

//AntDesign
import { Layout } from 'antd';


function App() {


  return (
    <>
      <Layout>
        <CollapsedProvider>
          <SiderNav/>
        </CollapsedProvider>
            <Routes>
              <Route path='/' element={<HomeView/>}/>
            </Routes> 
      </Layout>
    </>
  )
}

export default App
