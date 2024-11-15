// LoginOverya.jsx
import React, { useEffect, useState } from 'react';
import useAuthStore from '../zustand/auth';
import API from '../API';
import { query_parameter_with_default } from '../utils';

const LoginOverlay = () => {
    const token = useAuthStore((state) => state.token);
    const [link, setLink] = useState('');

    useEffect(() => {
        const code = query_parameter_with_default('code', '');
        const state = query_parameter_with_default('state', '');
        const sessionState = query_parameter_with_default('session_state', '');

        if (!code) {
            console.log('Missing code, state or session_state');
            const checkLogin = async () => {
                const response = await API.login(token);
                if (response.success) {
                    // Token is valid, proceed with the application
                    console.log('Login successful');
                } else {
                    // Token is invalid, redirect to the provided URL
                    console.log('Login failed, redirecting to', response.link);
                    window.location.href = response.link;
                }
            };

            checkLogin();
        }

        const obtainLoginCodeResponse = async () => {
            const response = await API.obtain_login_code(code, state);
            if (response.success) {
                console.log('Login successful');
                useAuthStore.getState().setToken(response.token);
            } else {
                console.log('Login failed');
            }
        };

        obtainLoginCodeResponse();
    }, []);

    return <div></div>;
};

export default LoginOverlay;
