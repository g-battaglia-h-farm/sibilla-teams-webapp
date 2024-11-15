import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const useAuthStore = create(
    devtools(
        persist(
            (set) => ({
                token: null,
                setToken: (token) => set({ token }),
            }),
            {
                name: 'auth-storage',
                getStorage: () => localStorage,
            },
        ),
    ),
);

export default useAuthStore;
