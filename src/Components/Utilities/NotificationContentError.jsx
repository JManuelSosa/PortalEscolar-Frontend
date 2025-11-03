export default function NotificationContentError({ data }){

    return(
        <>
            <div>
                        {/* Opcional: Muestra el mensaje general primero */}
                        <p>{data.message || 'Se encontraron los siguientes errores:'}</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            {/* Itera sobre cada clave (ej. "email", "password")
                                Luego itera sobre cada mensaje de error para esa clave
                            */}
                            {Object.keys(data.errors).map(field => (
                                data.errors[field].map((message, index) => (
                                    <li key={`${field}-${index}`}>{message}</li>
                                ))
                            ))}
                        </ul>
            </div>
        
        </>
    )


}