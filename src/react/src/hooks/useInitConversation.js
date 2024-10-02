import { useCallback, useState } from 'react';
import { createDirectLine, createStoreWithOptions } from 'botframework-webchat';

import resetMiddleware from '../store/resetMiddleware';
import getInitialState from '../store/getInitialState';
import API from '../API';

const DOMAIN = 'https://europe.webchat.botframework.com/v3/directline';
const TOKEN = '-y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU';

function useInitConversation() {
    const [session, setSession] = useState();

    const initConversation = useCallback(async () => {
        let { conversationId } = sessionStorage;

        if (!conversationId) {
            conversationId = await API.fetchConversationId();
            sessionStorage['conversationId'] = conversationId;
        }

        const key = Date.now();

        setSession({
            directLine: createDirectLine({
                domain: DOMAIN,
                token: TOKEN,
                conversationId: conversationId,
            }),
            key,
            store: createStoreWithOptions({ devTools: true }, getInitialState(), resetMiddleware(initConversation)),
        });
    }, []);

    return { session, initConversation };
}

export default useInitConversation;
