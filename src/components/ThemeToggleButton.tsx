import { useEffect, useState } from 'react';

export const ThemeToggleButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Проверяем, есть ли тема в локальном хранилище
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark'); // Сохраняем в локальное хранилище
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded border ${
                isDarkMode
                    ? 'bg-gray-800 text-white border-gray-600'
                    : 'bg-gray-200 text-black border-gray-400'
            }`}
        >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};
