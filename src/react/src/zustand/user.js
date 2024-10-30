import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const useUserStore = create(
    devtools(
        persist(
            (set, get) => ({
                user: {
                    id: '',
                    name: '',
                },
                setUser: (user) => {
                    set({
                        user: {
                            id: user.id,
                            name: user.name,
                        },
                    });
                },
                removeUser: () => set({ user: { id: '', name: '' } }),
                setUserName: (name) => set({ user: { ...get().user, name } }),
                setUserId: (id) => set({ user: { ...get().user, id } }),
            }),
            {
                name: 'conversation-storage',
                getStorage: () => sessionStorage,
            },
        ),
    ),
);

export default useUserStore;
