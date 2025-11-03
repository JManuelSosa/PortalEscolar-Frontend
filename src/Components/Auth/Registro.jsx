import { useState } from "react";
//* Ant
import { Button, Form } from "antd";

//* Forms
import UserRegisterForm from "./UserRegisterForm";
import InfoPersonalForm from './InfoPersonalForm';
import SummaryForm from "../Utilities/SummaryForm";

//* Stores
import { useFormStore } from "../../stores/formStore";

//* Hooks 
import { useAuth } from '../../Hooks/useAuth';

import { registerLabelMap } from "../../Js/Utilities/LabelMap";


import css from '@css/Auth/Registro.module.css';

export default function Registro({ className = css['register-form-container'], form = null, onFinish = null, isPending = null, name = null}){

    const [current, setCurrent] = useState(0);
    const [currentDataForm, setCurrentDataForm] = useState({});
    const { validateAllForms, getFormValues } = useFormStore();
    const [formAutenticacion] = Form.useForm();
    const nameForm = name ?? 'Form-Registro';
    const currentForm = form ?? formAutenticacion;

    const goToResume = () => { 
        const allValues = getFormValues(nameForm);
        setCurrentDataForm(allValues);
        next();
    };

    const onFinalSubmit = () => {
        const allValues = getFormValues(nameForm);
        console.log(allValues);
    }

    const next = async () => {
        const valid = await validateAllForms();
        if (valid) setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const finalSubmitButton = {
        label: "Registrarme",
        submitFunction: onFinish ?? onFinalSubmit
    }

    const steps = [
        {
            content: <UserRegisterForm name={nameForm} parentForm={currentForm} processForm={next} btnSubmitContent={'Siguiente'}/>,
        },
        {
            content: <InfoPersonalForm name={nameForm} parentForm={currentForm} processForm={goToResume} btnSubmitContent={'Finalizar'}/>,
        },
        {
            content: <SummaryForm data={currentDataForm} map={ registerLabelMap } submitButton={finalSubmitButton}/>
        },
    ];

    const items = steps.map(item => ({ key: item.title, title: item.title }));

    return(
        <section className={className}>
            <h2>Registro</h2>

            <section className="form-container">
                {steps[current].content}
            </section>

            <div className="container-steps" style={{ marginTop: 24 }}>
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
            </div>
        </section>
    );

}




