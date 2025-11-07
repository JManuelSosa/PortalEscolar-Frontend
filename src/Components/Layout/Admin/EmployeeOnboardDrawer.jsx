import { Drawer, Form, Input, Select, DatePicker, Button, Row, Col, Spin, Divider, Typography } from 'antd';
import { useMemo } from 'react';

// 1. Importa tus hooks de datos y mutaciones
import { useOnBoardEmployeeFormData } from '../../../Hooks/Fetching/usePublicData';
import { useEmployeeMutations } from '../../../Hooks/Fetching/useEmployeeMutations';

import InfoPersonalForm from '../../../Components/Auth/InfoPersonalForm';

const searchCity = (optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase());

export default function EmployeeOnboardDrawer({ open, onClose }) {
    const [form] = Form.useForm();

    // 2. Cargar datos para los selects
    const {
        statesForSelect,
        gendersForSelect,
        statesById, // El objeto para buscar ciudades
        rolesForSelect,
        academicDegreesForSelect,
        isLoading: isLoadingFormData, // Renombrado para evitar conflictos
    } = useOnBoardEmployeeFormData();

    // 3. Hook de mutación para enviar el formulario
    const { onBoardEmployee, isOnBoarding } = useEmployeeMutations();

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

    const handleStateChange = () => {
        form.setFieldsValue({
            city: null,
            label_city: null
        });
    }
    
    // "Escucha" el valor del campo 'employee_role'
    const selectedRole = Form.useWatch('employee_role', form);
    
    // Asegúrate de que el valor 'maestro' sea el correcto de tu API
    const isTeacher = selectedRole === 'Maestro'; 

    // 6. Manejador de envío del formulario
    const onFinish = (values) => {
        // 'values' es un objeto plano, justo como tu mutación lo espera
        console.log("Valores del Formulario:", values);
        
        onBoardEmployee(values, {
            onSuccess: () => {
                form.resetFields(); // Limpia el formulario
                onClose(); // Cierra el drawer
            }
        });
    };

    return (
        <Drawer
            title="Registrar Nuevo Empleado"
            width={720} // Un drawer más ancho para el formulario
            onClose={onClose}
            open={open}
            destroyOnHidden={true} // Resetea el formulario al cerrar
            extra={
                <Button 
                    type="primary" 
                    onClick={() => form.submit()} // Llama al onFinish
                    loading={isOnBoarding} // Muestra loading al enviar
                >
                    Guardar
                </Button>
            }
        >

            <InfoPersonalForm></InfoPersonalForm>
            <Spin spinning={isLoadingFormData} tip="Cargando datos del formulario...">

                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    {/* --- SECCIÓN DE PERSONA --- */}
                    <Typography.Title level={5}>Datos Personales</Typography.Title>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="Nombre(s)" rules={[{ required: true, message: 'El nombre es requerido' }]}>
                                <Input placeholder="Ingresa el nombre" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="first_last_name" label="Apellido Paterno" rules={[{ required: true, message: 'El apellido es requerido' }]}>
                                <Input placeholder="Ingresa el apellido paterno" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="second_last_name" label="Apellido Materno">
                                <Input placeholder="Ingresa el apellido materno" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="curp" label="CURP" rules={[{ required: true, message: 'La CURP es requerida' }]}>
                                <Input placeholder="Ingresa la CURP" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="birth_date" label="Fecha de Nacimiento" rules={[{ required: true, message: 'La fecha es requerida' }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="gender" label="Género" rules={[{ required: true, message: 'El género es requerido' }]}>
                                <Select options={gendersForSelect} placeholder="Selecciona un género" 
                                onChange={(value, option) => { 
                                    form.setFieldsValue({
                                        gender: value,
                                        gender_label: option.label
                                    }); 
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Typography.Title level={5}>Datos de Contacto</Typography.Title>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="phone_number" label="Teléfono" rules={[{ required: true, message: 'El teléfono es requerido' }]}>
                                <Input placeholder="Ingresa el teléfono" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="address" label="Dirección" rules={[{ required: true, message: 'La dirección es requerida' }]}>
                                <Input placeholder="Calle, número, colonia" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="state" label="Estado" rules={[{ required: true, message: 'El estado es requerido' }]}>
                                <Select 
                                    options={statesForSelect} 
                                    placeholder="Selecciona un estado" 
                                    onChange={handleStateChange} // <-- Llama al manejador
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="city" label="Ciudad" rules={[{ required: true, message: 'La ciudad es requerida' }]}>
                                <Select 
                                    showSearch
                                    optionFilterProp="label"
                                    disabled={ selectCities.length === 0}
                                    filterSort={ () => { searchCity }}
                                    onChange={(value, option) => { 
                                        form.setFieldsValue({
                                            city: value,
                                            city_label: option.label
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* --- SECCIÓN DE EMPLEADO --- */}
                    <Typography.Title level={5}>Datos Laborales</Typography.Title>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="employee_role" label="Rol" rules={[{ required: true, message: 'El rol es requerido' }]}>
                                <Select options={rolesForSelect} placeholder="Selecciona un rol" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="entry_date" label="Fecha de Ingreso" rules={[{ required: true, message: 'La fecha es requerida' }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="comments" label="Comentarios">
                                <Input.TextArea rows={3} placeholder="Comentarios adicionales" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* --- SECCIÓN CONDICIONAL DE MAESTRO --- */}
                    {isTeacher && (
                        <>
                            <Typography.Title level={5}>Datos de Maestro (Opcional)</Typography.Title>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="academic_degree" label="Grado Académico" rules={[{ required: true, message: 'Requerido si es maestro' }]}>
                                        <Select options={academicDegreesForSelect} placeholder="Selecciona un grado" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="career_name" label="Nombre de Carrera" rules={[{ required: true, message: 'Requerido si es maestro' }]}>
                                        <Input placeholder="Ej. Ingeniería en Software" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            </Spin>
        </Drawer>
    );
}