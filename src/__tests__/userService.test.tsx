/// <reference types="vitest" />
import { renderHook, waitFor } from '@testing-library/react';
import { useUser } from '../hooks/services/userService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserIdProvider } from '../context/UserContext';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock the environment variable
vi.stubEnv('VITE_API_BASE_URL', 'https://jsonplaceholder.typicode.com');

// Create a wrapper for the hooks
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <UserIdProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </UserIdProvider>
  );
};

describe('useUser hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the API response
    vi.mocked(axios.get).mockResolvedValue({
      data: {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
      }
    });
  });

  it('fetches user data successfully', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useUser(), { wrapper });
    
    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    
    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    
    // Check that the data is correct
    expect(result.current.data).toEqual({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    });
    
    // Verify that the API was called
    expect(axios.get).toHaveBeenCalled();   
  });
});