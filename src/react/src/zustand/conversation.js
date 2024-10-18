import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useConversationStore = create(
    persist(
        (set, get) => ({
            conversation: {
                id: '',
                title: '',
                store: '{}',
            },
            setConversation: (conversation) => {
                set({ conversation: { id: conversation.id, title: conversation.title, store: conversation.store } });
            },
            setConversationStore: (store) => set({ conversation: { ...get().conversation, store } }),
            removeConversation: () => set({ conversation: { id: null, title: '', store: '{}' } }),
        }),
        {
            name: 'conversation-storage',
            getStorage: () => sessionStorage,
        },
    ),
);

export default useConversationStore;
