function replaceErrorPlugin() {
    return {
        name: 'replace-error-plugin', // Nome del plugin
        apply: 'build', // Applicabile solo in fase di build
        enforce: 'post', // Assicurati che venga eseguito dopo il bundle

        generateBundle(options, bundle) {
            for (const fileName in bundle) {
                const chunk = bundle[fileName];
                if (chunk.type === 'chunk' && fileName.endsWith('.js')) {
                    // Sostituzione della stringa nel contenuto del file
                    chunk.code = chunk.code.replace(/Impossibile connettersi\./g, 'Impossibile connettersi, prova a ricaricare la pagina! Qualora il problema dovesse persistere, contatta il team tecnico.');
                }
            }
        },
    };
}

export default replaceErrorPlugin;