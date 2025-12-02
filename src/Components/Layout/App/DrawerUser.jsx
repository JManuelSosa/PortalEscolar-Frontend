import { useNavigate } from "react-router-dom";
import { Drawer, Avatar, List } from "antd";
import { IconHomeMove, IconLogout, IconUserCircle } from "@tabler/icons-react";

import { useAuthStore } from "../../../stores/authStore";

import css from '@css/Layout/DrawerUser.module.css';

import { routes } from "../../../Js/Utilities/Routes";



export default function DrawerUser({ open, onClose }){

    const navigate = useNavigate();

    const userData = useAuthStore((state) => state.userData);
    const accountInfo = useAuthStore((state) => state.user);

    const placementClosable = { 
        placement: 'end'
    };

    const classNames = {
        header: css['header-drawer'],
        body: css['body-drawer']
    }

    const data = [
        <div className={css['item']} onClick={ () => { navigate(routes.userHome) }}> 
            <IconHomeMove></IconHomeMove>
            <span>Volver al inicio</span>
        </div>,
        <div className={css['item']}> 
            <IconUserCircle></IconUserCircle>
            <span>Mi perfil</span>
        </div>,
        <div className={css['item']}> 
            <IconLogout></IconLogout>
            <span>Cerrar sesión</span>
        </div>,
    ];


    return(
        <>
            <Drawer classNames={ classNames } closable={placementClosable} open={open} onClose={onClose} title={'Opciones de Usuario'}>
                
                <div className={css['avatar-section']}>
                    <Avatar className={ css['avatar'] } size={160}>
                        {userData.name}
                    </Avatar>
                    <span className={ css['username'] }>
                        {userData.name}
                    </span>
                    <span>
                        Email: { accountInfo.email }
                    </span>
                    <span>
                        Id: { accountInfo.public_id }
                    </span>
                </div>

                <div className={css['options-section']}>
                    <List
                        className={ css.list }
                        dataSource={data}
                        renderItem={ (item) => (
                            <>
                                <List.Item className={css['list-item']}>
                                    {item}
                                </List.Item>
                            </>
                        )}
                        />
                </div>
            </Drawer>

        </>
    )



}