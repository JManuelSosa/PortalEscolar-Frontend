import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useCollapsed } from '../../../Context/CollapseContext';
// Tabler Icons
import { 
    IconBaselineDensityMedium, 
    IconIndentIncrease
} from '@tabler/icons-react';

//Css
// import NavbarStyle from '@css/Layout/NavbarComponent.module.css';
import MiCss from '@css/Layout/NavbarComponent.module.css';



export default function NavbarComponent({ items = [] }){
    const navigate = useNavigate();
    const { collapsed, toggleCollapsed } = useCollapsed();
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const IconProps = {
        size: 38,
        stroke: 1.25,
        color: 'rgb(220,220,220)',
        className: MiCss.menuIcon,
    };
    

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

    function handleMenuClick(info) { // Ant Design pasa un objeto 'info' con { key, item, domEvent }
        
        // A. Manejo visual (tu lógica existente)
        const { key } = info;

        if(selectedKeys.includes(key)){
            setSelectedKeys([]);
        }else{
            setSelectedKeys([key]);
        }

        // B. Lógica de navegación
        // Buscamos el objeto 'item' completo en tu array 'items' usando la 'key'
        const clickedItem = findItemByKey(items, key);
        
        if (clickedItem && clickedItem.path) {
            navigate(clickedItem.path);
        }
    }

    // Función auxiliar para buscar recursivamente en items anidados
    const findItemByKey = (items, key) => {
        for (const item of items) {
            if (item.key === key) return item;
            if (item.children) {
                const found = findItemByKey(item.children, key);
                if (found) return found;
            }
        }
        return null;
    };


    return(

        <>
            <nav className={ MiCss.navbar }>
                <Menu
                    className={ MiCss.mainMenu }
                    mode="inline"
                    items={ items }
                    inlineCollapsed={collapsed}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={selectedKeys}
                    onClick={handleMenuClick}
                    theme="dark"
                />
                <div className={ MiCss.btnMenu } onClick={toggleCollapsed}>
                    {
                        (collapsed) ? <IconIndentIncrease {...IconProps}/> : <IconBaselineDensityMedium {...IconProps}/>
                    }
                    <span className={`${MiCss.btnMenuText} ${(collapsed) ? MiCss.btnClose : ""}`}>Cerrar Menú</span>
                </div>
            </nav>
        
        </>

    );
}