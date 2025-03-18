import { Button, Menu } from "antd";
import { useState, useEffect } from "react";
import { useCollapsed } from '../Context/CollapseContext';

// Iconos
import { IconCertificate } from "../Js/Icons";
import { IconSchool } from "../Js/Icons";
import { IconBriefCase } from "../Js/Icons";
import { IconCash } from "../Js/Icons";
import { IconMenu2 } from "../Js/Icons";
import { IconMail } from "../Js/Icons";

//Css
import '../CSS/NavbarComponent.css';


export default function NavbarComponent(){

    // const [collapsed, setCollapsed] = useState(true);
    const [labelText, setLabelText] = useState('Abrir Menu');
    const { collapsed, toggleCollapsed } = useCollapsed();

    useEffect(() => {
        if (collapsed) {
            const timeout = setTimeout(() => {
                setLabelText('Abrir Menu');
            }, 300);
        
            return () => clearTimeout(timeout);
        } else {
            setLabelText('Cerrar Menu');
        }
    }, [collapsed]);


    const items = [
        {
            key: 'toggle',
            icon: (
                <Button type="ghost" onClick={toggleCollapsed} icon={<IconMenu2 strokeWidth={1.5} strokeColor="rgb(255, 255, 255)"/> }></Button>
            ),
            label: <span onClick={toggleCollapsed}>{labelText}</span>
        },
        {
            type: 'divider',
        },
        {
            key: '1',
            icon: <IconSchool strokeWidth={1.5} strokeColor="rgb(255, 255, 255)"/>,
            label: 'Option 1',
        },
        {
            key: '2',
            icon: <IconBriefCase strokeWidth={1.5} strokeColor="rgb(255,255,255)"/>,
            label: 'Option 2',
        },
        {
            key: '3',
            icon: <IconCash strokeWidth={1.5} strokeColor="rgb(255,255,255)"/>,
            label: 'Option 3',
        },
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <IconMail strokeWidth={1.5} strokeColor="rgb(255, 255, 255)"/>,
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
            label: 'Navigation Two',
            icon: <IconCertificate strokeWidth={1.5} strokeColor="rgb(255, 255, 255)"/>,
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


    return(

        <>
            <nav>
                <Menu
                    className="main-menu"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    items={items}
                    inlineCollapsed={collapsed}
                />
            </nav>
        </>

    );
}