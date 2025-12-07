import { api } from "../api/axiosClient";

interface LoginResponse {
    access_token: string;
}

export const authService = {
    login: async (username: string, password: string) => {
        const response = await api.post<LoginResponse>('/auth/login', { username, password });
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    }
};
