import { useEffect, useCallback, useRef } from "react";
import { Form } from "antd";
import { useFormStore } from "../stores/formStore";

/**
 * Hook optimizado para formularios individuales o compuestos
 * @param {string} formName - Nombre único del formulario
 * @param {object} parentForm - Formulario padre (opcional)
 * @param {object} options - Opciones de configuración
 * @param {boolean} options.standalone - Si true, desactiva sincronización con store (mejor rendimiento)
 * @param {number} options.debounceMs - Milisegundos para debounce de validación (default: 300)
 * @param {boolean} options.validateOnChange - Si validar en cada cambio (default: true)
 */

export function useAutoForm(formName, parentForm, options = {}){
    const { standalone = false, debounceMs = 500, validateOnChange = true } = options;
    const [form] = Form.useForm(); // Fallback para cuando se le envia un form Padre
    const { registerForm, unregisterForm, updateFormState } = useFormStore();
    const debounceTimerRef = useRef(null);
    const lastValidationRef = useRef(null);
    

    // Determina qué form usar
    const activeForm = parentForm ?? form;

    // Registrar formulario al montar (En el modo compuesto)
    useEffect(() => {

        if(standalone) return;

        registerForm(formName, activeForm);
        return () => unregisterForm(formName);

    }, [registerForm, formName, activeForm, unregisterForm, standalone]);

    // Memorizar funcion de validacion
    const validate = useCallback( async () => {
        let currentValues = {};
        let isValid = false;

        try {
            await activeForm.validateFields({ validateOnly: true});
            isValid = true;
            currentValues = activeForm.getFieldsValue(true);
        } 
        catch {

            if (Object.keys(currentValues).length === 0) {
                currentValues = activeForm.getFieldsValue(true);
            }
            
            isValid = false;
        }

        // Solo actualizar si cambió (evita re-renders innecesarios)
        const currentState = JSON.stringify({ values: currentValues, isValid });

        if (lastValidationRef.current !== currentState) {
            lastValidationRef.current = currentState;
            
            if (!standalone) {
                updateFormState(formName, { values: currentValues, isValid });
            }
        }

        return { values: currentValues, isValid };
    }, [activeForm, formName, updateFormState, standalone]);


    // Observar cambios y validación automática
    const values = Form.useWatch([], activeForm)

    useEffect(() => {

        if(!validateOnChange) return;

        // Limpiar timer anterior
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // DEBOUNCE REAL: Esperar a que el usuario deje de escribir
        debounceTimerRef.current = setTimeout(() => {
            validate();
        }, debounceMs);

        // Limpiar el timeout como buena practica
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };

    }, [values, validate, validateOnChange, debounceMs]);


    // Método manual de validación (para onSubmit)
    const validateForm = useCallback(async () => {
        return await validate();
    }, [validate]);


    // Retornar form + utilidades extras
    return {
        form: activeForm,
        validateForm,
        isStandalone: standalone
    };
}

// EXPORT de versión simplificada para retrocompatibilidad
export function useAutoFormSimple(formName, parentForm) {
    const { form } = useAutoForm(formName, parentForm);
    return form;
}