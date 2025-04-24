import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Sidebar from '../components/Sidebar';
import { mockUser } from '../test/mocks/handlers';
import { MockUserContextProvider } from '../test/mocks/UserContextMock';

// Mock the environment variables
vi.mock('import.meta.env', () => ({
  VITE_API_BASE_URL: 'https://api.example.com'
}));

// Mock the useUser hook directly for more control
vi.mock('../hooks/services/userService', () => ({
  useUser: () => ({
    data: mockUser,
    isLoading: false
  })
}));

describe('Sidebar Component', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });
  
  const renderSidebar = () => {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <MockUserContextProvider userId={42}>
            <Sidebar />
          </MockUserContextProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  };
  
 
  it('fetches and displays user data correctly', async () => {
    renderSidebar();
    
    // Use getByText with a more flexible approach
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });
  
  it('toggles sidebar collapse state when button is clicked', async () => {
    renderSidebar();
    
    // Find the collapse button by icon instead of role/name
    
    const collapseButton = screen.getByTestId('collapse-button');

    const user = userEvent.setup();
    
    // Check initial state (not collapsed)
    expect(screen.getByRole('img', { name: /post image/i })).toBeInTheDocument();
    
    // Click the collapse button
    await user.click(collapseButton);
    
    // Check that the logo is not visible when collapsed
    expect(screen.queryByRole('img', { name: /post image/i })).not.toBeInTheDocument();
    
    // Click again to expand
    await user.click(collapseButton);
    
    // Check that the logo is visible again
    expect(screen.getByRole('img', { name: /post image/i })).toBeInTheDocument();
  });
  
  it('navigates correctly when menu items are clicked', async () => {
    renderSidebar();
    
    const user = userEvent.setup();
    
    // Click the Dashboard menu item
    await user.click(screen.getByText('Dashboard'));
    
    // Since we're using MemoryRouter, we can't actually test navigation
    // but we can verify the link is present
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/');
    
    // Check that the "Live Metrics" button points to the correct route
    expect(screen.getByRole('link', { name: /live metrics/i })).toHaveAttribute('href', '/profile');
  });
});