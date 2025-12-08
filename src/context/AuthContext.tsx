import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../services/authService";



interface User {
    user_id: string;
    role: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const initAuth = () => {
            const currentUser = authService.getUser();
            if (currentUser && authService.isAuthenticated()) {
                setUser(currentUser);
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            await authService.login(username, password);
            const currentUser = authService.getUser();
            setUser(currentUser); 
        } catch (error) {
            throw error; 
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};