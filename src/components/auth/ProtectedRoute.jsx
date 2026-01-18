'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (requireAdmin && !user?.is_superuser) {
      router.replace('/dashboard');
    }
  }, [loading, isAuthenticated, requireAdmin, user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requireAdmin && !user?.is_superuser)) {
    return null;
  }

  return <>{children}</>;
  
};
