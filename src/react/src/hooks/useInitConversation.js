import { useCallback, useState } from 'react';
import { createDirectLine, createStoreWithOptions } from 'botframework-webchat';

import resetMiddleware from '../middleware/resetMiddleware';
import API from '../API';
import useConversationStore from '../zustand/conversation';
import { isJwtValid } from '../utils';

const DOMAIN = 'https://europe.webchat.botframework.com/v3/directline';

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

        if (!token && !conversationId) {
            const { token: newToken, conversationId: newConversationId } = await API.newConversations();

            token = newToken;
            conversationId = newConversationId;

            useConversationStore.getState().setConversation({
                id: newConversationId,
                title: 'Nuova chat',
                store: '',
                token,
            });
        } else if (!token) {
            const { token: newToken } = await API.resumeConversations(conversationId);
            useConversationStore.getState().setConversation({ token: newToken });

            token = newToken;
        }

        const key = Date.now();

        setSession({
            directLine: createDirectLine({
                domain: DOMAIN,
                token: token,
                conversationId: conversationId,
            }),
            key,
            store: createStoreWithOptions({ devTools: true }, parsedStore, resetMiddleware(initConversation)),
        });
    }, []);

    return { session, initConversation };
}

export default useInitConversation;
