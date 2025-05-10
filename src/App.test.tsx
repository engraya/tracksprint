import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { vi } from 'vitest';

// Mock supabase
vi.mock('./lib/supabase', () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: {
            subscription: {
              unsubscribe: vi.fn(),
            },
          },
        }),
      },
    },
  };
});

describe('App', () => {
  test('renders home page content', async () => {
    render(
      <Provider store={store}>
          <App />
      </Provider>
    );

    // Update this line based on what your Home page actually renders
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
