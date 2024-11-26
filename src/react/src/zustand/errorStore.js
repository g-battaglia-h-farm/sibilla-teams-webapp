import { create } from 'zustand';

const useErrorStore = create((set) => ({
    error: null,
    actionText: null,
    actionFunction: null,
    setError: (error, actionText = null, actionFunction = null) => set({ error, actionText, actionFunction }),
    clearError: () => set({ error: null }),
}));

export default useErrorStore;
