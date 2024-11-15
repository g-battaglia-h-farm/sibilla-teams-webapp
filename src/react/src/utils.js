import { jwtDecode } from 'jwt-decode';

function isJwtValid(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime || decoded.nbf > currentTime) {
            return false;
        }

        return true;
    } catch (error) {
        console.info('Invalid JWT:', error);
        return false;
    }
}

function query_parameter_with_default(name, default_value) {
    return (
        decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(
                /\+/g,
                '%20',
            ),
        ) || default_value
    );
}

export { isJwtValid, query_parameter_with_default };
