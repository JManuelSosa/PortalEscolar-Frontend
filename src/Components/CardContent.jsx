import { Card } from 'antd';
const { Meta } = Card;


//Icons
import { IconCertificate } from "../Js/Icons";
import { IconSchool } from "../Js/Icons";
import { IconBriefCase } from "../Js/Icons";

export default function CardContent(){

    return(

        <Card
            hoverable
            cover={<IconCertificate></IconCertificate>}
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );
};