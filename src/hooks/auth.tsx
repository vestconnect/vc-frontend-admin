import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextState {
    user: any;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@VestConnectAdmin:token');
        const user = localStorage.getItem('@VestConnectAdmin:user');

        if (token && user) {
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            return {
                token,
                user: JSON.parse(user)
            }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@VestConnectAdmin:token', token);
        localStorage.setItem('@VestConnectAdmin:user', JSON.stringify(user));

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@VestConnectAdmin:token');
        localStorage.removeItem('@VestConnectAdmin:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}