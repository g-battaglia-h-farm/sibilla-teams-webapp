import { useEffect } from 'react';
import useErrorStore from '../zustand/errorStore';

const ErrorBoundary = ({ children }) => {
    const setError = useErrorStore((state) => state.setError);

    useEffect(() => {
        const handleError = (error, errorInfo) => {
            console.log(error, errorInfo);
            localStorage.clear();
            sessionStorage.clear();
            setError({ message: 'Ricarica la pagina per iniziare.' });
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    return children;
};

export default ErrorBoundary;
