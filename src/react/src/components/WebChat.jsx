import React, { useEffect, useState } from 'react';
import ReactWebChat from 'botframework-webchat';
import useInitConversation from '../hooks/useInitConversation';
import NewChatIcon from './icons/NewChatIcon';
import MenuOpenIcon from './icons/MenuOpenIcon';
import MenuCloseIcon from './icons/MenuCloseIcon';
import storeConversation from '../store/storeConversation';
import ThemeToggle from './ThemeToggle';

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

        // Check if we are in desktop mode
        if (window.innerWidth < 992) {
            closeSidebar();
        }

        initConversation();
    }

    function openSidebar() {
        document.body.classList.add('sidebar-open');
    }

    function closeSidebar() {
        document.body.classList.remove('sidebar-open');
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

    useEffect(() => {
        // Check if we are in desktop mode
        if (window.innerWidth >= 992) {
            // Assuming 1024px as the breakpoint for desktop
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }

        // Optional: Add a resize event listener to handle window resizing
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                document.body.classList.add('sidebar-open');
            } else {
                document.body.classList.remove('sidebar-open');
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="main-container">
            <div className="webchat-container">
                <div className="header">
                    <ThemeToggle />

                    <button className="header-btn" onClick={sendResetMessage}>
                        Nuova chat
                        <NewChatIcon />
                    </button>
                    <button className="menu open" onClick={openSidebar}>
                        <MenuOpenIcon />
                    </button>

                    <button className="menu close" onClick={closeSidebar}>
                        <MenuCloseIcon />
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
                                    backgroundColor: 'var(--webchat-bg)',
                                    bubbleTextColor: 'var(--webchat-bubble-text-color)',
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <aside className="sidebar">
                <h2 className="sidebar-title">Conversazioni</h2>
                <div className="buttons">
                    {!!oldConversations.length &&
                        oldConversations.map((conversation) => (
                            <button
                                className="sidebar-btn"
                                key={conversation.id}
                                onClick={() => resumeConversation(conversation.id)}
                            >
                                {conversation?.title?.substring(0, 40) + ' ...'}
                            </button>
                        ))}
                </div>
            </aside>
        </div>
    );
}

export default WebChat;
