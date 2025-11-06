import { useAuthStore } from "../../stores/authStore";
import { Divider, Card, Flex, Tag } from "antd";

const userName = 'Jose Manuel Vázquez Sosa';

import css from '@css/Views/user/UserHomeView.module.css';

const classNamesCard = {
    body: css['card-body'],
    cover: css['card-cover']
}


const colorTags = {

    superior: 'rgb(var(--geekblue-700))',
    Administrador: 'rgb(var(--cyan-800))',
    Maestro: 'rgb(var(--cyan-600))',
}

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12];


export default function UserHomeView(){

    const schools = useAuthStore((state) => state.schools);
    const userData = useAuthStore((state) => state.userData);

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
                            cover={ <img className={ css['img-school'] } src="/public/img/EduConnectColor.png"></img>}
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