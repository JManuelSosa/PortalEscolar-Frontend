export const queryKeys = { 
    registerFormData: ["registerFormData"],
    onBoardEmployeeFormData: ["onBoardEmployeeFormData"],
    newTemplateFormData: ["newTemplateFormData"],
    newGroupFormData: ['newGroupFormData'],
    employees: (schoolId) => ["employees", schoolId],
    divisions: (schoolId) => ["divisions", schoolId],
    groups: (schoolId) => ["groups", schoolId],
    periodTemplates: (schoolId) => ["subperiodTemplate", schoolId],
    careersByDivision: (schoolId, divisionId) => ["careers", schoolId, divisionId],
    systemEmployees: ["systemEmployees"]
};