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

export default removeDotSlashPlugin;
