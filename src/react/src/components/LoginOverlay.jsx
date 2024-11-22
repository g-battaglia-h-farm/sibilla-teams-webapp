// LoginOverya.jsx
import { useEffect } from 'react';
import useAuthStore from '../zustand/auth';
import API from '../API';
import { query_parameter_with_default, isJwtValid } from '../utils';

const LoginOverlay = () => {
    const token = useAuthStore((state) => state.token);
    const codeChallenge = useAuthStore((state) => state.codeChallenge);

    useEffect(() => {
        const code = query_parameter_with_default('code', '');
        const validJwt = isJwtValid(token);

        if (!code && !validJwt) {
            const checkLogin = async () => {
                let response;
                try {
                    response = await API.login(token);
                } catch (error) {
                    console.log('Error checking login:', error);
                    return;
                }

                if (response.success && response.link !== null) {
                    console.log('Login successful');
                } else {
                    // Set code challenge for later use
                    useAuthStore.getState().setCodeChallenge(response.code_challenge);
                    console.log('Login failed, redirecting to', response.link);
                    window.location.href = response.link;
                }
            };

            checkLogin();
        } else if (code && codeChallenge) {
            const obtainLoginCodeResponse = async () => {
                const response = await API.obtain_login_code(code, codeChallenge);
                if (response.access_token) {
                    console.log('Login successful');
                    useAuthStore.getState().setToken(response.access_token);
                } else {
                    console.log('Login failed');
                }
            };

            obtainLoginCodeResponse();
        }
    }, []);

    return <div></div>;
};

export default LoginOverlay;
