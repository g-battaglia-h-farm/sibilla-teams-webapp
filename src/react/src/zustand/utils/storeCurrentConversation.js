import useConversationStore from '../conversation';
import useConversationHistoryStore from '../conversationsHistory';

export default function storeCurrentConversation() {
    const conversationStorage = useConversationHistoryStore.getState().conversationHistory;
    const conversation = useConversationStore.getState().conversation;

    const conversationIndex = conversationStorage.findIndex(
        (conversation) => conversation.id === useConversationStore.getState().conversation.id,
    );

    // Conversazioni vuote
    if (!conversation.store.activities.length) {
        return;
    }

    // Messaggi di reset
    if (conversation.store.activities[0].type === 'message' && conversation.store.activities[0].text === '/reset') {
        return;
    }

    // Le card adaptive sono usate solo per richiedere il feedback, non devono essere nello storico.
    for (let i = conversation.store.activities.length - 1; i >= 0; i--) {
        const activity = conversation.store.activities[i];
        if (
            activity.type === 'message' &&
            activity.attachments &&
            activity.attachments.some(
                (attachment) => attachment.contentType === 'application/vnd.microsoft.card.adaptive',
            )
        ) {
            conversation.store.activities.splice(i, 1);
        }
    }

    // Se la conversazione è già presente nello storico, sovrascriviamo i dati,
    // altrimenti aggiungiamo la conversazione allo storico.
    if (conversationIndex !== -1) {
        useConversationHistoryStore.getState().updateConversation(conversation.id, conversation.store);
    } else {
        useConversationHistoryStore.getState().addConversation({
            id: conversation.id,
            token: conversation.token,
            title: conversation.store.activities[0].text,
            store: conversation.store,
        });
    }

    useConversationHistoryStore.getState().updateConversation(conversation.id, conversation.store);
}
