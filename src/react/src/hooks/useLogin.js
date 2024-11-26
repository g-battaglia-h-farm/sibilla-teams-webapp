import { useEffect } from 'react';
import useAuthStore from '../zustand/auth';
import useErrorStore from '../zustand/errorStore';
import API from '../API';
import { query_parameter_with_default, isJwtValid } from '../utils';

const useLogin = () => {
    const authToken = useAuthStore((state) => state.token);
    const codeChallenge = useAuthStore((state) => state.codeChallenge);

    const setError = useErrorStore((state) => state.setError);

    useEffect(() => {
        const code = query_parameter_with_default('code', '');
        const validJwt = isJwtValid(authToken);

        if (!code && !validJwt) {
            const checkLogin = async () => {
                let response;
                try {
                    response = await API.login(authToken);
                } catch (error) {
                    console.log('Error checking login:', error);
                    setError({
                        message: 'Si è verificato un errore durante il login. Si prega di riprovare più tardi.',
                    });
                    return;
                }

                if (response.success && response.link !== null) {
                    console.log('Login successful');
                } else if (response.error) {
                    console.error('Error checking login:', response.error);
                    setError({
                        message:
                            'Si è verificato un errore durante il login.  Non si è autorizzati a visualizzare questa pagina.',
                    });
                } else {
                    useAuthStore.getState().setCodeChallenge(response.code_challenge);
                    console.log('Login failed, redirecting to login page');
                    window.location.href = response.link;
                }
            };

            checkLogin();
        } else if (code && codeChallenge && !validJwt) {
            const obtainLoginCodeResponse = async () => {
                let response;
                try {
                    response = await API.obtainLoginCode(code, codeChallenge);
                } catch (error) {
                    console.log('Error obtaining login code:', error);
                    setError({
                        message: 'Si è verificato un errore durante il login. Si prega di riprovare più tardi.',
                    });
                    return;
                }

                if (response.access_token) {
                    console.log('Login successful');
                    useAuthStore.getState().setToken(response.access_token);
                } else {
                    console.log('Login failed');
                    setError({
                        message: "L'utente non è autorizzato a visualizzare questa pagina.",
                    });
                }
            };

            obtainLoginCodeResponse();
            const url = new URL(window.location.href);

            window.history.replaceState({}, document.title, url.pathname);
        }
    }, []);
};

export default useLogin;
