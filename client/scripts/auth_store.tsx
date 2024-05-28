import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    jwt_token: string | null;
    id: string | null;
    provider: string | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (jwt_token: string, id: string, provider: string) => void;
    logout: () => void;
}

const useAuthStore = create(persist<AuthState>((set) => ({
    isLoggedIn: false,
    jwt_token: null,
    id: null,
    provider: null,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    login: (token, userId, prov) => {
        set({ jwt_token: token, id: userId, provider: prov});
        // expiresIn 처리 필요
        set({ isLoggedIn: true });
        //window.location.reload();
    },
    logout: () => {
        set({ jwt_token: null, id: null});
        // expiresIn 처리 필요
        set({ isLoggedIn: false });
        //window.location.reload();
    },
}), {
    name: 'authStorage'
}));

export default useAuthStore;
