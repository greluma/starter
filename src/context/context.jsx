import { createContext, useContext, useState, useEffect } from 'react';

// creamos el contexto
const AppContext = createContext();

const getInitialDarkMode = () => {
    const userPreferences = window.matchMedia('(prefers-color-scheme:dark)').matches;
    const storeDarkMode = localStorage.getItem('darkTheme') === 'true'
    return storeDarkMode || userPreferences
}

getInitialDarkMode()

// se crea el provider con que se envuelven los componentes
export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState('cat')

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        const body = document.querySelector('body');
        body.classList.toggle('dark-theme', newDarkTheme);
        setIsDarkTheme(newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme)
    };

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }, [])

    return (
        <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
            {children}
        </AppContext.Provider>
    );
};

// se crea un custom hook para usar el contexto de forma global
export const useGlobalContext = () => useContext(AppContext);
const caballo = 'caballo';
