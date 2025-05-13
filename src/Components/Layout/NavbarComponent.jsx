import { Button, Menu } from "antd";
import { useState, useEffect } from "react";
import { useCollapsed } from '../../Context/CollapseContext';

// Iconos
import { IconUsers } from "../../Js/Icons";
import { IconCertificate } from "../../Js/Icons";
import { IconSchool } from "../../Js/Icons";
import { IconCash } from "../../Js/Icons";
import { IconMail } from "../../Js/Icons";
import { IconMedium } from "../../Js/Icons";
import { IconIndent } from "../../Js/Icons";


import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Icon from '@ant-design/icons';

//Css
import '../../CSS/Layout/NavbarComponent.css';



export default function NavbarComponent(){

    const [labelText, setLabelText] = useState('Abrir Menu');
    const { collapsed, toggleCollapsed } = useCollapsed();
    const [openKeys, setOpenKeys] = useState([]);

    const getLevelKeys = (items) => {
        const key = {};
        const traverse = (list, level = 1) => {
            list.forEach((item) => {
            key[item.key] = level;
            if (item.children) {
                traverse(item.children, level + 1);
            }
            });
        };
        traverse(items);
        return key;
    };

    const items = [
        {
            key: '1',
            icon: <IconSchool  className={`Menu-Icon ${(collapsed) ? "" : "Menu-IconOpen"}`} size="40" strokeWidth="1.25" strokeColor="rgb(220, 220, 220)"/>,
            label: 'Estudiantes',
        },
        {
            key: '2',
            icon: <IconUsers className={`Menu-Icon ${(collapsed) ? "" : "Menu-IconOpen"}`} size="40" strokeWidth="1.25" strokeColor="rgb(220,220,220)"/>,
            label: 'Profesores',
        },
        {
            key: '3',
            icon: <IconCash className={`Menu-Icon ${(collapsed) ? "" : "Menu-IconOpen"}`} strokeWidth="1.25" size="40" strokeColor="rgb(220,220,220)"/>,
            label: 'Finanzas',
        },
        {
            key: 'sub1',
            label: 'Comunicación',
            icon: <IconMail className={`Menu-Icon ${(collapsed) ? "" : "Menu-IconOpen"}`} strokeWidth="1.25" size="40" strokeColor="rgb(255, 255, 255)"/>,
            children: [
                {
                key: '5',
                label: 'Option 5',
                },
                {
                key: '6',
                label: 'Option 6',
                },
                {
                key: '7',
                label: 'Option 7',
                },
                {
                key: '8',
                label: 'Option 8',
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Documentos',
            icon: <IconCertificate className={`Menu-Icon ${(collapsed) ? "" : "Menu-IconOpen"}`} size="40" strokeWidth="1.25" strokeColor="rgb(255, 255, 255)"/>,
            children: [
                {
                key: '9',
                label: 'Option 9',
                },
                {
                key: '10',
                label: 'Option 10',
                },
                {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    {
                    key: '11',
                    label: 'Option 11',
                    },
                    {
                    key: '12',
                    label: 'Option 12',
                    },
                ],
                },
            ],
        },
        ];

    const levelKeys = getLevelKeys(items);

    const onOpenChange = (keys) => {
        const latestKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestKey) {
            const sameLevelKeyIndex = keys
            .filter((key) => key !== latestKey)
            .findIndex((key) => levelKeys[key] === levelKeys[latestKey]);

            setOpenKeys(
            keys
                .filter((_, index) => index !== sameLevelKeyIndex)
                .filter((key) => levelKeys[key] <= levelKeys[latestKey])
            );
        } else {
            setOpenKeys(keys); // se está cerrando
        }
    };



    return(

        <>
            <nav className="Navbar">
                <Menu
                    className="main-menu"
                    mode="inline"
                    theme="dark"
                    items={items}
                    inlineCollapsed={collapsed}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                />
                <div className="Sandbox2" onClick={toggleCollapsed}>
                    {
                        (collapsed) ? <IconIndent className="Sandbox" strokeColor="rgb(255,255,255)" size="40" strokeWidth="1.25"/> : <IconMedium className="Sandbox" strokeColor="rgb(255,255,255)" size="40" strokeWidth="1.25"/>
                    }
                    <span className={`Span-Sandbox ${(collapsed) ? "Close" : ""}`}>Cerrar Menú</span>
                </div>
            </nav>
        </>

    );
}