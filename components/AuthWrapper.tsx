import { AuthProvider } from '@/lib/auth-context';
import React from 'react';

type AuthWrapperProps = {
  children: React.ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
