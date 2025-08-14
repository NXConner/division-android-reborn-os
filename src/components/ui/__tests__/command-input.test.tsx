import { render, screen, fireEvent } from '@testing-library/react'
import { CommandInput } from '@/components/ui/command-input'

describe('CommandInput', () => {
  test('submits command and clears input', () => {
    const onCommand = vi.fn()
    render(<CommandInput onCommand={onCommand} placeholder="Enter command" />)

    const input = screen.getByPlaceholderText('Enter command') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'status' } })
    fireEvent.submit(input.closest('form')!)

    expect(onCommand).toHaveBeenCalledWith('status')
    expect(input.value).toBe('')
  })

  test('navigates history with arrow keys', () => {
    const onCommand = vi.fn()
    render(<CommandInput onCommand={onCommand} placeholder="Enter command" maxHistoryLines={5} />)
    const input = screen.getByPlaceholderText('Enter command') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(input.closest('form')!)
    fireEvent.change(input, { target: { value: 'status' } })
    fireEvent.submit(input.closest('form')!)

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input.value).toBe('status')
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input.value).toBe('help')

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input.value).toBe('status')
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input.value).toBe('')
  })

  test('does not submit when disabled', () => {
    const onCommand = vi.fn()
    render(<CommandInput onCommand={onCommand} placeholder="Enter command" disabled />)
    const input = screen.getByPlaceholderText('Enter command') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'status' } })
    fireEvent.submit(input.closest('form')!)

    expect(onCommand).not.toHaveBeenCalled()
    expect(input.value).toBe('status')
  })
})