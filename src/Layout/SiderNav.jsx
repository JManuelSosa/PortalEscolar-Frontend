//React
import { useCollapsed } from '../Context/CollapseContext';

//AntDesign
import { Layout } from "antd";
const { Sider } = Layout;

//Componentes
import NavbarComponent from "../Components/NavbarComponent";

//CSS
import '../CSS/Sider.css';


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
            <div className="demo-logo-vertical" style={{backgroundColor: "blue", height:"50px", margin:"10px"}}/>
            <NavbarComponent/>
        </Sider>
    )
}