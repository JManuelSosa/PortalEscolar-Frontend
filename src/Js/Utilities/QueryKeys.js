export const queryKeys = { 
    registerFormData: ["registerFormData"],
    onBoardEmployeeFormData: ["onBoardEmployeeFormData"],
    newTemplateFormData: ["newTemplateFormData"],
    employees: (schoolId) => ["employees", schoolId],
    divisions: (schoolId) => ["divisions", schoolId],
    periodTemplates: (schoolId) => ["subperiodTemplate", schoolId],
    careersByDivision: (schoolId, divisionId) => ["careers", schoolId, divisionId],
    systemEmployees: ["systemEmployees"]
};