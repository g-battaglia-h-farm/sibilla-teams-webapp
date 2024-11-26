import useErrorStore from '../zustand/errorStore';
import ErrorIcon from './icons/ErrorIcon';

const ErrorOverlay = () => {
    const { error, clearError } = useErrorStore();

    if (!error) return null;

    return (
        <div className="error-overlay">
            <div className="error-content">
                <ErrorIcon className="error-icon" />
                <h2>Errore</h2>
                <p>{error.message}</p>

                {error.actionText && error.actionFunction && (
                    <button
                        onClick={() => {
                            error.actionFunction();
                            clearError();
                        }}
                    >
                        {error.actionText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorOverlay;
