import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useSchoolStore } from "../../stores/schoolStore";
import { Divider, Card, Flex, Tag } from "antd";

import css from '@css/Views/user/UserHomeView.module.css';
import { routes } from "../../Js/Utilities/Routes";

const classNamesCard = {
    body: css['card-body'],
    cover: css['card-cover']
}

const colorTags = {
    superior: 'rgb(var(--geekblue-700))',
    Administrador: 'rgb(var(--cyan-800))',
    Maestro: 'rgb(var(--cyan-600))',
}


export default function UserHomeView(){

    const navigate = useNavigate();
    const schools = useAuthStore((state) => state.schools);
    const userData = useAuthStore((state) => state.userData);

    const changeSchool = useSchoolStore((state) => state.changeSchool);

    const handleSchool = (school) => {

        changeSchool(school.public_id, school.role);

        let panel = null;
        switch(school.role){
            case 'Administrador':
                panel = routes.adminHome.path;
            break;
        }

        if(panel === null) return;

        navigate(panel);
    }


    return(

        <>
            <h1 className={css['title']}>Bienvenido de nuevo: {userData.name}</h1>
            <Divider/>

            <h2 className={css['school-sub-title']}>Tus escuelas activas: </h2>
            <Flex gap={16} wrap justify="center">

                { schools.map( (school) => {
                    return (
                        <Card 
                            key={school.public_id}
                            variant="borderless" 
                            className={ css['card'] } 
                            classNames={ classNamesCard }
                            hoverable 
                            cover={ <img className={ css['img-school'] } src="/img/EduConnectColor.png"></img>}
                            onClick={() => { handleSchool(school) }}
                        >
                            <span className={ css['school-name']}>{school.name}</span>
                            <span className={ css['school-cct']}> C.C.T. {school.cct} </span>
                            <div className={css['tags']}>
                                <Tag color={ colorTags.superior }>{school.type}</Tag>
                                <Tag color={ colorTags[school.role] }>{school.role}</Tag>
                            </div>
                        </Card>
                    )
                } )}
                

            </Flex>
        </>

    );
}