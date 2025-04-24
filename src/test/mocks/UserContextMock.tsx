import { ReactNode } from 'react';
import { vi } from 'vitest';
import * as UserContext from '../../context/UserContext';

interface UserContextProviderProps {
  userId?: number;
  children: ReactNode;
}

export const mockUseRandomUserId = vi.spyOn(UserContext, 'useRandomUserId');

export const MockUserContextProvider = ({ userId = 42, children }: UserContextProviderProps) => {
  // Mock the useRandomUserId hook to return our controlled value
  mockUseRandomUserId.mockReturnValue(userId);
  
  return <>{children}</>;
};