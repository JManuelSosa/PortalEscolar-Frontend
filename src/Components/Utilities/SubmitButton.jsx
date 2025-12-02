import { memo, useEffect, useState } from "react";
import { Button, Form } from "antd";
import { useFormStore } from "../../stores/formStore";

/**
 * SubmitButton optimizado con selector granular de Zustand
 * Solo se re-renderiza cuando cambia la validez de SU formulario específico
 */
function SubmitButton({ formName, children, className = 'btn-submit' }) {

    // Comparación shallow personalizada (solo re-renderiza si isValid realmente cambió)
    const isValid = useFormStore((state) => state.forms[formName]?.isValid ?? false, (prev, next) => prev === next);

    return (
        <Button className={className} type={'primary'} htmlType="submit" disabled={!isValid}>
            {children}
        </Button>
    )
}

export default memo(SubmitButton, (prevProps, nextProps) => {
    return (
        prevProps.formName === nextProps.formName &&
        prevProps.children === nextProps.children &&
        prevProps.className === nextProps.className
    );
});

export function StandaloneSubmitButton({ form, children, className = 'btn-submit' }) {
    // Para formularios standalone, usar validación de Ant Design directamente
    const [isValid, setIsValid] = useState(false);
    const values = Form.useWatch([], form);

    useEffect(() => {
        // Validación debounced
        const timer = setTimeout(async () => {
            try {
                await form.validateFields({ validateOnly: true });
                setIsValid(true);
            } catch {
                setIsValid(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [values, form]);

    return (
        <Button className={className} type={'primary'} htmlType="submit" disabled={!isValid}>
            {children}
        </Button>
    );
}




