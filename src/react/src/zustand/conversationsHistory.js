import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useConversationHistoryStore = create(
    persist(
        (set, get) => ({
            conversationHistory: [],
            addConversation: (conversation) => {
                set((state) => ({
                    conversationHistory: [
                        ...state.conversationHistory,
                        {
                            id: conversation.id,
                            title: conversation.title,
                            store: conversation.store,
                        },
                    ],
                }));
            },
            updateConversation: (id, updatedStore) => {
                set((state) => ({
                    conversationHistory: state.conversationHistory.map((conversation) =>
                        conversation.id === id ? { ...conversation, store: updatedStore } : conversation,
                    ),
                }));
            },
            removeConversation: (id) => {
                set((state) => ({
                    conversationHistory: state.conversationHistory.filter((conversation) => conversation.id !== id),
                }));
            },
        }),
        {
            name: 'conversation-history-storage',
            getStorage: () => localStorage,
        },
    ),
);

export default useConversationHistoryStore;
