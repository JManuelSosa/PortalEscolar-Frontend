//React
import { useCollapsed } from '../../Context/CollapseContext';

//AntDesign
import { Layout } from "antd";
const { Sider } = Layout;

//Componentes
import NavbarComponent from "./NavbarComponent";

//CSS
import '../../CSS/Layout/Sider.css';


export default function SiderNav(){

    const { collapsed } = useCollapsed();

    return(
        <Sider
            className={`Sider-Layout ${ (collapsed) ? "Menu-Cerrado" : ""}`}
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            width={250}
        >
            <NavbarComponent/>
        </Sider>
    )
}