import { Avatar } from "antd"
import CardContent from "../../General/CardContent"
import { Row } from "antd"

export default function AlumnoResumen(){


    return(
        <>
        <CardContent>
            <Row>
                <Avatar
                size={{ xs: 120, sm: 120, md: 120, lg: 120, xl: 120, xxl: 120 }}
                src="/public/img/fotofake6.jpg"
                />
            </Row>
            <Row>
                
            </Row>
        </CardContent>
        </>
    )
}