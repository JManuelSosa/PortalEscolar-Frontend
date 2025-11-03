import { Space, Button } from "antd";


export default function ButtonCloseNotification({onClick}){
    return(
        <>
            <Space>
                <Button type="primary" size="small" onClick={onClick}>
                    Cerrar
                </Button>
            </Space>
        </>
    )
}