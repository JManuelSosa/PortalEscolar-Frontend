import { Form, DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";
import { useAutoForm } from "../../Hooks/useAutoForm";
import { onBoardEmployeeFormRules } from "../../Js/Utilities/FormRules";
import SubmitButton from "../Utilities/SubmitButton";

//* Css
import formLayout from '@css/Layout/Utilities/FormLayout.module.css'
import css from '@css/Forms/EmployeeDetailsForm.module.css'

const dateFormat = 'DD/MM/YYYY';
const { TextArea } = Input;

const process = () => { }

export default function EmployeeDetailsForm({ formName, formConfigData, formInstance, btnSubmitContent, processForm, buttonPrev = null }){

    const { form } = useAutoForm(formName, formInstance, { standalone: false, debounceMs: 700});
    const { rolesForSelect } = formConfigData;

    return(
        <>    
            <div className={css['container']}>
                <Form autoComplete="off" layout="vertical" form={form} name={formName} onFinish={ processForm || process}>
                    
                        <fieldset className={formLayout['fieldset']}>
                            <legend className={formLayout['legend']}>Detalles empleado</legend>
                                <div className={css['first-row']}>
                                    <div className={css['form-item']}>
                                        <Form.Item name="fecha_entrada" label="Fecha de entrada" rules={onBoardEmployeeFormRules.fecha_entrada}>
                                            <DatePicker className={css['date-picker']} format={dateFormat} minDate={dayjs('1970-01-01')} maxDate={dayjs()}></DatePicker>
                                        </Form.Item>
                                    </div>

                                    <div className={css['form-item']}>
                                        <Form.Item name="rol" label="Rol" rules={onBoardEmployeeFormRules.rol}>
                                            <Select 
                                                options={rolesForSelect}
                                                onChange={(value, option) => { 
                                                    form.setFieldsValue({
                                                        rol: value,
                                                        rol_label: option.label
                                                    }); 
                                                }}
                                            ></Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className={css['second-row']}>
                                    <Form.Item name="comentarios" label="Comentarios">
                                        <TextArea rows={4}></TextArea>
                                    </Form.Item>
                                </div>
                        </fieldset>

                        <div className={css['buttons-navigation']}>
                            { buttonPrev }
                            <SubmitButton formName={formName} type="primary" htmlType="submit">
                                { btnSubmitContent || 'Finalizar' }
                            </SubmitButton>
                        
                        </div>
                </Form>
            </div>
        </>
    )

}