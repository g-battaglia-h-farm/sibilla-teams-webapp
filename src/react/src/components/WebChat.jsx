import React, { useEffect, useState } from 'react';
import ReactWebChat from 'botframework-webchat';
import useInitConversation from '../hooks/useInitConversation';
import NewChatIcon from './icons/NewChatIcon';
import MenuIcon from './icons/MenuIcon';
import storeConversation from '../store/storeConversation';

function WebChat() {
    const { session, initConversation } = useInitConversation();
    const [oldConversations, setOldConversations] = useState([]);

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

    function resumeConversation(conversationId) {
        storeConversation();
        sessionStorage['conversationId'] = conversationId;
        sessionStorage['store'] = oldConversations.find((conversation) => conversation.id === conversationId).store;
        console.log('Resuming conversation:', conversationId);
        initConversation();
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
                    sessionStorage.setItem('store', JSON.stringify(session.store.getState()));
                });
            }
        };

        initializeSession();
    }, [session, initConversation]);

    useEffect(() => {
        const conversationStorage = localStorage.getItem('conversationStorage');

        if (!conversationStorage) {
            localStorage.setItem('conversationStorage', JSON.stringify([]));
        }

        setOldConversations(JSON.parse(localStorage.getItem('conversationStorage')));
    }, [session]);

    return (
        <div className="main-container">
            <aside className="sidebar">
                <button className="sidebar-btn menu">
                    <MenuIcon />
                </button>
                <div className="buttons">
                    {!!oldConversations.length &&
                        oldConversations.map((conversation) => (
                            <button
                                className="sidebar-btn"
                                key={conversation.id}
                                onClick={() => resumeConversation(conversation.id)}
                            >
                                {conversation.id}
                            </button>
                        ))}
                </div>
            </aside>
            <div className="webchat-container">
                <div className="webchat-header">
                    <button className="sidebar-btn" onClick={sendResetMessage}>
                        Nuova chat
                        <NewChatIcon />
                    </button>
                </div>
                <div className="webchat-content">
                    {!!session.directLine && !!session.store && (
                        <div className="container">
                            <ReactWebChat
                                className="chat"
                                directLine={session.directLine}
                                key={session.key}
                                store={session.store}
                                styleOptions={{
                                    rootHeight: '100%',
                                    backgroundColor: 'var(--gray-800)',
                                    bubbleTextColor: 'var(--gray-50)',
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WebChat;
