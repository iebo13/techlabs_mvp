import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * React Testing Library Example Test
 * This test demonstrates that RTL + Jest + TypeScript setup is working correctly
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// Simple test components
const Button = ({ onClick, children, }) => (_jsx("button", { onClick: onClick, type: "button", children: children }));
const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (_jsxs("div", { children: [_jsxs("p", { children: ["Count: ", count] }), _jsx(Button, { onClick: () => setCount(c => c + 1), children: "Increment" }), _jsx(Button, { onClick: () => setCount(0), children: "Reset" })] }));
};
const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            setMessage('Form submitted successfully!');
        }
        else {
            setMessage('Please fill in all fields');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", children: "Email:" }), _jsx("input", { id: "email", type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "Enter your email" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", children: "Password:" }), _jsx("input", { id: "password", type: "password", value: password, onChange: e => setPassword(e.target.value), placeholder: "Enter your password" })] }), _jsx("button", { type: "submit", children: "Login" }), message && _jsx("div", { role: "alert", children: message })] }));
};
describe('React Testing Library Integration', () => {
    describe('Basic Rendering', () => {
        test('renders simple components', () => {
            render(_jsx(Button, { onClick: () => { }, children: "Click me" }));
            expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
        });
        test('renders components with state', () => {
            render(_jsx(Counter, {}));
            expect(screen.getByText('Count: 0')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
        });
    });
    describe('User Interactions', () => {
        test('handles button clicks', async () => {
            const user = userEvent.setup();
            render(_jsx(Counter, {}));
            const incrementButton = screen.getByRole('button', { name: /increment/i });
            // Initial state
            expect(screen.getByText('Count: 0')).toBeInTheDocument();
            // Click increment button
            await user.click(incrementButton);
            expect(screen.getByText('Count: 1')).toBeInTheDocument();
            // Click multiple times
            await user.click(incrementButton);
            await user.click(incrementButton);
            expect(screen.getByText('Count: 3')).toBeInTheDocument();
            // Reset
            const resetButton = screen.getByRole('button', { name: /reset/i });
            await user.click(resetButton);
            expect(screen.getByText('Count: 0')).toBeInTheDocument();
        });
        test('handles form interactions', async () => {
            const user = userEvent.setup();
            render(_jsx(LoginForm, {}));
            const emailInput = screen.getByLabelText(/email/i);
            const passwordInput = screen.getByLabelText(/password/i);
            const submitButton = screen.getByRole('button', { name: /login/i });
            // Test empty form submission
            await user.click(submitButton);
            expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields');
            // Test successful form submission
            await user.type(emailInput, 'test@example.com');
            await user.type(passwordInput, 'password123');
            await user.click(submitButton);
            expect(screen.getByRole('alert')).toHaveTextContent('Form submitted successfully!');
        });
    });
    describe('Accessibility Testing', () => {
        test('uses proper ARIA labels and roles', () => {
            render(_jsx(LoginForm, {}));
            // Check for proper labels
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
            // Check for proper roles
            expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
            // Check placeholders
            expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
        });
        test('manages focus and keyboard interactions', async () => {
            const user = userEvent.setup();
            render(_jsx(LoginForm, {}));
            const emailInput = screen.getByLabelText(/email/i);
            const passwordInput = screen.getByLabelText(/password/i);
            // Test tab navigation
            await user.click(emailInput);
            expect(emailInput).toHaveFocus();
            await user.tab();
            expect(passwordInput).toHaveFocus();
        });
    });
    describe('Jest-DOM Matchers', () => {
        test('uses custom jest-dom matchers', () => {
            render(_jsx(LoginForm, {}));
            const emailInput = screen.getByLabelText(/email/i);
            const submitButton = screen.getByRole('button', { name: /login/i });
            // Test various jest-dom matchers
            expect(emailInput).toBeInTheDocument();
            expect(emailInput).toBeVisible();
            expect(emailInput).toHaveAttribute('type', 'email');
            expect(emailInput).toHaveValue('');
            expect(submitButton).toBeEnabled();
            expect(submitButton).toHaveTextContent('Login');
        });
    });
});
