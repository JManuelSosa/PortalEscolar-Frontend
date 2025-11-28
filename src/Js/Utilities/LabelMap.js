const dataPersonMap = {
    nombre: "Nombre",
    primer_apellido: "Primer apellido",
    segundo_apellido: "Segundo apellido",
    curp: "Curp",
    fecha_nacimiento: "Fecha de Nacimiento",
    genero_label: "Género",
    direccion: "Dirección",
    numero_telefonico: "Teléfono",
    estado_label: "Estado", 
    ciudad_label: "Ciudad"
}

export const registerLabelMap = {
    email: "Correo",
    nombre: "Nombre",
    ...dataPersonMap
}

export const onBoardEmployeeLabelMap = {
    ...dataPersonMap,
    fecha_entrada: "Fecha de entrada" ,
    comentarios: "Comentarios",
    rol_label: "Rol",
    carrera: "Carrera",
    grado_academico_label: "Grado Académico"
}