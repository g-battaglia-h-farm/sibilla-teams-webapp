import { useState } from 'react';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    function toggleTheme() {
        const html = document.querySelector('html');
        const theme = html.getAttribute('data-theme');
        html.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
        setIsDark((prev) => !prev);
    }

    return (
        <button className="theme-toggle" onClick={toggleTheme} data-umami-event="toggle-theme">
            {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
}
