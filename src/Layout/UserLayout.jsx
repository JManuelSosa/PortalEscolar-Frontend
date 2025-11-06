//React
import { CollapsedProvider } from "../Context/CollapseContext";
import { Outlet } from "react-router-dom";

//Components
import SiderNav from '../Components/Layout/App/SiderNav';
import HeaderLayout from '../Components/Layout/App/HeaderLayout';

//AntDesign
import { Layout } from 'antd';
const { Content } = Layout;

import { mapMenus } from '../Js/Utilities/menuDefinitions';

//Css
import AdminLayoutStyle from '@css/Layout/AdminLayout.module.css';

export default function UserLayout(){

    return(
        <>
            <Layout className={ AdminLayoutStyle.adminLayoutAnt }>
                <CollapsedProvider>
                    <SiderNav typeMenu={ mapMenus.user }/>
                </CollapsedProvider>

                <Layout className={AdminLayoutStyle.appLayout}>
                    <HeaderLayout></HeaderLayout>
                    <Content className={ AdminLayoutStyle.adminLayoutContent }>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}