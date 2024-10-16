export default function storeConversation() {
    const conversationStorage = JSON.parse(localStorage.getItem('conversationStorage')) || [];
    const webChatStore = sessionStorage['store'];
    const parsedStore = JSON.parse(webChatStore);

    const conversationIndex = conversationStorage.findIndex(
        (conversation) => conversation.id === sessionStorage['conversationId'],
    );

    // È inutile salvare le conversazioni vuote.
    if (!parsedStore.activities.length) {
        return;
    }

    // Le card adaptive sono usate solo per richiedere il feedback, non devono essere nello storico.
    for (let i = parsedStore.activities.length - 1; i >= 0; i--) {
        const activity = parsedStore.activities[i];
        if (
            activity.type === 'message' &&
            activity.attachments &&
            activity.attachments.some(
                (attachment) => attachment.contentType === 'application/vnd.microsoft.card.adaptive',
            )
        ) {
            parsedStore.activities.splice(i, 1);
        }
    }

    // Se la conversazione è già presente nello storico, sovrascrivi i dati,
    // altrimenti aggiungi la conversazione allo storico.
    if (conversationIndex !== -1) {
        conversationStorage[conversationIndex].store = JSON.stringify(parsedStore);
    } else {
        conversationStorage.push({
            id: sessionStorage['conversationId'],
            store: JSON.stringify(parsedStore),
        });
    }

    localStorage.setItem('conversationStorage', JSON.stringify(conversationStorage));
}
