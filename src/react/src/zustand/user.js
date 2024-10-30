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
                setUser: (newUser) => {
                    set({
                        user: {
                            id: newUser.id,
                            name: newUser.name,
                        },
                    });
                },
                removeUser: () => set({ user: { id: '', name: '' } }),
                setUserName: (name) => set({ user: { ...get().user, name } }),
                setUserId: (id) => set({ user: { ...get().user, id } }),
            }),
            {
                name: 'user-storage',
                getStorage: () => localStorage,
            },
        ),
    ),
);

export default useUserStore;
