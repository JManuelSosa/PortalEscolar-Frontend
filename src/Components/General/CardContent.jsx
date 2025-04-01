//Ant
import { Card } from 'antd';

//CSS
import '../../CSS/General/CardContent.css';


export default function CardContent({ children, className }){

    return(

        <Card className={ className } hoverable>
            { children }
        </Card>
    );
};