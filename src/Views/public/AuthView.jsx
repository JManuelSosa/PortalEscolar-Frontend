// React 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from '@css/Views/public/AuthView.module.css';

import { Button, Spin, Form } from 'antd';
import Registro from "../../Components/Auth/Registro";
import Login from "../../Components/Auth/Login";

import { IconMainLogo } from "../../Js/Icons";
import { useAuth } from "../../Hooks/useAuth";
import { routes } from "../../Js/Utilities/Routes";
import LoadingLogo from "../../Components/Utilities/LoadingLogo";
import { useFormStore } from "../../stores/formStore";

export default function AuthView() {
    const navigate = useNavigate();
    const { login, inLoginProcess, isLoginSuccess, register, isRegistering, isRegisterSuccess } = useAuth();
    const { getFormValues } = useFormStore();
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [formRegister] = Form.useForm();
    const nameRegister = 'Register-Form';

    const [isStop, setIsStop] = useState(false);

    useEffect(() => {
        if (isLoginSuccess || isRegisterSuccess) {
            navigate(routes.userHome);
        }

    }, [isLoginSuccess, navigate, isRegisterSuccess]);

    const handleToggle = () => {
        setIsSignUpActive(prev => !prev);
    }

    const singIn = (credentials) => {
        login(credentials);
    }

    const singUp = () => {
        const allValues = getFormValues(nameRegister);
        register(allValues);
    }

    return (
        <>

            {
                (inLoginProcess || isRegistering) && (
                    <Spin indicator={<LoadingLogo />} fullscreen tip="Por favor espere..." />
                )
            }
            <div className={css["default-container"]}>
                <div className={css["login-form-wrapper"]}>

                    <div className={css["form-sign-in"]}>
                        <section className={`${css['loginForm']} ${css['sign-in']} ${(isSignUpActive) ? css['toggle-form'] : ''}`}>
                            <h2>Inicio de sesión</h2>
                            <Login onFinish={singIn} isPending={inLoginProcess} />
                        </section>
                    </div>

                    <div className={css["form-sign-in"]}>
                        <section className={`${css['loginForm']} ${css['sign-up']} ${(isSignUpActive) ? css['toggle-form'] : ''}`}>
                            <Registro className={css['register-form']} form={formRegister} onFinish={singUp} name={nameRegister} isStop={isStop}></Registro>
                        </section>
                    </div>

                    <div className={` ${css['welcome-container']} ${(isSignUpActive) ? css['toggle-form'] : ''}`}>
                        <div className={css["relative"]}>

                            <div className={`${css['welcome-sign']} ${css['in']} ${(isSignUpActive) ? css['toggle-form'] : ''}`}>
                                <div className={css["logo"]}>
                                    <IconMainLogo className={css["svgLogo"]}></IconMainLogo>
                                    <span className={css["brand"]}>EduConnect</span>
                                </div>
                                <div className={css["welcome-content"]}>
                                    <h3>¡Bienvenido de nuevo!</h3>
                                    <p>Inicia sesión para acceder a tu cuenta</p>
                                </div>
                                <div className={css["change-register"]}>
                                    <span>¿Primera vez aqui?</span>
                                    <Button onClick={handleToggle}>
                                        Regístrate
                                    </Button>
                                </div>
                            </div>

                            <div className={`${css['welcome-sign']} ${css['up']} ${(isSignUpActive) ? css['toggle-form'] : ''}`}>
                                <div className={css["logo"]}>
                                    <IconMainLogo className={css["svgLogo"]}></IconMainLogo>
                                    <span className={`${css["brand"]} ${css["register"]}`}>EduConnect</span>
                                </div>
                                <h3>¡Únete a nosotros!</h3>
                                <div>
                                    <p>Nos alegra mucho darte la bienvenida</p>
                                    <p>¡Regístrate y comienza a tomar el control de tu vida escolar!</p>
                                </div>
                                <div className={css["change-register"]}>
                                    <span>¿Ya tienes una cuenta?</span>
                                    <Button onClick={handleToggle}>
                                        Inicia sesión
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </>
    );
}