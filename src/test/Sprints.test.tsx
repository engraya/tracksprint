import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Sprints from '../pages/Sprints'
import { Provider } from 'react-redux'
import store from '../store'
// Mock Supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => ({
          data: [
            {
              id: 1,
              name: 'Test Sprint',
              created_at: new Date().toISOString()
            }
          ],
          error: null
        })
      })
    })
  }
}))

const renderWithProviders = (ui: React.ReactElement) => {
    const theme = createTheme()
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {ui}
        </ThemeProvider>
      </Provider>
    )
  }

describe('Sprints component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the heading and add button', async () => {
    renderWithProviders(<Sprints />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText(/sprints/i)).toBeInTheDocument()
    })

    // Check button
    expect(screen.getByRole('button', { name: /\+ add sprint/i })).toBeInTheDocument()
  })

  it('renders sprint card when data is loaded', async () => {
    renderWithProviders(<Sprints />)

    await waitFor(() => {
      expect(screen.getByText(/test sprint/i)).toBeInTheDocument()
    })
  })
})
