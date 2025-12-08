// React
import { useEffect } from "react";

// Ant
import { Form, Select, Input } from "antd";

// Css
import css from "@css/Forms/NewGroupsForm.module.css";


export default function NewGroupForm({ form, dataSelects, onFinish, inCareer = null }) {

    const { carreras, turnosEscolares, grados, grupos, periodosEscolares } = dataSelects;
    
    const opcionesCarrera = inCareer ? carreras.filter(c => c.value == inCareer) : carreras;

    useEffect(() => {
        if (inCareer) {
            form.setFieldsValue({
                carrera: inCareer 
            });
        } else {
            form.resetFields(['carreraID']); 
        }
    }, [inCareer, form]);

    return (
        <>
                <Form className={css['form']} layout="vertical" form={form} autoComplete="off" onFinish={onFinish}>
                    <fieldset className={css['fieldset']}>

                        <legend className={css['legend']}>Información grupo</legend>

                        <div className={css['inputs-form']}>
                            <div className={css['section-name-career']}>
                                <Form.Item className={css['item-section']} name="nombreGrupo" label="Nombre" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
                                    <Input type="text" placeholder="Nombre Grupo"/>
                                </Form.Item>

                                <Form.Item className={css['item-section']} name="carrera" label="Carrera" rules={[{ required: true, message: 'Selecciona carrera' }]}>
                                    <Select placeholder="Selecciona una carrera" options={opcionesCarrera} disabled={!!inCareer}></Select>
                                </Form.Item>
                            </div>

                            <div className={css['section-info-group']}>
                                <div>
                                    <Form.Item name="grado" label="Grado" rules={[{ required: true, message: 'Requerido' }]}>
                                        <Select placeholder="Selecciona grado" options={grados}></Select>
                                    </Form.Item>
                                </div>

                                <div>
                                    <Form.Item name="grupo" label="Grupo" rules={[{ required: true, message: 'Requerido' }]}>
                                        <Select placeholder="Selecciona grupo" options={grupos}></Select>
                                    </Form.Item>
                                </div>

                                <div>
                                    <Form.Item name="turno" label="Turno" rules={[{ required: true, message: 'Requerido' }]}>
                                        <Select placeholder="Selecciona turno" options={turnosEscolares}></Select>
                                    </Form.Item>
                                </div>
                            </div>

                            <div className={css['section-period']}>
                                <Form.Item className={css['item-period']} name="periodo" label="Periodo Escolar" rules={[{ required: true, message: 'Selecciona periodo' }]}>
                                    <Select placeholder="Selecciona el ciclo" options={periodosEscolares}></Select>
                                </Form.Item>
                            </div>
                        </div>
                    </fieldset>
                </Form>
        </>
    )


}