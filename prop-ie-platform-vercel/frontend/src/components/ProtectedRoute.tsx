import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

type UserRole = 'buyer' | 'developer' | 'buyerSolicitor' | 'sellerSolicitor' | 'admin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(user.role))) {
      router.push('/login');
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
