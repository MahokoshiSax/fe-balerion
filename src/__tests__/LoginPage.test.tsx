import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

// จำลองโมดูล GoogleOAuth
vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  GoogleLogin: () => <button data-testid="google-login">Sign in with Google</button>
}));

// จำลองโมดูล jwt-decode
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn().mockReturnValue({
    email: 'test@example.com',
    name: 'Test User',
    picture: 'test.jpg'
  })
}));

// จำลองโมดูล react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('LoginPage', () => {
  it('renders the TELLER logo', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('TELLER')).toBeInTheDocument();
  });
  
  it('renders login text', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('เข้าสู่ระบบ')).toBeInTheDocument();
  });
  
  it('renders Google login button', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('google-login')).toBeInTheDocument();
  });
});
