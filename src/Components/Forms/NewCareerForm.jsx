// Utilidades
import { newCareerFormRules } from "../../Js/Utilities/FormRules"

// Ant
import { Form, Input, Button } from "antd"

import css from '@css/Forms/NewDivisionForm.module.css';


export default function NewCareerForm({ form, isPending, onFinish }){

    return(
            <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
                <Form.Item name="nombre" label="Nombre de Carrera" rules={newCareerFormRules.nombre}>
                    <Input></Input>
                </Form.Item>

                <div className={css.button}>
                    <Button type="primary" htmlType="submit" loading={isPending}>
                        {isPending ? 'Guardando...' : 'Agregar carrera'}
                    </Button>
                </div>
            </Form>
    )
}