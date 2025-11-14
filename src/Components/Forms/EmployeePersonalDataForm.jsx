//* React
import { useState } from 'react';


import InfoPersonalForm from '../../Components/Auth/InfoPersonalForm';
import SearchEmployee from '../Utilities/SearchEmployee';



export default function EmployeePersonalDataForm({ formName, formInstance, processForm, formConfigData, poolEmployees }){
    const [employeeSelected, setEmployeeSelected] = useState(null);

    const selectEmployee = (employee) => {
        setEmployeeSelected(employee);
    }

    const personalFormData = {
        statesForSelect: formConfigData.statesForSelect,
        gendersForSelect: formConfigData.gendersForSelect,
        statesById: formConfigData.statesById,
        isLoading: formConfigData.isLoading,
        isError: formConfigData.isError
    }

    return(
        <div>
            <SearchEmployee onSelectEmployee={selectEmployee} poolEmployees={poolEmployees}/>
            <InfoPersonalForm 
                name={formName}
                formData={personalFormData} 
                parentForm={formInstance} 
                dataEmployeeSelected={employeeSelected} 
                btnSubmitContent={'Siguiente'} 
                processForm={processForm}></InfoPersonalForm>
        </div>
    );

}