import { useState, useMemo } from "react";
import { Flex, Input, Select, Row, Col, Empty } from "antd";

import AlumnoResumen from "./AlumnoResumen";

import css from '@css/Layout/ListaAlumnos.module.css';

import { SearchHelper } from "@js/Helpers/SearchHelper";

export default function ListaAlumnos(){

    const { Search } = Input;
    const [searchTerm, setSearchTerm] = useState('');
    const [number, setNumber] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        enrollment: '',
        status: null
    });

    const searchClassNames = {
        input: css.buscador
    }

    const emptyClassNames = {
        image: css.emptyImage,
        description: css.emptyDescription
    }

    const optionsSelect = [
        { value: 1, label: <span className={css.optionSelect}>Activo</span> },
        { value: 2, label: <span className={css.optionSelect}>Espera de pago</span>},
        { value: 3, label: <span className={css.optionSelect}>Sin reinscripcion</span>},
    ]

    const alumnos = [
        { id: 1, name: "María García", age: 20, enrollment: '22090911', status: 1},
        { id: 2, name: "Carlos Rodríguez", age: 22, enrollment: '22110662', status: 1},
        { id: 3, name: "Ana Martínez", age: 19, enrollment: '22098753', status: 3},
        { id: 4, name: "Luis Fernández", age: 21, enrollment: '22008263', status: 2},
        { id: 5, name: "Sofía López", age: 20, enrollment: '22093333', status: 2},
        { id: 6, name: "Javier Pérez", age: 23, enrollment: '22098753', status: 1},
        { id: 7, name: "Elena Sánchez", age: 19, enrollment: '22097362', status: 2},
        { id: 8, name: "Miguel González", age: 22, enrollment: '22098745', status: 1},
        { id: 9, name: "Lucía Díaz", age: 20, enrollment: '22090834', status: 1},
        { id: 10, name: "Daniel Ruiz", age: 21, enrollment: '22098745', status: 2},
        { id: 11, name: "Paula Hernández", age: 19, enrollment: '22098374', status: 1},
        { id: 12, name: "Alejandro Jiménez", age: 22, enrollment: '22098463', status: 1},
        { id: 13, name: "Isabel Moreno", age: 20, enrollment: '22098745', status: 3},
        { id: 14, name: "David Álvarez", age: 23, enrollment: '22098374', status: 3},
        { id: 15, name: "Carmen Romero", age: 19, enrollment: '22097384', status: 1},
        { id: 16, name: "Pablo Navarro", age: 21, enrollment: '22099374', status: 3},
        { id: 17, name: "Laura Torres", age: 20, enrollment: '22099304', status: 1},
        { id: 18, name: "Adriana Molina", age: 22, enrollment: '22090009', status: 2},
    ];

    const alumnosParaBusqueda = useMemo(() => alumnos.map(alumno => (
        { ...alumno, 
            normalizedName: SearchHelper.normalizeTextWithoutAccents(alumno.name.toLowerCase())
        }
    )), []);

    // 2. Memorizar listado filtrado
    const filteredList = useMemo(() => {
        if (!searchTerm.trim()) return alumnosParaBusqueda;
        
        const normalizedTerm = SearchHelper.normalizeTextWithoutAccents(searchTerm.toLowerCase().trim());
        return alumnosParaBusqueda.filter(alumno => 
        alumno.normalizedName.includes(normalizedTerm)
        );
    }, [searchTerm, alumnosParaBusqueda]);

    const filtrarLista = useMemo(() => {
        return alumnosParaBusqueda.filter(alumno => {

            const matchForName = !filters.name.trim() || alumno.normalizedName.includes(
                SearchHelper.normalizeTextWithoutAccents(filters.name.toLowerCase().trim()));

            const matchForEnrollment = !filters.enrollment.trim() || alumno.enrollment.includes(filters.enrollment.trim());

            const matchForStatus = !filters.status || alumno.status === filters.status;

            return matchForName && matchForEnrollment && matchForStatus;
        })
    }, [alumnosParaBusqueda, filters])

    // 3. Memorizar componentes renderizados
    const studentComponents = useMemo(() => 
        filtrarLista.map(alumno => (
        <AlumnoResumen key={alumno.id} alumno={alumno} />
        )),
        [filtrarLista]
    );
    
    const flexClassNames = [
        css.contenedorAlumnos,
        studentComponents.length === 0 && css.contenedorVacio
    ].filter(Boolean).join(' ');


    const handleSearch = (texto) => {
        const nombre = texto.target.value;
        setFilters(prev => ({...prev, name: nombre}));
    }

    const handleFilterSelect = (value) => {
        const validValue = (value === undefined) ? null : value;

        setFilters(prev=>({...prev, status: validValue}));
    }

    const regOnlyNumbers = /^\d+$/;

    const handleNumber = (digit) => {
        const number = digit.target.value;
        if (regOnlyNumbers.test(number)) {
            setNumber(number);
            setFilters(prev => ({...prev, enrollment: number}));
        }
    }

    const onClear = () => setFilters(prev => ({...prev, name:''}));
    const onClearNumber = () => {
        setNumber('');
        setFilters(prev => ({...prev, enrollment: ''}));
    };

    return (
        <>
            <Row className={css.rowBuscador}>
                <Col xs={24} sm={12} md={12} lg={8} className={css.colSearch}>
                    <label htmlFor="searchStudents">Búsqueda por nombre</label>
                    <Search className={css.inputSearch} id="searchStudents" classNames={searchClassNames} placeholder="Nombre" size="large" onInput={handleSearch} onClear={onClear} enterButton allowClear/>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} className={css.colSearch}>
                    <label htmlFor="searchEnrollment">Búsqueda por matrícula</label>
                    <Search className={css.inputSearch} id="searchEnrollment" classNames={searchClassNames} placeholder="Matricula" size="large" value={number} onInput={handleNumber} onClear={onClearNumber} enterButton allowClear/>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} className={css.colSearch}>
                    <label htmlFor="searchStudents">Búsqueda por estado</label>
                        <Select
                            className={css.inputSelect}
                            size="large"
                            allowClear
                            options={optionsSelect}
                            placeholder={<span className={css.selectPlaceholder}>Selecciona</span>}
                            onChange={(value) => handleFilterSelect(value)}
                        />
                </Col>
                
            </Row>
            <Flex gap={32} className={flexClassNames} vertical={false} wrap align="center" justify="center">
                { 
                    (studentComponents.length > 0) 
                    ? studentComponents 
                    : <Empty className={css.empty} classNames={emptyClassNames} description={"Alumno no encontrado"}/>
                }    
            </Flex>
        </>
    );
}