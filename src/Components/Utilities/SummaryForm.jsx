import { Input, Button } from "antd";
import dayjs from "dayjs";


import css from '@css/Components/SummaryForm.module.css';

    // Helper para formatear valores que no son strings (como las fechas)
    const getDisplayValue = (key, value) => {

        if (!value) return '';

        // Si es la fecha (Day.js object), formatéala
        if (key === 'birth_date') {
            if (dayjs.isDayjs(value)) {
                return value.format('DD/MM/YYYY');
            }
        }
        
        // Para todo lo demás, devuelve el valor como string
        return value.toString();
    };


export default function SummaryForm({ data, map, submitButton = null }){


    const renderSubmitButton = () => {

        if(!submitButton) return null;

        const { label, submitFunction } = submitButton;

        return(
            <>
                <Button type="primary" onClick={ submitFunction } className={css['submit-button']}>
                    { label }
                </Button>
            </>
        )

    }

    return (

        <div className={ css['component-container'] }>
            <span className={css['title-resume']}>Resumen</span>
            {
                Object.keys(map).map((key) => {
                    const label = map[key];
                    const value = data[key];

                    if (!value) return null;

                    return (
                        <div key={key} className={css['container-input-resume']}>
                        <label className={css['label']} htmlFor={label}>{label}</label>
                        <Input 
                            className={css['input']}
                            disabled 
                            value={getDisplayValue(key, value)}
                            name={label}
                            id={label}
                        />
                        </div>
                    );

                })
            }
            {
                renderSubmitButton()
            }
            
        </div>

    );
}