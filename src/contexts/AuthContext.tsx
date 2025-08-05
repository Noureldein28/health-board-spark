import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';
import { LoginRequest, AuthResponse } from '../types/api';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is already logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = apiService.getAuthToken();
      if (token) {
        // If token exists, validate it with the backend
        // For now, we'll just check if it exists
        // In a real app, you'd verify the token with the backend
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (err) {
      console.error('Error checking auth status:', err);
      // Clear invalid token
      apiService.removeAuthToken();
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.login(credentials);

      if (response.statusCode === 200) {
        const authData: AuthResponse = response.data;
        
        // Store token and user data
        apiService.setAuthToken(authData.token);
        localStorage.setItem('user', JSON.stringify(authData.user));
        setUser(authData.user);

        return { success: true };
      } else {
        const errorMessage = response.message || 'Login failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = 'Failed to connect to the server. Please check if the backend is running.';
      setError(errorMessage);
      
      // For development, allow mock login
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        const mockUser: User = {
          id: 'admin-001',
          username: 'admin',
          email: 'admin@health-board.com',
          fullName: 'System Administrator'
        };
        
        apiService.setAuthToken('mock-token-123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setError(null);
        
        return { success: true };
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear token and user data
      apiService.removeAuthToken();
      localStorage.removeItem('user');
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};