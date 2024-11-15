import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeDotSlashPlugin from './plugins/remove-dot-slash-vite-plugin';

/* Endpoint API */
const productionApiUrl = 'https://sibilla-bot-appservice-e5egc6dseagxc2gy.northeurope-01.azurewebsites.net';
const localApiEndpoint = 'http://localhost:3978';
// const localApiEndpoint = 'https://sibilla-bot-appservice-e5egc6dseagxc2gy.northeurope-01.azurewebsites.net';
const testApiUrl = 'https://sibilla-bot-appservice-e5egc6dseagxc2gy.northeurope-01.azurewebsites.net';

/**
 * La funzione ritorna l'endpoint'dell'API in base alla modalità in cui
 * viene avviato Vite/eseguito il build.
 *
 * @param {"development" | "test" | "production" | "test-prod"} mode Variabile recuperata da Vite
 *     all'avvio del server, può essere impostata manualmente con il parametro '--mode'
 * @returns {string} Url dell'endpoint API
 */
function getCurrentApiUrl(mode) {
    let endpoint;

    switch (mode) {
        case 'development':
            endpoint = localApiEndpoint;
            break;

        case 'test':
            endpoint = testApiUrl;
            break;

        case 'production':
            endpoint = productionApiUrl;
            break;

        case 'test-prod':
            endpoint = testApiUrl;
            break;

        default:
            endpoint = localApiEndpoint;
            break;
    }

    console.info('ℹ️  Endpoint API definito:', endpoint);
    return endpoint;
}

export default defineConfig(({ mode }) => {
    console.info('ℹ️  Modalità:', mode);
    return {
        define: {
            __BASE_API_ENDPOINT__: JSON.stringify(getCurrentApiUrl(mode)),
        },
        plugins: [react(), removeDotSlashPlugin()],
        base: './',
        build: {
            outDir: '../react-built/',
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        // Check if the asset is a CSS file
                        if (assetInfo.name.endsWith('.css')) {
                            return 'assets/[name].css'; // Place CSS files in assets
                        }
                        return `${assetInfo.name}`; // Other assets (like images) go in the root
                    },
                    chunkFileNames: 'chunks/[name].js',
                    entryFileNames: 'assets/[name].js',
                },
            },
        },
    };
});