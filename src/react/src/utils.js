import { jwtDecode } from 'jwt-decode';
import markdownit from 'markdown-it';

function isJwtValid(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime || decoded.nbf > currentTime) {
            return false;
        }

        return true;
    } catch (error) {
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

function processMarkdown(markdown) {
    const md = markdownit({ html: true });

    // Regex per individuare gli URL
    const urlRegex = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    // Sostituisci gli URL con i link HTML corrispondenti
    const processedMarkdown = markdown.replace(urlRegex, (url) => {
        return /*HTML*/ `<a href="${url}" class="reference-link" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return md.render(processedMarkdown);
}

export { isJwtValid, query_parameter_with_default, processMarkdown };
