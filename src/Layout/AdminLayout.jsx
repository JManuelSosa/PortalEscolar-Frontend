//React
import { CollapsedProvider } from "../Context/CollapseContext";

//Components
import SiderNav from '../Components/Layout/SiderNav';
import HeaderLayout from '../Components/Layout/HeaderLayout';

//AntDesign
import { Layout } from 'antd';
const { Content, Footer } = Layout;

//Css
import '../CSS/Layout/AdminLayout.css';

export default function AdminLayout({children}){

    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
        height:12,
    };

    return(
        <>
            <Layout className="AdminLayoutAnt">
                <CollapsedProvider>
                    <SiderNav/>
                </CollapsedProvider>

                <Layout>
                    <HeaderLayout></HeaderLayout>
                    <Content className='AdminLayoutContent'>
                        {children}
                    </Content>
                    <Footer style={footerStyle}>
                        Hola Footer
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}