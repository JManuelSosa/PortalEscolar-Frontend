export const transformSystemEmployees = (rawApiData) => {

    if (!rawApiData) {
        return [];
    }

    const dataForSearchEmployee = rawApiData.map( (employee) => ({
        label: `${employee.personalData.name} ${employee.personalData.first_last_name} ${employee.personalData.second_last_name} - ${employee.personalData.curp}`,
        value: employee.id,
        curp: employee.personalData.curp,
        dataEmployee: employee.personalData
    }));

    return dataForSearchEmployee;
}