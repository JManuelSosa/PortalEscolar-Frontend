import { Menu } from "antd";
import { useState } from "react";
import { useCollapsed } from '../../Context/CollapseContext';

// Tabler Icons
import { IconSchool } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons-react';
import { IconCash } from '@tabler/icons-react';
import { IconMail } from "@tabler/icons-react";
import { IconFileDescription } from '@tabler/icons-react';
import { IconBaselineDensityMedium } from '@tabler/icons-react';
import { IconIndentIncrease } from '@tabler/icons-react';

//Css
import '../../CSS/Layout/NavbarComponent.css';



export default function NavbarComponent(){
    const { collapsed, toggleCollapsed } = useCollapsed();
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const IconProps = {
        size: 38,
        stroke: 1.25,
        color: 'rgb(220,220,220)',
        className: "Menu-Icon",
    }

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
            icon: <IconSchool  {...IconProps}/>,
            label: 'Estudiantes',
        },
        {
            key: '2',
            icon: <IconUsers {...IconProps}/>,
            label: 'Profesores',
        },
        {
            key: '3',
            icon: <IconCash {...IconProps}/>,
            label: 'Finanzas',
        },
        {
            key: 'sub1',
            label: 'Comunicación',
            icon: <IconMail {...IconProps}/>,
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
            icon: <IconFileDescription {...IconProps}/>,
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

    function isSelected({ key }){
        
        if(selectedKeys.includes(key)){
            setSelectedKeys([]);
        }else{
            setSelectedKeys([key]);
        }
    }


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
                    selectedKeys={selectedKeys}
                    onClick={isSelected}
                />
                <div className="Btn-Menu" onClick={toggleCollapsed}>
                    {
                        (collapsed) ? <IconIndentIncrease {...IconProps}/> : <IconBaselineDensityMedium {...IconProps}/>
                    }
                    <span className={`BtnMenu-Text ${(collapsed) ? "Close" : ""}`}>Cerrar Menú</span>
                </div>
            </nav>
        </>

    );
}