import { useState, useContext, createContext, useEffect } from "react";

const CollapsedContext = createContext();

export const CollapsedProvider = ({ children, breakpoint = 768 }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es móvil
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth <= breakpoint;
            setIsMobile(mobile);
            
            // Comportamiento automático: en móvil siempre collapsado
            if (mobile) {
                setCollapsed(true);
            }
        };
        
        // Debounce para optimizar
        const debouncedCheck = debounce(checkScreenSize, 100);
        
        checkScreenSize();
        window.addEventListener('resize', debouncedCheck);
        
        return () => window.removeEventListener('resize', debouncedCheck);
    }, [breakpoint, collapsed]);

    const toggleCollapsed = () => {
        // Solo permitir toggle si NO es móvil
        if (!isMobile) {
            setCollapsed((prev) => !prev);
        }
    };

    // Collapsed efectivo: en móvil siempre true (collapsado)
    const effectiveCollapsed = isMobile ? true : collapsed;

    return (
        <CollapsedContext.Provider value={{ collapsed: effectiveCollapsed, toggleCollapsed, isMobile }}>
        {children}
        </CollapsedContext.Provider>
    );
};

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export const useCollapsed = () => {
    return useContext(CollapsedContext);
};