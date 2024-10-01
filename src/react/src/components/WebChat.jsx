import React, { useCallback, useEffect, useState } from 'react';
import ReactWebChat, {
    createDirectLine,
    createStoreWithOptions,
} from 'botframework-webchat';

const INITIAL_STATE = JSON.parse(sessionStorage.getItem('store')) || {};

function WebChat() {
    const [session, setSession] = useState();

    const middlewareFn =
        ({ dispatch }) =>
        (next) =>
        (action) => {
            if (action.type === 'WEB_CHAT/SEND_MESSAGE') {
                const { text } = action.payload;

                if (text.startsWith('/reset')) {
                    dispatch({
                        type: 'WEB_CHAT/SEND_MESSAGE_BACK',
                        payload: {
                            ...action.payload,
                            text: text.trim(),
                        },
                    });
                    return;
                }
            }

            return next(action);
        };

    const initConversation = useCallback(() => {
        (async function () {
            let { conversationId } = sessionStorage;

            if (!conversationId) {
                const res = await fetch(
                    'https://europe.webchat.botframework.com/v3/directline/conversations',
                    {
                        method: 'POST',
                        headers: {
                            Authorization:
                                'Bearer -y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU',
                        },
                    }
                );

                const { conversationId } = await res.json();
                sessionStorage['conversationId'] = conversationId;
            }
            const key = Date.now();

            setSession({
                directLine: createDirectLine({
                    domain: 'https://europe.webchat.botframework.com/v3/directline',
                    token: '-y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU',
                    conversationId: conversationId,
                }),
                key,
                store: createStoreWithOptions(
                    { devTools: true },
                    INITIAL_STATE,
                    middlewareFn
                ),
            });
        })();
    }, []);

    useEffect(initConversation, [initConversation]);

    const sendMessage = (message) => {
        session.store.dispatch({
            type: 'WEB_CHAT/SEND_MESSAGE',
            payload: {
                text: message,
            },
        });
    };

    const sendResetMessage = () => {
        sendMessage('/reset');
        initConversation();
    };

    function testClick() {
        sessionStorage.setItem(
            'store',
            JSON.stringify(session.store.getState())
        );
    }

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ height: '100%', width: '100%', display: 'flex' }}>
                <aside>
                    <button
                        className="sidebar-btn"
                        onClick={() => sendResetMessage()}
                    >
                        <i className="fa-regular fa-comment"></i>
                        Nuova chat
                    </button>

                    <button className="sidebar-btn" onClick={() => testClick()}>
                        <i className="fa-regular fa-comment"></i>
                        Chat attiva
                    </button>
                </aside>

                {!!session && (
                    <ReactWebChat
                        className="chat"
                        directLine={session.directLine}
                        key={session.key}
                        store={session.store}
                        styleOptions={{
                            rootHeight: '100%',
                            backgroundColor: '#212121',
                            bubbleTextColor: '#E6E6E6',
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default WebChat;
