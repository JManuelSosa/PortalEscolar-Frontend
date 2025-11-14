import { Input, Select } from "antd";


const { Search } = Input;

export default function SearchEmployee({ onSelectEmployee = null, poolEmployees}){


    const getDataSelectEmployee = (selectedValue) => {
        // 'selectedValue' es solo el ID (ej. 123)
        
        // Busca el objeto completo en el array de opciones
        const selectedOption = poolEmployees.find(opt => opt.value == selectedValue);
        
        if (selectedOption) {
            onSelectEmployee(selectedOption.dataEmployee); 
        }
    }


    return(
        <>
            <h1>Buscar empleado</h1>
            <span>Es posible que tu nuevo empleado ya haya utilizado los servicios de EduConnect</span>
            <span> ¡Prueba a buscarlo mediante CURP! </span>
            <Select
                showSearch
                options={poolEmployees}
                placeholder="Buscar empleado por CURP..."
                optionFilterProp="curp"
                style={{ width: '100%' }}
                onChange={getDataSelectEmployee}
            />
        </>
    )


}