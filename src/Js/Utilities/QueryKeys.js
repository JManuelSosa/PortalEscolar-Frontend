export const queryKeys = { 
    registerFormData: ["registerFormData"],
    onBoardEmployeeFormData: ["onBoardEmployeeFormData"],
    employees: (schoolId) => ["employees", schoolId],
    divisions: (schoolId) => ["divisions", schoolId],
    careersByDivision: (schoolId, divisionId) => ["careers", schoolId, divisionId],
    systemEmployees: ["systemEmployees"]
};