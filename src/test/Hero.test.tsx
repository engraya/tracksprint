import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../components/Hero'
import { ThemeProvider, createTheme } from '@mui/material/styles'


const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme()
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Hero component', () => {
  it('renders correctly', () => {
    renderWithTheme(<Hero />)


    expect(
      screen.getByRole('heading', { name: /welcome to tracksprint/i })
    ).toBeInTheDocument()


    expect(
      screen.getByText(/your all-in-one task and sprint management platform/i)
    ).toBeInTheDocument()
  })
})
