import { useCallback, useState } from 'react';
import { createDirectLine, createStoreWithOptions } from 'botframework-webchat';

import resetMiddleware from '../store/resetMiddleware';
import API from '../API';
import useConversationStore from '../zustand/conversation';

const DOMAIN = 'https://europe.webchat.botframework.com/v3/directline';
const TOKEN = '-y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU';

function useInitConversation() {
    const [session, setSession] = useState({
        directLine: null,
        key: null,
        store: null,
    });

    const initConversation = useCallback(async () => {
        let conversationId = useConversationStore.getState().conversation.id;
        console.log('initConversation', conversationId);
        const parsedStore = JSON.parse(useConversationStore.getState().conversation.store);
        console.log('parsedStore', parsedStore);

        if (!conversationId) {
            conversationId = await API.fetchConversationId();
            useConversationStore.getState().setConversation({
                id: conversationId,
                title: 'Nuova chat',
                store: '',
            });
        }

        const key = Date.now();

        setSession({
            directLine: createDirectLine({
                domain: DOMAIN,
                token: TOKEN,
                conversationId: conversationId,
            }),
            key,
            store: createStoreWithOptions({ devTools: true }, parsedStore, resetMiddleware(initConversation)),
        });
    }, []);

    return { session, initConversation };
}

export default useInitConversation;
