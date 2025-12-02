import { Button } from "antd";

//* css
import css from '@css/Components/ButtonCancelModal.module.css';



export default function ButtonCancelModal({ onClose = () => {}}){

    return(
        <>
            <div key="footer" className={css["custom-footer"]}>
                <div className={css["buttons"]}>
                    <Button type="text" onClick={onClose}>Cancelar</Button>
                </div>
            </div>
        </>
    );
}