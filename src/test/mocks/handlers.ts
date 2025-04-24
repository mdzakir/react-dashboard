import { http, HttpResponse } from 'msw';

// Mock API base URL
const API_BASE_URL = 'https://api.example.com'; // This will be replaced by import.meta.env.VITE_API_BASE_URL in actual code

// Mock user data
export const mockUser = {
  id: 42,
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
};

export const handlers = [
  // Handler for the user endpoint
  http.get(`${API_BASE_URL}/users/:userId`, ({ params }) => {
    const userId = params.userId;
    
    // Return mock user data
    return HttpResponse.json({
      ...mockUser,
      id: parseInt(userId as string, 10)
    });
  })
];