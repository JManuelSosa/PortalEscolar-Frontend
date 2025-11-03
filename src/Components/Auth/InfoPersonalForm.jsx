import { useState, useMemo } from "react";

//* Ant
import { Form, Input, DatePicker, Select, Spin, Alert, Button } from "antd";
//* Hooks
import { useAutoForm } from "../../Hooks/useAutoForm";
import { useRegisterFormData } from "../../Hooks/Fetching/usePublicData";
//* Componentes
import SubmitButton from "../Utilities/SubmitButton";
import LoadingLogo from "../Utilities/LoadingLogo";

//* Css
import css from '@css/Auth/InfoPersonalForm.module.css';
//* Utilidades
import dayjs from "dayjs";
import { personalFormRules } from "../../Js/Utilities/FormRules";


const dateFormat = 'DD/MM/YYYY';
const onFinish = (values) => {
    console.log(values)
}

const searchCity = (optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase());

const loadIndicator = <LoadingLogo size="160px"/>


export default function InfoPersonalForm({ name = null, parentForm = null, processForm, btnSubmitContent }){

    const nameForm = name ?? 'personal-Info-Form';
    const form = useAutoForm(nameForm, parentForm);
    const [current, setCurrent] = useState(0);

    const { statesForSelect, gendersForSelect, statesById, isLoading, isError } = useRegisterFormData();

    const selectedStateId = Form.useWatch('state', form);

    const selectCities = useMemo(() => {
        if (!selectedStateId || !statesById) {
            return [];
        }
        const selectedState = statesById[selectedStateId];
        
        if(!selectedState || !selectedState.cities){
            return [];
        }

        return selectedState.cities.map(city => ({
            label: city.name,
            value: city.id
        }));
    }, [selectedStateId, statesById]);
    
    if (isLoading){ 
        return (
            <div style={{height:"100%", width: "100%", display: 'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <Spin className={css['spin']} spinning={isLoading} indicator={loadIndicator}/>
            </div>
        )
    };

    if (isError) {return <Alert message="Error" description="No se pudieron cargar los datos del formulario." type="error" />};
    
    
    const handleState = () => {
        form.setFieldsValue({
            city: null,
            label_city: null
        });
    }

    const handlePhoneChange = (e) => {
        // 1. Obtiene el valor crudo del input
        const { value } = e.target;

        // 2. Usa regex para eliminar cualquier cosa que NO sea un dígito
        // \D es un atajo para [^0-9] (todo lo que no es un dígito)
        const filteredValue = value.replace(/\D/g, '');

        // 3. Actualiza el valor en el formulario de AntD
        // Esto fuerza al <Input> a mostrar solo el valor filtrado
        form.setFieldsValue({
            'phone_number': filteredValue,
        });
    };
    
    const steps = [
        {
            title: 'First',
            content: (<fieldset className={ css['fieldset'] }>
                        <legend className={css['legend']}>Información Personal</legend>
                        
                            <div className="form-item">
                                <Form.Item name="name" label="Nombre" rules={personalFormRules.name}>
                                    <Input placeholder="Nombre"/>
                                </Form.Item>
                            </div>

                            <div className="form-item">
                                <Form.Item name="first_last_name" label="Primer apellido" rules={personalFormRules['first_last_name']}>
                                    <Input placeholder="Primer Apellido"/>
                                </Form.Item>
                            </div>
            
                            <div className="form-item">
                                <Form.Item name="second_last_name" label="Segundo apellido" rules={personalFormRules['second_last_name']}>
                                    <Input placeholder="Segundo Apellido"/>
                                </Form.Item>
                            </div>
                    
                    
                            <div className="form-item">
                                <Form.Item name="birth_date" label="Fecha de Nacimiento" rules={personalFormRules['birth_date']}>
                                    <DatePicker className={css['datePicker']} format={dateFormat} minDate={dayjs('1970-01-01')} maxDate={dayjs()}></DatePicker>
                                </Form.Item>
                            </div>

                            <div className="form-item">
                                <Form.Item name="curp" label="CURP" rules={personalFormRules['curp']}>
                                    <Input placeholder="CURP"  maxLength={18}/>
                                </Form.Item>
                            </div>

                            <div className="form-item">
                                <Form.Item name="gender" label="Género" rules={personalFormRules['gender']}>
                                    <Select 
                                        options={gendersForSelect} 
                                        placeholder="Genero" 
                                        classNames={{ popup:{ root:css['custom-dropdown-options']} }}
                                        onChange={(value, option) => { 
                                            form.setFieldsValue({
                                                gender: value,
                                                gender_label: option.label
                                            }); 
                                        }}
                                    ></Select>
                                </Form.Item>
                            </div>
                
                    </fieldset>),
        },
        {
            title: 'First',
            content: (<fieldset className={css['fieldset']}>

                        <legend className={css['legend']}>Información Contacto</legend>
                
                        <div className="form-item">
                            <Form.Item name="address" label="Dirección" rules={personalFormRules['address']}>
                                <Input placeholder="Dirección"></Input>
                            </Form.Item>
                        </div>

                        <div className="form-item">
                            <Form.Item name="phone_number" label="Número telefónico" labelAlign="Center" rules={personalFormRules['phone_number']}>
                                <Input type="tel" placeholder="Numero" maxLength={10} onChange={handlePhoneChange}></Input>
                            </Form.Item>
                        </div>

                        <div className="form-item">
                            <Form.Item name="state" label="Estado" rules={personalFormRules['state']}>
                                <Select 
                                    options={statesForSelect} 
                                    placeholder="Seleccione su estado" 
                                    onChange={(value, option) => { 
                                        handleState(); 
                                        form.setFieldsValue({
                                            state: value,
                                            state_label: option.label
                                        });
                                    }} 
                                    classNames={ { popup:{ root:css['custom-dropdown-options']} } }
                                ></Select>
                            </Form.Item>
                        </div>

                        <div className="form-item">
                            <Form.Item name="city" label="Ciudad" rules={personalFormRules['city']}>
                                <Select 
                                    options={selectCities} 
                                    placeholder="Seleccione su ciudad" 
                                    disabled={ selectCities.length === 0}
                                    showSearch
                                    optionFilterProp="label"
                                    filterSort={ () => { searchCity }}
                                    classNames={ { popup:{ root:css['custom-dropdown-options']} } }
                                    onChange={(value, option) => { 
                                        form.setFieldsValue({
                                            city: value,
                                            city_label: option.label
                                        });
                                    }}
                                ></Select>
                            </Form.Item>
                        </div>

                    </fieldset>),
        }
    ];

    const next = async () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    
    return (
        <>
            <Form name={ nameForm } onFinish={ processForm || onFinish } form={ form } preserve={true} autoComplete="off" layout="vertical" className={css['PersonalInfo-Form']}>

                <div className={css['inputs']}>
                    {/* Mapeamos todos los pasos */}
                    {steps.map((step, index) => (
                        <div key={index} 
                            // Oculta el div si no es el paso actual
                            style={{ display: current === index ? 'block' : 'none', width: '100%' }}
                        >
                            {step.content}
                        </div>
                    ))}

                </div>

                <div className={css['step-buttons']}>
                    
                    {/* Botón "Anterior" (para pasos internos) */}
                    {current > 0 && (
                        <Button onClick={prev}>
                            Anterior
                        </Button>
                    )}

                    {/* Botón "Siguiente" (para pasos internos) */}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Siguiente
                        </Button>
                    )}

                    {/* Botón "Finalizar" (el que envía el formulario) */}
                    {current === steps.length - 1 && (
                        <SubmitButton formName={nameForm} type="primary" htmlType="submit">
                            {/* Usa la prop que te pasa el padre */}
                            { btnSubmitContent || 'Finalizar' } 
                        </SubmitButton>
                    )}
                </div>

            </Form>

        
        </>
    )


}