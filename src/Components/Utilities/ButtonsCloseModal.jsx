import { Button } from "antd";

//* css
import css from '@css/Components/ButtonsCloseModal.module.css';



export default function ButtonsCloseModal({ onOk = () => {} , onClose = () => {}}){


    return(
        <>
            <div key="footer" className={css["custom-footer"]}>
                <div className={css["buttons"]}>
                    <Button type="primary" onClick={onOk}>Dar de alta</Button>
                    <Button type="text" onClick={onClose}>Cancelar</Button>
                </div>
            </div>
        </>
    );
}