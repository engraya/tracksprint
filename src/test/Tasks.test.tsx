import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Tasks from '../pages/Tasks'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from '../store' // <- Update this path to your actual Redux store

// Mock supabase fetch
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => ({
          data: [
            {
              id: '1',
              subject: 'Test Task',
              status: 'In Progress',
              estimated_hour: 5,
              parent_id: null,
              assignees: [],
              created_at: new Date().toISOString(),
              sprints: {
                name: 'Sprint 1',
              }
            }
          ],
          error: null
        })
      })
    })
  }
}))

// Mock assignees
vi.mock('../lib/assignees', () => ({
  mockAssignees: []
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

describe('Tasks component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the heading and add task button', async () => {
    renderWithProviders(<Tasks />)

    await waitFor(() => {
      expect(screen.getByText(/tasks/i)).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /\+ add task/i })).toBeInTheDocument()
  })

  it('renders a task after loading', async () => {
    renderWithProviders(<Tasks />)

    await waitFor(() => {
      expect(screen.getByText(/test task/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/status: in progress/i)).toBeInTheDocument()
    expect(screen.getByText(/estimated hour: 5/i)).toBeInTheDocument()
    expect(screen.getByText(/related sprint: sprint 1/i)).toBeInTheDocument()
  })
})
