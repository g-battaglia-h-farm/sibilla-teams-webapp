import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function removeDotSlashPlugin() {
    return {
        name: 'vite-plugin-remove-dot-slash',
        transformIndexHtml(html) {
            return html.replace(/(href|src)="(\.\/.*?)"/g, (match, attr, path) => {
                const newPath = path.replace(/^\.\//, '');
                return `${attr}="${newPath}"`;
            });
        },
    };
}

export default defineConfig({
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
});
