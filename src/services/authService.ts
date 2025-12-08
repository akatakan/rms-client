import { api } from "../api/axiosClient";

interface LoginResponse {
    access_token: string;
}

interface UserResponse {
    user_id: string;
    role: string;
    username:string;
}

export const authService = {
    login: async (username: string, password: string) => {
        const response = await api.post<LoginResponse>('/auth/login', { username, password });
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        try{
            const userInfo = await api.get<UserResponse>('auth/profile');
            localStorage.setItem('user',JSON.stringify(userInfo.data));
        }
        catch{
            console.error("User cannot found");
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user')
        window.location.href = '/login';
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    },

    getUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
};
