/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUser } from '../hooks/services/userService';
import { MemoryRouter } from 'react-router-dom';

// Mock the useUser hook
vi.mock('../hooks/services/userService');

// Create a simple test component that uses the useUser hook
const UserDataComponent = () => {
  const { data, isLoading } = useUser();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1 data-testid="user-name">{data?.name}</h1>
      <p data-testid="user-email">{data?.email}</p>
    </div>
  );
};

describe('User Data Display', () => {
  it('displays user data from the hook', () => {
    // Mock the useUser hook implementation
    vi.mocked(useUser).mockReturnValue({
      data: {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
      },
      isLoading: false
    } as any);
    
    render(
      <MemoryRouter>
        <UserDataComponent />
      </MemoryRouter>
    );

    // Check if the user name is displayed
    const userName = screen.getByTestId('user-name');
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent('Leanne Graham');
    
    // Check if the email is displayed
    const userEmail = screen.getByTestId('user-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent('Sincere@april.biz');
  });
  
  it('shows loading state', () => {
    // Mock the loading state
    vi.mocked(useUser).mockReturnValue({
      data: undefined,
      isLoading: true
    } as any);
    
    render(
      <MemoryRouter>
        <UserDataComponent />
      </MemoryRouter>
    );

    // Check if loading message is displayed
    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });
});