const obtenerUsuarios = async () => {
  try {
    const response = await fetch("http://localhost:3001/users");
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

const obtenerUsuarioPorEmail = async (email) => {
  try {
    const response = await fetch(`http://localhost:3001/users?email=${email}`);
    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

const crearUsuario = async (data) => {
  try {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Usuario creado con éxito");
    } else {
      console.error("Error al crear el usuario");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

const modificarUsuario = async (data, id) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Usuario modificado con éxito");
    } else {
      console.error("Error al modificar el usuario");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Usuario eliminado con éxito");
    } else {
      console.error("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};


export {
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario
};


const ObtenerUsuario = async (id) => {

  try {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    });


    if (response.ok) {
      console.log("Usuario obtenido con exito");
    } else {
      console.log("Error al obtner un usuario");
    }

  } catch (error) {
    console.error("Error fallo la conexion");
  }
}