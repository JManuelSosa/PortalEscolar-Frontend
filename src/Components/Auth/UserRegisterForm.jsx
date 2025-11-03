//* Ant 
import { Form, Input, Button} from "antd";

//* Hooks
import { useAutoForm } from "../../Hooks/useAutoForm";

//* Componentes
import SubmitButton from "../Utilities/SubmitButton";

//* Css
import css from '@css/Auth/UserRegisterForm.module.css';
import { loginFormRules } from "../../Js/Utilities/FormRules";

//? Js
const onFinish = (values) => {
    console.log('Valores:', values)
};

export default function UserRegisterForm({ name = null, parentForm = null, processForm, btnSubmitContent }){
    const nameForm = name ?? 'auth-form';
    const form = useAutoForm(nameForm, parentForm);
    const onReset = () => form.resetFields();

    return (

        <>
            <Form className={css['container']} name={nameForm} onFinish={ processForm || onFinish } requiredMark form={ form } autoComplete="off" layout="vertical" preserve={true}>
                        
                        <fieldset className={css['fieldset']}>
                            <legend className={css['legend']}> Credenciales de Acceso </legend>
                            <div className={css['inputs']}>
                                <div className={css['form-item']}>
                                    <Form.Item label='E-mail' rules={loginFormRules.email} name="email">
                                        <Input placeholder="Ingrese su correo"/>
                                    </Form.Item>
                                </div>
                                <div className={css['form-item']}>
                                    <Form.Item label='Contraseña' rules={loginFormRules.password} name="password">
                                        <Input.Password placeholder="Ingrese su contraseña"/>
                                    </Form.Item>
                                </div>
                            </div>
                            
                            <div className={css['buttons']}>
                                <Form.Item>
                                    <SubmitButton formName={nameForm}>
                                        { btnSubmitContent || 'Registrarme' }
                                    </SubmitButton>
                                </Form.Item>

                                <Button htmlType="button" onClick={ onReset }>
                                    Limpiar
                                </Button>
                            </div>
                        </fieldset>
            </Form>
        </>

    )
}