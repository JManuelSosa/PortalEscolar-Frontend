//Ant
import { Card } from 'antd';

import CardCss from '@css/Components/CardContent.module.css';

export default function CardContent({ children, ...rest } = {}){


    return(
        <Card {...rest}>
            { children }
        </Card>
    );
};