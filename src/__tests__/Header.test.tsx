import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

// จำลอง useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// จำลอง localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });
  
  it('renders the TELLER logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('TELLER')).toBeInTheDocument();
  });
  
  it('renders logout button', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('ออกจากระบบ')).toBeInTheDocument();
  });
  
  it('clears localStorage and redirects to login on logout', () => {
    // เพิ่มข้อมูลใน localStorage
    localStorageMock.setItem('authToken', 'test-token');
    localStorageMock.setItem('userEmail', 'test@example.com');
    
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // คลิกปุ่มออกจากระบบ
    fireEvent.click(screen.getByText('ออกจากระบบ'));
    
    // ตรวจสอบว่า localStorage ถูกล้าง
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('userEmail');
    
    // ตรวจสอบว่ามีการ navigate ไปยังหน้า login
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
