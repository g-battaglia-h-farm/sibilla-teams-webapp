// LoginOverya.jsx
import { useEffect } from 'react';
import useAuthStore from '../zustand/auth';
import API from '../API';
import { query_parameter_with_default } from '../utils';

const LoginOverlay = () => {
    const token = useAuthStore((state) => state.token);
    const codeChallenge = useAuthStore((state) => state.codeChallenge);

    useEffect(() => {
        const code = query_parameter_with_default('code', '');

        if (!code) {
            console.log('Missing code, state or session_state');
            const checkLogin = async () => {
                const response = await API.login(token);
                if (response.success) {
                    console.log('Login successful');
                } else {
                    // Set code challenge for later use
                    useAuthStore.getState().setCodeChallenge(response.code_challenge);
                    console.log('Login failed, redirecting to', response.link);
                    window.location.href = response.link;
                }
            };

            checkLogin();
        } else {
            const obtainLoginCodeResponse = async () => {
                const response = await API.obtain_login_code(code, codeChallenge);
                if (response.success) {
                    console.log('Login successful');
                    useAuthStore.getState().setToken(response.token);
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
