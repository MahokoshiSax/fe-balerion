import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VerifyPage from '../pages/VerifyPage';

// จำลอง useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('VerifyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders stepper with three steps', () => {
    render(
      <BrowserRouter>
        <VerifyPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('ข้อมูลส่วนตัว')).toBeInTheDocument();
    expect(screen.getByText('อัปโหลดเอกสาร')).toBeInTheDocument();
    expect(screen.getByText('ตรวจสอบข้อมูล')).toBeInTheDocument();
  });
  
  it('shows personal info form in step 1', () => {
    render(
      <BrowserRouter>
        <VerifyPage />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText('ชื่อ')).toBeInTheDocument();
    expect(screen.getByLabelText('นามสกุล')).toBeInTheDocument();
    expect(screen.getByLabelText('หมายเลขบัตรประชาชน')).toBeInTheDocument();
    expect(screen.getByLabelText('หมายเลขบัญชี')).toBeInTheDocument();
  });
  
  it('shows error when submitting empty form', () => {
    render(
      <BrowserRouter>
        <VerifyPage />
      </BrowserRouter>
    );
    
    // คลิกปุ่มยืนยันข้อมูลโดยไม่กรอกข้อมูล
    fireEvent.click(screen.getByText('ยืนยันข้อมูล'));
    
    expect(screen.getByText('ข้อมูลไม่ถูกต้อง')).toBeInTheDocument();
  });
  
  it('moves to step 2 when form is valid', async () => {
    render(
      <BrowserRouter>
        <VerifyPage />
      </BrowserRouter>
    );
    
    // กรอกข้อมูลในฟอร์ม
    fireEvent.change(screen.getByLabelText('ชื่อ'), { target: { value: 'จอห์น' } });
    fireEvent.change(screen.getByLabelText('นามสกุล'), { target: { value: 'โด' } });
    fireEvent.change(screen.getByLabelText('หมายเลขบัตรประชาชน'), { target: { value: '1234567890123' } });
    fireEvent.change(screen.getByLabelText('หมายเลขบัญชี'), { target: { value: '0987654321' } });
    
    // คลิกปุ่มยืนยันข้อมูล
    fireEvent.click(screen.getByText('ยืนยันข้อมูล'));
    
    // ตรวจสอบว่าแสดงข้อความสำเร็จ
    expect(await screen.findByText('ข้อมูลถูกต้อง')).toBeInTheDocument();
    
    // รอให้เปลี่ยนไปขั้นตอนที่ 2
    await waitFor(() => {
      expect(screen.getByText('อัปโหลดเอกสารยืนยันตัวตน')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
  
  it('goes back to homepage when clicking cancel', () => {
    render(
      <BrowserRouter>
        <VerifyPage />
      </BrowserRouter>
    );
    
    // คลิกปุ่มยกเลิก
    fireEvent.click(screen.getByText('ยกเลิก'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
