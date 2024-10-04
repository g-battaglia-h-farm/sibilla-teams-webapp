// import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import WebChat from './components/WebChat';

const originalWarn = console.error;
window.console.error = (message, ...args) => {
    if (message.includes('Support for defaultProps will be removed')) {
        return;
    }
    originalWarn(message, ...args);
};

createRoot(document.getElementById('root')).render(<WebChat />);
