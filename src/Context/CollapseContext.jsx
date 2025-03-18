import { useState, useContext, createContext } from "react";

const CollapsedContext = createContext();

export const CollapsedProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <CollapsedContext.Provider value={{ collapsed, toggleCollapsed }}>
        {children}
        </CollapsedContext.Provider>
    );
};

export const useCollapsed = () => {
    return useContext(CollapsedContext);
};