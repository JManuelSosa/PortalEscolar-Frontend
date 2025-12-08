import { Input, Select } from "antd";


const { Search } = Input;

export default function SearchPerson({ onSelectElement = null, poolPersons, nameElement = 'persona' }){


    const getDataSelectElement = (selectedValue) => {
        // 'selectedValue' es solo el ID (ej. 123)
        
        // Busca el objeto completo en el array de opciones
        const selectedOption = poolPersons.find(opt => opt.value == selectedValue);
        
        if (selectedOption) {
            onSelectElement(selectedOption.dataEmployee); 
        }
    }


    return(
        <>
            <h1>Buscar {nameElement}</h1>
            <span>Es posible que tu nuevo {nameElement} ya haya utilizado los servicios de EduConnect</span>
            <span> ¡Prueba a buscarlo mediante CURP! </span>
            <Select
                showSearch
                options={poolPersons}
                placeholder={`Buscar ${nameElement} por CURP ...`}
                optionFilterProp="curp"
                style={{ width: '100%' }}
                onChange={getDataSelectElement}
            />
        </>
    )


}