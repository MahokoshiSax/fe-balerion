import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

// จำลอง useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HomePage', () => {
  it('renders welcome title', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/ยินดีต้อนรับสู่ระบบ/)).toBeInTheDocument();
  });
  
  it('renders add customer identity button', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/เพิ่มการยืนยันตัวตน/)).toBeInTheDocument();
  });
  
  it('navigates to verify page when clicking add button', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText(/เพิ่มการยืนยันตัวตน/));
    expect(mockNavigate).toHaveBeenCalledWith('/verify');
  });
});
