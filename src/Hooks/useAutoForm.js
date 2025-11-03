import { useEffect } from "react";
import { Form } from "antd";
import { useFormStore } from "../stores/formStore";

export function useAutoForm(formName, parentForm){

    const [form] = Form.useForm(); // Fallback para cuando se le envia un form Padre
    const { registerForm, unregisterForm, updateFormState } = useFormStore();

    // Determina qué form usar
    const activeForm = parentForm ?? form;

    // Registrar formulario al montar
    useEffect(() => {
        registerForm(formName, activeForm);

        return () => unregisterForm(formName);
    }, [registerForm, formName, activeForm, unregisterForm]);

    // Observar cambios y validación automática
    const values = Form.useWatch([], activeForm)

    useEffect(() => {

        const validate = async () => {
            let currentValues = {};
            let isValid = false;

            try {
                await activeForm.validateFields({ validateOnly: true });
                isValid = true;
                currentValues = activeForm.getFieldsValue(true);
            } 
            catch {

                if (Object.keys(currentValues).length === 0) {
                    currentValues = activeForm.getFieldsValue(true);
                }
                isValid = false;
            } finally {
                updateFormState(formName, { values: currentValues, isValid })
            }
        };

        /*  
            CORRECCIÓN: Envuelve la validación en un setTimeout
            Esto la empuja al final de la cola de eventos,
            después de que los Form.Item se hayan renderizado.
        */
        const timerId = setTimeout(validate, 0);

        // Es buena práctica limpiar el timeout
        return () => clearTimeout(timerId);

    }, [values, activeForm, formName, updateFormState]);


    return activeForm;
}