//React
import { CollapsedProvider } from "../Context/CollapseContext";

//Components
import SiderNav from '../Components/Layout/App/SiderNav';
import HeaderLayout from '../Components/Layout/App/HeaderLayout';

//AntDesign
import { Layout } from 'antd';
const { Content, Footer } = Layout;

//Css
import AdminLayoutStyle from '@css/Layout/AdminLayout.module.css';

export default function AdminLayout({children}){

    return(
        <>
            <Layout className={ AdminLayoutStyle.adminLayoutAnt }>
                <CollapsedProvider>
                    <SiderNav/>
                </CollapsedProvider>

                <Layout className={AdminLayoutStyle.appLayout}>
                    <HeaderLayout></HeaderLayout>
                    <Content className={ AdminLayoutStyle.adminLayoutContent }>
                        {children}
                    </Content>
                    <Footer className={ AdminLayoutStyle.footer }>
                        Hola Footer
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}