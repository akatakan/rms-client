import React,{ createContext, useContext, useEffect, useState } from "react";


interface ThemeContextType{
    isDark: boolean;
    toggleTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDark));
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme: ()=> setIsDark(!isDark)}}>
            {children}
        </ThemeContext.Provider>
    );
}


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
