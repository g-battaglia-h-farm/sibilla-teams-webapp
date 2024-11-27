import { useEffect, useState } from 'react';
import useConversationStore from '../zustand/conversation';

const SplashScreen = () => {
    const conversation = useConversationStore((state) => state.conversation);

    useEffect(() => {
        if (conversation.store.activities?.length) {
            document.body.classList.remove('show-splash');
            return;
        }

        const observer = new MutationObserver(() => {
            const mainChatInput = document.querySelector('input.webchat__send-box-text-box__input');

            if (mainChatInput) {
                const handleKeyDown = (event) => {
                    if (!document.body.classList.contains('show-splash')) {
                        return;
                    }
                    console.log('KEYDOWN');
                    if (document.body.classList.contains('show-splash')) {
                        document.body.classList.remove('show-splash');
                        mainChatInput.removeEventListener('keydown', handleKeyDown);
                    }
                };

                mainChatInput.addEventListener('keydown', handleKeyDown);

                // Cleanup function to remove the event listener and observer
                return () => {
                    mainChatInput.removeEventListener('keydown', handleKeyDown);
                    observer.disconnect();
                };
            }
        });

        // Start observing the document for changes
        observer.observe(document.body, { childList: true, subtree: true });
    }, []);

    return (
        <div className="splash-screen">
            <div className="splash-content container">
                <div className="img-wrapper">
                    <img src="/img/bg-blue.webp" alt="Sibilla Logo" />
                </div>
                <h2>Ciao, Sono Sibilla</h2>
                <p>Come posso aiutarti oggi?</p>
            </div>
        </div>
    );
};

export default SplashScreen;
