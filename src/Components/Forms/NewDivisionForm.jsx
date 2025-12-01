// Utilidades
import { newDivisionFormRules } from "../../Js/Utilities/FormRules"

// Ant
import { Form, Input, Button } from "antd"

import css from '@css/Forms/NewDivisionForm.module.css';


export default function NewDivisionForm({ form, isPending, onFinish }){

    return(
            <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
                <Form.Item name="nombre" label="Nombre de división" rules={newDivisionFormRules.nombre}>
                    <Input></Input>
                </Form.Item>

                <div className={css.button}>
                    <Button type="primary" htmlType="submit" loading={isPending}>
                        {isPending ? 'Guardando...' : 'Agregar División'}
                    </Button>
                </div>
            </Form>
    )
}