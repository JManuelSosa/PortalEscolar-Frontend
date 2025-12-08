import React, { useState } from 'react';
import { Avatar, Button, Space, Tooltip } from 'antd';
import {
    UserOutlined, QrcodeOutlined, SafetyCertificateOutlined,
    FieldTimeOutlined, IdcardOutlined, ManOutlined, WomanOutlined,
} from '@ant-design/icons';
import '@css/Views/user/Perfil.css';

export default function Perfil() {

    // --- DATOS DEL ESTUDIANTE ---
    const [student] = useState({
        "nombre": "Jose Manuel",
        "primerApellido": "Vazquez",
        "segundoApellido": "Sosa",
        "curp": "VASM001229HYNZSNA1",
        "genero": "male",
        
    });

    // --- HELPERS VISUALES ---
    const getGenderConfig = (g) => {
        if (g === 'male') return { icon: <ManOutlined />, text: 'Masculino', style: 'icon-blue' };
        if (g === 'female') return { icon: <WomanOutlined />, text: 'Femenino', style: 'icon-pink' };
        return { icon: <UserOutlined />, text: 'Otro', style: 'icon-green' };
    };

    const genderConfig = getGenderConfig(student.genero);

    return (
        <div className="modern-profile-wrapper">
            <div className="modern-card">
                <div className="card-content">

                    {/* 1. CABECERA */}
                    <div className="header-flex">
                        <Avatar
                            size={140}
                            icon={<UserOutlined />}
                            className="avatar-shadow"
                        />

                        <div className="student-info">
                            <span style={{ color: '#64748b', fontWeight: 500 }}>Perfil personal</span>
                            <h1>{student.nombre} <br /> {student.primerApellido} {student.segundoApellido}</h1>

                        </div>
                    </div>

                    {/* 2. GRID DE INFORMACIÓN (Cajas) */}
                    <div className="data-grid">

                        {/* Caja: Matrícula */}
                        {/* <div className="data-box">
                            <div className="box-icon icon-purple">
                                <QrcodeOutlined />
                            </div>
                            <span className="label">Matrícula Escolar</span>
                            <span className="value" style={{ fontSize: 20 }}>{student.matricula}</span>
                        </div> */}

                        {/* Caja: Turno */}
                        <div className="data-box">
                            <div className="box-icon icon-orange">
                                <FieldTimeOutlined />
                            </div>
                            <span className="label">Turno Asignado</span>
                            <span className="value">{student.turno}</span>
                        </div>

                        {/* Caja: Género */}
                        <div className="data-box">
                            <div className={`box-icon ${genderConfig.style}`}>
                                {genderConfig.icon}
                            </div>
                            <span className="label">Género</span>
                            <span className="value">{genderConfig.text}</span>
                        </div>

                        {/* Caja: CURP (Ocupa ancho si es necesario, o se ajusta) */}
                        <div className="data-box" style={{ gridColumn: 'span 2' }}>
                            <div className="box-icon icon-green">
                                <SafetyCertificateOutlined />
                            </div>
                            <span className="label">Clave Única de Registro de Población (CURP)</span>
                            <span className="value" style={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                                {student.curp}
                            </span>
                        </div>

                        {/* Caja: ID Interno / Extra */}
                        {/* <div className="data-box">
                            <div className="box-icon icon-blue">
                                <IdcardOutlined />
                            </div>
                            <span className="label">Tipo de Ingreso</span>
                            <span className="value">Nuevo Ingreso</span>
                        </div> */}

                    </div>

                </div>
            </div>
        </div>
    );
}