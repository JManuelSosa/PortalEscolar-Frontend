import Layout from "antd/es/layout/layout";
const { Header } = Layout;

import '../CSS/HeaderComponent.css';

export default function HeaderLayout() {

    const escuela = 'Utm'

    return (
        <Header className='header-home'>
            <span>Bienvenido {escuela}</span>
        </Header>
    )
}