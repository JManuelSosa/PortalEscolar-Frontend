import { useState, useMemo, useEffect } from "react";

//* Ant
import { Form, Input, DatePicker, Select, Spin, Alert, Button } from "antd";
//* Hooks
import { useAutoForm } from "../../Hooks/useAutoForm";

//* Componentes
import SubmitButton from "../Utilities/SubmitButton";
import LoadingLogo from "../Utilities/LoadingLogo";

//* Css
import css from '@css/Auth/InfoPersonalForm.module.css';
//* Utilidades
import dayjs from "dayjs";
import { personalFormRules } from "../../Js/Utilities/FormRules";




const dateFormat = 'DD/MM/YYYY';
const onFinish = (values) => {}

const searchCity = (optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase());

const loadIndicator = <LoadingLogo size="160px"/>


export default function InfoPersonalForm({ name = null, parentForm = null, processForm, btnSubmitContent, formData, dataEmployeeSelected = null }){

    const nameForm = name ?? 'personal-Info-Form';
    const { form, validateForm } = useAutoForm(nameForm, parentForm, { standalone: false, debounceMs: 700});
    const [current, setCurrent] = useState(0);


    const { statesForSelect = [], gendersForSelect = [], statesById = {}, isLoading, isError } = formData || {};

    const selectedStateId = Form.useWatch('estado', form);

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

    useEffect(() => {
        // Si no hay un empleado seleccionado (es null), salimos.
        // (Opcional: podrías llamar a form.resetFields() aquí si quieres que el form se limpie)
        if (!dataEmployeeSelected) {
            return;
        }

        // 2. Como dijiste, 'dataEmployeeSelected' ES el objeto personalData
        const personData = dataEmployeeSelected; 

        // 3. Usamos la función de búsqueda para encontrar el 'state'
        const matchingStateId = findStateIdByCityId(personData.city, statesById);
        
        // 4. Preparamos el objeto de datos para el formulario
        const formDataToSet = {
            nombre: personData.name,
            primer_apellido: personData.first_last_name,
            segundo_apellido: personData.second_last_name,
            curp: personData.curp,
            genero: personData.gender,
            direccion: personData.address,
            numero_telefonico: personData.phone_number,
            
            // IMPORTANTE: El DatePicker de AntD necesita un objeto dayjs,
            // no un string "YYYY-MM-DD".
            fecha_nacimiento: dayjs(personData.birth_date),
            
            // Asignamos el estado que encontramos y la ciudad
            estado: matchingStateId,
            ciudad: personData.city, // 'city' en el form es 'city_id'
        };

        // 5. Llenamos el formulario con los datos
        form.setFieldsValue(formDataToSet);

    }, [dataEmployeeSelected, form, statesById, validateForm]);

    function findStateIdByCityId(cityId, statesMap) {
        // Si no tenemos el mapa o el ID, no podemos buscar
        if (!statesMap || !cityId) {
            return null;
        }
        
        for (const stateId in statesMap) {
            const stateData = statesMap[stateId];
            
            // Verificamos si el array 'cities' de este estado
            // contiene el 'cityId' que buscamos
            if (stateData.cities?.some(city => city.id === cityId)) {
                // ¡Encontrado! Devolvemos el ID del estado
                // (lo convertimos a número por si acaso)
                return parseInt(stateId, 10);
            }
        }
        
        // Si no se encuentra en ningún estado, devolvemos null
        return null;
    }
    
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
            ciudad: null,
            ciudad_label: null
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
            'numero_telefonico': filteredValue,
        });
    };
    
    const steps = [
        {
            content: (<fieldset className={ css['fieldset'] }>
                        <legend className={css['legend']}>Información Personal</legend>
                        
                            <div className="form-item">
                                <Form.Item name="nombre" label="Nombre" rules={personalFormRules.nombre}>
                                    <Input placeholder="Nombre"/>
                                </Form.Item>
                            </div>

                            <div className="form-item">
                                <Form.Item name="primer_apellido" label="Primer apellido" rules={personalFormRules['primer_apellido']}>
                                    <Input placeholder="Primer Apellido"/>
                                </Form.Item>
                            </div>
            
                            <div className="form-item">
                                <Form.Item name="segundo_apellido" label="Segundo apellido" rules={personalFormRules['segundo_apellido']}>
                                    <Input placeholder="Segundo Apellido"/>
                                </Form.Item>
                            </div>
                    
                    
                            <div className="form-item">
                                <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento" rules={personalFormRules['fecha_nacimiento']}>
                                    <DatePicker className={css['datePicker']} format={dateFormat} minDate={dayjs('1970-01-01')} maxDate={dayjs()}></DatePicker>
                                </Form.Item>
                            </div>

                            <div className="form-item">
                                <Form.Item name="curp" label="CURP" rules={personalFormRules['curp']}>
                                    <Input placeholder="CURP"  maxLength={18}/>
                                </Form.Item>
                            </div>

                            <div className="form-item">
                                <Form.Item name="genero" label="Género" rules={personalFormRules['genero']}>
                                    <Select 
                                        options={gendersForSelect} 
                                        placeholder="Genero" 
                                        classNames={{ popup:{ root:css['custom-dropdown-options']} }}
                                        onChange={(value, option) => { 
                                            form.setFieldsValue({
                                                genero: value,
                                                genero_label: option.label
                                            }); 
                                        }}
                                    ></Select>
                                </Form.Item>
                            </div>
                
                    </fieldset>),
        },
        {
            content: (<fieldset className={css['fieldset']}>

                        <legend className={css['legend']}>Información Contacto</legend>
                
                        <div className="form-item">
                            <Form.Item name="direccion" label="Dirección" rules={personalFormRules['direccion']}>
                                <Input placeholder="Dirección"></Input>
                            </Form.Item>
                        </div>

                        <div className="form-item">
                            <Form.Item name="numero_telefonico" label="Número telefónico" labelAlign="Center" rules={personalFormRules['numero_telefonico']}>
                                <Input type="tel" placeholder="Numero" maxLength={10} onChange={handlePhoneChange}></Input>
                            </Form.Item>
                        </div>

                        <div className="form-item">
                            <Form.Item name="estado" label="Estado" rules={personalFormRules['estado']}>
                                <Select 
                                    options={statesForSelect} 
                                    placeholder="Seleccione su estado" 
                                    onChange={(value, option) => { 
                                        handleState(); 
                                        form.setFieldsValue({
                                            estado: value,
                                            estado_label: option.label
                                        });
                                    }} 
                                    classNames={ { popup:{ root:css['custom-dropdown-options']} } }
                                ></Select>
                            </Form.Item>
                        </div>

                        <div className="form-item">
                            <Form.Item name="ciudad" label="Ciudad" rules={personalFormRules['ciudad']}>
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
                                            ciudad: value,
                                            ciudad_label: option.label
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