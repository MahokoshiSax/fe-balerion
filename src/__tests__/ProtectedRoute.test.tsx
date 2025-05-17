import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// จำลอง Navigate component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: () => <div data-testid="navigate-to-login">Redirecting to login</div>,
  };
});

describe('ProtectedRoute Component', () => {
  it('renders children when user is authenticated', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute isAuthenticated={true}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate-to-login')).not.toBeInTheDocument();
  });
  
  it('redirects to login when user is not authenticated', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute isAuthenticated={false}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
  });
});
