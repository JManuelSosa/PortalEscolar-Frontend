//Ant
import { Card } from 'antd';

//CSS
import '@css/General/CardContent.css';


export default function CardContent({ children, ...rest } = {}){

    return(
        <Card {...rest}>
            { children }
        </Card>
    );
};