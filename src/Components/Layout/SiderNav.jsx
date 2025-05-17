//React
import { useCollapsed } from '../../Context/CollapseContext';

//AntDesign
import { Layout } from "antd";
const { Sider } = Layout;


//Componentes
import NavbarComponent from "./NavbarComponent";

//CSS
import SiderStyle from '@css/Layout/Sider.module.css';


export default function SiderNav(){

    const { collapsed } = useCollapsed();
    const siderStyle = {
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };

    return(
        <Sider
            className={`${ SiderStyle.siderLayout } ${ (collapsed) ? SiderStyle.menuCerrado : ""}`}
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            width={250}
            style={siderStyle}
        >
            <NavbarComponent/>
        </Sider>
    )
}