document.addEventListener('DOMContentLoaded', () => {
    init_disableAdaptiveCardsButtonsOnClick();
    init_disableAdaptiveCardsButtonsOnLoad();
});

function init_disableAdaptiveCardsButtonsOnClick() {
    // Funzione per aggiungere il comportamento di click
    const addClickBehavior = () => {
        document.body.addEventListener('click', (event) => {
            // Cerca l'elemento con la classe desiderata nel percorso dell'evento
            const targetElement = event.target.closest('.webchat__adaptive-card-renderer');

            // Se è stato trovato, cerca l'elemento <article> che lo contiene
            if (targetElement) {
                const articleElement = targetElement.closest('article');

                // Se l'elemento <article> esiste, disabilita tutti i pulsanti interni
                if (articleElement) {
                    const buttons = articleElement.querySelectorAll('button');
                    buttons.forEach((button) => {
                        button.disabled = true;
                    });
                }
            }
        });
    };

    // Osserva eventuali modifiche al DOM
    const observer = new MutationObserver(() => {
        // Controlla i cambiamenti del DOM e aggiunge il comportamento se necessario
        addClickBehavior();
    });

    // Configurazione dell'osservazione
    observer.observe(document.body, {
        childList: true, // Osserva i cambiamenti nei figli
        subtree: true, // Osserva tutto l'albero DOM
    });

    // Esegui la funzione inizialmente per garantire il comportamento
    addClickBehavior();
}

function init_disableAdaptiveCardsButtonsOnLoad() {
    const timeout = setTimeout(() => {
        const adaptiveCards = document.querySelectorAll('.webchat__adaptive-card-renderer');

        adaptiveCards.forEach((adaptiveCard) => {
            const buttons = adaptiveCard.querySelectorAll('button');
            buttons.forEach((button) => {
                button.disabled = true;
            });
        });

        clearTimeout(timeout);
    }, 2000);
}
