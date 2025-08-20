import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../service/AuthService';

interface Props {
  children: React.ReactNode;
}

export default function HomePageGuard({ children }: Props) {
  if (!AuthService.hasValidToken()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
} 