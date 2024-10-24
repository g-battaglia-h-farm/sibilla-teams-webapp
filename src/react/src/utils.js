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

export default isJwtValid;
