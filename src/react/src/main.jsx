// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import WebChat from './components/WebChat';

const originalErr = console.error;
window.console.error = (message, ...args) => {
  if (message.includes('Support for defaultProps will be removed')) return;
  if (message.includes('while rendering a different component')) return;
  if (message.includes('while rendering a different component')) return;

  originalErr(message, ...args);
};

createRoot(document.getElementById('root')).render(<WebChat />);
