//* React
import { useState, useMemo, useCallback, useEffect } from 'react';

//* Ant
import { Button, Form } from 'antd';

import EmployeePersonalDataForm from '../../Forms/EmployeePersonalDataForm';
import EmployeeDetailsForm from '../../Forms/EmployeeDetailsForm';
import TeacherDetailsForm from '../../Forms/TeacherDetailsForm';
import SummaryForm from '../../Utilities/SummaryForm';

//* Stores
import { useFormStore } from '../../../stores/formStore';

//* Componentes
import LoadingLogo from '../../Utilities/LoadingLogo';
import { onBoardEmployeeLabelMap } from '../../../Js/Utilities/LabelMap';

//* Http
import { useOnBoardEmployeeFormData, useSystemEmployees } from '../../../Hooks/Fetching/usePublicData';
import { useEmployeeMutations } from '../../../Hooks/Fetching/useEmployeeMutations';

//* css
import css from '@css/Forms/EmployeeOnBoardForm.module.css';

export default function EmployeeOnboardForm({ closeModal = null }) {

    const personalInfoFormData = useOnBoardEmployeeFormData();
    const { data: poolEmployees, isLoading: isLoadingEmployees } = useSystemEmployees();
    const { validateAllForms, getFormValues } = useFormStore();
    const { onBoardEmployee, isOnBoarding, isOnBoardingSuccess } = useEmployeeMutations();

    const [ currentDataForm, setCurrentDataForm ] = useState({});
    const [ current, setCurrent ] = useState(0);
    const [formNewEmployee] = Form.useForm();

    const nameForm = 'Form-NewEmployee';
    const currentForm = formNewEmployee
    const isWizardLoading = personalInfoFormData.isLoading || isLoadingEmployees;

    useEffect(() => {
        if(isOnBoardingSuccess && closeModal){
            closeModal();
        }
    }, [isOnBoardingSuccess]);

    const next = useCallback(async () => {
        const valid = await validateAllForms();
        if (valid) setCurrent(c => c + 1); 
    }, [validateAllForms]);

    const prev = useCallback(() => {
        setCurrent(c => c - 1);
    }, []);

    const goToResume = useCallback(() => { 
        const allValues = getFormValues(nameForm);
        setCurrentDataForm(allValues);
        next();
    }, [getFormValues, nameForm, next]);

    const buttonPrev = ( <Button onClick={prev}>Atras</Button>)

    const sendOnBoardForm = () => {
        const allValues = getFormValues(nameForm);
        onBoardEmployee(allValues);
    }

    const submitButton = {
        label: "Dar de alta",
        submitFunction: sendOnBoardForm
    }

    const selectedRole = useFormStore(
        (state) => state.forms[nameForm]?.values?.rol_label 
    );

    const isTeacher = selectedRole === personalInfoFormData?.rawRoles?.teacher;

    const steps = useMemo( () => {
        const dynamicSteps = [
            {
                key: 'personal',
                content: 
                    <EmployeePersonalDataForm 
                        formName={nameForm} 
                        formInstance={currentForm} 
                        processForm={next} 
                        formConfigData={personalInfoFormData}
                        poolEmployees={poolEmployees}
                    />,
            },
            {
                key: 'details',
                content: 
                    <EmployeeDetailsForm 
                        formName={nameForm} 
                        formInstance={currentForm} 
                        formConfigData={personalInfoFormData}
                        processForm={ isTeacher ? next : goToResume}
                        btnSubmitContent={ isTeacher ? 'Siguiente' : 'Ver resumen'}
                        buttonPrev={buttonPrev}
                    />,
            },
        ];

        if(isTeacher){
            dynamicSteps.push({
                key: 'teacher',
                content: 
                    <TeacherDetailsForm
                        formName={nameForm}
                        formInstance={currentForm}
                        formConfigData={personalInfoFormData}
                        processForm={ goToResume }
                        btnSubmitContent={'Ver resumen'}
                        buttonPrev={buttonPrev}
                    />
            });
        }

        dynamicSteps.push({
            key: 'summary',
            content: <SummaryForm map={ onBoardEmployeeLabelMap } data={ currentDataForm } submitButton={submitButton} buttonPrev={buttonPrev}/>
        });
        
        return dynamicSteps
    }, [isTeacher, nameForm, currentForm, personalInfoFormData, poolEmployees, next, goToResume, currentDataForm, onBoardEmployeeLabelMap, buttonPrev, submitButton])

    if (isWizardLoading) {
        return (
            <div className={css['container-loader']}>
                <LoadingLogo/>
                <span>Cargando formulario....</span>
            </div>
        );
    }

    if(isOnBoarding){
        return(
            <>
                <div className={css['container-loader']}>
                    <LoadingLogo/>
                    <span>Alta en proceso, por favor espere...</span>
                </div>
            </>
        )
    }

    return(
        <>
            <section className="form-container" 
                style={{
                    alignItems: "center"
                }}
            >
                {steps[current].content}
            </section>
        
        </>
    );
}