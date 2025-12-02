// Ant
import { Form, Input, Button, DatePicker, Card, InputNumber, Divider, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { IconTrash } from '@tabler/icons-react';

// Utilidades
import { schoolPeriodFormRules, dateRangeValidator } from '../../Js/Utilities/FormRules';

// Css
import css from '@css/Forms/PeriodTemplateForm.module.css';

export default function SchoolPeriodForm({ form, onFinish, dataSelectCycle, dataSelectPeriods, dataSelectSubperiods, isPending }){

    const cardClassNames = {
        body: css['card-body']
    }

    return (
        
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete='off'
            className={css['form-periodTemplate']}
        >
        {/* Periodo padre */}
        <Card title="Datos del Periodo" className={css['card-padre']} classNames={cardClassNames}>
        
            <Form.Item label="Nombre del Periodo" name={['periodoEscolar', 'nombre']} rules={schoolPeriodFormRules.periodoEscolar.nombre}>
                <Input placeholder="Ej: Primer Cuatrimestre" />
            </Form.Item>

            <div className={css['fechas-periodoPadre']}>
                <Form.Item label="Inicio" name={['periodoEscolar', 'fechaInicio']} rules={schoolPeriodFormRules.periodoEscolar.fechaInicio}>
                    <DatePicker />
                </Form.Item>

                <Form.Item label="Fin" name={['periodoEscolar', 'fechaFin']} 
                    dependencies={[['periodoEscolar', 'fechaInicio']]}
                    rules={[
                        ...schoolPeriodFormRules.periodoEscolar.fechaFin,
                        dateRangeValidator(form.getFieldValue, ['periodoEscolar', 'fechaInicio'], 'after')
                    ]}
                >
                    <DatePicker />
                </Form.Item>
            </div>

            <div className={css['datos-periodoPadre']}>
                <Form.Item label="Orden" name={['periodoEscolar', 'numeroOrdinal']} rules={schoolPeriodFormRules.periodoEscolar.numeroOrdinal}>
                    <InputNumber min={1}/>
                </Form.Item>

                <Form.Item label="Ciclo Escolar" name={['periodoEscolar', 'cicloEscolar']}>
                    <Select options={dataSelectCycle}></Select>
                </Form.Item>

                <Form.Item label="Tipo periodo" name={['periodoEscolar', 'tipoPeriodoEscolar']}>
                    <Select options={dataSelectPeriods}/>
                </Form.Item>
            </div>
            

        </Card>

        {/* Array de subperiodos hijos */}
        <Card title="Parciales / Cortes Evaluativos" classNames={css['card-body']}>

            <Form.List name="subperiodosEscolares">
            {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key} className={css['contenido-subperiodo']}>

                        <div className={css['subperiodos']}>
                            {/* Nombre del Parcial */}
                            <div className={css['nombre-subperiodo']}>
                                <Form.Item
                                    {...restField}
                                    label="Nombre Subperiodo"
                                    name={[name, 'nombre']}
                                    rules={schoolPeriodFormRules.subperiodosEscolares.nombre}
                                    className={css['input-nombre']}
                                >
                                    <Input placeholder="Nombre Parcial" />
                                </Form.Item>

                                <IconTrash onClick={() => remove(name)} className={css['icon-trash']} />
                            </div>
                            
                            <div className={css['select-tipo']}>
                                <Form.Item {...restField} label="Tipo" name={[name, 'tipoSubperiodo']} rules={schoolPeriodFormRules.subperiodosEscolares.tipo}>
                                    <Select options={dataSelectSubperiods}/>
                                </Form.Item>
                            </div>

                            <div className={css["data-subperiodo"]}>
                                {/* Fechas del Parcial */}

                                <Form.Item
                                    {...restField}
                                    label="Fecha Inicio"
                                    name={[name, 'fechaInicio']}
                                    rules={schoolPeriodFormRules.subperiodosEscolares.fechas}
                                >
                                    <DatePicker placeholder="Inicio" />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    label="Fecha Fin"
                                    name={[name, 'fechaFin']}
                                    dependencies={[['subperiodosEscolares', index, 'fechaInicio']]}
                                    rules={[ ...schoolPeriodFormRules.subperiodosEscolares.fechas,
                                        dateRangeValidator(form.getFieldValue, ['subperiodosEscolares', name, 'fechaInicio'], 'after')
                                    ]}
                                >
                                    <DatePicker placeholder="Fin" />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'numeroOrdinal']}
                                    initialValue={index + 1} // Sugerencia automática de orden
                                    label="Orden"
                                    rules={schoolPeriodFormRules.periodoEscolar.numeroOrdinal}
                                >
                                    <InputNumber min={1} disabled/>
                                </Form.Item>

                            </div>
                        </div>

                        <Divider></Divider>
                    </div>
                ))}
                
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Agregar Parcial
                    </Button>
                </Form.Item>
                </>
            )}
            </Form.List>
        </Card>

        <Button htmlType="submit" block className={css['button-submit']} loading={isPending}>
            Guardar Configuración
        </Button>
        </Form>
    
    )

}