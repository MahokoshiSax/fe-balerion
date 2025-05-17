import { LoginCredentials, LoginResponse, ApiError } from '../types/auth';

const MOCK_USER = {
  user1: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIuZW1haWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIifQ.IgQln56kjBGc66IAjRMjeJtscM2u--Uz5Ul01r1f874"
  },
  admin1: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbi5lbWFpbEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifQ.91VaQcMDdRWOj849ddLZO7pR_qjl_DpHdaaYCYfakkg"
  }
}

// Mock API delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw {
      message: error.message || 'An error occurred',
      status: response.status
    } as ApiError;
  }
  return response.json();
};

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const res = MOCK_USER[credentials.username as keyof typeof MOCK_USER]
    if (!res) {
      throw {
        message: 'Invalid username or password',
        status: 401
      } as ApiError;
    }


    return res;
  } catch (error) {
    throw error as ApiError;
  }
};

