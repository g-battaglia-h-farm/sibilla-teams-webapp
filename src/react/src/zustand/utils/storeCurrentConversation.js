import useConversationStore from '../conversation';
import useConversationHistoryStore from '../conversationsHistory';

export default function storeCurrentConversation() {
    const conversationStorage = useConversationHistoryStore.getState().conversationHistory;

    const conversation = useConversationStore.getState().conversation;

    const webChatStore = conversation.store;
    const parsedStore = webChatStore;
    console.log('parsedStore', parsedStore);

    const conversationIndex = conversationStorage.findIndex(
        (conversation) => conversation.id === useConversationStore.getState().conversation.id,
    );

    // Conversazioni vuote
    if (!parsedStore.activities.length) {
        return;
    }

    // Messaggi di reset
    if (parsedStore.activities[0].type === 'message' && parsedStore.activities[0].text === '/reset') {
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
        useConversationHistoryStore.getState().updateConversation(conversation.id, parsedStore);
    } else {
        useConversationHistoryStore.getState().addConversation({
            id: conversation.id,
            title: parsedStore.activities[0].text,
            store: conversation.store,
        });
    }

    useConversationHistoryStore.getState().updateConversation(conversation.id, parsedStore);
}
