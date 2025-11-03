import { memo } from "react";
import { Button } from "antd";
import { useFormStore } from "../../stores/formStore";

function SubmitButton({ formName, children, className = 'btn-submit' }) {

    const isValid = useFormStore(
        (state) => state.forms[formName]?.isValid || false
    );

    return (
        <Button className={className} type={'primary'} htmlType="submit" disabled={!isValid}>
            {children}
        </Button>
    )
}

export default memo(SubmitButton);



