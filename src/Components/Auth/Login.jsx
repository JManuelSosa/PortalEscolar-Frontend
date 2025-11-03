//* React
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//* Ant
import { Form, Input, Flex, Button, Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

//* Utilidades
import { loginFormRules } from '../../Js/Utilities/FormRules';

//* Css
import css from '@css/Auth/Login.module.css';

export default function Login({ onFinish = null, isPending = true }) {

    const onFinishForm = (values) => {
        console.log(values);
    }

    const formFinish = onFinish ?? onFinishForm;

    return (
        <>
            <Form name="login" size="large" onFinish={formFinish} autoComplete="off">                    
                <div className={css["inputs-login"]}>
                    <Form.Item name="email" rules={loginFormRules.email} labelAlign="left">
                        <Input prefix={<UserOutlined />} placeholder="Correo" id="inputEmailLogin"/>
                    </Form.Item>

                    <Form.Item name="password" rules={loginFormRules.password}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Flex justify="center" align="center">
                        <a href="">¿Olvidaste tu contraseña?</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block htmlType="submit" className={css["btn-formLogin"]} loading={ isPending } disabled={ isPending }>
                        Iniciar sesión
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
};


























