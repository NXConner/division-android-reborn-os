import { render, screen } from '@testing-library/react'
import StatusBar from '@/components/isac/StatusBar'

describe('StatusBar', () => {
  test('renders ISAC brand and sections', () => {
    render(<StatusBar />)
    expect(screen.getByText(/I\.S\.A\.C/i)).toBeInTheDocument()
    expect(screen.getByText(/INTEGRATED STRATEGIC AUTONOMOUS COMPUTER/i)).toBeInTheDocument()
    expect(screen.getByText(/AGENT/i)).toBeInTheDocument()
  })
})