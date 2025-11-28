
import { Form, Select, Input } from "antd";
import layoutForm from '@css/Layout/Utilities/FormLayout.module.css';

import { useAutoForm } from "../../Hooks/useAutoForm";

import SubmitButton from "../Utilities/SubmitButton";
import { onBoardEmployeeFormRules } from "../../Js/Utilities/FormRules";

import css from '@css/Forms/TeacherDetailsForm.module.css';

const process = () => { console.log('puto') }

export default function TeacherDetailsForm({ formName, formInstance, formConfigData, processForm, btnSubmitContent = null, buttonPrev = null }) {

    const { form } = useAutoForm(formName, formInstance, { standalone: false, debounceMs: 100});
    const { academicDegreesForSelect } = formConfigData;


    return(

        <>  
            <div style={{ flex: "1"}}>
                <Form onFinish={ processForm || process } form={form} autoComplete="off">
                    <fieldset className={layoutForm['fieldset']}>

                        <legend className={layoutForm['legend']}>Detalles de maestro</legend>
                        
                        <div className={css['items']}>
                            <Form.Item className={css['form-item']} name="carrera" label="Carrera" rules={onBoardEmployeeFormRules.carrera}> 
                                <Input></Input>
                            </Form.Item>

                            <Form.Item className={css['form-item']} name="grado_academico" label="Grado acádemico" rules={onBoardEmployeeFormRules.grado_academico}>
                                <Select options={ academicDegreesForSelect } 
                                        onChange={(value, option) => { 
                                                    form.setFieldsValue({
                                                        grado_academico: value,
                                                        grado_academico_label: option.label
                                                    }); 
                                                }}></Select>
                            </Form.Item>
                        </div>
                    </fieldset>

                    <div className={css['nav-buttons']}>
                        { buttonPrev }

                        <SubmitButton formName={formName}>
                            { btnSubmitContent || 'Finalizar' }
                        </SubmitButton>
                    </div>
                </Form>
            </div>
        </>
    );
}