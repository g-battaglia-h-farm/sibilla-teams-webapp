import { useCallback, useState } from 'react';
import { createDirectLine, createStoreWithOptions } from 'botframework-webchat';

import resetMiddleware from '../middleware/resetMiddleware';
import API from '../API';
import useConversationStore from '../zustand/conversation';
import isJwtValid from '../utils';

const DOMAIN = 'https://europe.webchat.botframework.com/v3/directline';
const TOKEN = '-y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU';

function useInitConversation() {
    const [session, setSession] = useState({
        directLine: null,
        key: null,
        store: null,
    });

    const initConversation = useCallback(async () => {
        const parsedStore = useConversationStore.getState().conversation.store;
        let conversationId = useConversationStore.getState().conversation.id;
        let token = useConversationStore.getState().conversation.token;
        if (token && !isJwtValid(token)) {
            token = null;
        }

        if (!token) {
            console.log('--- > Fetching new token, old token:', token);
            const { token: newToken } = await API.getJwt();
            token = newToken;
            useConversationStore.getState().setConversation({ ...useConversationStore.getState().conversation, token });
            console.log('--- > Token:', token);
        }

        if (!conversationId) {
            conversationId = await API.fetchConversationId(token);
            useConversationStore.getState().setConversation({
                id: conversationId,
                title: 'Nuova chat',
                store: '',
                token,
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
