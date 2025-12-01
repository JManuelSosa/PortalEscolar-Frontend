import React, { useState } from 'react';
import { Table, Tag, Space, Button, Tooltip, Avatar, Result, Typography, Input, Popconfirm, Row, Col } from "antd";
import { IconEdit, IconTrash, IconUser, IconMail, IconPhone, IconSearch, IconPlus } from "@tabler/icons-react";

const { Text } = Typography;

export default function ListaMaestros({ teachers = [], isLoading, isError, onAdd, onEdit, onDelete }) {
    const [searchText, setSearchText] = useState("");

    if (isError) {
        return <Result status="warning" title="Error" subTitle="No se pudieron cargar los datos." />;
    }

    // --- LÓGICA DEL BUSCADOR ---
    // Filtra la lista que viene del padre (teachers) basado en el texto escrito
    const filteredTeachers = teachers.filter((t) => {
        if (!searchText) return true;
        const search = searchText.toLowerCase();
        return (
            t.nombre?.toLowerCase().includes(search) ||
            t.apellido?.toLowerCase().includes(search) ||
            t.email?.toLowerCase().includes(search)
        );
    });

    const columns = [
        {
            title: 'Docente',
            key: 'nombre',
            render: (_, record) => (
                <Space>
                    <Avatar shape="square" icon={<IconUser size={20} />} style={{ backgroundColor: '#1890ff' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text strong>{record.nombre} {record.apellido}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>ID: {record.id}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Contacto',
            key: 'contacto',
            responsive: ['md'],
            render: (_, record) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Space size={4}><IconMail size={14} color="#888" /><Text style={{ fontSize: '13px' }}>{record.email}</Text></Space>
                    {record.telefono && <Space size={4}><IconPhone size={14} color="#888" /><Text type="secondary" style={{ fontSize: '12px' }}>{record.telefono}</Text></Space>}
                </div>
            ),
        },
        {
            title: 'Departamento',
            dataIndex: 'departamento',
            key: 'departamento',
            render: (dep) => <Tag color="blue" style={{ borderRadius: '10px' }}>{dep || 'General'}</Tag>,
        },
        {
            title: 'Acciones',
            key: 'acciones',
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    {/* Botón EDITAR: Llama a la función del padre pasando el registro completo */}
                    <Tooltip title="Editar">
                        <Button type="text" icon={<IconEdit size={18} color="#faad14" />} onClick={() => onEdit(record)} />
                    </Tooltip>

                    {/* Botón ELIMINAR: Llama a la función del padre pasando el ID */}
                    <Popconfirm title="¿Eliminar maestro?" onConfirm={() => onDelete(record.id)} okText="Sí" cancelText="No" okButtonProps={{ danger: true }}>
                        <Tooltip title="Eliminar">
                            <Button type="text" danger icon={<IconTrash size={18} />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            {/* Toolbar */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }} gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Input
                        placeholder="Buscar por nombre o correo..."
                        prefix={<IconSearch size={16} color="#bfbfbf" />}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                        style={{ borderRadius: '8px' }}
                    />
                </Col>
                <Col>
                    <Button type="primary" icon={<IconPlus size={18} />} onClick={onAdd} style={{ borderRadius: '8px' }}>
                        Agregar Maestro
                    </Button>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredTeachers} // Usamos la lista filtrada
                rowKey="id"
                loading={isLoading}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 800 }}
                style={{ background: '#fff', borderRadius: '8px' }}
            />
        </div>
    );
}