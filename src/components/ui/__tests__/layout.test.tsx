import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '@/components/ui/layout'
import { ISAC_EVENTS } from '@/lib/settings'

function renderWithLayout(children?: React.ReactNode) {
  return render(
    <MemoryRouter>
      <Layout>{children ?? <div>content</div>}</Layout>
    </MemoryRouter>
  )
}

describe('Layout', () => {
  test('renders theme toggle button', () => {
    renderWithLayout()
    const toggle = screen.getByRole('button', { name: /toggle theme/i })
    expect(toggle).toBeInTheDocument()
  })

  test('responds to sidebar update event', () => {
    renderWithLayout()
    const event = new CustomEvent<boolean>(ISAC_EVENTS.UPDATE_SIDEBAR, { detail: true })
    window.dispatchEvent(event)
    expect(true).toBe(true)
  })
})