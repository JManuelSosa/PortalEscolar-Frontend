import { Button } from "antd";

//* css
import css from '@css/Components/ButtonsCloseModal.module.css';



export default function ButtonsCloseModal({ onOk = () => {} , onClose = () => {}, descriptionOk = null, descriptionCancel = null, isPending = false}){


    return(
        <>
            <div key="footer" className={css["custom-footer"]}>
                <div className={css["buttons"]}>
                    <Button type="primary" loading={isPending} onClick={onOk}>{ descriptionOk ? descriptionOk : "Dar de alta"}</Button>
                    <Button type="text" onClick={onClose}>{ descriptionCancel ? descriptionCancel : "Cancelar"}</Button>
                </div>
            </div>
        </>
    );
}