import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const useConversationStore = create(
    devtools(
        persist(
            (set, get) => ({
                conversation: {
                    id: '',
                    title: '',
                    token: '',
                    store: '{}',
                },
                setConversation: (conversation) => {
                    set({
                        conversation: {
                            id: conversation.id,
                            title: conversation.title,
                            store: conversation.store,
                            token: conversation.token,
                        },
                    });
                },
                setConversationStore: (store) => set({ conversation: { ...get().conversation, store } }),
                removeConversation: () => set({ conversation: { id: '', title: '', store: '{}', token: null } }),
            }),
            {
                name: 'conversation-storage',
                getStorage: () => sessionStorage,
            },
        ),
    ),
);

export default useConversationStore;
