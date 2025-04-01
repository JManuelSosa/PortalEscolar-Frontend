import { createContext, useReducer, useContext } from "react";

// Crear contexto
const AuthContext = createContext();

// Estado inicial (si hay datos en localStorage, los usa)
const initialState = JSON.parse(localStorage.getItem("authState")) || { user: null };

// Reducer para manejar login y logout
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            const newState = { user: action.payload };
            localStorage.setItem("authState", JSON.stringify(newState)); // Guardar en localStorage
            return newState;
        case "LOGOUT":
            localStorage.removeItem("authState"); // Eliminar del localStorage
            return { user: null };
        default:
            return state;
    }
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);