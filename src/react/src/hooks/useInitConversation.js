/* Librerie */
import { useCallback, useState } from 'react';
import { createDirectLine, createStoreWithOptions } from 'botframework-webchat';

/* Store */
import useConversationStore from '../zustand/conversation';
import useErrorStore from '../zustand/errorStore';
import useAuthStore from '../zustand/auth';

/* Local */
import mainMiddleware from '../middleware/mainMiddleware';
import API from '../API';
import { isJwtValid } from '../utils';

const DOMAIN = 'https://europe.webchat.botframework.com/v3/directline';

function useInitConversation() {
  const setError = useErrorStore((state) => state.setError);
  const authToken = useAuthStore.getState().token;
  const [session, setSession] = useState({
    directLine: null,
    key: null,
    store: null,
  });

  const initConversation = useCallback(async () => {
    if (!authToken) {
      console.info('No auth token found. Restarting login process.');
      return;
    }

    const parsedStore = useConversationStore.getState().conversation.store;
    let conversationId = useConversationStore.getState().conversation.id;
    let token = useConversationStore.getState().conversation.token;

    if (token && !isJwtValid(token)) {
      token = null;
    }

    if (!token && !conversationId) {
      let jsonResponse;

      try {
        // const { token: newToken, conversationId: newConversationId } = await API.newConversations(authToken);
        jsonResponse = await API.newConversations(authToken);
      } catch (error) {
        console.error('Error creating new conversation:', error);
        setError({
          message: 'Errore durante la creazione di una nuova conversazione. Ricarica la pagina e riprova. <br> Se il problema persiste, contatta il team tecnico.',
        });
        return;
      }

      if (jsonResponse && jsonResponse?.error) {
        if (jsonResponse.error == 'INVALID_TOKEN' || jsonResponse.error == 'MISSING_TOKEN') {
          setError({
            message: 'Sessione scaduta. Si prega di effettuare nuovamente il login.',
            actionText: 'OK',
            actionFunction: () => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            },
          });
        }
      }

      const newToken = jsonResponse.token;
      const newConversationId = jsonResponse.conversationId;

      token = newToken;
      conversationId = newConversationId;

      useConversationStore.getState().setConversation({
        id: newConversationId,
        title: 'Nuova chat',
        store: {},
        token,
      });
    } else if (!token) {
      try {
        const { token: newToken } = await API.resumeConversations(conversationId, authToken);
        useConversationStore.getState().setConversation({ token: newToken });
        token = newToken;
      } catch (error) {
        console.error('Error resuming conversation:', error);
        setError({
          message: 'Errore durante il ripristino della conversazione.',
          actionText: 'Ricarica',
          actionFunction: () => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.reload();
          },
        });
        return;
      }
    }

    const key = Date.now();

    setSession({
      directLine: createDirectLine({
        domain: DOMAIN,
        token: token,
        conversationId: conversationId,
      }),
      key,
      store: createStoreWithOptions({ devTools: true }, parsedStore, mainMiddleware(initConversation)),
    });
  }, [authToken]);

  return { session, initConversation };
}

export default useInitConversation;