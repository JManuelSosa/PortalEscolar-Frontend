//* React
import { useState } from 'react';

import InfoPersonalForm from '../Auth/InfoPersonalForm';
import SearchPerson from '../Utilities/SearchPerson';

export default function StudentsPersonalDataForm({ formName, formInstance, processForm, formConfigData, poolEmployees }){
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
            <SearchPerson onSelectElement={selectEmployee} poolPersons={poolEmployees} nameElement='empleado'/>
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