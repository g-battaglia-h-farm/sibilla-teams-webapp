import { useEffect, useState } from 'react';
import ReactWebChat from 'botframework-webchat';
import useInitConversation from '../hooks/useInitConversation';
import NewChatIcon from './icons/NewChatIcon';
import MenuOpenIcon from './icons/MenuOpenIcon';
import MenuCloseIcon from './icons/MenuCloseIcon';
import ConversationHistorySidebar from './ConversationHistorySidebar';
import ErrorBoundary from './ErrorBoundary';
import SplashScreen from './SplashScreen';
import ErrorOverlay from './ErrorOverlay';
import storeCurrentConversation from '../zustand/utils/storeCurrentConversation';
import useErrorStore from '../zustand/errorStore';
import ThemeToggle from './ThemeToggle';
import useConversationStore from '../zustand/conversation';
import useConversationHistoryStore from '../zustand/conversationsHistory';
import useUserStore from '../zustand/user';
import useAuthStore from '../zustand/auth';
import useLogin from '../hooks/useLogin';
import { v4 as uuidv4 } from 'uuid';
import API from '../API';

function WebChat() {
    const { session, initConversation } = useInitConversation();
    const [oldConversations, setOldConversations] = useState([]);

    /* Conversations Store */
    const { setConversation, setConversationStore } = useConversationStore();
    const conversation = useConversationStore.getState().conversation;

    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);
    const authToken = useAuthStore((state) => state.token);

    const setError = useErrorStore((state) => state.setError);

    function sendMessage(message) {
        if (session?.store) {
            session.store.dispatch({
                type: 'WEB_CHAT/SEND_MESSAGE',
                payload: { text: message },
            });
        }
    }

    function sendResetMessage() {
        if (!conversation.store.activities?.length) {
            return;
        }
        document.body.classList.add('show-splash');
        document.body.classList.remove('message-sending');
        sendMessage('/reset-simple');
    }

    async function resumeConversation(conversationId) {
        storeCurrentConversation();

        const foundConversation = oldConversations.find((oldConversation) => oldConversation.id === conversationId);
        if (!foundConversation) {
            return;
        }

        let token;
        try {
            const jsonResponse = await API.resumeConversations(conversationId, authToken);
            token = jsonResponse.token;
        } catch (error) {
            console.error('Error resuming conversation:', error);
            setError({
                message: 'Errore durante il ripristino della conversazione. Si prega di riprovare più tardi.',
            });
            return;
        }

        setConversation({
            id: conversationId,
            token: token,
            title: 'Nuova chat',
            store: foundConversation.store,
        });

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

    useLogin();

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
                    setConversationStore(session.store.getState());
                });
            }
        };

        initializeSession();
    }, [session, initConversation, setConversationStore]);

    useEffect(() => {
        const conversationStorage = useConversationHistoryStore.getState().conversationHistory;
        setOldConversations(conversationStorage);
    }, [session, user.id]);

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

    useEffect(() => {
        if (!user.id) {
            console.log('Creating new user');
            const newUser = {
                id: uuidv4(),
                name: 'Guest',
            };
            setUser(newUser);
        }
    });

    return (
        <ErrorBoundary>
            <div className="main-container">
                <ErrorOverlay />
                <div className="webchat-container">
                    <div className="header">
                        <ThemeToggle />

                        <button className="header-btn" onClick={sendResetMessage}>
                            <NewChatIcon />
                            Nuova chat
                        </button>
                        {/*
                    <button
                        className="header-btn"
                        style={{ position: 'relative', zIndex: 99999999 }}
                        onClick={() => {
                            document.body.classList.toggle('show-splash');
                        }}
                    >
                        Show Splash
                    </button>
                    <button className="menu open" onClick={openSidebar}>
                        <MenuOpenIcon />
                    </button>

                    <button className="menu close" onClick={closeSidebar}>
                        <MenuCloseIcon />
                    </button>

                    <button
                        className="header-btn"
                        onClick={() => {
                            window.sessionStorage.clear();
                            window.localStorage.clear();
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                    */}
                    </div>
                    <div className="webchat-content">
                        {!!session.directLine && !!session.store && (
                            <div className="container">
                                <SplashScreen />
                                <ReactWebChat
                                    className="chat"
                                    directLine={session.directLine}
                                    key={session.key}
                                    store={session.store}
                                    userID={user.id}
                                    username={user.name}
                                    styleOptions={{
                                        rootHeight: '100%',
                                        backgroundColor: 'var(--webchat-bg)',
                                        bubbleTextColor: 'var(--webchat-bubble-text-color)',
                                    }}
                                    locale="it-IT"
                                    text
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* 
            <ConversationHistorySidebar  oldConversations={oldConversations} closeSidebar={closeSidebar} resumeConversation={resumeConversation} authToken={authToken} />
            */}
            </div>
        </ErrorBoundary>
    );
}

export default WebChat;
