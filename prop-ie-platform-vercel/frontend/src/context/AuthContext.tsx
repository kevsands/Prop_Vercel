import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

type UserRole = 'buyer' | 'developer' | 'buyerSolicitor' | 'sellerSolicitor' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkUserLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Redirect based on user role
  useEffect(() => {
    if (!loading && user) {
      const path = router.pathname;
      
      // Redirect to appropriate dashboard based on role
      if (path === '/login' || path === '/register' || path === '/') {
        switch (user.role) {
          case 'buyer':
            router.push('/buyer/dashboard');
            break;
          case 'developer':
            router.push('/developer/dashboard');
            break;
          case 'buyerSolicitor':
          case 'sellerSolicitor':
            router.push('/solicitor/dashboard');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
        }
      }
      
      // Prevent access to unauthorized areas
      if (path.startsWith('/buyer') && user.role !== 'buyer') {
        router.push(`/${user.role}/dashboard`);
      } else if (path.startsWith('/developer') && user.role !== 'developer' && user.role !== 'admin') {
        router.push(`/${user.role}/dashboard`);
      } else if (path.startsWith('/solicitor') && 
                !['buyerSolicitor', 'sellerSolicitor', 'admin'].includes(user.role)) {
        router.push(`/${user.role}/dashboard`);
      } else if (path.startsWith('/admin') && user.role !== 'admin') {
        router.push(`/${user.role}/dashboard`);
      }
    }
  }, [loading, user, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate different user roles
      let mockUser: User;
      
      if (email.includes('buyer')) {
        mockUser = {
          id: '1',
          email,
          name: 'John Buyer',
          role: 'buyer',
        };
      } else if (email.includes('developer')) {
        mockUser = {
          id: '2',
          email,
          name: 'Sarah Developer',
          role: 'developer',
        };
      } else if (email.includes('buyersolicitor')) {
        mockUser = {
          id: '3',
          email,
          name: 'Mark BuyerSolicitor',
          role: 'buyerSolicitor',
        };
      } else if (email.includes('sellersolicitor')) {
        mockUser = {
          id: '4',
          email,
          name: 'Lisa SellerSolicitor',
          role: 'sellerSolicitor',
        };
      } else if (email.includes('admin')) {
        mockUser = {
          id: '5',
          email,
          name: 'Admin User',
          role: 'admin',
        };
      } else {
        // Default to buyer for demo
        mockUser = {
          id: '6',
          email,
          name: 'Default User',
          role: 'buyer',
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirect based on role
      switch (mockUser.role) {
        case 'buyer':
          router.push('/buyer/dashboard');
          break;
        case 'developer':
          router.push('/developer/dashboard');
          break;
        case 'buyerSolicitor':
        case 'sellerSolicitor':
          router.push('/solicitor/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to register
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirect based on role
      switch (role) {
        case 'buyer':
          router.push('/buyer/dashboard');
          break;
        case 'developer':
          router.push('/developer/dashboard');
          break;
        case 'buyerSolicitor':
        case 'sellerSolicitor':
          router.push('/solicitor/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
