// Ant
import { Tabs, Empty } from "antd"

// Css
import css from '@css/Views/admin/GruposView.module.css';

import CardGrupo from "./CardGrupo";


export default function TabsGrupos({ dataTabs }) {

    const entries = Object.entries(dataTabs);

    const items = entries.map(([key, careers]) => ({
        key,
        label: careers[0].carrera,
        children: (
            <div class={css['responsive-grid']}>
                {careers.map((group, index) => (
                    <div key={group.groupKey}>
                        <CardGrupo group={group}/>
                    </div>
                ))}
            </div>
        )
    }));

    return (
        <>
            <Tabs defaultActiveKey="1" items={items}/>;
        </>
    )
}