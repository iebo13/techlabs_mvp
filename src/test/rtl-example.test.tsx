/**
 * React Testing Library Example Test
 * This test demonstrates that RTL + Jest + TypeScript setup is working correctly
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Simple test components
type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
)

const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(c => c + 1)}>Increment</Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
    </div>
  )
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setMessage('Form submitted successfully!')
    } else {
      setMessage('Please fill in all fields')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
      {message && <div role="alert">{message}</div>}
    </form>
  )
}

describe('React Testing Library Integration', () => {
  describe('Basic Rendering', () => {
    test('renders simple components', () => {
      render(<Button onClick={() => {}}>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    test('renders components with state', () => {
      render(<Counter />)
      expect(screen.getByText('Count: 0')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    test('handles button clicks', async () => {
      const user = userEvent.setup()
      render(<Counter />)
      const incrementButton = screen.getByRole('button', { name: /increment/i })

      // Initial state
      expect(screen.getByText('Count: 0')).toBeInTheDocument()

      // Click increment button
      await user.click(incrementButton)
      expect(screen.getByText('Count: 1')).toBeInTheDocument()

      // Click multiple times
      await user.click(incrementButton)
      await user.click(incrementButton)
      expect(screen.getByText('Count: 3')).toBeInTheDocument()

      // Reset
      const resetButton = screen.getByRole('button', { name: /reset/i })
      await user.click(resetButton)
      expect(screen.getByText('Count: 0')).toBeInTheDocument()
    })

    test('handles form interactions', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /login/i })

      // Test empty form submission
      await user.click(submitButton)
      expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields')

      // Test successful form submission
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      expect(screen.getByRole('alert')).toHaveTextContent('Form submitted successfully!')
    })
  })

  describe('Accessibility Testing', () => {
    test('uses proper ARIA labels and roles', () => {
      render(<LoginForm />)

      // Check for proper labels
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

      // Check for proper roles
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()

      // Check placeholders
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument()
    })

    test('manages focus and keyboard interactions', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)

      // Test tab navigation
      await user.click(emailInput)
      expect(emailInput).toHaveFocus()
      await user.tab()
      expect(passwordInput).toHaveFocus()
    })
  })

  describe('Jest-DOM Matchers', () => {
    test('uses custom jest-dom matchers', () => {
      render(<LoginForm />)
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /login/i })

      // Test various jest-dom matchers
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toBeVisible()
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveValue('')
      expect(submitButton).toBeEnabled()
      expect(submitButton).toHaveTextContent('Login')
    })
  })
})
