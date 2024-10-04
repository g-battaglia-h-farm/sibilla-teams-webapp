import React, { useEffect } from 'react';
import ReactWebChat from 'botframework-webchat';
import useInitConversation from '../hooks/useInitConversation';
import NewChatIcon from './icons/NewChatIcon';

function WebChat() {
    const { session, initConversation } = useInitConversation();

    function sendMessage(message) {
        if (session?.store) {
            session.store.dispatch({
                type: 'WEB_CHAT/SEND_MESSAGE',
                payload: { text: message },
            });
        }
    }

    function sendResetMessage() {
        sendMessage('/reset');
    }

    useEffect(() => {
        const initializeSession = async () => {
            if (!session?.directLine || !session?.store || !session?.key) {
                try {
                    await initConversation(); // Initialize conversation (async)
                } catch (error) {
                    console.error('Error initializing session:', error);
                }
            }

            if (session?.store) {
                session.store.subscribe(() => {
                    sessionStorage.setItem(
                        'store',
                        JSON.stringify(session.store.getState())
                    );
                });
            }
        };

        initializeSession();
    }, [session, initConversation]);

    return (
        <div className="webchat-container">
            <div className="webchat-content">
                <aside>
                    <button className="sidebar-btn" onClick={sendResetMessage}>
                        Nuova chat
                        <NewChatIcon />
                    </button>
                </aside>

                {!!session.directLine && !!session.store && (
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
